const request = require("supertest");

const server = require("../api/server");

describe("Register", () => {
  it.skip("succeeds with new non-empty username and password", async () => {
    const response = await post("/api/auth/register", {
      username: "tparris",
      password: "student"
    });
    expect(response.body.message).toBe("User created");
    expect(response.body.token).toBeTruthy();
  });

  it("fails with existing username ", async () => {
    const response = await post("/api/auth/register", {
      username: "tparris",
      password: "student"
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("The user is already existed");
  });
});

describe("Login", () => {
  it("succeeds with the correct username and password", async () => {
    const response = await post("/api/auth/login", {
      username: "tparris",
      password: "student"
    });
    expect(response.body.token).toBeTruthy();
  });

  it("fails with the incorrect username and/or password", async () => {
    const response = await post("/api/auth/login", {
      username: "tparris",
      password: "studen"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Invalid username and password combination."
    );
  });
});

describe("Restricted routes", () => {
  it("succeeds with a valid token", async () => {
    const login = await post("/api/auth/login", {
      username: "spongebobv",
      password: "student"
    });

    const token = login.body.token;

    const response = await get("/api/jokes", token);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("fails with a invalid token", async () => {
    const response = await get("/api/jokes", "randomtoken");
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ you: "shall not pass!" });
  });
});

const get = (url, token) => {
  const httpRequest = request(server).get(url);
  httpRequest.set("Accept", "application/json");
  httpRequest.set("Authorization", `Bearer ${token}`);

  return httpRequest;
};

const post = (url, body) => {
  const httpRequest = request(server).post(url);
  httpRequest.send(body);
  httpRequest.set("Accept", "application/json");

  return httpRequest;
};
