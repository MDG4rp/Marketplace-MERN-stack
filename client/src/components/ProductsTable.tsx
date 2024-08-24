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
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleOpenAddDialog = (product?: Product) => {
    setSelectedProduct(product);
  };
  const handleOpenEditDialog = (product?: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <Table className=" ">
        <TableHeader>
          <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
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
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-green-100">
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">{product.price} €</TableCell>
              <TableCell className="text-center">
                <EditProductDialog
                  product={product}
                  handleOpenEditDialog={handleOpenEditDialog}
                  onProductChange={onProductChange}
                />
              </TableCell>
              <TableCell className="flex justify-end">
                <Trash2
                  stroke="red"
                  size={18}
                  onClick={() => product.id && onDeleteProduct(product.id)}
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
