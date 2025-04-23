import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addBudget, deleteBudget } from "../../UserAuth/user_auth";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { toast } from "react-toastify";

interface BudgetGoals {
  category: string;
  limit: number;
  current: number;
}

interface SetGoalModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  mode: "add" | "remove";
  budgetGoals: BudgetGoals[];
}

const categories = ["groceries", "toiletries", "electronics", "tools", "pantry", "general"];

const SetGoalModal: React.FC<SetGoalModalProps> = ({
  open,
  onClose,
  onSuccess,

  mode,
  budgetGoals,
}) => {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!category || limit <= 0) return;

    setLoading(true);
    try {
      await addBudget({ category, limit });
      onSuccess();
      toast.success("your budget goal was created successfully!")
      onClose();
    } catch (err) {
      console.error("Error adding goal:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!category) return;
  
    setLoading(true);
    try {
      await deleteBudget(category); 
      onSuccess();
      toast.success("Your budget category was deleted successfully!") 
    } catch (err) {
      console.error("Error removing goal:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
      <Dialog open={open} onOpenChange={(o) => o || onClose()}>
      <DialogContent className="bg-white text-slate-800 border-none shadow-lg">
        {loading && mode === "add" && <LoadingAnimation />}
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Set New Budget Goal" : "Remove Budget Goal"}
          </DialogTitle>
        </DialogHeader>


        <div className="space-y-8">
          <div className="bg-white text-slate-800">
            <Label className="py-3">
              {mode === "add" ? "Category" : "Select Goal to Remove"}
            </Label>
            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    mode === "add" ? "Select category" : "Choose goal category"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-800 shadow-lg border rounded-md">
              {(mode === "add" ? categories : (budgetGoals ?? []).map((g) => g.category)).map(
                  (cat) => (
                    <SelectItem
                      className="hover:bg-slate-300"
                      key={cat}
                      value={cat}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {mode === "add" && (
            <div>
              <Label className="py-3">Budget Limit ($)</Label>
              <Input
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseFloat(e.target.value))}
                placeholder="Enter budget limit"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            onClick={mode === "add" ? handleSave : handleRemove}
            className={`text-white ${
              mode === "add"
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading
              ? mode === "add"
                ? "Saving..."
                : "Removing..."
              : mode === "add"
              ? "Save Goal"
              : "Remove Goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetGoalModal;
