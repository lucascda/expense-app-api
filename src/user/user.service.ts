import { createJwtService } from "utils/jwt";
import {
  CreateUserRequest,
  CreateUserResponse,
  SignInRequest,
  SignInResponse,
} from "./user.dto";
import { InvalidCredentialsError, EmailAlreadyExistsError } from "./user.error";
import { UserRepository } from "./user.repository";
import { hash, compare } from "bcrypt";

export const createUserService = (
  repository: typeof UserRepository,
  jwtService: ReturnType<typeof createJwtService>
) => ({
  async create(data: CreateUserRequest): Promise<CreateUserResponse> {
    let user = await repository.findByEmail(data.email);

    if (user.length === 1) {
      throw new EmailAlreadyExistsError();
    }
    const hashedPassword = await hash(data.password, 10);
    const newUser = await repository.save({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return {
      id: newUser[0].id,
      name: newUser[0].name,
      email: newUser[0].email,
    };
  },
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    const user = await repository.findByEmail(data.email);

    if (user.length === 0) {
      throw new InvalidCredentialsError();
    }

    const isSamePassword = await compare(data.password, user[0].password);

    if (!isSamePassword) {
      throw new InvalidCredentialsError();
    }
    const token = jwtService.signToken(user[0].id);
    return { token };
  },
  async findById(user_id: string) {
    const user = await repository.findById(user_id);
    if (user.length === 0) {
      throw new Error("User not found");
    }
    return user[0];
  },
});
