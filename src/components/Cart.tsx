import { ArrowLeft, Minus } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router";
import { useAppContext } from "../context/AppContext";
import { formatAmount } from "../lib/utils";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";

const Cart = () => {
    const { removeProduct, productsInCart } = useAppContext();
    const total = useMemo(() => productsInCart.reduce((acc, curr) => acc + curr.product.price, 0), [productsInCart]);
    return (
        <Drawer direction="right" >

            <DrawerTrigger asChild>
                <Button className="font-bold rounded-full">
                    <img src='shopping-bag.svg' alt='shopping bag' />
                    <h2>
                        Cart({productsInCart.length})
                    </h2>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-card overflow-scroll">
                <div className="mx-auto w-full max-w-sm ">
                    <DrawerHeader className="flex flex-row items-center">
                        <DrawerClose asChild>
                            <Button variant="ghost"><ArrowLeft /></Button>
                        </DrawerClose>
                        <DrawerTitle>Cart</DrawerTitle>
                    </DrawerHeader>
                    <div className="w-full px-5 space-y-8">
                        {productsInCart.map(({ product }) => (
                            <div key={product.id} className="flex justify-between items-center">
                                <div>
                                    <img src={product.thumbnail} className="size-20" />
                                    <h3 className="text-sm">
                                        {product.title}
                                    </h3>
                                </div>
                                <div className="flex gap-8 items-center">
                                    <h2 className="w-1/3">{formatAmount(product.price)}</h2>
                                    <Button className="w-1/3" variant={"ghost"} onClick={() => removeProduct(product.id)}>
                                        <Minus />
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
                            <NavLink to="/" >
                                <Button className={"w-full"}>Checkout</Button>
                            </NavLink>
                        </DrawerFooter>)}
                </div>
            </DrawerContent>
        </Drawer>



    )
}

export default Cart;