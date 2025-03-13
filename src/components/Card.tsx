
import { Minus, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";
import ReactStars from "react-star-rating-component";
import { useAppContext } from "../context/AppContext";
import { IProduct } from "../lib/types";
import { formatAmount } from "../lib/utils";
import { Swiper } from "./Swiper";
import { Button } from "./ui/button";



const Card = ({ product }: { product: IProduct }) => {
  const { addProduct, removeProduct, productsInCart } = useAppContext();

  const found = useMemo(() => (productsInCart.some((v) => v.product.id === product.id)), [productsInCart, product]);
  const handleAddToCart = useCallback(() => {
    if (found) removeProduct(product.id);
    else { addProduct({ product }) }
  }, [found, addProduct, removeProduct, product])

  const amount = formatAmount(product.price);


  return (
    <div className="flex flex-col shadow-sm h-[600px] w-[20rem] pt-3 px-3 gap-5">
      <Swiper images={product.images} className="h-3/5" />
      <section className="w-full h-2/5 space-y-5">

        <div className="w-full flex flex-col items-start text-left h-3/5">
          <div className="flex w-full justify-between">
            <h4 className="">{product.brand}</h4>
            <div className="flex gap-2">
              <ReactStars
                starCount={5}
                starColor="black"
                value={product.rating}
                name="rating"
                emptyStarColor="#d6d6d6"
              />

            </div>
          </div>

          <h1 className="font-bold">{product.title}</h1>
          <h4>
            {product.description}
          </h4>
        </div>
        <div className="w-full flex justify-center items-center gap-4 flex-wrap">
          <div className="flex min-w-[3rem] h-[3rem] items-center border shadow-xs rounded-sm px-5 text-wrap " >
            <p className="">
              {amount}

            </p>
          </div>
          <Button className="" onClick={handleAddToCart}>
            {found ? (
              <>REMOVE <Minus /></>
            ) : (
              // <Plus />
              <>ADD TO CART <Plus /></>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Card;
