import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "../src/pages/Profile";

test("renders Profile with select and toast", () => {
  render(<Profile />);
  const select = screen.getByTestId("privacy-select");
  expect(select).toBeInTheDocument();
  const button = screen.getByRole("button", { name: /save/i });
  fireEvent.click(button);
  expect(screen.getByText("Profile saved")).toBeInTheDocument();
});
