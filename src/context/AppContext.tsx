import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { IProduct } from "../lib/types";
import { toast } from "sonner";



interface IContext {
    addProduct: (value: { product: IProduct; }) => void;
    removeProduct: (id: number) => void;
    products: Array<IProduct>;
    productsInCart: Array<{ product: IProduct }>;
    currentPage: number;
    setCurrentPage: React.Dispatch<number>;
    maxPage: number;
}

const AppContext = createContext<IContext>({
    addProduct: (): void => { },
    removeProduct: (): void => { },
    products: [],
    productsInCart: [],
    currentPage: 1,
    setCurrentPage: (): void => { },
    maxPage: 1

});

const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [productsInCart, setProductsInCart] = useState<Array<{ product: IProduct }>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1)

    const fetchProducts = useCallback(async () => {
        const limit = 10;
        const skip = currentPage * limit;
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

            if (response.ok) {
                const data = await response.json();
                const total = data.total;
                setMaxPage(Math.round(total / limit));
                setProducts(data.products);

            }
            
            
        } catch (e: unknown) {
            toast.error("Oooops something went wrong");
            console.error(e)
        }
        return;
    }, [currentPage]);

    const addProduct = ({ product }: { product: IProduct }) => {

        const newProduct = { product };
        setProductsInCart([...productsInCart, newProduct]);
        return;
    };

    const removeProduct = (id: number) => {
        const filtered = productsInCart.filter(({ product }) => product.id !== id);
        setProductsInCart(filtered)
        return;
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])



    return (
        <AppContext.Provider value={{
            addProduct,
            removeProduct,
            productsInCart,
            products,
            currentPage,
            setCurrentPage,
            maxPage,
        }}>
            {children}
        </AppContext.Provider>
    )
}


export { AppProvider, AppContext, useAppContext }