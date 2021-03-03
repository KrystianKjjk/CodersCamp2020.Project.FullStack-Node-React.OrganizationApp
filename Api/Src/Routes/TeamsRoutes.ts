import * as express from "express";
import TeamsController from "../Controllers/TeamsController";

const teamsRoutes = (controller: TeamsController) => {
    return (router: express.Router) => {
        router.route("/teams").get(controller.getTeamsList);
        router.route("/teams/:id").get(controller.getTeamByID);
        
        router.route("/teams").post(controller.createTeam);
        router.route("/teams/:id").delete(controller.deleteTeam);
        router.route("/teams/:id").patch(controller.updateTeam);
        
        // router.route("/teams/:id/users").post(controller.addUserToTeam);
        // router.route("/teams/:id/users/:id").delete(controller.deleteUserFromTeam);
        
        // router.route("/teams/:id/mentor").post(controller.addMentorToTeam);
        // router.route("/teams/:id/mentor/:id").patch(controller.updateMentorFromTeam);
        // router.route("/teams/:id/mentor/:id").delete(controller.deleteMentorFromTeam);
        return router;
    }

};
export default teamsRoutes;