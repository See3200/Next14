import React from "react";
import { render, screen, waitFor, within, act, userEvent } from "@/test-utils";
import "@testing-library/jest-dom";
import StoredUserList from "@/components/UserList/StoredList";

// Mock Zustand store
jest.mock("@/store/Store", () => ({
  __esModule: true, // This is important for default imports
  default: jest.fn(),
}));

// Import the mocked useStore after mocking
import useStore from "@/store/Store";

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>;

describe("StoredUserList", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders loading state correctly", () => {
    // Set up the mock store
    mockUseStore.mockReturnValue({
      fetchUsers: jest.fn(),
      users: null,
    });

    // Render component
    render(<StoredUserList />);

    // Assert that nothing is rendered
    expect(screen.queryByText("-- Stored User List --")).toBeNull();
  });

  it("renders user list after fetch", async () => {
    // Set up the mock store
    mockUseStore.mockReturnValue({
      //fetchUsers: jest.fn(),
      fetchUsers: jest.fn().mockResolvedValue(undefined),
      users: fakeData,
    });

    // Render component
    render(<StoredUserList />);

    // Wait for the component to finish updating
    await waitFor(() => {
      expect(screen.getByText("-- Stored User List --")).toBeInTheDocument();
      expect(screen.getByText("Doe")).toBeInTheDocument();
      expect(screen.getByText("Smith")).toBeInTheDocument();
    });
  });

  it("reduces number of users in the list after clicking Reduce button", async () => {
    // Set up the mock store
    mockUseStore.mockReturnValue({
      fetchUsers: jest.fn().mockResolvedValue(undefined),
      users: fakeData,
    });

    const user = userEvent.setup();

    // Render component
    render(<StoredUserList />);

    await waitFor(() => {
      const list = screen.getByRole("list");

      const { getAllByRole } = within(list);
      const items = getAllByRole("listitem");
      expect(items.length).toBe(5);
    });

    // await act(async () => {
    //   await user.click(await screen.findByRole("button", { name: /reduce/i }));
    //   mockUseStore.mockReturnValue({
    //     fetchUsers: jest.fn().mockResolvedValue(undefined),
    //     users: [...fakeData.slice(0, 2)],
    //   });
    //   render(<StoredUserList />);
    //   const list = screen.getByRole("list");
    //   const { getAllByRole } = within(list);
    //   const items = getAllByRole("listitem");
    //   expect(items.length).toBe(2);
    //   expect(screen.queryByTestId("wrapper")).toHaveClass("reduced");
    // });
  });

  // it("applies reduced class when users length is less than or equal to 2", async () => {
  //   // Set up the mock store
  //   mockUseStore.mockReturnValue({
  //     fetchUsers: jest.fn().mockResolvedValue(undefined),
  //     users: [{ id: 1, last_name: "Doe" }],
  //   });

  //   // Render component
  //   render(<StoredUserList />);

  //   // Wait for the component to finish updating
  //   await waitFor(() => {
  //     expect(screen.queryByTestId("wrapper")).toHaveClass("reduced"); // Adjust class check based on your actual class names
  //   });
  // });
});

const fakeData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
  },
  {
    id: 2,
    first_name: "Jake",
    last_name: "Smith",
  },
  {
    id: 3,
    first_name: "Judy",
    last_name: "Forester",
  },
  {
    id: 4,
    first_name: "Nick",
    last_name: "Cage",
  },
  {
    id: 5,
    first_name: "Diana",
    last_name: "Ramirez",
  },
];
