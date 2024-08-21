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

  const handleSubmit = async () => {
    try {
      await addProduct({ name, price, quantity });
      onProducttChange();
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => handleOpenAddDialog()} className="bg-gray-700 text-white dark:bg-gray-400 dark:text-gray-900">
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
              className="col-span-3"
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
              className="col-span-3"
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
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose onClick={handleSubmit} className="bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 px-4 py-2 rounded-md">
            Add Product
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
