const { QueryClient, QueryClientProvider } = require("react-query");
const { render } = require("@testing-library/react");

require("dotenv").config();

const queryClient = new QueryClient();

// Add the QueryClientProvider wrapper to the render function
const customRender = (ui, options) =>
  render(ui, { wrapper: QueryClientProvider, ...options });

// Make the customRender function available globally
global.render = customRender;

// Set up a global teardown function to clean up the QueryClient after all tests
// eslint-disable-next-line no-undef
afterAll(() => {
  queryClient.clear();
  queryClient.removeQueries();
});
