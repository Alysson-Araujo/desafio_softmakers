import { PostCreate, PostCreated } from "../../models/Post";
import prismaClient from "../../prisma";

export class CreatePostService {
  async execute({ title, content, user_id }: PostCreate): Promise<PostCreated> {
    if (!title || !content) {
      throw new Error("Title or Content is empty");
    }

    const user = await prismaClient.users.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    
    const post = await prismaClient.posts.create({
      data: {
        title,
        content,
        user_id,
      },
      select:{
        id: true,
        title: true,
        content: true,
        user_id: true,
      }
    });

    return post;
  }
}
