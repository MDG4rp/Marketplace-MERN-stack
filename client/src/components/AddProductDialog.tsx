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
import { addProduct } from "@/api/services/product-service";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";

interface ProductDialogProps {
  product?: Product;
  onProducttChange: () => void;
  handleOpenAddDialog: (product?: Product) => void;
}

export function AddProductDialog({
  product,
  onProducttChange,
  handleOpenAddDialog,
}: ProductDialogProps) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [image, setImage] = useState(product?.image || "");
  const { showMessage } = useToastProvider();

  const handleSubmit = async () => {
    try {
      await addProduct({ name, price, quantity, image });
      onProducttChange();
      showMessage({
        message: "Product added successfully",
        type: ToastType.SUCCESS,
      });
      setName("");
      setPrice(0);
      setQuantity(0);
      setImage("");
    } catch {
      showMessage({
        message: "Error adding product",
        type: ToastType.ERROR,
      });
      setName("");
      setPrice(0);
      setQuantity(0);
      setImage("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => handleOpenAddDialog()}
          className="bg-green-500 text-white dark:bg-green-700 dark:text-white dark:hover:bg-green-900 hover:bg-green-700 dark:hover:text-white"
        >
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new product to the database.</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 dark:text-black focus:ring-green-700"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3 dark:text-black focus:ring-green-700"
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
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image url
            </Label>
            <Input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="col-span-3 dark:text-black focus:ring-green-700"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            onClick={handleSubmit}
            className="bg-green-500 text-white dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-900 dark:text-white px-4 py-2 rounded-md"
          >
            Add Product
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
