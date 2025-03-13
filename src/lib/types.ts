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
