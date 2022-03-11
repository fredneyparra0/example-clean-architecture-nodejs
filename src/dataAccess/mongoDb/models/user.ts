import { Schema, model } from 'mongoose';
import { IUser } from '../../../core/interfaces/userInterface';

const schemaUser = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        default: 'user'
    }
});

export const modelUser = model('user', schemaUser);
