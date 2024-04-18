import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserCreate, UserCreated } from "../../models/User";

export class CreateUserService {
  async execute({name,email,password}: UserCreate): Promise<UserCreated> {
    if (!email) {
      throw new Error("Não foi enviado um email válido");
    }

    const userAlreadyExists = await prismaClient.users.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await hash(
      password,
      Number(process.env.HASH_SALT)
    );

    const user = await prismaClient.users.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}
