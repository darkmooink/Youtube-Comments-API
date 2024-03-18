import * as healthService from "../services/health";
import process from "process";
jest.mock("process");

// teardown
afterEach(() => {
  jest.clearAllMocks();
});

describe("getServerStatus", () => {
  test("should return", () => {
    const serverStatus = healthService.getServerStatus();

    expect(serverStatus.uptime).toBeGreaterThan(0.0);
    expect(serverStatus.responseTime).toBeGreaterThan(BigInt(0));
  });
});
