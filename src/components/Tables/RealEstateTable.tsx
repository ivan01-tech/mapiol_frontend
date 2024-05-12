import { useModal } from "@/hooks/useModal";
import { Button } from "@/components/ui/button";

import * as React from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import { deleteLanLord } from "@/services/landlord.services";
import toast from "react-hot-toast";
import { queryClient } from "@/app/layout";
import Link from "next/link";
import { RealEstateTableData } from "@/app/realestates/page";
import Image from "next/image";

const handlerDeleteUser = async (user: number) => {
  deleteLanLord<any>(user)
    .then((res) => {
      console.log("user deleted : ", res);
      toast.success("User deleted !");
      queryClient.invalidateQueries({
        queryKey: ["getAllUser"],
      });
    })
    .catch((err) => {
      toast.error(err.message || "Something went wrong !");
    });
};

export const columns: ColumnDef<RealEstateTableData>[] = [
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
  {
    accessorKey: "id",
    header: ({ column }) => (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </>
    ),
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "proprietaire_id",
    header: "proprietaire_id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("proprietaire_id")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: "image",
    cell: ({ row }) => (
      <Image
        alt="une image"
        width={50}
        height={50}
        src={row.getValue("image")}
        className=""
      />
    ),
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("statut")}</div>
    ),
  },
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
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.getValue("updated_at"))}</div>
    ),
  },
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
            <DropdownMenuItem>
              <Link href={"/realestates/" + InformationCreation.id}>Voir</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Activate</DropdownMenuItem>
            <Link href={"/realestates/" + InformationCreation.id + "/update"}>
              <DropdownMenuItem>Update</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handlerDeleteUser(Number(InformationCreation.id))}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type Props = {
  data: RealEstateTableData[];
};

export function RealEstateTable({ data: dataTable }: Props) {
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
        {/* <Dialog> */}
        {/* <DialogTrigger asChild> */}
        <Button>
          <Link href={"/realestates/create"}>Ajouter</Link>
        </Button>
        {/* </DialogTrigger>
          <DialogContent className="h-screen w-screen overflow-auto">
            <CreateLanLoard  />
          </DialogContent> */}
        {/* </Dialog> */}

        {/* <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
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
