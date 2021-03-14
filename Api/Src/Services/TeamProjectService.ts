import * as mongoose from 'mongoose';
import { TeamProject } from "../Models/TeamProject";
import TeamProjectRepository from "../Repositories/TeamProjectRepository";

export default class TeamProjectService {
  private teamProjectRepository: TeamProjectRepository;

  constructor(teamProjectRepository: TeamProjectRepository){
    this.teamProjectRepository = teamProjectRepository;
  }

  getTeamProjectsByTeamId = async(teamId: mongoose.Types.ObjectId):Promise<(TeamProject & mongoose.Document<TeamProject>)[]> => {
    return this.teamProjectRepository.findByTeamId(teamId);
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

  deleteTeamProject = async (teamProjectId: mongoose.Types.ObjectId) => {
    return this.teamProjectRepository.deleteById(teamProjectId);
  }
}

