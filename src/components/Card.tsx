
import { Plus, Star } from "lucide-react";
import { Swiper } from "./Swiper";
import { Button } from "./ui/button";
import { formatAmount } from "../lib/utils";
import ReactStars from "react-star-rating-component";
// import { Button } from "./ui/button";


interface ICard {
  title: string;
  brand: string;
  description: string;
  images: string[];
  price: number;
  rating: number; //!handle
}

const Card = ({ title, brand, description, images, price, rating, id }: ICard) => {
  const handleAddToCart = () => {
    console.log(id);
  }
  
  const amount = formatAmount(price);


  return (
    <div className="flex flex-col shadow-sm h-[600px] w-[20rem] pt-3 px-3 gap-5">
      <Swiper images={images} className="h-3/5" />
      <section className="w-full h-2/5 space-y-5">
        
        <div className="w-full flex flex-col items-start text-left h-3/5">
          <div className="flex w-full justify-between">
            <h4 className="">{brand}</h4>
            <div className="flex gap-2">
              <ReactStars
                starCount={5}
                starColor="black"
                value={rating}
                name="rating"
                // size={24}
                emptyStarColor="grey"
              />

            </div>
          </div>
          
          <h1 className="font-bold">{title}</h1>
          <h4>
            {description}
          </h4>
        </div>
        <div className="w-full flex justify-center items-center gap-4 flex-wrap">
          <div className="flex min-w-[3rem] h-[3rem] items-center border shadow-xs rounded-sm px-5 text-wrap " >
            <p className="">
              {amount}

            </p>
          </div>
          <Button className="" onClick={handleAddToCart}>
            ADD TO CART <Plus />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Card;
