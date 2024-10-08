import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Product from "../api/models/Product";
import { BsCartPlus } from "react-icons/bs";

import { buyProduct } from "@/api/services/product-service";
import Auth from "@/api/models/Auth";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";

interface CartSheetProps {
  product: Product;
  onPurchaseSuccess: () => void;
}

export function CartSheet({ product, onPurchaseSuccess }: CartSheetProps) {
  const auth = useAuthUser<Auth>();
  const userID = auth?.id;
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useToastProvider();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > product.quantity) {
      showMessage({
        message: "Quantity exceeds available stock",
        type: ToastType.ERROR,
      });
      setSelectedQuantity(product.quantity);
    } else {
      showMessage({
        message: "Quantity updated successfully",
        type: ToastType.SUCCESS,
      });
      setSelectedQuantity(value);
    }
  };

  const handleBuyProduct = () => {
    if (!userID) {
      showMessage({
        message: "Please login to buy products",
        type: ToastType.ERROR,
      });
      return;
    }

    setLoading(true);

    buyProduct({
      userID,
      product: {
        name: product.name,
        quantity: selectedQuantity,
        price: product.price,
        image: product.image,
      },
    })
      .then(() => {
        showMessage({
          message: "Product purchased successfully",
          type: ToastType.SUCCESS,
        });
        setLoading(false);
        onPurchaseSuccess();
      })
      .catch(() => {
        showMessage({
          message: "Error buying product",
          type: ToastType.ERROR,
        });
        setLoading(false);
      });
  };

  const totalPrice = selectedQuantity * product.price;

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
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <Sheet>
      {product.quantity === 0 ? (
        <div className="cursor-not-allowed opacity-50 p-2 rounded-full flex items-center">
          <BsCartPlus className="text-2xl text-gray-600 dark:text-gray-400" />
        </div>
      ) : (
        <SheetTrigger asChild>
          <div className="cursor-pointer p-2 rounded-full flex items-center group hover:bg-green-500 dark:hover:bg-green-700">
            <BsCartPlus className="text-2xl text-gray-600 dark:text-gray-400 group-hover:text-gray-200" />
          </div>
        </SheetTrigger>
      )}
      <SheetContent className="bg-white dark:bg-emerald-950 text-gray-900 dark:text-gray-100 rounded-2xl rounded-r-none shadow-lg dark:shadow-none">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Buy Product
          </SheetTitle>
          <SheetDescription className="text-sm mt-1 ">
            Review the product details and select the quantity.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 px-6">
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg shadow-md dark:shadow-none"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="productName"
                className="text-right w-1/3 dark:text-gray-300"
              >
                Product:
              </Label>
              <p
                id="productName"
                className="text-lg font-semibold dark:text-gray-100 w-2/3"
              >
                {product.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="productPrice"
                className="text-right w-1/3 dark:text-gray-300"
              >
                Price:
              </Label>
              <p
                id="productPrice"
                className="text-lg font-semibold dark:text-gray-100 w-2/3"
              >
                {formattedPrice}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="quantity"
                className="text-right w-1/3 dark:text-gray-300"
              >
                Quantity:
              </Label>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.quantity}
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className="w-2/3 p-2 border rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-700 dark:focus:ring-green-700"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="totalPrice"
                className="text-right w-1/3 dark:text-gray-300"
              >
                Total Price:
              </Label>
              <p
                id="totalPrice"
                className="text-lg font-semibold dark:text-gray-100 w-2/3"
              >
                {formattedTotalPrice}
              </p>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-900 dark:text-white text-white rounded-lg shadow-md "
              onClick={handleBuyProduct}
              disabled={loading}
            >
              Buy
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
