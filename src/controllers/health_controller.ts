// Nested JSON object to indicate status of each service
// the API relies on.
export type errorJSON = {
  status: string;
  server: {
    status: string;
    details?: string;
  };
  database: {
    status: string;
    details?: string;
  };
  youTube: {
    status: string;
    details?: string;
  };
};

import * as healthService from "../services/health";
jest.mock("../services/health");
