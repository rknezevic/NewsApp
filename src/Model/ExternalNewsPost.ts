import mongoose, { Types } from 'mongoose';
import { newsPostSchema } from './NewsPost';

export interface IExternalNewsPost extends mongoose.Document {
    source: {
        id?: string,
        name: string; 
    }
    headline: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    createdBy: string;
    lastEditedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const externalNewsPostSchema: mongoose.Schema<IExternalNewsPost> = new mongoose.Schema(
    {
        source: {
            id: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        headline: {
            type: String,
        },
        shortDescription: {
            type: String,
        },
        fullDescription: {
            type: String,
        },
        image: {
            type: String,
        },
        createdBy: {
            type: String,
        },
        lastEditedBy: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
    }
);
const ExternalNewsPost = mongoose.model<IExternalNewsPost>('ExternalNewsPost', externalNewsPostSchema);
export default ExternalNewsPost;
