import UserController from '../Controllers/UserController';
import * as express from 'express';


export default function UserRoutes(c: UserController) {
    return (router: express.Router) => {
        router.get('/users/:id', c.getUser);
        router.post('/users', c.register);
        return router;
    }
}