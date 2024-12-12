export class MissingJwtToken extends Error {
  statusCode: number;
  constructor(message = "Can't find jwt token in authorization header") {
    super(message);
    this.statusCode = 400;
    this.name = "MissingJwtToken";
  }
}
