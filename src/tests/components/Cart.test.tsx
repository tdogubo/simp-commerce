import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it } from "vitest";
import Cart from "../../components/Cart";
import { AppContext, AppProvider } from "../../context/AppContext";
import { IProduct } from "../../lib/types";


describe("Cart Component", () => {
    afterEach(cleanup)
    const mockProductsInCart: { product: IProduct }[] = [
        {
            product: {
                id: 1,
                title: "Product 1",
                description: "Description 1",
                category: "Category 1",
                price: 900,
                rating: 4.5,
                stock: 10,
                tags: ["tag1", "tag2"],
                brand: "Brand 1",
                availabilityStatus: "In Stock",
                minimumOrderQuantity: 1,
                images: ["image1.jpg"],
                thumbnail: "thumbnail1.jpg",
            },
        },
        {
            product: {
                id: 2,
                title: "Product 2",
                description: "Description 2",
                category: "Category 2",
                price: 200,
                rating: 4.0,
                stock: 20,
                tags: ["tag3", "tag4"],
                brand: "Brand 2",
                availabilityStatus: "In Stock",
                minimumOrderQuantity: 1,
                images: ["image2.jpg"],
                thumbnail: "thumbnail2.jpg",
            },
        },
    ];
    const customRender = (ui: React.ReactElement) => {
        return render(
            <MemoryRouter>

                <AppProvider>
                    <AppContext.Provider value={{
                        addProduct: () => { },
                        removeProduct: () => { },
                        products: [],
                        productsInCart: mockProductsInCart,
                        currentPage: 1,
                        setCurrentPage: () => { },
                        maxPage: 1,
                    }}>
                        {ui}
                    </AppContext.Provider>
                </AppProvider>
            </MemoryRouter>
        );
    };

    it("renders a the text Cart", async () => {
        const component = customRender(
            <Cart />
        );
        const button = screen.getByTestId("cart-button");
        expect(button).toBe(component.getByTestId("cart-button"));

        await userEvent.click(button);
        const content = screen.queryByTestId("drawer-content");
        expect(content).toBeVisible();


    });
    it("displays items in the cart", async () => {
        customRender(
            <Cart />
        );

        const button = screen.getByTestId("cart-button");
        await userEvent.click(button);

        mockProductsInCart.forEach(({ product }) => {
            expect(screen.getByText(product.title)).toBeInTheDocument();
            expect(screen.getByText("Total")).toBeVisible();
        });
    });

})