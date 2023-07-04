import { IncomingMessage } from "node:http";

export const getId = (address: string, request: IncomingMessage): string => {
  return request.url.toLowerCase().replace("/api/users/", "");
};
