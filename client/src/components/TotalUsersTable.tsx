import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/api/services/user-service";
import { updateRole } from "@/api/services/user-service";
import UserInfo from "@/api/models/UserInfo";
import { IoIosRefresh } from "react-icons/io";
import { IoIosOptions } from "react-icons/io";

const handleDeleteUser = (userId: string) => {
  console.log(userId);
  deleteUser(userId).then((res) => {
    console.log(res);
  });
};

const handleUpdateRole = (userId: string, role: string) => {
  console.log(userId);
  updateRole(userId, role).then((res) => {
    console.log(res);
  });
};

const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "userID",
    header: "userID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userID")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" dark:hover:bg-emerald-900"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" dark:hover:bg-emerald-900"
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" dark:hover:bg-emerald-900 hover:bg-green-200"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created</div>,
    cell: ({ row }) => {
      const createdAt = new Date(
        row.getValue("createdAt")
      ).toLocaleDateString();
      return <div className="text-right font-medium">{createdAt}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Last update</div>,
    cell: ({ row }) => {
      const createdAt = new Date(
        row.getValue("updatedAt")
      ).toLocaleDateString();
      return <div className="text-right font-medium">{createdAt}</div>;
    },
  },
  /* {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  }, */
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-green-100">
              <span className="sr-only">Open menu</span>
              < IoIosOptions className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-emerald-950">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.userID)}
              className="cursor-pointer"
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">View User</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleUpdateRole(
                  user.userID,
                  user.role === "admin" ? "user" : "admin"
                )
              }
              className="cursor-pointer"
            >
              Update to {user.role === "admin" ? "user" : "admin"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteUser(user.userID)} className="cursor-pointer">
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({ data }: { data: UserInfo[] }) {
  React.useEffect(() => {}, [data]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableData, setTableData] = React.useState<UserInfo[]>(data);
  const handleRefresh = () => {
    getAllUsers().then((res) => {
      setTableData(res);
    });
  };

  const table = useReactTable({
    data: tableData,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full  bg-white dark:bg-transparent rounded-lg shadow-2xl dark:shadow-2xl p-4">
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="dark:bg-transparent dark:text-white max-w-sm borderborder border-green-500 dark:border-neutral-700 hover:border-green-600 dark:hover:border-green-700 focus-within:ring-2 focus-within:ring-green-500 text-black"
        />
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleRefresh}
            className="dark:bg-green-700 bg-green-700 hover:bg-green-900 dark:hover:bg-green-900"
          >
            <IoIosRefresh
              size="1rem"
              className="text-white dark:text-white cursor-pointer "
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="flex items-center space-x-2 bg-green-700 dark:text-white dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-900 ">
                <span>Columns</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-emerald-950">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer hover:bg-green-100"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-left"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="dark:bg-green-700 hover:bg-black text-white bg-green-700 dark:hover:bg-green-700"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="dark:bg-green-700 hover:bg-black bg-green-700 text-white dark:hover:bg-green-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
