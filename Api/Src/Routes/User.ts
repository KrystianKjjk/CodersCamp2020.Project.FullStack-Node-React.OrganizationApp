import UserController from '../Controllers/UserController';
import * as express from 'express';


export default function UserRoutes(c: UserController) {
    return (router: express.Router) => {
        router.get('/users/:id', c.getUser);
        router.get('/users', c.getAllUsers);
        router.post('/users/register', c.register);
        router.post('/users/login', c.logIn);
        router.patch('/users/:id', c.updateUser);
        router.delete('/users/:id', c.deleteUser);
        return router;
    }
}