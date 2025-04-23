import { useEffect, useRef, useState } from "react";
import { showBudget } from "../../UserAuth/user_auth";

export interface BudgetGoal {
  category: string;
  limit: number;
}

const useBudgetGoals = (userId: string) => {
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const hasFetchedRef = useRef(false);

useEffect(() => {
  if (!userId || hasFetchedRef.current) return;

  const fetchGoals = async () => {
    try {
      const res = await showBudget();
      if (Array.isArray(res.data)) {
        setBudgetGoals(res.data);
      } else if (res.data.user_budget) {
        setBudgetGoals(res.data.user_budget); 
      }
    } catch (err) {
      console.error("Failed to load budget goals", err);
    } finally {
      setLoading(false);
    }
  };

  fetchGoals();
  hasFetchedRef.current = true;
}, [userId]);


  return { budgetGoals, loading };
};

export default useBudgetGoals;
