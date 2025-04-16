import { Response } from 'express';

export const okResponse = (res: Response, message: string, data?: any) =>{
    return res.status(200).json({
        status: 'success',
        message,
        ...(data && {data}),
    });
};