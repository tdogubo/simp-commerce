import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import Card from "../../components/Card";
import { AppContext, AppProvider } from "../../context/AppContext";
import { IContext, IProduct } from "../../lib/types";
import { formatAmount } from "../../lib/utils";

global.IntersectionObserver = class {
    root = null;
    rootMargin = '';
    thresholds = [];
    constructor() { }
    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() { return []; }
};

describe("Card Component", () => {
    afterEach(() => {
        cleanup();
    });

    const mockProduct: IProduct = {
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
    }

    const customRender = (ui: React.ReactElement, { providerProps }: { providerProps: IContext }) => {
        return render(
            <MemoryRouter>
                <AppProvider>
                    <AppContext.Provider value={providerProps}>
                        {ui}
                    </AppContext.Provider>
                </AppProvider>
            </MemoryRouter>,
        );
    };

    it("renders product details correctly", () => {
        const providerProps = {
            addProduct: vi.fn(),
            removeProduct: vi.fn(),
            products: [],
            productsInCart: [] as { product: IProduct }[],
            currentPage: 1,
            setCurrentPage: vi.fn(),
            maxPage: 1,
        };

        customRender(<Card product={mockProduct} />, { providerProps });

        const card = screen.getByTestId("card");
        const amount = screen.getByTestId("product-price");
        const addToCartBtn = screen.getByTestId("add-btn");
        


        expect(card.textContent).includes(mockProduct.title);
        expect(card.textContent).includes(mockProduct.brand);
        expect(card.textContent).includes(mockProduct.description);
        expect(card.textContent).includes(mockProduct.price);
        expect(amount.textContent).toBe(formatAmount(mockProduct.price));
        expect(addToCartBtn).toBeInTheDocument();

    });

    it("adds and removes product from cart", async() => {
        const providerProps = {
            addProduct: vi.fn(),
            removeProduct: vi.fn(),
            products: [],
            productsInCart: [] as { product: IProduct }[],
            currentPage: 1,
            setCurrentPage: vi.fn(),
            maxPage: 1,
        };
        customRender(<Card product={mockProduct} />, { providerProps });

        const addToCartBtn = screen.getByTestId("add-btn");

        expect(addToCartBtn).toBeInTheDocument();
        expect(addToCartBtn.textContent).include("ADD TO CART");

        await userEvent.click(addToCartBtn);


        expect(providerProps.addProduct).toHaveBeenCalledWith({ product: mockProduct });

        providerProps.productsInCart = [{ product: mockProduct }];
        customRender(<Card product={mockProduct} />, { providerProps });
        
        const removeFromCartBtn = await screen.findByText("REMOVE");
        expect(removeFromCartBtn).toBeInTheDocument();

        await userEvent.click(removeFromCartBtn);

        expect(providerProps.removeProduct).toHaveBeenCalledWith(mockProduct.id);

    });

});