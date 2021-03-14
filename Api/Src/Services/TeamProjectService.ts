import * as mongoose from 'mongoose';
import { TeamProject } from "../Models/TeamProject";
import TeamProjectRepository from "../Repositories/TeamProjectRepository";
import TeamRepository from "../Repositories/TeamRepository";

export default class TeamProjectService {
  private teamProjectRepository: TeamProjectRepository;
  private teamRepository: TeamRepository;

  constructor(teamProjectRepository: TeamProjectRepository, teamRepository: TeamRepository){
    this.teamProjectRepository = teamProjectRepository;
    this.teamRepository = teamRepository;
  }

  getTeamProjectsByTeamId = async(teamId: mongoose.Types.ObjectId):Promise<(TeamProject & mongoose.Document<TeamProject>)[]> => {
    return this.teamProjectRepository.findByTeamId(teamId);
  }

  getTeamProjectsByMentorId = async(mentorId: mongoose.Types.ObjectId):Promise<(TeamProject & mongoose.Document<TeamProject>)[]> => {
    const team = await this.teamRepository.getByMentorId(mentorId);
    return this.getTeamProjectsByTeamId(team._id);
  }

  getTeamProjects = async (): Promise<(TeamProject & mongoose.Document<TeamProject>)[]> => {
    return this.teamProjectRepository.getAll();
  };

  getTeamProjectById = async (teamProjectId: mongoose.Types.ObjectId) => {
    return this.teamProjectRepository.getById(teamProjectId);
  };

  createTeamProject = async (teamProject: TeamProject & mongoose.Document<TeamProject>) => {
    return this.teamProjectRepository.create(teamProject);
  };
  
  updateTeamProject = async (id: mongoose.Types.ObjectId, teamProject: TeamProject & mongoose.Document<TeamProject>) => {
    return this.teamProjectRepository.updateById(id, teamProject);
  };

  updateTeamProjectByMentorId = async (id: mongoose.Types.ObjectId, teamProject: TeamProject & mongoose.Document<TeamProject>) => {
    const team = await this.teamRepository.getByMentorId(id);
    return this.updateTeamProject(team._id, teamProject);
  };

  deleteTeamProject = async (teamProjectId: mongoose.Types.ObjectId) => {
    return this.teamProjectRepository.deleteById(teamProjectId);
  }

  deleteTeamProjectByMentorId = async (mentorId: mongoose.Types.ObjectId) => {
    const team = await this.teamRepository.getByMentorId(mentorId);
    return this.teamProjectRepository.deleteById(team.id);
  }

}

