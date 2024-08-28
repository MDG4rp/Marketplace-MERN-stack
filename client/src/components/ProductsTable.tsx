import { useState, useEffect } from "react";
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
import { EditProductDialog } from "@/components/EditProductDialog";

interface ProductTableProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  onProductChange: (searchQuery?: string) => void;
}

export default function ProductTable({
  products,
  onDeleteProduct,
  onProductChange,
}: ProductTableProps) {
  const [, setSelectedProduct] = useState<Product>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenEditDialog = (product?: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    onProductChange(searchQuery);
  }, [searchQuery, onProductChange]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-1/3 px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none focus:border-green-700 dark:border-neutral-700 dark:bg-transparent hover:border-green-600 dark:hover:border-green-700 focus-within:ring-2 focus-within:ring-green-500"
        />
      </div>
      <Table>
        <TableHeader>
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
