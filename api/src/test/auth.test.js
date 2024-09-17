import { describe, expect, test } from "vitest";
import app from "../..";

const userEmail = "test" + Math.random() * 100 * Math.random() + "@user.com";

describe("Testing POST => /register endpoint", () => {
  test("Successful creation", async () => {
    const res = await app.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test user",
        email: userEmail,
        password: "testpassword",
      }),
    });
    expect(res.status).toBe(201);
    let { message, error, data: user } = await res.json();
    expect(message).toEqual("User created!");
    expect(error).toBeFalsy();
    expect(user.name).toEqual("Test user");
    expect(user.email).toEqual(userEmail);
  });

  test("Fail creation (Missing field)", async () => {
    const res = await app.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test user",
        email: "test@user.com",
      }),
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: "An error occured",
      error: true,
    });
  });

  test("Fail creation (Invalid type)", async () => {
    const res = await app.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "Test user",
        email: "test",
        password: "azerty",
      }),
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: "An error occured",
      error: true,
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

describe("Testing POST => /login endpoint", () => {
  test("Successful login", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: "testpassword",
      }),
    });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.error).toEqual(false);
    expect(json.data).toBeTypeOf("string");
  });

  test("Fail login (Missing field)", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      message: "An error occured",
      error: true,
    });
  });

  test("Fail login (Invalid password)", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: "testpa",
      }),
    });
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      message: "Invalid username or password",
      error: true,
    });
  });

  test("Fail login (Invalid email)", async () => {
    const res = await app.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "false@false.com",
        password: "testpassword",
      }),
    });
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({
      message: "Invalid username or password",
      error: true,
    });
  });
});
