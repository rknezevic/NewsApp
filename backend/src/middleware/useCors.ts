import cors from 'cors';
import { Application } from 'express';


export const useCors = (app : Application) => {
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true 
    }));
}