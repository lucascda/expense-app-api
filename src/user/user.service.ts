import { createJwtService } from "utils/jwt";
import { CreateUser, SignInUser } from "./user.dto";
import { UserAlreadyExistsError, InvalidCredentialsError } from "./user.error";
import { UserRepository } from "./user.repository";
import { hash, compare } from "bcrypt";

export const createUserService = (
  repository: typeof UserRepository,
  jwtService: ReturnType<typeof createJwtService>
) => ({
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
  async signIn(data: SignInUser) {
    const user = await repository.findByEmail(data.email);

    if (user.length === 0) {
      throw new InvalidCredentialsError();
    }

    const isSamePassword = await compare(data.password, user[0].password);

    if (!isSamePassword) {
      throw new InvalidCredentialsError();
    }
    const token = jwtService.signToken(user[0].id);
    return token;
  },
});
