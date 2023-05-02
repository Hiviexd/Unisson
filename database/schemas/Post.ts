import { Schema } from "mongoose";

export interface IPost {
    _id: string;
    title: string;
    description: string;
    //type: "photographeur" | "salle" | "traiteur" | "band" ;
    type: string;
    posterId: string;
    posterUsername: string;
    buyers: string[];
    collaborators: [
        {
            providerId: string;
            providerUsername: string;
            providerEmail: string;
        }
    ];
    createdAt: Date;
    archived: Boolean;
}

export default new Schema({
    _id: String,
    title: String,
    description: String,
    type: {
        type: String,
        //enum: ["photographeur", "salle", "traiteur", "band"],
    },
    posterId: String,
    posterUsername: String,
    buyers: [String],
    collaborators: [
        {
            providerId: String,
            providerUsername: String,
        },
    ],
    createdAt: Date,
    archived: {
        type: Boolean,
        default: false,
    },
});
