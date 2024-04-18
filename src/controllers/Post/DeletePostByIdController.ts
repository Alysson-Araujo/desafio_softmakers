import {Request, Response} from "express";
import { DeletePostByIdService } from "../../services/Post/DeletePostByIdService";

export class DeletePostByIdController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const user_id  = req.user_id;

        const deletePostByIdService = new DeletePostByIdService();

        const post = await deletePostByIdService.execute(id, user_id);

        return res.json(post);
    }
}
