import React, { useState } from "react";

import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { getCategoryData } from "./Data";

const CategoryDist:React.FC = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        data: getCategoryData(),
        title: {
            text: "Category Distribution",
        },
        series: [
            {
                type: "pie",
                angleKey: "items",
                legendItemKey: "category"
            },
        ],
    });

    return (
        <div className="w-74 h-74 bg-white rounded-xl overflow-hidden shadow-lg ">
            <AgCharts options={options} />;
        </div>
    )

};

export default CategoryDist