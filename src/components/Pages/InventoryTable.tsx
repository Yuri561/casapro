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
import {Pencil} from "lucide-react";
import { updateInventory } from "../../UserAuth/user_auth";
import AddItemBtn from "../AddItemModal/AddItemBtn";
import InventoryEditModal from "../EditItemModal/EditItemModal";
import { Product } from "../Hooks/useInventory";

interface InventoryTableProps {
  inventoryData: Product[];
  setInventoryData: React.Dispatch<React.SetStateAction<Product[]>>;
  onAddSave: (newItem: Product) => void;
}
const InventoryTable: React.FC<InventoryTableProps> = ({inventoryData, setInventoryData, onAddSave}) => {

  const [search, setSearch] = useState("");
  const [categoryItem, setCategoryItem] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Pagination state
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

 
  const filtered = inventoryData.filter((prod) =>
    prod.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryItem === "all" || prod.category.toLowerCase() === categoryItem)
  );

  // Pagination: calculate the current page data
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleEdit = (prod: Product) => {
    setSelectedProduct(prod);
    setIsEditModalOpen(true);
  };



  return (
    <Card className="w-full bg-white shadow-xl rounded-xl border-none">
  <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6">
    <CardTitle className="text-2xl font-bold text-slate-800">Inventory</CardTitle>
    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
      <Input
        placeholder="Search live items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-64"
      />
      {/* <Button variant="outline" size="icon" className="border border-gray-300">
        <Search className="w-4 h-4 text-gray-600" />
      </Button> */}
      <AddItemBtn onSave={onAddSave} />
    </div>
  </CardHeader>

  <CardContent className="p-4 sm:p-6">
    <div className="mb-4">
      <Select value={categoryItem} onValueChange={setCategoryItem}>
        <SelectTrigger className="w-[200px] bg-white border-gray-300">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-white text-slate-800">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table className="min-w-full text-sm text-slate-700">
        <TableHeader className="bg-gray-100 text-left text-slate-700 font-semibold">
          <TableRow>
            <TableHead className="px-4 py-3">Name</TableHead>
            <TableHead className="px-4 py-3">Category</TableHead>
            <TableHead className="px-4 py-3">Qty</TableHead>
            <TableHead className="px-4 py-3">Price</TableHead>
            <TableHead className="px-4 py-3 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((prod) => (
            <TableRow key={prod._id} className="hover:bg-gray-50">
              <TableCell className="px-4 py-2">{prod.name}</TableCell>
              <TableCell className="px-4 py-2 capitalize">{prod.category}</TableCell>
              <TableCell className="px-4 py-2">{prod.quantity}</TableCell>
              <TableCell className="px-4 py-2">${Number(prod.price || 0).toFixed(2)}
              </TableCell>
              <TableCell className="px-4 py-2 text-right">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(prod)}
                  className="gap-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Pagination Controls */}
    <div className="flex justify-between items-center mt-6 text-sm text-slate-700">
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-gray-100 text-slate-800 hover:bg-gray-200"
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-gray-100 text-slate-800 hover:bg-gray-200"
      >
        Next
      </Button>
    </div>
  </CardContent>

  {isEditModalOpen && selectedProduct && (
    <InventoryEditModal
      item={selectedProduct}
      open={isEditModalOpen}
      onDelete={(deletedItem) => {
        setInventoryData(inventoryData.filter((prod) => prod._id !== deletedItem._id));
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
          const response = await updateInventory(updatedProduct._id, updateData);
          if (response.status === 200) {
            setInventoryData(
              inventoryData.map((prod) =>
                prod._id === updatedProduct._id ? { ...prod, ...updateData } : prod
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
