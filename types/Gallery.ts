export interface Gallery {
    _id: string;
    userId: string;
    images: Image[];
    videos: Video[];
    createdAt: Date;
}

export interface Image {
    _id: string;
    src: string;
}

export interface Video {
    _id: string;
    type: "video";
    poster?: string;
    sources: [
        {
            src: string;
            type: string;
        }
    ];
}
