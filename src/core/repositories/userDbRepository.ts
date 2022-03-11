import { IUser } from "../interfaces/userInterface";

export function userRepository(repository: any) {
    const findAll = (idUser: number | string, params?: any): any =>  repository.find(params, idUser);
    const findById = (id: string | number): IUser => repository.findById(id);
    const create = (data: any): any => repository.create(data);
    const deleteOne = (idUserDelete: string | number, idUser: string | number): IUser => repository.deleteOne(idUserDelete);
    const update = (id: string | number, data: IUser) => repository.update(id, data); 
    const findByProperty = (params: any) => repository.findByProperty(params);

    return {
        findAll,
        findById,
        create,
        deleteOne,
        update,
        findByProperty
    }
}