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
import { Checkbox } from "../ui/checkbox";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { deleteInventory, updatedQuantities } from "../../UserAuth/user_auth";
import { Product } from "../Hooks/useInventory";

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
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const categories = [
    "all",
    "electronics",
    "pantry",
    "tools",
    "toiletries",
    "groceries",
    "general",
  ];

  // Reset local state when item changes
  useEffect(() => {
    setEdited(item);
    setIsChecked(false);
    setLoading(false);
  }, [item]);

  // Save edits
  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(edited);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  // Delete or partial delete
  const handleDelete = async () => {
    setLoading(true);
    try {
      const id = item._id;
      if (!id) throw new Error("No item selected");

      if (isChecked) {
        // Full delete
        const res = await deleteInventory(id, item);
        if (res.status === 200) onDelete(item);
      } else {
        // Partial delete: compute how many were removed
        const decrement = item.quantity - edited.quantity;
        if (decrement > 0) {
          const res = await updatedQuantities(id, decrement);
          if (res.status === 200) {
            // Reflect new quantity in parent via onSave
            onSave({ ...edited });
          }
        } else {
          console.warn("No items removed for partial delete");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => o || onClose()}>
      {loading && <LoadingAnimation />}
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
          <DialogDescription>
            Update the details for your inventory item below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="itemName" className="text-right">
              Item Name
            </Label>
            <Input
              id="itemName"
              value={edited.name}
              onChange={(e) => setEdited({ ...edited, name: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
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
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={edited.quantity.toString()}
              onChange={(e) =>
                setEdited({
                  ...edited,
                  quantity: parseInt(e.target.value, 10) || 0,
                })
              }
              className="col-span-3"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={edited.price.toString()}
              onChange={(e) =>
                setEdited({
                  ...edited,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="col-span-3"
            />
          </div>

          {/* Entire Item Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="entire-item"
              checked={isChecked}
              onCheckedChange={(checked) => {
                setIsChecked(checked === true);
              }}
            />
            <Label htmlFor="entire-item" className="text-sm">
              Delete Entire Item
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            {loading ? "Processing..." : "Delete"}
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white"
          >
            {loading ? "Processing..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryEditModal;
