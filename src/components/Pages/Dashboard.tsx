import React from 'react'
import InventoryGauge from '../Gauges/InventoryGauge'
import CategoryDist from '../Gauges/CategoryDist'
import InventoryReports from '../Gauges/InventoryReports'
import MoneySpent from '../Gauges/MoneySpent'
const Dashboard: React.FC = () => {
    return (
        <>
            <section className='py-16 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 sm:py-20 lg:py-24'>
                <div className='text-center'>
                    <h2 className='text-4xl font-bold text-gray-900 sm:text-5xl font-pj'>Welcome user to your personalized dashboard</h2>
                    <p className="mt-4 text-lg text-gray-700 sm:mt-6 font-pj">
                        Ready to take control? Start adding your items and let Casa Pro do the rest to keep your home organized.
                    </p>
                </div>
                <div className='mt-4 flex flex-wrap gap-8 items-center justify-center mx-auto'>
                    <div className='w-80 h-80 bg-white  shadow-md rounded-xl'>
                        <InventoryGauge />
                    </div>
                    <div className="w-80 h-80 bg-white shadow-md rounded-xl flex items-center justify-center">
                        <CategoryDist />
                    </div>

                    <div className='w-80 h-80 bg-white rounded-xl shadow-md'>
                        <InventoryReports />
                    </div>
                    <div className='w-80 h-80 bg-white rounded-xl shadow-md'>
                        <MoneySpent />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Dashboard