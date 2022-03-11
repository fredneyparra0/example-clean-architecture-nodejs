import { connect } from 'mongoose';

export async function connectDb() {
    try {
        await connect(process.env.URI || 'mongodb://localhost/user');
        console.log('connected to database mongodb');
    } catch (err) {
        console.log('error to connect to database ==> ', err);
    }
}