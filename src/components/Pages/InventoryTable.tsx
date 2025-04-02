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
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Search, Pencil, Save } from "lucide-react";
import { userInventory } from "../../UserAuth/user_auth";
import AddItemBtn from "../AddItemModal/AddItemBtn";

export type Product = {
    id: number;
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
    const [editId, setEditId] = useState<number | null>(null);
    const [edited, setEdited] = useState<Partial<Product>>({});
    const [activeTab, setActiveTab] = useState("all");

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

    const filtered = inventoryData.filter((prod) => {
        const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
        const matchesTab = activeTab === "all" || prod.category.toLowerCase() === activeTab;
        return matchesSearch && matchesTab;
    });

    const handleEdit = (prod: Product) => {
        setEditId(prod.id);
        setEdited(prod);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Product
    ) => {
        setEdited({ ...edited, [field]: e.target.value });
    };

    const handleSave = (id: number) => {
        const updated = inventoryData.map((prod) =>
            prod.id === id ? { ...prod, ...edited } : prod
        );
        console.log("Updated:", updated);
        setEditId(null);
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
                <Tabs defaultValue="all" onValueChange={(val) => setActiveTab(val)} className="w-full mb-4">
                    <TabsList className="grid grid-cols-4 w-full sm:w-fit gap-2 ">
                        <TabsTrigger
                            value="all"
                            className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="pantry"
                            className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                        >
                            Pantry
                        </TabsTrigger>
                        <TabsTrigger
                            value="tools"
                            className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                        >
                            Tools
                        </TabsTrigger>
                        <TabsTrigger
                            value="electronics"
                            className="bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-800 data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                        >
                            Electronics
                        </TabsTrigger>
                    </TabsList>
                </Tabs>A


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
                            <TableRow key={prod.id}>
                                <TableCell>
                                    {editId === prod.id ? (
                                        <Input
                                            value={edited.name || ""}
                                            onChange={(e) => handleChange(e, "name")}
                                        />
                                    ) : (
                                        prod.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: prod.color }}
                                        ></span>
                                        <span>{prod.color}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {editId === prod.id ? (
                                        <Input
                                            value={edited.category || ""}
                                            onChange={(e) => handleChange(e, "category")}
                                        />
                                    ) : (
                                        prod.category
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editId === prod.id ? (
                                        <Input
                                            type="number"
                                            value={edited.quantity?.toString() || ""}
                                            onChange={(e) => handleChange(e, "quantity")}
                                        />
                                    ) : (
                                        prod.quantity
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editId === prod.id ? (
                                        <Input
                                            type="number"
                                            value={edited.price?.toString() || ""}
                                            onChange={(e) => handleChange(e, "price")}
                                        />
                                    ) : (
                                        `$${prod.price.toLocaleString()}`
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {editId === prod.id ? (
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => handleSave(prod.id)}
                                            className="gap-1"
                                        >
                                            <Save className="w-3 h-3" /> Save
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleEdit(prod)}
                                            className="gap-1 bg-blue-500  cursor-pointer hover:bg-blue-600 text-white"
                                        >
                                            <Pencil className="w-3 h-3" /> Edit
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default InventoryTable;
