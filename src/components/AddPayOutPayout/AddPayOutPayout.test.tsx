import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

// Mock the changePassword function
jest.mock("@/services/auth", () => ({
  changePassword: jest.fn()
}));

// Mock the toast function
jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn()
  }
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn()
}));

// const mockDispatch = jest.fn();
// useDispatch.mockImplementation(() => mockDispatch);

// Setup server for API mocking
const server = setupServer(
  rest.post("/api/change-password", (_eq, res, ctx) => {
    // Mock the API response
    return res(
      ctx.json({
        success: true,
        data: {},
        message: "Password changed successfully."
      })
    );
  })
);

// Enable API mocking before running the tests
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished
afterAll(() => server.close());
