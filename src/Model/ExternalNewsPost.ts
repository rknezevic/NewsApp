import mongoose, { Types } from 'mongoose';
import { newsPostSchema } from './NewsPost';

export interface IExternalNewsPost extends mongoose.Document {
    source: {
        id?: string,
        name: string; 
    }
    title: string;
    description: string;
    content: string;
    urlToImage: string;
    author: string;
    lastEditedBy?: string;
    publishedAt?: Date;
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
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        content: {
            type: String,
        },
        urlToImage: {
            type: String,
        },
        author: {
            type: String,
        },
        lastEditedBy: {
            type: String,
        },
        publishedAt: {
            type: Date,
        },
    }
);
const ExternalNewsPost = mongoose.model<IExternalNewsPost>('ExternalNewsPost', externalNewsPostSchema);
export default ExternalNewsPost;
