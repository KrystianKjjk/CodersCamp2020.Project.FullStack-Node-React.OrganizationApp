import UserController from '../Controllers/UserController';
import * as express from 'express';
import idValidation from '../Middlewares/IdValidation'
import { UserType } from '../Models/User';
import { HasRole } from '../Middlewares/HasRole';

export default function UserRoutes(c: UserController) {
    return (router: express.Router) => {
        router.get('/users/:id', HasRole([UserType.Admin]), idValidation, c.getUser);
        router.get('/users', HasRole([UserType.Admin]), c.getAllUsers);
        router.post('/users/register', HasRole([UserType.Admin]), c.register);
        router.patch('/users/:id', HasRole([UserType.Admin]), idValidation, c.updateUser);
        router.delete('/users/:id', HasRole([UserType.Admin]), idValidation, c.deleteUser);
        return router;
    }
}