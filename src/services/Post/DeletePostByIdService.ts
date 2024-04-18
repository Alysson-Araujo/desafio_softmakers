import prismaClient from "../../prisma";

export class DeletePostByIdService {
    async execute(id: string, user_id: string) {
        const post = await prismaClient.posts.findFirst({
            where: {
                id: id,
                user_id: user_id
            }
        });

        if(!post){
            throw new Error("Post not found");
        }

        await prismaClient.posts.delete({
            where: {
                id: id
            }
        });

        return post;
    }
}