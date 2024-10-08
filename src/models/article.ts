import * as mongodb from "mongodb";

export interface Article {
    title: string;
    creator: string;
    content: string;
    link: string;
    pubDate: Date;
    feedId: mongodb.ObjectId;
    _id?: mongodb.ObjectId;
}