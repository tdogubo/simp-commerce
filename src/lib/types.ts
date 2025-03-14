export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  brand: string;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  images: Array<string>;
  thumbnail: string;
}

export interface IContext {
    addProduct: (value: { product: IProduct; }) => void;
    removeProduct: (id: number) => void;
    products: Array<IProduct>;
    productsInCart: Array<{ product: IProduct }>;
    currentPage: number;
    setCurrentPage: React.Dispatch<number>;
    maxPage: number;
}
