import User, { UserConstructorType } from "../entitites/user.ts";
import { UsersType } from "../models/users.ts";

export default class UserRepository {
  db: UsersType[];
  constructor() {
    this.db = [];
  }

  getUsers() {
    return this.db;
  }

  getUserById(id: string): User | null {
    return this.db.find((user) => user.id === id) || null;
  }

  createUser(data: UserConstructorType) {
    const newUser = new User({
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    });
    this.db.push(newUser);

    return newUser;
  }

  updateUser(id: string, data: UserConstructorType) {
    const userIndex = this.db.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    this.db[userIndex] = {
      id: id,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    return this.db[userIndex];
  }

  deleteUser(id: string) {
    const userIndex = this.db.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    const deletedUser = this.db[userIndex];
    this.db.splice(userIndex, 1);

    return deletedUser;
  }
}
