import test from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";

test("Users tests", async (t) => {
  const testPort = 5005;
  process.env.PORT = String(testPort);
  const { server } = await import("../src");
  const testServerAddress = `http://localhost:${testPort}/users`;

  await t.test("it should create a user", async () => {
    const data = {
      username: "IM",
      age: 88,
      hobbies: ["chess", "reading"],
    };

    const request = await fetch(testServerAddress, {
      method: "POST",
      body: JSON.stringify(data),
    });

    assert.deepStrictEqual(
      request.headers.get("content-type"),
      "application/json"
    );
    assert.strictEqual(request.status, 201);
  });
  await promisify(server.close.bind(server))();
});
