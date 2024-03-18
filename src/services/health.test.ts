import * as healthService from "../services/health";

describe("getServerStatus", () => {
  test("should return values greater than zero if server is running", () => {
      // Act
      const serverStatus = healthService.getServerStatus()
      // Assert
      expect(serverStatus.uptime).toBeGreaterThan(0.0)
  });

});
