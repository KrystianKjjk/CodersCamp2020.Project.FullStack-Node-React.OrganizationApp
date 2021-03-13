import * as mongoose from "mongoose";
import { TeamProject } from "../Src/Models/TeamProject";
import TeamProjectSchema from "../Src/Models/TeamProject";
import TeamProjectRepository from "../Src/Repositories/TeamProjectRepository";
import TeamProjectService from "../Src/Services/TeamProjectService";

class TestTeamProjectRepository extends TeamProjectRepository {
  private projects: TeamProject[] = [];

  constructor() {
    super(TeamProjectSchema);
  }

  async getAll() {
    return this.projects;
  }

  async getById(id: mongoose.Types.ObjectId) {
    return this.projects.find((project) => project._id === id);
  }

  async create(project: TeamProject & mongoose.Document<TeamProject>) {
    this.projects.push(project);
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    const projectIndex = this.projects.findIndex(
      (project) => project._id === id
    );
    if (projectIndex > -1) {
      this.projects.splice(projectIndex, 1);
    }
  }
  async updateById(
    id: mongoose.Types.ObjectId,
    project: TeamProject & mongoose.Document<TeamProject>
  ) {
    const projectIndex = this.projects.findIndex(
      (project) => project._id === id
    );
    this.projects[projectIndex] = project;
    return project;
  }
 
  async findByTeamId(teamId: mongoose.Types.ObjectId) {
    const teamProjects = this.projects.filter(
      (project) => teamId.equals(project.teamId)
    );
    return teamProjects;
  }
}

describe("TeamProjectService", () => {
  let service: TeamProjectService;

  beforeEach(() => {
    const teamProjectRepository = new TestTeamProjectRepository();
    service = new TeamProjectService(teamProjectRepository);
  });

  test("should create team project and fetch it", async () => {
    const teamProject = new TeamProjectSchema({
      teamId: "1",
      parentProjectId: "2",
      projectName: "FitNotFat",
      projectUrl: "fitnotfat.url",
      description: "description",
    });

    await service.createTeamProject(teamProject);
    const fetchedTeamProject = await service.getTeamProjectById(
      teamProject._id
    );
    expect(fetchedTeamProject).toEqual(teamProject);
  });

  test("should fetch all team projects", async () => {
    const teamProject1 = new TeamProjectSchema({
      teamId: "1",
      parentProjectId: "2",
      projectName: "FitNotFat",
      projectUrl: "fitnotfat.url",
      description: "description",
    });
    const teamProject2 = new TeamProjectSchema({
      teamId: "2",
      parentProjectId: "4",
      projectName: "Pokemons",
      projectUrl: "pokemons.url",
      description: "description",
    });

    await service.createTeamProject(teamProject1);
    await service.createTeamProject(teamProject2);

    const fetchedTeamProjects = await service.getTeamProjects();
    expect(fetchedTeamProjects.length).toBe(2);
  });

  test("should delete teamProject", async () => {
    const teamProject = new TeamProjectSchema({
      teamId: "1",
      parentProjectId: "2",
      projectName: "FitNotFat",
      projectUrl: "fitnotfat.url",
      description: "description",
    });

    await service.createTeamProject(teamProject);
    await service.deleteTeamProject(teamProject._id);

    const fetchedTeamProjects = await service.getTeamProjects();
    expect(fetchedTeamProjects.length).toBe(0);
  });

  test("should update teamProject", async () => {
    const teamProject = new TeamProjectSchema({
      teamId: "1",
      parentProjectId: "2",
      projectName: "FitNotFat",
      projectUrl: "fitnotfat.url",
      description: "description",
    });
    await service.createTeamProject(teamProject);
    teamProject.projectName = "updated project name";
    const updatedTeamProject = await service.updateTeamProject(
      teamProject._id,
      teamProject
    );

    expect(updatedTeamProject.projectName).toBe(teamProject.projectName);

    
  });

  test("should fetch all team projects by teamId", async () => {
    const teamProject1 = new TeamProjectSchema({
      teamId: "6041184b4864b56a243b20bf",
      parentProjectId: "2",
      projectName: "FitNotFat",
      projectUrl: "fitnotfat.url",
      description: "description",
    });
    const teamProject2 = new TeamProjectSchema({
      teamId: "6041184b4864b56a243b20bf",
      parentProjectId: "4",
      projectName: "Pokemons",
      projectUrl: "pokemons.url",
      description: "description",
    });
    const teamProject3 = new TeamProjectSchema({
      teamId: "1041184b4864b56a243b20bf",
      parentProjectId: "3",
      projectName: "Chess",
      projectUrl: "chess.url",
      description: "description",
    });

    await service.createTeamProject(teamProject1);
    await service.createTeamProject(teamProject2);
    await service.createTeamProject(teamProject3);
    const id = new mongoose.Types.ObjectId("6041184b4864b56a243b20bf");
    const fetchedTeamProjects = await service.getTeamProjectsByTeamId(id);
    expect(fetchedTeamProjects.length).toBe(2);
  });
});
