import * as mongoose from 'mongoose';
import TeamRepository from '../Src/Repositories/TeamRepository';
import TeamService from '../Src/Services/TeamService';
import { Team } from '../Src/Models/Team';

class TestTeamsRepository implements TeamRepository {
    private teams: Array<Team> = [];
    model: any;

    async getAll() {
        return this.teams;
    };

    async getById(id: mongoose.Types.ObjectId) {
        return this.teams.find(teams => teams._id === id)
    };

    async create(team: Team) {
        this.teams = [...this.teams, team];
    };
    
    async updateById(id: mongoose.Types.ObjectId, teamData: Partial<Team>) {
        const teamIndex = this.teams.findIndex(team => team._id === id);
        if (teamIndex === -1) return null;

        const teamAfterUpdate = {...this.teams[teamIndex], ...teamData}
        this.teams[teamIndex] = teamAfterUpdate;

        return teamAfterUpdate;
    };

    async deleteById(id: mongoose.Types.ObjectId) {
        return this.teams = this.teams.filter(team => team._id !== id)
    };

    async addUserToTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].users.push(userId);
        
        return this.teams[teamIndex];
    }

    async addMentorToTeam(teamId: mongoose.Types.ObjectId, mentorId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].mentor = mentorId;

        return this.teams[teamIndex];
    }

    async deleteUserFromTeam(teamId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].users = this.teams[teamIndex].users.filter(user => user !== userId); 

        return this.teams[teamIndex];
    }

    async deleteMentorFromTeam(teamId: mongoose.Types.ObjectId) {
        const teamIndex = this.teams.findIndex(team => team._id === teamId);
        this.teams[teamIndex].mentor = null;

        return this.teams[teamIndex];
    }
};

describe("Teams Service", () => {
    let service: TeamService;

    const team1 = {
        _id: mongoose.Types.ObjectId(),
        mentor: mongoose.Types.ObjectId(), 
        users: [mongoose.Types.ObjectId()], 
    };

    const team2 = {
        _id: mongoose.Types.ObjectId(),
        mentor: mongoose.Types.ObjectId(), 
        users: [mongoose.Types.ObjectId()], 
    };

    beforeEach(() => {
        service = new TeamService(new TestTeamsRepository());
    })

    it("persists team model", async () => {
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

    it("should update a team", async () => {
        await service.createTeam(team1);
        const updatedTeam = await service.updateTeam(team1._id, {mentor: mongoose.Types.ObjectId()});

        expect(updatedTeam.mentor).not.toEqual(team1.mentor); // changed
        expect(updatedTeam.users).toEqual(team1.users); // stayed the same
    });

    it("should add new users to team and delete these users from a team", async () => {
        await service.createTeam(team1);
        const newUser = mongoose.Types.ObjectId();
        const updatedTeamAfterAddingUser = await service.addUserToTeam(team1._id, newUser);
        expect(updatedTeamAfterAddingUser.users.includes(newUser)).toBeTruthy();

        const updatedTeamAfterDeletingUser = await service.deleteUserFromTeam(team1._id, newUser);
        expect(updatedTeamAfterDeletingUser.users.includes(newUser)).toBeFalsy();
    });

    it("should add new mentor to a team", async () => {
        await service.createTeam(team1);
        const newMentor = mongoose.Types.ObjectId();
        const updatedTeam = await service.addMentorToTeam(team1._id, newMentor);

        expect(updatedTeam.mentor).toEqual(newMentor);
    });

    it("should delete mentor from a team", async () => {
        await service.createTeam(team1);
        const updatedTeam = await service.deleteMentorFromTeam(team1._id);

        expect(updatedTeam.mentor).toEqual(null);
    });
});