import { Router } from 'express';
import { userRepository } from '../../core/repositories/userDbRepository';
import { userRepositoryMongoDb } from '../../dataAccess/mongoDb/repositories/userRepositoryMongoDb';
import { userController } from '../controllers/userController';

export const router = Router();

const controllerUser = userController(
    userRepository,
    userRepositoryMongoDb
);

router.post('/user', controllerUser.addNewUser);

router.get('/users/:id', controllerUser.findAllUsers);

router.delete('/user/:id', controllerUser.deleteUser);

router.get('/user/:id', controllerUser.findUserById);

router.put('/user/:id', controllerUser.updateUser);