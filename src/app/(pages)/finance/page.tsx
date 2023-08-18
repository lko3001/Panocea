"use client";
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
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Data, FinanceItem } from "@/types";
import { useGlobal } from "@/components/context/GlobalContext";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonutChart } from "@tremor/react";
import { useState } from "react";
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { v4 } from "uuid";
import { H1, H2, H3 } from "@/components/ui/typography";

export default function Debt() {
  const { fileData, UpdateFile } = useGlobal();
  const { contents: data } = fileData;

  const [tabValue, setTabValue] = useState<"loss" | "entry" | "category">(
    Boolean(data.categories.finance.length) ? "entry" : "category"
  );

  const losses = data.finance.filter((item) => item.type === "loss");
  const entries = data.finance.filter((item) => item.type === "entry");

  function getHowMuchForCategory(array: FinanceItem[]) {
    const categories: string[] = Array.from(
      new Set(array.map((route) => route.category))
    ).filter((el) => Boolean(el));

    return categories.map((category) => {
      const price = array
        .filter((item) => item.category === category)
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
        );

      return { category, price };
    });
  }

  const lossesPerCategory = getHowMuchForCategory(losses);
  const entriesPerCategory = getHowMuchForCategory(entries);

  const FinanceFormSchema = z.object({
    title: z.string().nonempty(),
    price: z.string().nonempty(),
    description: z.string().nonempty().optional(),
    category: z.string().nonempty(),
  });

  const financeForm = useForm<z.infer<typeof FinanceFormSchema>>({
    resolver: zodResolver(FinanceFormSchema),
    defaultValues: {
      title: undefined,
      price: undefined,
      description: undefined,
      category: undefined,
    },
  });

  function handleNewFinanceSubmit(formData: z.infer<typeof FinanceFormSchema>) {
    setIsOpen((p) => !p);
    UpdateFile({
      method: "create",
      where: "finance",
      what: {
        type: tabValue as "entry" | "loss",
        id: v4(),
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
      },
      fileData,
    });
    financeForm.reset();
  }

  const CategoryFormSchema = z.object({
    title: z.string().nonempty(),
  });

  const categoryForm = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      title: undefined,
    },
  });

  function handleNewCategorySubmit(
    formData: z.infer<typeof CategoryFormSchema>
  ) {
    setIsOpen((p) => !p);
    UpdateFile({
      where: "categories",
      method: "create",
      fieldName: "finance",
      what: formData.title,
      fileData,
    });
    categoryForm.reset();
  }

  const valueFormatter = (number: number) =>
    `€ ${Intl.NumberFormat("it").format(number).toString()}`;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog
        onOpenChange={() => {
          setIsOpen((p) => !p);
          setTabValue("entry");
        }}
        open={isOpen}
      >
        <div className="max-w-4xl mx-auto">
          <H2 className="mb-6">Finance</H2>

          <DialogTrigger asChild>
            <Button>Create new finance</Button>
          </DialogTrigger>
          <Tabs defaultValue="graphs">
            <TabsList className="grid w-full grid-cols-2 my-4 mt-6">
              <TabsTrigger value="graphs" className="capitalize">
                graphs
              </TabsTrigger>
              <TabsTrigger value="table" className="capitalize">
                table
              </TabsTrigger>
            </TabsList>
            <TabsContent value="graphs">
              <H3>Losses</H3>
              <div className="w-1/2 mx-auto aspect-square">
                <DonutChart
                  className="mt-6 w-full h-full"
                  data={lossesPerCategory}
                  category="price"
                  index="category"
                  valueFormatter={valueFormatter}
                  colors={[
                    "slate",
                    "violet",
                    "indigo",
                    "rose",
                    "cyan",
                    "amber",
                  ]}
                />
              </div>
              <H3>Entries</H3>
              <div className="w-1/2 mx-auto aspect-square">
                <DonutChart
                  className="mt-6 w-full h-full"
                  data={entriesPerCategory}
                  category="price"
                  index="category"
                  valueFormatter={valueFormatter}
                  colors={[
                    "slate",
                    "violet",
                    "indigo",
                    "rose",
                    "cyan",
                    "amber",
                  ]}
                />
              </div>
            </TabsContent>
            <TabsContent value="table">
              <DataTableDemo />
            </TabsContent>
          </Tabs>
          <DialogContent
            className={`outline ${
              tabValue === "loss"
                ? "dark:outline-red-600 outline-red-400"
                : tabValue === "entry"
                ? "dark:outline-green-600 outline-green-400"
                : "dark:outline-blue-600 outline-blue-400"
            }`}
          >
            <Tabs
              defaultValue={
                data.categories.finance.length ? "entry" : "category"
              }
            >
              <TabsList className="grid w-full grid-cols-3 my-4 mt-6">
                <TabsTrigger
                  value="entry"
                  disabled={Boolean(!data.categories.finance.length)}
                  onFocus={(e: any) => setTabValue(e.target.innerHTML)}
                  className="capitalize data-[state=active]:dark:bg-green-600 data-[state=active]:bg-green-400"
                >
                  entry
                </TabsTrigger>
                <TabsTrigger
                  value="loss"
                  disabled={Boolean(!data.categories.finance.length)}
                  onFocus={(e: any) => setTabValue(e.target.innerHTML)}
                  className="capitalize data-[state=active]:dark:bg-red-600 data-[state=active]:bg-red-400"
                >
                  loss
                </TabsTrigger>
                <TabsTrigger
                  value="category"
                  onFocus={(e: any) => setTabValue(e.target.innerHTML)}
                  className="capitalize data-[state=active]:dark:bg-blue-600 data-[state=active]:bg-blue-400"
                >
                  category
                </TabsTrigger>
              </TabsList>
              <TabsContent value="entry">
                <FinanceForm
                  handleNewFinanceSubmit={financeForm.handleSubmit(
                    handleNewFinanceSubmit
                  )}
                  form={financeForm}
                />
              </TabsContent>
              <TabsContent value="loss">
                <FinanceForm
                  handleNewFinanceSubmit={financeForm.handleSubmit(
                    handleNewFinanceSubmit
                  )}
                  form={financeForm}
                />
              </TabsContent>
              <TabsContent value="category">
                <CategoryForm
                  handleNewCategorySubmit={categoryForm.handleSubmit(
                    handleNewCategorySubmit
                  )}
                  form={categoryForm}
                />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

