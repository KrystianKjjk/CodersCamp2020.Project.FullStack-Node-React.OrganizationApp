import * as express from "express";
import * as mongoose from 'mongoose';
import { Teams } from "../Models/Teams";
import TeamsService from '../Services/TeamsService';

export default class TeamsController {
    service: TeamsService;
    constructor(service: TeamsService) {
        this.service = service;
    }

    getTeamsList = async (
        req: express.Request,
        res: express.Response,
    ) => {
        const allTeams = await this.service.getTeams();
        res.status(200).json(allTeams);
    };

    getTeamByID = async (
        req: express.Request,
        res: express.Response,
    ) => {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        res.status(200).json(team);
    };

    createTeam = async (
        req: express.Request,
        res: express.Response,
    ) => {     
        const teamData = req.body;
        const newTeam = await this.service.createTeam(teamData);
        res.status(201).json(newTeam);
    };

    updateTeam = async (
        req: express.Request,
        res: express.Response,
    ) => {     
        const teamData = req.body;
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        if (teamData === null) res.status(400).json({message: 'Provided data not correct'});
        const updatedTeam = await this.service.updateTeam(id, teamData);
        res.status(200).json(updatedTeam);
    };

    deleteTeam = async (
        req: express.Request,
        res: express.Response,
    ) => {     
        const id = new mongoose.Types.ObjectId(req.params.id);
        const team = await this.service.findTeamById(id);
        if (!team) res.status(404).json({message: 'Team not found'});
        await this.service.deleteTeam(id);
        res.status(200).json({message: 'Team was deleted'});
    };
}