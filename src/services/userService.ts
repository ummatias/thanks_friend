import prisma from '../prisma/client';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export default class UserService {
  public createUser = async (user: User) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
      data: {
        ...user,
        password: hashedPassword
      }
    });
  };

  public getUser = async (id: string) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    return user;
  };

  public getUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
  };

  public updateUser = async (id: string, user: User) => {
    const updated_user = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...user
      }
    });
    return updated_user;
  };

  public deleteUser = async (id: string) => {
    const deleted_user = await prisma.user.delete({
      where: {
        id
      }
    });
    return deleted_user;
  };

  public getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    });
    return user;
  };
}
