import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { Toaster } from "sonner";
import { afterEach, describe, expect, it, vi } from "vitest";
import Checkout from "../../pages/Checkout";

describe("Checkout Component", () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    const customRender = (ui: React.ReactElement) => {
        return render(
            <MemoryRouter>
                {ui}
                <Toaster />
            </MemoryRouter>
        );
    };

    it("renders form fields correctly", () => {
        customRender(<Checkout />);


        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Cash/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Paystack/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/FlutterWave/i)).toBeInTheDocument();
    });

    it("submits the form and shows success toast", async () => {
        customRender(<Checkout />);


        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: "123 Main St" } });
        fireEvent.click(screen.getByLabelText(/Paystack/i));

        fireEvent.click(screen.getByRole("button", { name: /Proceed/i }));

        await waitFor(() => {
            expect(screen.getByText(/Payment successful/i)).toBeInTheDocument();
            expect(screen.getByText(/Your order has been created./i)).toBeInTheDocument();
        });

        expect(screen.getByLabelText(/First Name/i)).toHaveValue("");
        expect(screen.getByLabelText(/Last Name/i)).toHaveValue("");
        expect(screen.getByLabelText(/Email/i)).toHaveValue("");
        expect(screen.getByLabelText(/Address/i)).toHaveValue("");
        expect(screen.getByLabelText(/Paystack/i)).toBeChecked();
    });

    it("shows validation messages for empty fields", async () => {
        customRender(<Checkout />);

        fireEvent.click(screen.getByRole("button", { name: /Proceed/i }));

        await waitFor(() => {
            expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Enter full address/i)).toBeInTheDocument();
        });
    });

    it("shows validation messages for invalid email", async () => {
        customRender(<Checkout />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: "Doe" } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "invalid-email" } });
        fireEvent.change(screen.getByLabelText(/Address/i), { target: { value: "123 Main St" } });
        fireEvent.click(screen.getByLabelText(/Paystack/i));

        fireEvent.click(screen.getByRole("button", { name: /Proceed/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
        });
    });

    });