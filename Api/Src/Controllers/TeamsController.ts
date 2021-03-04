import { Request, Response } from "express";
import * as mongoose from 'mongoose';
import { Teams } from "../Models/Teams";
import TeamsService from '../Services/TeamsService';

export default class TeamsController {
    service: TeamsService;
    constructor(service: TeamsService) {
        this.service = service;
    }

    getTeamsList = async (req: Request, res: Response) => {
        const allTeams = await this.service.getTeams();
        res.status(200).json(allTeams);
    };

    getTeamByID = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        res.status(200).json(team);
    };

    createTeam = async (req: Request, res: Response) => {
        const teamData = req.body;
        const newTeam = await this.service.createTeam(teamData);
        res.status(201).json({...newTeam, message: 'Team was created'});

    };

    updateTeam = async (req: Request, res: Response) => {
        const teamData = req.body;
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        if (teamData === null) res.status(400).json({message: 'Provided data not correct'});
        const updatedTeam = await this.service.updateTeam(id, teamData);
        res.status(200).json(updatedTeam);
    };

    deleteTeam = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        await this.service.deleteTeam(id);
        res.status(200).json({message: 'Team was deleted'});
    };
    
    addUserToTeam = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const userId = new mongoose.Types.ObjectId(req.body.userId);
        const team = await this.service.addUserToTeam(id, userId);
        if(team === null) return res.status(404).json({message: 'Team not found'});
        res.status(200).json({message: 'User added to team'});
    }

    addMentorToTeam = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const mentorId = new mongoose.Types.ObjectId(req.body.mentorId);
        const team = await this.service.addMentorToTeam(id, mentorId);
        if(team === null) return res.status(404).json({message: 'Team not found'});
        res.status(200).json({message: 'Mentor added to team'});
    }

    deleteMentorFromTeam = async (req: Request, res: Response) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        await this.service.deleteMentorFromTeam(id);
        res.status(200).json({message: 'Mentor was deleted'});
    }

    deleteUserFromTeam = async (req: Request, res: Response) => {
        const teamId = new mongoose.Types.ObjectId(req.params.teamId);
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const team = await this.service.findTeamById(teamId);
        if (!team) res.status(404).json({message: 'Team not found'});
        await this.service.deleteUserFromTeam(teamId, userId);
        res.status(200).json({message: 'User was deleted'});
    }
}