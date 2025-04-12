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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { addBudget } from "../../UserAuth/user_auth"; 
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

interface SetGoalModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

const categories = ["groceries", "toiletries", "electronics", "tools", "pantry", "general"];

const SetGoalModal: React.FC<SetGoalModalProps> = ({ open, onClose, onSuccess, userId }) => {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!category || limit <= 0) return;

    setLoading(true);
    try {
      await addBudget(userId, { category, limit });
      onSuccess(); 
      onClose();
    } catch (err) {
      console.error("Error adding goal:", err);
    } finally {
      setLoading(false);
    }
  };
  {loading && <LoadingAnimation />}

  return (
    <Dialog open={open} onOpenChange={(o) => o || onClose()}>
      <DialogContent className="bg-white text-slate-800 border-none shadow-lg">
        <DialogHeader>
          <DialogTitle>Set New Budget Goal</DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          <div className="bg-white text-slate-800">
            <Label className="py-3">Category</Label>
            <Select  onValueChange={(val) => setCategory(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-800 shadow-lg border rounded-md">
                {categories.map((cat) => (
                  <SelectItem className="hover:bg-slate-300" key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="py-3">Budget Limit ($)</Label>
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(parseFloat(e.target.value))}
              placeholder="Enter budget limit"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="ghost">Cancel</Button>
          <Button onClick={handleSave} className="bg-teal-600 text-white hover:bg-teal-700">
            {loading ? "Saving..." : "Save Goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetGoalModal;
