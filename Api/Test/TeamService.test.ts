import * as mongoose from 'mongoose';
import TeamsRepository from '../Src/Repositories/TeamsRepository';
import TeamsService from '../Src/Services/TeamsService';
import TeamsSchema from '../Src/Models/Teams';
import { Teams } from '../Src/Models/Teams';

type TeamsDBModel = Teams & {_id: mongoose.Types.ObjectId};

class TestTeamsRepository implements TeamsRepository {
    private teams: Array<TeamsDBModel> = [];
    model: any;

    async getAll() {
        return this.teams;
    };
    async getById(id: mongoose.Types.ObjectId) {
        return this.teams.find(teams => teams._id === id)
    };
    async create(team: TeamsDBModel) {
        this.teams = [...this.teams, team];
    };
    async updateById(id: mongoose.Types.ObjectId, team: TeamsDBModel) {
        const teamIndex = this.teams.findIndex(team => team._id === id);
        const teamAfterUpdate = {...this.teams[teamIndex], ...team}
        this.teams[teamIndex] = teamAfterUpdate;

        return teamAfterUpdate;
    };
    async deleteById(id: mongoose.Types.ObjectId) {
        return this.teams = this.teams.filter(team => team._id !== id)
    };

    async addUserToTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        const updatedTeam = this.teams.map((team, index) => {
            if (index === teamIndex) {
                return team.users = [...team.users, userId];
            } else {
                return team;
            };
        });
        
        return updatedTeam;
    }

    async addMentorToTeam(teamId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].mentor = mentorId;
        return this.teams[teamIndex];
    }

    async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].mentor = null;
        return this.teams[teamIndex];
    }

    async deleteUserFromTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].users.filter(user => user !== userId) 

        return this.teams[teamIndex];
    }
};

describe("Teams Service", () => {
    let service: TeamsService;

    const team1 = {
        _id: mongoose.Types.ObjectId(),
        mentor: mongoose.Types.ObjectId(), 
        users: [mongoose.Types.ObjectId()], 
        projects: [mongoose.Types.ObjectId()],
    };

    const team2 = {
        _id: mongoose.Types.ObjectId(),
        mentor: mongoose.Types.ObjectId(), 
        users: [mongoose.Types.ObjectId()], 
        projects: [mongoose.Types.ObjectId()],
    };

    beforeEach(() => {
        service = new TeamsService(new TestTeamsRepository());
    })

    it("persists teams model", async () => {
        await service.createTeam(team1);
        const fetchedProject = await service.findTeamById(team1._id);

        expect(fetchedProject).toEqual(team1);
    });

    it("can list out all teams", async () => {
        await service.createTeam(team1);
        await service.createTeam(team2);
        const allTeams = await service.getTeams();

        expect(allTeams).toHaveLength(2);
    });

    it("should delete a team", async () => {
        await service.createTeam(team1);
        await service.deleteTeam(team1._id);
        const allTeams = await service.getTeams();

        expect(allTeams).toHaveLength(0);
    });

    it("should update a project", async () => {
        await service.createTeam(team1);
        const updatedTeam = await service.updateTeam(team1._id, {mentor: mongoose.Types.ObjectId()});

        expect(updatedTeam.mentor).not.toEqual(team1.mentor); // changed
        expect(updatedTeam.users).toEqual(team1.users); // stayed the same
        expect(updatedTeam.projects).toEqual(team1.projects); // stayed the same
    });

    it("shuld added new users to team and delete this users from team", async () => {
        await service.createTeam(team1);
        const newUser = mongoose.Types.ObjectId();
        const updatedTeamFromAddedNewUser = await service.addUserToTeam(team1._id, newUser);

        expect(updatedTeamFromAddedNewUser.includes(newUser)).toBeTruthy;
        const updatedTeamFromDeleteduser = await service.deleteUserFromTeam(team1._id, newUser);
        expect(updatedTeamFromAddedNewUser.includes(newUser)).toBeFalsy;
    });

    it("shuld added new mentor to team", async () => {
        await service.createTeam(team1);
        const newMentor = mongoose.Types.ObjectId();
        const updatedTeam = await service.addMentorToTeam(team1._id, newMentor);

        expect(updatedTeam.mentor).toEqual(newMentor);
    });

    it("shuld deleted mentor from team", async () => {
        await service.createTeam(team1);
        const newMentor = mongoose.Types.ObjectId();
        const updatedTeam = await service.deleteMentorFromTeam(team1._id);

        expect(updatedTeam.mentor).toEqual(null);

    });


});