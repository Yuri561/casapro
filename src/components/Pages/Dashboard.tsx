import React, { useEffect, useState } from 'react'
import InventoryGauge from '../Gauges/InventoryGauge'
import CategoryDist from '../Gauges/CategoryDist'
import InventoryReports from '../Gauges/InventoryReports'
import MoneySpent from '../Gauges/MoneySpent'
import InventoryTable from './InventoryTable'
import { Product } from "../Hooks/useInventory";
import { userInventory } from '../../UserAuth/user_auth'
import InventoryTips from './InventoryTips'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'



const Dashboard: React.FC = () => {
    const [username, setUsername] = useState("")
    const [inventoryData, setInventoryData] = useState<Product[]>([])
    const [refreshHistory, setRefreshHistory] = useState(0);
    const [loading, setLoading] = useState(true);


    const handleAddSave = (newItem: Product) => {
        setInventoryData([...inventoryData, newItem]);
        setRefreshHistory(r => r + 1);
    };
    const userId = localStorage.getItem("user_id") || "";

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) setUsername(storedUsername);
      
        const fetchInventory = async () => {
          const user_id = localStorage.getItem("user_id");
          if (!user_id) return;
      
          try {
            const response = await userInventory();
            if (response.status === 200) {
              setInventoryData(response.data.user_inventory);
            }
          } catch (error) {
            console.error("unable to retrieve inventory data:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchInventory();
      }, []);

    if (loading) return <LoadingAnimation />;  
    return (
        <>
            <section className='py-6 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 sm:py-20 lg:py-24'>
                <div className='text-center'>
                    <h2 className='text-4xl font-bold text-gray-900 sm:text-5xl font-pj'>
                        Welcome {username || "back"} to your personalized dashboard
                    </h2>
                    <p className="mt-4 text-lg text-gray-700 sm:mt-6 font-pj">
                        Ready to take control? Start adding your items and let Casa Pro do the rest to keep your home organized.
                    </p>
                </div>
                <div className='mt-4 flex flex-wrap gap-8 items-center justify-center mx-auto'>
                    <div className='w-80 h-80 bg-white  shadow-md rounded-xl'>
                        <InventoryGauge inventoryData={inventoryData}

                        />
                    </div>
                    <div className="w-80 h-80 bg-white shadow-md rounded-xl flex items-center justify-center">
                        <CategoryDist inventoryData={inventoryData} />
                    </div>

                    <div className='w-80 h-80 bg-white rounded-xl shadow-md'>
                        <InventoryReports userId={userId} refresh={refreshHistory} />
                    </div>
                    <div className='w-80 h-80 bg-white rounded-xl shadow-md'>
                        <MoneySpent inventoryData={inventoryData} />
                    </div>
                </div>
            </section>
            <section className=" py-6 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 sm:py-20 lg:py-6">
        <InventoryTips inventoryData={inventoryData || []}
   />
      </section>
            <section className='bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 sm:py-20 lg:py-24'>
                <div className='text-center'>
                    <h2 className='text-4xl font-bold text-gray-900 sm:text-5xl font-pj'>My Inventory</h2>
                    <p className="mt-4 text-lg text-gray-700 sm:mt-6 font-pj">
                        Take better control of your inventory.
                    </p>
                </div>
                <div className="flex-wrap gap-8 items-center justify-center mx-auto px-6 mb-5">
                    <InventoryTable inventoryData={inventoryData}
                        setInventoryData={setInventoryData}
                        onAddSave={handleAddSave}/>
                </div>

            </section>

        </>
    )
}

export default Dashboard