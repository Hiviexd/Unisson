import { Request, Response } from "express";
import { existsSync } from "fs";
import path from "path";

export default async (req: Request, res: Response) => {
    if (
        !existsSync(
            path.resolve(
                `./uploads/galleries/${req.params.galleryId}/videos/thumb/${req.params.filename}`
            )
        )
    )
        return res.status(404).send({
            status: 404,
            message: "Video thumbnail not found!",
        });

    return res
        .status(200)
        .sendFile(
            path.resolve(
                `./uploads/galleries/${req.params.galleryId}/videos/thumb/${req.params.filename}`
            )
        );
};
