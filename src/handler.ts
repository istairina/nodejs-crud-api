import { IncomingMessage, ServerResponse } from "node:http";
import { parse } from "node:url";
import { DEFAULT_HEADER } from "./util/util.ts";
import { routes } from "./routes/usersRoutes.ts";
import { generateInstance } from "./factory/userFactory.ts";
import UserService from "./services/userService.ts";

export type handlerProps = {
  request?: IncomingMessage;
  response: ServerResponse<IncomingMessage>;
};

type allRoutesTypes = {
  [key: string]: ({ request, response }: handlerProps) => void;
};
const userService: UserService = generateInstance();

const userRoutes = routes({ userService });

const allRoutes: allRoutesTypes = {
  ...userRoutes,
  default: ({ response }: handlerProps) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.write("Unknown request. Please try another one");
    response.end();
  },
};

export const handler: (
  arg0: IncomingMessage,
  arg1: ServerResponse
) => Promise<void> = (request, response) => {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  const uuid = pathname.replace("/api/users", "");
  const key = `${
    uuid ? "/api/users/{uuid}" : pathname
  }:${method.toLowerCase()}`;
  const chosen = allRoutes[key] || allRoutes.default;
  return Promise.resolve(chosen({ request, response })).catch(
    handlerError(response)
  );
};

const handlerError = (response: ServerResponse) => {
  return (error: Error) => {
    console.log("Here's some errors", error.stack);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        error: "Server error!",
      })
    );
  };
};
