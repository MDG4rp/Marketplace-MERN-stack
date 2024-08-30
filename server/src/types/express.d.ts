import { UserDocument } from "./UserDocument"; // Assicurati che il percorso sia corretto

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        role: string;
      };
    }
  }
}