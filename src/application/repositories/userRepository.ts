import { User } from "@/entities/models/user";

export interface UserRepository {
  getUser: (id: string) => Promise<User>;
}
