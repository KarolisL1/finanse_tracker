import React from "react";
import {Pie} from "react-chartjs-2";
const PieChart = (props) => {
    return (
        <div className="charts-card w-75">
            <Pie
                data={props.data}
            />
        </div>
    );
};
export default PieChart;