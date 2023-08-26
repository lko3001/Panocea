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
import { GetCategories, cn } from "@/lib/utils";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { FinanceItem } from "@/types";
import { useGlobal } from "@/components/context/GlobalContext";
import { DialogContent, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonutChart } from "@tremor/react";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { ArrowUpDown } from "lucide-react";
import { H2, H3 } from "@/components/ui/typography";

const newCategoryText = "new category";

export default function Debt() {
  const { userData, Crud } = useGlobal();

  const [financeCategories, setFinanceCategories] = useState<
    (string | undefined)[]
  >([]);
  const [losses, setLosses] = useState<FinanceItem[]>([]);
  const [entries, setEntries] = useState<FinanceItem[]>([]);

  useEffect(() => {
    if (userData.user) {
      setFinanceCategories(GetCategories(userData.user.finances));
      setLosses(userData.user.finances.filter((item) => item.type === "loss"));
      setEntries(
        userData.user.finances.filter((item) => item.type === "entry")
      );
    }
  }, [userData.user]);

  const [tabValue, setTabValue] = useState<"loss" | "entry" | "category">(
    Boolean(financeCategories.length) ? "entry" : "category"
  );

  function getHowMuchForCategory(financeArray: FinanceItem[]) {
    const categories: string[] = Array.from(
      new Set(financeArray.map((finance) => finance.category))
    ).filter((el) => Boolean(el));

    return categories.map((category) => {
      const price = financeArray
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
    newCategory: z.string().nonempty().optional(),
  });

  const financeForm = useForm<z.infer<typeof FinanceFormSchema>>({
    resolver: zodResolver(FinanceFormSchema),
    defaultValues: {
      title: undefined,
      price: undefined,
      description: undefined,
      category: undefined,
      newCategory: undefined,
    },
  });

  function handleNewFinanceSubmit(formData: z.infer<typeof FinanceFormSchema>) {
    setIsOpen((p) => !p);
    Crud({
      method: "create",
      where: "finance",
      what: {
        type: tabValue as "entry" | "loss",
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category:
          formData.category === newCategoryText
            ? formData.newCategory!
            : formData.category,
        userId: userData.user.id,
      },
    });
    financeForm.reset();
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
          <div className="flex flex-row items-center mb-6 gap-4">
            <H2 className="grow">Finance</H2>
            <DialogTrigger asChild>
              <Button>Create new finance</Button>
            </DialogTrigger>
          </div>

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
              defaultValue={financeCategories.length ? "entry" : "category"}
            >
              <TabsList className="grid w-full grid-cols-3 my-4 mt-6">
                <TabsTrigger
                  value="entry"
                  disabled={Boolean(!financeCategories.length)}
                  onFocus={(e: any) => setTabValue(e.target.innerHTML)}
                  className="capitalize data-[state=active]:dark:bg-green-600 data-[state=active]:bg-green-400"
                >
                  entry
                </TabsTrigger>
                <TabsTrigger
                  value="loss"
                  disabled={Boolean(!financeCategories.length)}
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
            </Tabs>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

function FinanceForm({
  form,
  handleNewFinanceSubmit,
}: {
  form: any;
  handleNewFinanceSubmit: any;
}) {
  const { userData } = useGlobal();

  const [isNewCategory, setIsNewCategory] = useState(false);

  const financeCategories = GetCategories(userData.user.finances);
  const financeCategoriesExpanded = [...financeCategories, newCategoryText];

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
                        "w-[200px] justify-between capitalize",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? financeCategoriesExpanded.find(
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
                      {financeCategoriesExpanded.map((category) => (
                        <CommandItem
                          value={category}
                          key={category}
                          className="capitalize"
                          onSelect={() => {
                            form.setValue("category", category);
                            setIsNewCategory(category === newCategoryText);
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
        {isNewCategory && (
          <FormField
            control={form.control}
            name="newCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize">New Category</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="New category name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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

  const { userData, Crud } = useGlobal();

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
    data: userData.user.finances,
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
                Crud({
                  method: "deleteMany",
                  where: "finance",
                  what: table
                    .getSelectedRowModel()
                    .rows.map((row) => row.original.id!),
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
