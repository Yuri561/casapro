import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Product } from "../Hooks/useInventory";

interface ReminderProps {
  inventoryData?: Product[];
}

const ReminderCard: React.FC<ReminderProps> = ({ inventoryData = [] }) => {
  const hasInventory = inventoryData.length > 0;

  const reminders = hasInventory
    ? [
        { task: "Check soon-to-expire items", due: "April 10, 2025" },
        { task: "Update pantry quantities", due: "April 13, 2025" },
      ]
    : [];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-3xl blur-2xl pointer-events-none" />

      <div
        className="
          relative
          bg-[#0f172a]
          border border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-8
          shadow-[0_0_35px_rgba(34,211,238,0.12)]
          transition-all duration-300
          hover:shadow-[0_0_45px_rgba(34,211,238,0.2)]
        "
      >
        {/* Header */}
        <h3 className="flex items-center gap-3 text-cyan-400 font-semibold text-xl mb-6">
          <FaCalendarAlt className="text-cyan-400" />
          Upcoming Reminders
        </h3>

        {/* Reminder List */}
        {reminders.length > 0 ? (
          <ul className="space-y-4 text-sm">
            {reminders.map((r, i) => (
              <li
                key={i}
                className="
                  flex justify-between items-center
                  bg-white/5
                  border border-white/10
                  rounded-xl
                  px-4 py-3
                  hover:border-cyan-400/40
                  transition
                "
              >
                <span className="text-gray-200">{r.task}</span>
                <span className="text-gray-400 text-xs">{r.due}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">
              No reminders set yet.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Stay ahead by scheduling inventory checks.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          className="
            mt-8
            w-full
            rounded-xl
            bg-cyan-400
            text-black
            font-semibold
            py-3
            shadow-[0_0_20px_rgba(34,211,238,0.35)]
            hover:bg-cyan-300
            transition-all duration-300
          "
        >
          + Add Reminder
        </button>
      </div>
    </div>
  );
};

export default ReminderCard;