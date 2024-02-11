import { server } from "../src";
import { describe, expect } from "@jest/globals";
import { UsersType } from "../src/models/users";

describe("Users endpoints", () => {
  const testPort = 5005;
  const testServerAddress = `http://localhost:${testPort}/api/users`;

  beforeAll(() => {
    server.close();

    process.env.PORT = String(testPort);

    server.listen(testPort);
  });

  afterAll((done) => {
    server.close();
    done();
  });

  test("it should create a user", async () => {
    const data = {
      username: "IM",
      age: 88,
      hobbies: ["chess", "reading"],
    };

    const mistakenData = {
      username: "IM",
      hobbies: ["chess", "reading"],
    };

    const response = await fetch(testServerAddress, {
      method: "POST",
      body: JSON.stringify(data),
    });

    expect(response.status).toBe(201);

    const mistakenResponse = await fetch(testServerAddress, {
      method: "POST",
      body: JSON.stringify(mistakenData),
    });

    expect(mistakenResponse.status).toBe(400);
  });

  test("it should get users", async () => {
    const response = await fetch(testServerAddress, {
      method: "GET",
    });

    const responseData = (await response.json()) as { results: UsersType[] };

    expect(responseData.results.length).toBeGreaterThan(0);
  });
});
