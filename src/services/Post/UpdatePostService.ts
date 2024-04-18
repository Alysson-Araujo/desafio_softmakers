import prismaClient from "../../prisma";
import { PostUpdate, PostUpdated } from "../../models/Post";

export class UpdatePostService {
  async execute({ title, content, postId, postUserId }: PostUpdate): Promise<PostUpdated> {
    if (!title && !content) {
      throw new Error("Title and Content are empty");
    }

    const post = await prismaClient.posts.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const updatedPost = await prismaClient.posts.update({
      where: {
        id: postId,
        user_id: postUserId,
      },
      data: {
        title,
        content,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return updatedPost;
  }
}