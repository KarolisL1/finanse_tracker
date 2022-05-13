import React from "react";
import { Bar } from "react-chartjs-2";
const ExpenseChart = (props) => {
    return (
        <div className="charts-card">
            <Bar
                data={props.data}
                // options={options}
            />
        </div>
    );
};
export default ExpenseChart;