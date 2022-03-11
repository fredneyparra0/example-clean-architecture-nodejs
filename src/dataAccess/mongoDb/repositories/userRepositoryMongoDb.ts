import { IUser } from "../../../core/interfaces/userInterface";
import { modelUser } from "../models/user"

export function userRepositoryMongoDb() {
    const find = async (params?: any) => {
        try {
            if(!params) {
                return await modelUser.find({}).select('-password').select('-isDeleted');
            } else {
                return await modelUser.find(params).select('-password').select('-isDeleted');
            }
        } catch (err) {
            throw new Error('internal error');
        }
    }

    const findById = async (id: string) => {
        try {
            return await modelUser.findById(id).select('-password').select('-isDeleted');
        } catch (err) {
            throw new Error('internal error');
        }
    }

    const findByProperty = async (params: any) => {
        try {
            return await modelUser.findOne(params).select('-password').select('-isDeleted');
        } catch (err) {
            throw new Error('internal error')
        }
    }

    const create = async (userEntity: any) => {
        try {
            const newUser = new modelUser({
                name: userEntity.getName(),
                email: userEntity.getEmail(),
                password: userEntity.getPassword(),
                isDeleted: userEntity.getIsDeleted(),
                rol: userEntity.getRol()
            });
            const userSaved = await newUser.save();
            return await modelUser.findById(userSaved._id).select(['-password', '-isDeleted']);
        } catch (err) {
            throw new Error('internal error');
        }
    }

    const deleteOne = async (id: string) => {
        try {
            return await modelUser.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
                .select(['-password', '-isDeleted']);
        } catch (err) {
            throw new Error('internal error');
        }
    }

    const update = async (id: string, data: IUser) => {
        try {
            return await modelUser.findByIdAndUpdate(id, data, { new: true })
                .select(['-password', '-isDeleted']);
        } catch (err) {
            throw new Error('internal error');
        }
    }

    return {
        find,
        findById,
        create,
        deleteOne,
        update,
        findByProperty
    }
}