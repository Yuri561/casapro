import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { updateInventory } from "../../UserAuth/user_auth";
import AddItemBtn from "../AddItemModal/AddItemBtn";
import InventoryEditModal from "../EditItemModal/EditItemModal";
import { Product } from "../Hooks/useInventory";

interface InventoryTableProps {
  inventoryData: Product[];
  setInventoryData: React.Dispatch<React.SetStateAction<Product[]>>;
  onAddSave: (newItem: Product) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventoryData,
  setInventoryData,
  onAddSave,
}) => {
  const [search, setSearch] = useState("");
  const [categoryItem, setCategoryItem] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const categories: string[] = [
    "all",
    "electronics",
    "pantry",
    "tools",
    "toiletries",
    "groceries",
    "general",
  ];

  const filtered = inventoryData.filter(
    (prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryItem === "all" ||
        prod.category.toLowerCase() === categoryItem)
  );

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleEdit = (prod: Product) => {
    setSelectedProduct(prod);
    setIsEditModalOpen(true);
  };

  return (
    <Card
      className="
        w-full
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        shadow-[0_0_50px_rgba(34,211,238,0.12)]
      "
    >
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6">
        <CardTitle className="text-2xl font-bold text-white tracking-tight">
          Inventory Control Center
        </CardTitle>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-0 w-full sm:w-64"
          />

          <AddItemBtn onSave={onAddSave} />
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Category Filter */}
        <div className="mb-6">
          <Select value={categoryItem} onValueChange={setCategoryItem}>
            <SelectTrigger className="w-[220px] bg-white/5 border border-white/10 text-white focus:border-cyan-400">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border border-white/10 text-white rounded-xl">
              <SelectGroup>
                <SelectLabel className="text-gray-400">
                  Categories
                </SelectLabel>
                {categories.map((item) => (
                  <SelectItem
                    key={item}
                    value={item}
                    className="hover:bg-white/10"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <Table className="min-w-full text-sm text-gray-300">
            <TableHeader className="bg-white/5 text-gray-400 uppercase tracking-wide text-xs">
              <TableRow>
                <TableHead className="px-4 py-3">Name</TableHead>
                <TableHead className="px-4 py-3">Category</TableHead>
                <TableHead className="px-4 py-3">Qty</TableHead>
                <TableHead className="px-4 py-3">Price</TableHead>
                <TableHead className="px-4 py-3 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems.map((prod) => (
                <TableRow
                  key={prod._id}
                  className="hover:bg-white/5 transition"
                >
                  <TableCell className="px-4 py-3 font-medium text-white">
                    {prod.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 capitalize text-gray-400">
                    {prod.category}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {prod.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-cyan-400">
                    ${Number(prod.price || 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(prod)}
                      className="
                        gap-1
                        bg-cyan-400
                        text-black
                        hover:bg-cyan-300
                        shadow-[0_0_15px_rgba(34,211,238,0.4)]
                        transition
                      "
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 text-sm text-gray-400">
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
            className="bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
          >
            Previous
          </Button>

          <span>
            Page{" "}
            <span className="text-cyan-400 font-semibold">
              {currentPage}
            </span>{" "}
            of {totalPages || 1}
          </span>

          <Button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
            className="bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
          >
            Next
          </Button>
        </div>
      </CardContent>

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <InventoryEditModal
          item={selectedProduct}
          open={isEditModalOpen}
          onDelete={(deletedItem) => {
            setInventoryData(
              inventoryData.filter(
                (prod) => prod._id !== deletedItem._id
              )
            );
            setIsEditModalOpen(false);
          }}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updatedProduct) => {
            try {
              if (!updatedProduct._id) return;

              const updateData = {
                name: updatedProduct.name,
                category: updatedProduct.category,
                location: updatedProduct.location,
                quantity: updatedProduct.quantity,
                price: updatedProduct.price,
              };

              const response = await updateInventory(
                updatedProduct._id,
                updateData
              );

              if (response.status === 200) {
                setInventoryData(
                  inventoryData.map((prod) =>
                    prod._id === updatedProduct._id
                      ? { ...prod, ...updateData }
                      : prod
                  )
                );
              }
            } catch (error) {
              console.error("Update error:", error);
            } finally {
              setIsEditModalOpen(false);
            }
          }}
        />
      )}
    </Card>
  );
};

export default InventoryTable;