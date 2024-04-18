import prismaClient from "../../prisma";


export class FindOnePostByUserIdPostIdService {
    async execute(user_id: string, id: string) {
        const post = await prismaClient.posts.findFirst({
            where: {
                user_id: user_id,
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                user_id: true,
                created_at: true,
                updated_at: true,
            }
        });

        return post;
    }
}