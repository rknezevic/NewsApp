import cors from 'cors';
import { Application } from 'express';


export const useCors = (app : Application) => {
    app.use(cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true 
    }));
}