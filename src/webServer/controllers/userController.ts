import { Request, Response } from "express"
import { manageHandelError } from "../../application/utils/handelErrorManagment";
import { addUser, findAll, deleteOne, findById, updateOne } from "../../useCases/user"

export function userController(
    userDbRepository: any,
    userDbRepositoryImpl: any
) {
    const dbRepository = userDbRepository(userDbRepositoryImpl());
    const findAllUsers = async (req: Request, res: Response) => {
        try {
            const userFind = await findAll(dbRepository, req.params.id);
            res.send({ data: userFind })
        } catch (err: any) {
            const errorHandel = manageHandelError(err.message);
            res.status(301).json(errorHandel);
        }
    }
    
    const addNewUser = async (req: Request, res: Response) => {
        try {
            const { name , email, password, rol } = req.body;
            const newUserCreated = await addUser({
                name,
                email,
                password, 
                isDeleted: false,
                rol,
                repository: dbRepository
            });
            res.send({ data: newUserCreated });
        } catch (err: any) {
            const errorHandel = manageHandelError(err.message);
            res.status(301).json(errorHandel)
        }
    }

    const deleteUser = async (req: Request, res: Response) => {
        try {
            const idUserDelete:any = req.query.idUserDelete;
            console.log(idUserDelete);
            const userDeleted = await deleteOne(dbRepository, idUserDelete, req.params.id);
            res.json({ data: userDeleted });
        } catch (err: any) {
            const errorHandel = manageHandelError(err.message);
            res.status(301).json(errorHandel);
        }
    }

    const findUserById = async (req: Request, res: Response) => {
        try {
            const idUserFind: any = req.query.idUserFind;
            const userFind = await findById(dbRepository, req.params.id, idUserFind);
            res.json({ data: userFind });
        } catch (err: any) {
            const errorHandel = manageHandelError(err.message);
            res.status(301).json(errorHandel);
        }
    }

    const updateUser = async (req: Request, res: Response) => {
        try {
            const userUpdate = await updateOne(dbRepository, req.params.id, req.body);
            res.json({ data: userUpdate });
        } catch (err: any) {
            console.log(err.message);
            const errorHandel = manageHandelError(err.message);
            res.status(301).json(errorHandel);
        }
    }

    return {
        findAllUsers,
        addNewUser,
        deleteUser,
        updateUser,
        findUserById
    }
}