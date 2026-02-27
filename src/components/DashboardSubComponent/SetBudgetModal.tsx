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
  mode: "add" | "remove";
  budgetGoals: BudgetGoals[];
}

const categories = [
  "groceries",
  "toiletries",
  "electronics",
  "tools",
  "pantry",
  "general",
];

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
    if (!category || limit <= 0) {
      toast.error("Please select a category and enter a valid limit.");
      return;
    }

    setLoading(true);
    try {
      await addBudget({ category, limit });
      toast.success("Budget goal created successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding goal:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!category) {
      toast.error("Please select a category to remove.");
      return;
    }

    setLoading(true);
    try {
      await deleteBudget(category);
      toast.success("Budget category removed successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error removing goal:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => o || onClose()}>
      <DialogContent
        className="
          relative
          bg-[#0f172a]
          text-white
          border border-white/10
          backdrop-blur-xl
          rounded-3xl
          shadow-[0_0_60px_rgba(34,211,238,0.18)]
          overflow-hidden
        "
      >
        {/* Floating glow effects */}
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

        {loading && <LoadingAnimation />}

        <DialogHeader>
          <DialogTitle className="text-3xl font-bold tracking-tight">
            {mode === "add"
              ? "Create Budget Goal"
              : "Remove Budget Goal"}
          </DialogTitle>

          <p className="text-gray-400 text-sm mt-3 max-w-md">
            {mode === "add"
              ? "Set a monthly spending cap for a category to stay in control of your finances."
              : "This will permanently remove the spending cap for the selected category."}
          </p>
        </DialogHeader>

        <div className="space-y-8 mt-8">
          {/* Category Select */}
          <div>
            <Label className="text-gray-300 mb-2 block">
              Category
            </Label>

            <Select onValueChange={(val) => setCategory(val)}>
              <SelectTrigger className="bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-0">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent className="bg-[#0f172a] text-white border border-white/10 shadow-xl rounded-xl">
                {(mode === "add"
                  ? categories
                  : (budgetGoals ?? []).map((g) => g.category)
                ).map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="hover:bg-white/10 focus:bg-white/10"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {category && (
              <p className="text-xs text-cyan-400 mt-2">
                Selected: {category.toUpperCase()}
              </p>
            )}
          </div>

          {/* Limit Input */}
          {mode === "add" && (
            <div>
              <Label className="text-gray-300 mb-2 block">
                Monthly Budget Limit ($)
              </Label>

              <Input
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseFloat(e.target.value))}
                placeholder="Enter budget limit"
                className="bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-0"
              />

              <p className="text-xs text-gray-500 mt-2">
                Example: 300 means you’ll get alerted before spending exceeds $300.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="mt-12 flex justify-between items-center">
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>

          <Button
            onClick={mode === "add" ? handleSave : handleRemove}
            className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
              mode === "add"
                ? "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                : "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_25px_rgba(239,68,68,0.4)]"
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