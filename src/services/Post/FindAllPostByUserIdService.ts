import prismaClient from "../../prisma";

export class FindAllPostByUserIdService {
    async execute(user_id: string) {
        const posts = await prismaClient.posts.findMany({
            where: {
                user_id: user_id
            },
            select: {
                id: true,
                title: true,
                content: true,
                user_id: true,
                created_at: true,
                updated_at: true,
            },orderBy: {
                created_at: "asc"
            }
        });

        return posts;
    }
}