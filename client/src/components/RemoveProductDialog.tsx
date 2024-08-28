import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Product from "@/api/models/Product";
import { Trash2 } from "lucide-react";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";
import { removeProductFromUser } from "@/api/services/product-service";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Auth from "@/api/models/Auth";

interface ProductDialogProps {
  product: Product;
}

export function RemoveProductDialog({ product }: ProductDialogProps) {
  const auth = useAuthUser<Auth>();
  const id = auth?.id;
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const { showMessage } = useToastProvider();

  const handleSubmit = async () => {
    try {
      if (product) {
        await removeProductFromUser(id || "", product.name || "",quantity);
        showMessage({
          message: "Product removed successfully",
          type: ToastType.SUCCESS,
        });
      }
    } catch {
      showMessage({
        message: "Error removing product",
        type: ToastType.ERROR,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="inline-flex items-center cursor-pointer">
          <Trash2 size={16} />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove this product</DialogTitle>
          <DialogDescription>Confirm the removal of the product</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3 dark:text-black focus:ring-green-700"
              placeholder={product.name}
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              className="col-span-3 dark:text-black focus:ring-green-700"
              placeholder={product.price.toString()}
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3 dark:text-black focus:ring-green-700"
              placeholder={quantity.toString()}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white dark:bg-green-700 dark:text-white dark:hover:bg-green-900"
            >
              Remove product
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}