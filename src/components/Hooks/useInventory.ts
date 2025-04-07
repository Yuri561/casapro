import { useEffect, useState } from "react"
import { userInventory } from "../../UserAuth/user_auth"


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
  const [inventoryData, setInventoryData] = useState<Product[]>([])

  useEffect(() => {
    const fetchInventory = async () => {
      const user_id = localStorage.getItem("user_id")
      if (!user_id) return
      try {
        const response = await userInventory(user_id)
        if (response.status === 200) {
          setInventoryData(response.data.user_inventory)
        }
      } catch (error) {
        console.error("Error fetching inventory:", error)
      }
    }
    fetchInventory()
  }, [])

  return inventoryData
}
