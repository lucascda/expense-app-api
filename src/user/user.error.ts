export class EmailAlreadyExistsError extends Error {
  statusCode: number;
  constructor(message = "Email already exists") {
    super(message);
    this.statusCode = 409;
    this.name = "EmailAlreadyExistsError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor(message = "Invalid credentials") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}
