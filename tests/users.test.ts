import { server } from "../src";
import { describe, expect } from "@jest/globals";
import { UsersType } from "../src/models/users";
import { randomUUID } from "node:crypto";

describe("Users endpoints", () => {
  const testPort = 5005;
  const testServerAddress = `http://localhost:${testPort}/api/users`;

  let userId = "";

  const data = {
    username: "IM",
    age: 88,
    hobbies: ["chess", "reading"],
  };

  const mistakenData = {
    username: "IM",
    hobbies: ["chess", "reading"],
  };

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
    const response = await fetch(testServerAddress, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = await response.text();
    const regex =
      /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;
    const matchResult = responseData.match(regex);
    userId = matchResult ? matchResult[0] : "";

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

  test("it should get a user by id", async () => {
    const response = await fetch(`${testServerAddress}/${userId}`, {
      method: "GET",
    });

    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData.result).toEqual({ ...data, id: userId });

    const responseWithFakeId = await fetch(`${testServerAddress}/fake-id`, {
      method: "GET",
    });

    expect(responseWithFakeId.status).toBe(400);

    const newId = randomUUID();

    const responseWithNewId = await fetch(`${testServerAddress}/${newId}`, {
      method: "GET",
    });

    expect(responseWithNewId.status).toBe(404);
  });
});
