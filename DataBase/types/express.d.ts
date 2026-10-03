import "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        user_name: string;
        email: string;
      };
    }
  }
}
