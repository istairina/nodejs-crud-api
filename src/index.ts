import { createServer } from "node:http";
import { handler } from "./handler";
import dotenv from "dotenv";

dotenv.config();

const hostname = "127.0.0.1";
const port = process.env.PORT;

export const server = createServer(handler);

server.listen(port, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
