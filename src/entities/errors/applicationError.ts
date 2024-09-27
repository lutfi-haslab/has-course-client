export const createApplicationError = (message: string): Error => {
    const error = new Error(message);
    error.name = 'ApplicationError';
    return error;
  };