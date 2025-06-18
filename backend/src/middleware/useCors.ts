import cors from 'cors';
import { Application } from 'express';


export const useCors = (app : Application) => {
    app.use(cors({
        origin: 'http://192.168.100.66:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true 
    }));
}