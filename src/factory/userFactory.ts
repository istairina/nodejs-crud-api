import UserRepository from "../repositories/userRepository";
import UserService from "../services/userService";

export const generateInstance = () => {
  const userRepository = new UserRepository();

  const userService = new UserService(userRepository);

  return userService;
};
