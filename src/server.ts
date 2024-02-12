import { createServer, IncomingMessage, ServerResponse } from "http";
import { handler } from "./handler";

const server = createServer((req: IncomingMessage, res: ServerResponse) =>
  handler(req, res)
);

export { server };
