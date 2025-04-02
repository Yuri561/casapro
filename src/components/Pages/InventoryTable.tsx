import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Pencil } from "lucide-react";
import { userInventory, updateInventory, API_URL } from "../../UserAuth/user_auth";
import AddItemBtn from "../AddItemModal/AddItemBtn";
import InventoryEditModal from "../EditItemModal/EditItemModal";

export type Product = {
  _id: string; // assuming _id is a string
  name: string;
  category: string;
  location: string;
  quantity: number;
  price: number;
  color: string;
};

const InventoryTable: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    (activeTab === "all" || prod.category.toLowerCase() === activeTab)
  );

  const handleEdit = (prod: Product) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
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
          <AddItemBtn />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className="grid grid-cols-4 gap-2">
            {["all", "pantry", "tools", "electronics"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

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

      {isModalOpen && selectedProduct && (
        <InventoryEditModal
          item={selectedProduct}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={async (updatedProduct: Product) => {
            console.log("Updated Product:", updatedProduct);
            try {
              if (updatedProduct._id) {
                // Using the updateInventory function from user_auth
                const response = await updateInventory(updatedProduct._id, updatedProduct);
                if (response.status === 200) {
                  setInventoryData(
                    inventoryData.map((prod) =>
                      prod._id === updatedProduct._id ? updatedProduct : prod
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
              setIsModalOpen(false);
            }
          }}
        />
      )}
    </Card>
  );
};

export default InventoryTable;
