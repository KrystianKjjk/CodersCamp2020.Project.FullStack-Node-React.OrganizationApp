import UserController from '../Controllers/User';
import * as express from 'express';
import idValidation from '../Middlewares/IdValidation'

export default function UserRoutes(c: UserController) {
    return (router: express.Router) => {
        router.get('/users/:id', idValidation, c.getUser);
        router.get('/users', c.getAllUsers);
        router.post('/users/register', c.register);
        router.post('/users/login', c.logIn);
        router.patch('/users/:id', idValidation, c.updateUser);
        router.delete('/users/:id', idValidation, c.deleteUser);
        return router;
    }
}