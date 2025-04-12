import {useState, useEffect} from 'react'
import { showBudget } from '../../UserAuth/user_auth'

const useBudgetGoals = (userId: string) => {
    const [budgetGoals, setBudgetGoals] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBudget = async () => {
        try {
          const res = await showBudget(userId);
          setBudgetGoals(res.data.user_budget);
        } catch (err) {
          console.error("Error fetching budget goals", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBudget();
    }, [userId]);
  
    return { budgetGoals, loading };
  };
  

export default useBudgetGoals