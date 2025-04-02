// In InventoryEditModal.tsx

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product } from "../Pages/InventoryTable"; // Adjust the path accordingly

interface InventoryEditModalProps {
    item: Product;
    open: boolean;
    onClose: () => void;
    onSave: (updatedItem: Product) => void;
}

const InventoryEditModal = ({ item, open, onClose, onSave }: InventoryEditModalProps) => {
  const [edited, setEdited] = useState<Product>(item);

  // Update local state if the incoming item changes
  useEffect(() => {
    setEdited(item);
  }, [item]);

  const handleSave = () => {
    onSave(edited);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(openState) => { if (!openState) onClose(); }}>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
          <DialogDescription>
            Update the details for your inventory item below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Item Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="itemName" className="text-right">Item Name</Label>
            <Input
              id="itemName"
              value={edited.name}
              onChange={(e) => setEdited({ ...edited, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          {/* Category Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Input
              id="category"
              value={edited.category}
              onChange={(e) => setEdited({ ...edited, category: e.target.value })}
              className="col-span-3"
            />
          </div>
          {/* Quantity Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={edited.quantity.toString()}
              onChange={(e) =>
                setEdited({ ...edited, quantity: parseInt(e.target.value, 10) || 0 })
              }
              className="col-span-3"
            />
          </div>
          {/* Price Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input
              id="price"
              type="number"
              value={edited.price.toString()}
              onChange={(e) =>
                setEdited({ ...edited, price: parseFloat(e.target.value) || 0 })
              }
              className="col-span-3"
            />
          </div>
          {/* Optionally, if you want to allow editing location and color, add fields here */}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave} className="bg-green-500 hover:bg-green-700 cursor-pointer">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryEditModal;
