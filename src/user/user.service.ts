import { CreateUser } from "./user.dto";
import { UserRepository } from "./user.repository";
import { hash } from "bcrypt";

export const createUserService = (repository: typeof UserRepository) => ({
  async create(data: CreateUser) {
    let user = await repository.findByEmail(data.email);
    if (user.length === 1) {
      console.log("user exists", user);
      throw new Error("User already exists");
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
