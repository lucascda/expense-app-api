export class EmailAlreadyExistsError extends Error {
  statusCode: number;
  constructor(message = "Email already exists") {
    super(message);
    this.statusCode = 409;
    this.name = "EmailAlreadyExistsError";
  }
}

export class InvalidCredentialsError extends Error {
  statusCode: number;
  constructor(message = "Invalid credentials") {
    super(message);
    this.statusCode = 401;
    this.name = "InvalidCredentialsError";
  }
}
