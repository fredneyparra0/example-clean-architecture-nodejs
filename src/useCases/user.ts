import { ErrorRequestHandler } from "express";
import { user } from "../core/entities/user";

export async function addUser({ name, email, password, isDeleted, rol, repository }: any) {
    try {
        if (!name || !password || !email) {
            throw new Error('fields empty');
        }
        const newUser = user(
            name,
            email,
            password,
            isDeleted,
            rol
        );
        const userFind = await repository.findByProperty({ email });
        if(userFind) {
            throw new Error('already registered');
        }
        return await repository.create(newUser);
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function findAll(repository: any, params?: any) {
    try {
        const userFind = await repository.findById(params);
        if(userFind.rol !== 'administrate') {
            throw new Error('not authorized');
        }
        return await repository.findAll();
    } catch (err: any) {
        throw new Error(err.message)
    }

}

export async function findById(repository: any, idUser: string | number, idFind: string | number) {
    try {
        const userFind = await repository.findById(idUser);
        if(userFind.rol !== 'administrate') {
            throw new Error('not authorized');
        }
        return await repository.findById(idFind);
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function deleteOne(repository: any, idFromDelete: string | number, idUser: string | number) {
    try {
        const userSesion = await repository.findById(idUser);
        if(userSesion.rol !== 'administrate') {
            throw new Error('not authorized')
        }
        const UserFromDelete = await repository.findById(idFromDelete);
        if(UserFromDelete.isDeleted === true ) {
            throw new Error('not found');
        }
        const repositoryResult = await repository.deleteOne(idFromDelete); 
        return repositoryResult;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function updateOne(repository: any, id: string | number, data: any) {
    try {
        const userSesion = await repository.findById(id);
        if(userSesion.rol !== 'administrate') {
            throw new Error('not authorized')
        }
        const userUpdated = await repository.update(id, data);
        console.log(userUpdated);
        return userUpdated;
    } catch (err: any) {
        throw new Error(err.message);
    }
}