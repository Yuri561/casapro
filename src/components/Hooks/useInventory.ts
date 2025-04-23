import { useEffect, useState } from "react";
import { userInventory } from "../../UserAuth/user_auth";
import { useAuth } from "../../context/AuthContext";

export type Product = {
  updatedAt: any;
  createdAt: any;
  _id?: string;
  id: number;
  name: string;
  category: string;
  location: string;
  quantity: number;
  price: number;
  color: string;
};

export default function useInventory() {
  const [inventoryData, setInventoryData] = useState<Product[]>([]);
  const {isAuthenticated} = useAuth()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id || !isAuthenticated) return;

      try {
        const response = await userInventory();
        if (response.status === 200) {
          setInventoryData(response.data.user_inventory);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [isAuthenticated]);
  const totalItems = inventoryData.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );
  const uniqueCategories = [... new Set(inventoryData.map(item => item.category))];
  const totalCategories = uniqueCategories.length
  const totalAmount = inventoryData.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalAmount);

  return { inventoryData, totalItems, totalCategories, formattedTotal, loading };
}
