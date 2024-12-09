import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "./ProductList";

test("renders ProductList component without crashing", () => {
    render(
        <MemoryRouter>
            <ProductList />
        </MemoryRouter>
    );
});
