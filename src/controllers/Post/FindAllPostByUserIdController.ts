import {Request, Response} from "express";
import { FindAllPostByUserIdService } from "../../services/Post/FindAllPostByUserIdService";

export class FindAllPostByUserIdController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params;

        const findAllPostByUserIdService = new FindAllPostByUserIdService();

        const posts = await findAllPostByUserIdService.execute(user_id);

        return res.json(posts);
    }
}