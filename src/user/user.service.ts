import { CreateUser } from "./user.dto";
import UserAlreadyExistsError from "./user.error";
import { UserRepository } from "./user.repository";
import { hash } from "bcrypt";

export const createUserService = (repository: typeof UserRepository) => ({
  async create(data: CreateUser) {
    let user = await repository.findByEmail(data.email);
    if (user.length === 1) {
      throw new UserAlreadyExistsError();
    }
    const hashedPassword = await hash(data.password, 10);
    const newUser = await repository.save({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return newUser;
  },
});
