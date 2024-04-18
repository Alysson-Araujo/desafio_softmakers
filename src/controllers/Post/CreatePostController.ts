import {Request, Response} from 'express';
import { CreatePostService } from '../../services/Post/CreatePostService';

export class CreatePostController {
  async handle(request: Request, response: Response) {
    const { title, content } = request.body;
    const user_id = request.user_id;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({ title, content, user_id });

    return response.status(201).json(post);
  }
}