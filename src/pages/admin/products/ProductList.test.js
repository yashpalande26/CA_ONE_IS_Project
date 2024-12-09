import { MemoryRouter } from "react-router-dom";
import ProductList from "./ProductList";
import { render, fireEvent, screen } from "@testing-library/react";

test("search functionality updates the search state", () => {
    render(
        <MemoryRouter>
            <ProductList />
        </MemoryRouter>
    );

    // Find the search input and button
    const searchInput = screen.getByPlaceholderText(/search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Beds' } });
    fireEvent.click(searchButton);

    // Check if the input value is updated correctly (search state updated)
    expect(searchInput.value).toBe('Beds');
});