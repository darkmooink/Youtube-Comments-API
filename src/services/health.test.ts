import * as healthService from "../services/health";
import { app } from "../app";
import request from "supertest";

describe("GET /api/v1/health endpoint - getHealth()", () => {
  test("should return code 200, status: Ok if all services are healthy", () => {});
  test("should return code 503, status: Error if any services are not healthy", async () => {
    // Arrange
    // Act
    const res = await request(app).get("/api/v1/health");
    // Assert
    expect(res.statusCode).toEqual(503);
  });
});
