import {Request, Response} from "express";
import { FindOnePostByUserIdPostIdService } from "../../services/Post/FindOnePostByUserIdPostIdService";

export class FindOnePostByUserIdPostIdController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const user_id  = req.user_id;

        const findOnePostByUserIdPostIdService = new FindOnePostByUserIdPostIdService();

        const post = await findOnePostByUserIdPostIdService.execute(user_id, id);

        return res.json(post);
    }
}
