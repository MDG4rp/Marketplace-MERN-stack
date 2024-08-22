import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character",
  }),
  price: z
    .string()
    .min(1, { message: "Price must be at least 1" })
    .transform((value) => Number(value)),
  quantity: z
    .string()
    .min(1, { message: "Quantity must be at least 1" })
    .transform((value) => Number(value)),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileFormProps {
  onSubmit: (data: FormData) => void;
}

export default function AddProductForm({ onSubmit }: ProfileFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm mx-auto space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the name of the new product"
                  {...field}
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-xs"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the price"
                  {...field}
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-xs"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the quantity"
                  {...field}
                  className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 sm:text-xs"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs"
        >
          Add Product
        </Button>
      </form>
    </Form>
  );
}