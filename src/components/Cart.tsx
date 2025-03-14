import { ArrowLeft, Minus, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { useAppContext } from "../context/AppContext.tsx";
import { formatAmount } from "../lib/utils";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

const Cart = () => {
    const { removeProduct, productsInCart } = useAppContext();
    const [counts, setCounts] = useState<{ [key: number]: number }>({});

    const total = useMemo(() => productsInCart.reduce((acc, curr) => acc + curr.product.price * (counts[curr.product.id] || 1), 0), [productsInCart, counts]);

    const increment = (productId: number, stock: number) => {
        setCounts(prevCounts => {
            const newCount = (prevCounts[productId] || 1) + 1;
            if (newCount <= stock) {
                return { ...prevCounts, [productId]: newCount };
            }
            return prevCounts;
        });
    };

    const decrement = (productId: number) => {
        setCounts(prevCounts => {
            const newCount = (prevCounts[productId] || 1) - 1;
            if (newCount > 0) {
                return { ...prevCounts, [productId]: newCount };
            }
            return prevCounts;
        });
    };

    return (
        <Drawer direction="right" >

            <DrawerTrigger asChild>
                <Button data-testid="cart-button" className="font-bold rounded-full">
                    <img src='shopping-bag.svg' alt='shopping bag' />
                    <h2>
                        Cart ({productsInCart.length})
                    </h2>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-card overflow-scroll" data-testid="drawer-content">
                <div className="mx-auto w-full max-w-sm " >
                    <DrawerHeader className="flex flex-row items-center">
                        <DrawerClose asChild>
                            <Button variant="ghost"><ArrowLeft /></Button>
                        </DrawerClose>
                        <DrawerTitle>Cart</DrawerTitle>
                    </DrawerHeader>
                    <div className="w-full px-5 space-y-8">
                        {productsInCart.map(({ product }) => (
                            <div key={product.id} className="flex justify-between items-center">
                                <div className="flex flex-col items-start justify-center">
                                    <div className="flex">
                                        <img src={product.thumbnail} className="size-20" />
                                        <div className="flex justify-start items-center">
                                            <Button className="" variant={"ghost"} onClick={() => decrement(product.id)}>
                                                <Minus />
                                            </Button>
                                            <div>
                                                {counts[product.id] || 1}
                                            </div>
                                            <Button className="" variant={"ghost"} onClick={() => increment(product.id,product.stock)}>
                                                <Plus />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="text-sm truncate max-w-1/2">
                                        {product.title}
                                    </h3>
                                </div>
                                <div className="flex gap-8 items-center">
                                    <h2 className="w-1/3">{formatAmount(product.price * (counts[product.id] || 1))}</h2>
                                    <Button className="w-1/3" variant={"ghost"} onClick={() => removeProduct(product.id)}>
                                        <X color="red"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {productsInCart.length > 0 ? (
                            <div className="flex justify-between items-center mt-3 mb-6">
                                <h1>Total</h1>
                                <div className="w-1/2 text-center">
                                    <hr />
                                    <h2>{formatAmount(total)}</h2>

                                </div>


                            </div>
                        ) : (<h1 className="text-center">Add items to Cart</h1>)}
                    </div>
                    {productsInCart.length > 0 && (
                        <DrawerFooter>
                            <NavLink to="/checkout" >
                                <Button className={"w-full"}>Checkout</Button>
                            </NavLink>
                        </DrawerFooter>)}
                </div>
            </DrawerContent>
        </Drawer>



    )
}

export default Cart;