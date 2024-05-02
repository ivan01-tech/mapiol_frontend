import { useModal } from "@/hooks/useModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { IoMdAdd } from "react-icons/io";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
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
import ModalComp from "../ui/CustomModal";

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
import { formatDate } from "@/lib/utils";
import CreateLanLoard from "../Form/CreateLanLoard";

export const columns: ColumnDef<{
  type_user: string;
  id: number;
  email: string;
  addresse: string;
  login: string;
  nom: string;
  password: string;
  sexe: string;
  telephone: string;
  statut: string;
  slug: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <>
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     </>
  //   ),
  //   cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  // },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </>
    ),
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "addresse",
    header: "Addresse",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("addresse")}</div>
    ),
  },
  // {
  //   accessorKey: "login",
  //   header: ({ column }) => (
  //     <>
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Login
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     </>
  //   ),
  //   cell: ({ row }) => <div className="">{row.getValue("login")}</div>,
  // },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "sexe",
    header: "Sexe",
    cell: ({ row }) => <div className="capitalize">{row.getValue("sexe")}</div>,
  },
  {
    accessorKey: "telephone",
    header: "Telephone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("telephone")}</div>
    ),
  },
  {
    accessorKey: "type_user",
    header: "Type User",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("type_user")}</div>
    ),
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("statut")}</div>
    ),
  },
  // {
  //   accessorKey: "slug",
  //   header: "Slug",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("slug")}</div>,
  // },
  // {
  //   accessorKey: "deleted_at",
  //   header: "Deleted At",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{formatDate(row.getValue("deleted_at"))}</div>
  //   ),
  // },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("created_at"))}</div>
    ),
  },
  // {
  //   accessorKey: "updated_at",
  //   header: ({ column }) => (
  //     <>
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Updated At
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     </>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="capitalize">{formatDate(row.getValue("updated_at"))}</div>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const InformationCreation = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(InformationCreation.id)
              }
            >
              View details
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Activate</DropdownMenuItem> */}
            <DropdownMenuItem>Update</DropdownMenuItem>
            {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type Props = {
  data: {
    type_user: string;
    id: number;
    email: string;
    addresse: string;
    login: string;
    nom: string;
    password: string;
    sexe: string;
    telephone: string;
    statut: string;
    slug: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
  }[];
};

export function TenantsLandLordTable({ data: dataTable }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const {
    onOpen: onOpenPIModal,
    isOpen: isOpenPIModal,
    onClose: onClosePIModal,
  } = useModal();

  const table = useReactTable({
    data: dataTable,
    columns,
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
    <div className="w-full ">
      <div className="flex  items-center py-4 ">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ajouter</Button>
          </DialogTrigger>
          <DialogContent className="h-screen w-screen overflow-auto">
            <CreateLanLoard />
          </DialogContent>
        </Dialog>

        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
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
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        {/* <DataTablePagination table={table} /> */}
      </div>
    </div>
  );
}
