import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CameraIcon, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Product } from "../Hooks/useInventory";
import { addInventory } from "../../UserAuth/user_auth";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";

interface AddItemBtnProps {
  onSave: (updatedItem: Product) => void;
}

const AddItemBtn: React.FC<AddItemBtnProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const { name, category, quantity, location, price } = formData;
  
    // making sure the user completes all the field
    if (!name || !category || !quantity || !location || !price) {
      toast.info("Please complete all fields before adding the item.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await addInventory( formData);
      if (response.status === 201) {
        onSave(formData as Product);
        toast.success(`${formData.name} successfully added!`)
      }
    } catch (error) {
      console.error("Cannot add item to inventory:", error);
      toast.error("Failed to add item. Try again.");
    } finally {
      setIsOpen(false);
      setFormData({});
      setLoading(false);
    }
  };

  return (

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {loading && <LoadingAnimation />}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-emerald-600 hover:bg-emerald-700 
          cursor-pointer hover:scale-105 text-white"
        >
          <Plus /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogDescription>
              Enter the details for your new inventory item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="itemName" className="text-right">
                Item Name
              </Label>
              <Input
                id="itemName"
                name="name"
                onChange={handleChange}
                placeholder="Name of the item"
                value={formData.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="bg-white text-slate-900">
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="electronics" className="hover:bg-gray-200">
                      Electronics
                    </SelectItem>
                    <SelectItem value="pantry" className="hover:bg-gray-200">
                      Pantry
                    </SelectItem>
                    <SelectItem value="toiletries" className="hover:bg-gray-200">
                      Toiletries
                    </SelectItem>
                    <SelectItem value="tools" className="hover:bg-gray-200">
                      Tools
                    </SelectItem>
                    <SelectItem value="groceries" className="hover:bg-gray-200">
                      Groceries
                    </SelectItem>
                    <SelectItem value="general" className="hover:bg-gray-200">
                      General
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="e.g., 10"
                value={formData.quantity || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input
                id="location"
                name="location"
                onChange={handleChange}
                value={formData.location || ""}
                placeholder="e.g., Pantry Shelf"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., 99.99"
                value={formData.price || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white">
              <CameraIcon /> Scan Item
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white"
            >
              {loading ? "adding new item..." : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemBtn;
