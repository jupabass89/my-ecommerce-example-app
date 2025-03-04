class AppError extends Error {
  public statusCode: number;

  constructor(message?: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode ?? 500;

    // Maintain proper stack trace (only in V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
