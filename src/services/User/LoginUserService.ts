import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AuthRequest, Login } from "../../models/User";

export class LoginUserService {
    async execute({email, password} : AuthRequest ): Promise<Login> {
        if(email === "" || password === ""){
            throw new Error("Email ou Senha não foram preenchidos.");
        }

        const user = await prismaClient.users.findFirst({
            where: {
                email: email
            }
        });

        if(!user){
            throw new Error("Email ou Senha incorretos.");
        }

        const passIsMatch = await compare(password, user.password);

        if(!passIsMatch){
            throw new Error("Email ou Senha incorretos.");
        }

        const token = sign({
            email: user.email
        }, process.env.JWT_SECRET, {
            subject: user.id.toString(),
            expiresIn: "1d"
        });

        return {id:user.id, name:user.name, email:user.email, token};
}
}