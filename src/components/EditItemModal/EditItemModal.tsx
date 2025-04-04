import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Product } from "../Hooks/useInventory";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { deleteInventory, updatedQuantities } from "../../UserAuth/user_auth";
import { Checkbox } from "../ui/checkbox";

interface InventoryEditModalProps {
  item: Product;
  open: boolean;
  onClose: () => void;
  onSave: (updatedItem: Product) => void;
  onDelete: (item: Product) => void;
}

const InventoryEditModal: React.FC<InventoryEditModalProps> = ({
  item,
  open,
  onClose,
  onSave,
  onDelete,
}) => {
  const [edited, setEdited] = useState<Product>(item);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const categories: string[] = [
    "all",
    "electronics",
    "pantry",
    "tools",
    "toiletries",
    "groceries",
    "general",
  ];

  // Update local state if the incoming item changes
  useEffect(() => {
    setEdited(item);
  }, [item]);

  const handleSave = async () => {
    try {
      setLoading(true);
      await onSave(edited);
    } catch (error) {
      console.error("Unable to save edits", error);
    } finally {
      onClose();
      setLoading(false);
    }
  };

  const handleDeleteOne = async () => {
    setLoading(true);
    try {
      const item_id: any = item._id;
      if (!item_id) {
        console.error("No item selected");
        return;
      }
      if (isChecked) {
        // Delete the entire item
        const response = await deleteInventory(item_id, item);
        if (response.status === 200) {
          onDelete(item);
        }
      } else {
        // Partial deletion: determine decrement by comparing original and edited quantity
        const decrement = item.quantity - edited.quantity;
        if (decrement > 0) {
          const response = await updatedQuantities(item_id, decrement);
          if (response.status === 200) {
            // Update the edited quantity to reflect the new value
            setEdited({ ...edited, quantity: edited.quantity });
            onSave(item)
            // Optionally, you might call onSave or update the parent's state here.
          }
        } else {
          console.error("No reduction in quantity detected for partial deletion.");
        }
      }
    } catch (error) {
      console.error("Error deleting item", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(openState) => { if (!openState) onClose(); }}>
      {loading && <LoadingAnimation />}
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
            <Label htmlFor="categories" className="text-right">Category</Label>
            <Select
              defaultValue={edited.category.toLowerCase()}
              onValueChange={(value) =>
                setEdited({ ...edited, category: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white text-slate-900">
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem
                      value={cat}
                      key={cat}
                      className="hover:bg-gray-200"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
          {/* Checkbox for Entire Item */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="entire-item"
              onCheckedChange={(checked) => {
                console.log(checked ? "Checked" : "Unchecked");
                setIsChecked(true);
              }}
              checked={isChecked}
            />
            <label
              htmlFor="entire-item"
              className="text-sm font-medium leading-none"
            >
              Entire Item
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleDeleteOne}
            className="bg-red-500 hover:bg-red-700 cursor-pointer"
          >
            {loading ? "Processing..." : "Delete"}
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 cursor-pointer"
          >
            {loading ? "Processing..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryEditModal;
