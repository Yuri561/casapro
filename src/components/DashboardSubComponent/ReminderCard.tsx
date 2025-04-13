import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa';
import { Product } from '../Hooks/useInventory';


interface ReminderProps{
    inventoryData?: Product[];
}
const ReminderCard: React.FC<ReminderProps> = ({inventoryData=[]}) => {
    const hasInventory = inventoryData.length > 0;
    const reminders = hasInventory
        ? [
            { task: "Check soon-to-expire items", due: "April 10, 2025" },
            { task: "Update pantry quantities", due: "April 13, 2025" },
        ]
        : [];
    return (
        <div>
            {/* Reminders */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                <h3 className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-4">
                    <FaCalendarAlt /> Upcoming Reminders
                </h3>
                {reminders.length > 0 ? (
                    <ul className="space-y-2 text-gray-700 text-sm">
                        {reminders.map((r, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{r.task}</span>
                                <span className="text-gray-500">{r.due}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No reminders set.</p>
                )}
                <button className="mt-4 text-sm text-blue-600 underline hover:text-blue-800">
                    + Add Reminder
                </button>
            </div>
        </div>
    )
}

export default ReminderCard