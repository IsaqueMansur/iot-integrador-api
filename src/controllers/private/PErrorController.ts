import { HttpError } from "routing-controllers";

export default class ErrorRequest extends HttpError {
  constructor(status: number, message: string) {
    super(status, message);
    Object.setPrototypeOf(this, ErrorRequest.prototype);
  }

  toJSON() {
    return {
      status: this.httpCode,
      message: this.message,
    };
  }

  createFinalError(Error: any) {
    if (Error.httpCode && Error.message) {
      throw new ErrorRequest(Error.httpCode, Error.message);
    }
    throw new ErrorRequest(500, "Falha interna no servidor");
  }
}

export class ErrorController {
  createFinalError(Error: any) {
    if (Error.httpCode && Error.message) {
      throw new ErrorRequest(Error.httpCode, Error.message);
    }
    throw new ErrorRequest(500, "Falha interna no servidor");
  }
}
