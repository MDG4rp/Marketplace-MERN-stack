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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileFormProps {
  onSubmit: (data: FormData) => void;
}

export function RegisterForm({ onSubmit }: ProfileFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 flex flex-col items-center rounded-lg shadow-lg dark:border-neutral-700"
        style={{
          borderWidth: "1px",
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-6 w-full">
              <FormLabel className="ext-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  className="mt-1 w-full text-gray-900 dark:text-black dark:border-gray-600 rounded-md"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-6 w-full">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  className="mt-1 w-full text-gray-900 dark:text-black dark:border-gray-600 rounded-md"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6 w-full">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  className="mt-1 w-full text-gray-900 dark:text-black dark:border-gray-600 rounded-md"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />

        <Button
          variant="ghost"
          type="submit"
          className="w-full px-4 py-2 dark:bg-navbarDark hover:bg-green-900 text-white dark:hover:bg-green-700 bg-green-700 hover:text-white"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
