import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Product from "../api/models/Product";
import { CartSheet } from "./CartSheet";

type ProductCardProps = {
  product: Product;
  type: "buy" | "show";
  onPurchaseSuccess: () => void;
};

export default function ProductCard({
  product,
  type,
  onPurchaseSuccess,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price % 1 === 0
      ? price.toLocaleString("it-IT", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
        })
      : price.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
  };
  const formattedPrice = formatPrice(product.price);

  return (
    <Card
      className={`bg-white dark:bg-transparent dark:border-green-700 text-gray-900 dark:text-gray-100 shadow-2xl rounded-lg ${
        product.quantity === 0 ? "opacity-50" : ""
      }`}
    >
      <CardHeader>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="text-lg">
        <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
        <h2 className="text-gray-800 dark:text-gray-200">
          Price: {formattedPrice}
        </h2>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <p>Quantity: {product.quantity}</p>
        </span>
        {type === "buy" && (
          <CartSheet product={product} onPurchaseSuccess={onPurchaseSuccess} />
        )}
      </CardFooter>
    </Card>
  );
}