import React, { useState, useEffect } from "react";
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
import { Search, Pencil } from "lucide-react";
import { userInventory, updateInventory } from "../../UserAuth/user_auth";
import AddItemBtn from "../AddItemModal/AddItemBtn";
import InventoryEditModal from "../EditItemModal/EditItemModal";
import { Product } from "../Hooks/useInventory";

const InventoryTable: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryItem, setCategoryItem] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);


  const categories = ["all", "electronics", "pantry", "tools",
    "toiletries", "groceries", "general"
  ]


  useEffect(() => {
    const fetchInventory = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) return;
      try {
        const response = await userInventory(user_id);
        if (response.status === 200) {
          setInventoryData(response.data.user_inventory);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const filtered = inventoryData.filter((prod) =>
    prod.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryItem === "all" || prod.category.toLowerCase() === categoryItem)
  );

  const handleEdit = (prod: Product) => {
    setSelectedProduct(prod);
    setIsEditModalOpen(true);
  };

  const handleAddSave = (newItem: Product) => {
    setInventoryData([...inventoryData, newItem]);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
        <CardTitle className="text-lg">Inventory</CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="w-4 h-4" />
          </Button>
          {/* Add Item Modal */}
          <AddItemBtn
            // isBtnOpen={isAddModalOpen}

            onSave={handleAddSave}
          // _id={user_id}

          />


        </div>
      </CardHeader>

      <CardContent>

        <Select defaultValue={categoryItem} onValueChange={(value)=>(setCategoryItem(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category"/>
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup className="bg-white text-slate-900">
              <SelectLabel>Categories</SelectLabel>
                {categories.map((item)=>{
                  return (
                  <SelectItem value={item} 
                  key={item}
                  className="hover:bg-gray-200">
                    {item[0].toUpperCase() + item.slice(1).toLowerCase()}
                  </SelectItem>
                  )

                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((prod) => (
              <TableRow key={prod._id}>
                <TableCell>{prod.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: prod.color }}
                    ></span>
                    <span>{prod.color}</span>
                  </div>
                </TableCell>
                <TableCell>{prod.category}</TableCell>
                <TableCell>{prod.quantity}</TableCell>
                <TableCell>${prod.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEdit(prod)}
                    className="gap-1 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>



      {/* Edit Item Modal */}
      {isEditModalOpen && selectedProduct && (
        <InventoryEditModal
          item={selectedProduct}
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updatedProduct: Product) => {
            try {
              if (updatedProduct._id) {
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
                } else {
                  console.error("Failed to update inventory:", response.data);
                }
              } else {
                console.error("Cannot save update. Product ID is undefined.");
              }
            } catch (error) {
              console.error("Error updating inventory:", error);
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
