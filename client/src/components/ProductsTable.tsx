import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Product from "@/api/models/Product";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { AddProductDialog } from "@/components/AddProductDialog";
import { EditProductDialog } from "@/components/EditProductDialog";

interface ProductTableProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  onProductChange: () => void;
}

export default function ProductTable({
  products,
  onDeleteProduct,
  onProductChange,
}: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const handleOpenAddDialog = (product?: Product) => {
    setSelectedProduct(product);
  };
  const handleOpenEditDialog = (product?: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <AddProductDialog
                product={selectedProduct}
                handleOpenAddDialog={() => handleOpenAddDialog()}
                onProducttChange={onProductChange}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.price} €</TableCell>
              <TableCell className="text-center">
                <EditProductDialog
                  product={selectedProduct}
                  handleOpenEditDialog={handleOpenEditDialog}
                  onProducttChange={onProductChange}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => product.id && onDeleteProduct(product.id)}
                  variant="ghost"
                  className="self-end"
                >
                  <Trash2 stroke="red" size={"18"} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
