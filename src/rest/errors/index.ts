import { ErrorCodes } from '@mockcord/constants';

export class MockcordError {
  code: number;
  status: number;
  message: string;
  body: string;

  constructor(status: number, code?: number) {
    this.code = code || 0;
    this.status = status;
    this.message = ErrorCodes[code || status];
  }
}

export class NotFound extends MockcordError {
  constructor(code?: number) {
    super(404, code);
  }
}

export class Forbidden extends MockcordError {
  constructor(code?: number) {
    super(403, code);
  }
}

export class Unauthorized extends MockcordError {
  constructor(code?: number) {
    super(401, code);
  }
}