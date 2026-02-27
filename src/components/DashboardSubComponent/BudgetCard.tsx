import React, { useState } from "react";
import { FaBullseye } from "react-icons/fa";
import SetGoalModal from "./SetBudgetModal";

interface BudgetGoal {
  category: string;
  limit: number;
  current: number;
}

interface BudgetCardProps {
  budgetGoals: BudgetGoal[];
  userId?: string;
  onGoalAdded?: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  budgetGoals,
  
  onGoalAdded,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "remove">("add");

  const formatCurrency = (value: number | undefined | null) => {
    if (typeof value !== "number" || isNaN(value)) return "$0.00";
    return value >= 1000
      ? `$${(value / 1000).toFixed(2)}K`
      : `$${value.toFixed(2)}`;
  };

  return (
    <div>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_25px_rgba(20,184,166,0.15)]">

        {/* Header */}
        <h3 className="flex items-center gap-2 text-teal-400 font-semibold text-lg mb-6">
          <FaBullseye /> Category Budget Goals
        </h3>

        {/* Goals List */}
        <ul className="space-y-6 text-sm">
          {budgetGoals.map((goal, i) => {
            const percent =
              goal.limit > 0
                ? (goal.current / goal.limit) * 100
                : 0;

            const progressColor =
              percent >= 100
                ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                : percent >= 80
                ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]";

            return (
              <li key={i}>
                <div className="flex justify-between mb-2 text-gray-300">
                  <span className="capitalize text-white">
                    {goal.category}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(goal.current)} /{" "}
                    {formatCurrency(goal.limit)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${progressColor}`}
                    style={{
                      width: `${Math.min(percent, 100)}%`,
                    }}
                  />
                </div>

                {/* Percentage Label */}
                <div className="text-xs text-gray-500 mt-1">
                  {percent.toFixed(0)}% Used
                </div>
              </li>
            );
          })}

          {budgetGoals.length === 0 && (
            <p className="text-gray-500 text-sm">
              No budget goals set yet.
            </p>
          )}
        </ul>

        {/* Actions */}
        <div className="flex justify-between mt-8 text-sm">
          <button
            onClick={() => {
              setModalMode("add");
              setIsModalOpen(true);
            }}
            className="text-cyan-400 hover:text-cyan-300 transition underline"
          >
            + Set New Goal
          </button>

          <button
            onClick={() => {
              setModalMode("remove");
              setIsModalOpen(true);
            }}
            className="text-red-400 hover:text-red-300 transition underline"
          >
            - Remove Goal
          </button>
        </div>
      </div>

      <SetGoalModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          onGoalAdded?.();
        }}
        mode={modalMode}
        budgetGoals={budgetGoals}
      />
    </div>
  );
};

export default BudgetCard;