import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { GreetForm } from "./greet-form";

describe("GreetForm", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ message: "Hello, Ann!" }),
    }) as jest.Mock;
  });

  it("submits the entered name and displays the response", async () => {
    render(<GreetForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Ann" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Greet" }));

    expect(global.fetch).toHaveBeenCalledWith("/api/greet?name=Ann");
    await waitFor(() => {
      expect(screen.getByText("Hello, Ann!")).toBeInTheDocument();
    });
  });
});
