import { Request, Response } from "express";
import { UpdatePostService } from "../../services/Post/UpdatePostService";

export class UpdatePostController {
  async handle(request: Request, response: Response) {
    const { title, content } = request.body;
    const { id } = request.params;
    const user_id = request.user_id;

    const updatePostService = new UpdatePostService();

    const post = await updatePostService.execute({
        title,
        content,
        postId: id,
        postUserId: user_id,
        });

    return response.status(200).json(post);
  }
}