function CategoryForm({
  form,
  handleNewCategorySubmit,
}: {
  form: any;
  handleNewCategorySubmit: any;
}) {
  return (
    <Form {...form}>
      <form onSubmit={handleNewCategorySubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

function FinanceForm({
  form,
  handleNewFinanceSubmit,
}: {
  form: any;
  handleNewFinanceSubmit: any;
}) {
  const { fileData } = useGlobal();
  const { contents: data } = fileData;

  const categories = data.categories.finance;

  return (
    <Form {...form}>
      <form onSubmit={handleNewFinanceSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">title</FormLabel>
              <FormControl>
                <Input placeholder="Grocery shopping..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="963"
                  {...field}
                  min={0}
                  step={0.01}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">description</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="I spent so much because..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category === field.value
                          )
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category}
                          key={category}
                          onSelect={() => {
                            form.setValue("category", category);
                          }}
                        >
                          {category}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              category === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function DataTableDemo<TData, TValue>() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { fileData, UpdateFile } = useGlobal();
  const { contents: contentsData } = fileData;

  const customHeader = ({ column }: any, name: string) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {name}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };

  const columns: ColumnDef<FinanceItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      accessorKey: "title",
      header: (props) => customHeader(props, "title"),
    },
    {
      accessorKey: "price",
      header: (props) => customHeader(props, "price"),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("it-IT", {
          style: "currency",
          currency: "EUR",
        }).format(price);
        return formatted;
      },
    },
    {
      accessorKey: "category",
      header: (props) => customHeader(props, "category"),
    },
    {
      accessorKey: "description",
      header: "description",
    },
    {
      accessorKey: "type",
      header: (props) => customHeader(props, "type"),
      cell: ({ row }) => {
        const word: "entry" | "loss" = row.getValue("type");
        const capitalized = word.slice(0, 1).toUpperCase() + word.slice(1);
        return (
          <span
            className={
              capitalized === "Entry"
                ? "dark:text-green-400 text-green-600"
                : "dark:text-red-400 text-red-600"
            }
          >
            {capitalized}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: contentsData.finance,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="space-x-4">
          {Boolean(table.getSelectedRowModel().rows.length) && (
            <Button
              variant="destructive"
              className="ml-auto"
              onClick={() => {
                UpdateFile({
                  method: "deleteMany",
                  fileData: fileData,
                  where: "finance",
                  fieldName: "id",
                  array: table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original),
                });
                table.resetRowSelection();
              }}
            >
              Delete Row
              {Boolean(table.getSelectedRowModel().rows.length > 1) && "s"}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Visible
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
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="capitalize [&>*]:capitalize"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
