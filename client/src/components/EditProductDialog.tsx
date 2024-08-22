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
import { editProduct } from "@/api/services/product-service";
import { Pencil } from "lucide-react";

interface ProductDialogProps {
  product: Product;
  onProductChange: () => void;
  handleOpenEditDialog: (product?: Product) => void;
}

export function EditProductDialog({
  product,
  onProductChange,
  handleOpenEditDialog,
}: ProductDialogProps) {
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 0);

  const handleSubmit = async () => {
    try {
      if (product) {
        await editProduct(product.id || "", { name, price, quantity });
        onProductChange();
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          onClick={() => handleOpenEditDialog(product)}
          className="inline-flex items-center cursor-pointer"
        >
          <Pencil size={16} />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit this product</DialogTitle>
          <DialogDescription>Edit the product details</DialogDescription>
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
              placeholder={name}
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
              placeholder={price.toString()}
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
              placeholder={quantity.toString()}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Edit product
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}