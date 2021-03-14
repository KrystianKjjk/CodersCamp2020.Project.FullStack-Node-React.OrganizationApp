import * as express from "express";
import TeamController from "../Controllers/TeamController";

const teamsRoutes = (controller: TeamController) => {
    return (router: express.Router) => {
        router.route("/teams").get(controller.getTeamsList);
        router.route("/teams/:id").get(controller.getTeamByID);
        
        router.route("/teams").post(controller.createTeam);
        router.route("/teams/:id").delete(controller.deleteTeam);
        router.route("/teams/:id").patch(controller.updateTeam);
        
        router.route("/teams/:id/users").post(controller.addUserToTeam);
        router.route("/teams/:teamId/users/:userId").delete(controller.deleteUserFromTeam);
        
        router.route("/teams/:id/mentor").post(controller.addMentorToTeam);
        router.route("/teams/:id/mentor/").delete(controller.deleteMentorFromTeam);
        
        router.route("/courses/:id/teams").get(controller.getTeamsByCourseId);
        return router;
    }

};
export default teamsRoutes;