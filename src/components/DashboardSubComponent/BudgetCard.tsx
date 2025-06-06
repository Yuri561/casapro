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
    userId: string;
    onGoalAdded?: () => void
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budgetGoals, userId, onGoalAdded }) => {
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
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-500">
                <h3 className="flex items-center gap-2 text-teal-600 font-bold text-lg mb-4">
                    <FaBullseye /> Category Budget Goals
                </h3>

                <ul className="space-y-4 text-gray-700 text-sm">
                    {budgetGoals.map((goal, i) => {
                        const percent = (goal.current / goal.limit) * 100;
                        const progressColor =
                            percent >= 100
                                ? "bg-red-500"
                                : percent >= 80
                                    ? "bg-yellow-500"
                                    : "bg-blue-500";

                        return (
                            <li key={i}>
                                <div className="flex justify-between mb-1">
                                    <span>{goal.category}</span>
                                    <span className="font-semibold">
                                        {formatCurrency(goal.current)} / {formatCurrency(goal.limit)}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${progressColor}`}
                                        style={{ width: `${Math.min(percent, 100)}%` }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex item-center justify-between">
                    <button
                        onClick={() => {
                            setModalMode("add");
                            setIsModalOpen(true);
                        }}
                        className="mt-4 text-sm text-teal-600 cursor-pointer underline hover:text-teal-800"
                    >
                        + Set New Goal
                    </button>
                    <button
                        onClick={() => {
                            setModalMode("remove");
                            setIsModalOpen(true);
                        }}
                        className="mt-4 text-sm text-red-600 cursor-pointer underline hover:text-teal-800"
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
                userId={userId}
                mode={modalMode}
                budgetGoals={budgetGoals}
            />
        </div>
    );
};

export default BudgetCard;
