import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatAmount = (amount:number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  })
    .format(amount)
    .replace("NGN", "₦");
}