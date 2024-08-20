import Product from "./Product";

export default interface DialogProps {
  use: "addProduct" | "updateProduct" | "addUser" | "updateRole";
  buttonText: string;
  title: string;
  description: string;
  product?: Product;
  onClose: () => void;
  onSuccess: () => void;
}
