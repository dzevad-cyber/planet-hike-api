export default class AppError extends Error {
  public status: 'fail' | 'error';
  readonly isOperational: boolean;
  constructor(public message: string, public statusCode: number) {
    super(message);

    this.statusCode = statusCode ?? 500;
    this.status =
      this.statusCode >= 400 && this.statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
