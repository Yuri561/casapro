import React from "react";
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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddItemBtn: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg">
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
            <Input id="itemName" placeholder="Name of the item" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select>
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
            <Input id="quantity" type="number" placeholder="e.g., 10" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" type="number" placeholder="e.g., 99.99" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white">
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemBtn;
