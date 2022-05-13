import React, { useEffect, useState} from "react";
import ExpenseChart from "./ExpenseChart";
import PieChart from "./PieChart";
import Chart from 'chart.js/auto'
import axios from "axios";
import {Link} from "react-router-dom";
export default function Main(logInUserId) {
//You can make API call to get the necessary data here
//and pass as props to relevant chart component
//Example of 3 different data sets 

let [expenses, setExpenses] = useState([]);
let totalFood = 0;
let totalClothes = 0;
let totalOther = 0;
let totalGas = 0
let [data1, setData1] = useState([]);
let [data2, setData2] = useState([]);
let [loaded, setLoaded ] = useState(false);


useEffect(() => {
    axios.get(`http://localhost:8000/api/expenses/user/${logInUserId.logInUserId}` , {withCredentials: true})
    .then(res => {
        console.log("Expenses:", res)
        setExpenses(res.data.results)
    
        // let foodExpenses = res.data.results.filter(expense=>{
        //     return expense.category === "Food";
        // })
        // let clothesExpenses = res.data.results.filter(expense=>{
        //     return expense.category === "Clothes";
        // })
        // let otherExpenses = res.data.results.filter(expense=>{
        //     return expense.category === "Other";
        // })
        // let gasExpenses = res.data.results.filter(expense=>{
        //     return expense.category === "Gas";
        // })
        
        res.data.results.forEach(expense => {
            if (expense.category === "Food"){
                totalFood+=expense.price;
            }
            else if (expense.category === "Clothes"){
                totalClothes+=expense.price;
            }
            else if (expense.category === "Other"){
                totalOther+=expense.price;
            }
            else if (expense.category === "Gas"){
                totalGas+=expense.price;
            }
        })
        // clothesExpenses.forEach(expense => {
        //     totalClothes+= expense.price;
        // })
        // otherExpenses.forEach(expense => {
        //     totalOther += expense.price;
        // })
        // gasExpenses.forEach(expense => {
        //     totalGas += expense.price;
        // })

        let obj = {
            "01": 0,
            "02": 0,
            "03": 0,
            "04": 0,
            "05": 0,
            "06": 0,
            "07": 0,
            "08": 0,
            "09": 0,
            "10": 0,
            "11": 0,
            "12": 0,
        }

        //by month
        res.data.results.forEach(expense=>{
            let month = expense.date.slice(5,7);
            obj[month] += expense.price;
        })

        console.log(obj)
        let objValues = Object.values(obj);
        setData2(objValues);

        setData1([totalFood, totalClothes, totalOther, totalGas])
        setLoaded(true);

    })
    .catch(err => {
        console.log("Error :",err)
    }
    )
}, [])

function displaySomething(){
    if(loaded === true){
        let dataSet = {
            labels: ["Food", "Clothes", "Gas", "Other"],
            datasets: [
                {
                label: "Data1",
                data: data1,
                backgroundColor: ['rgba(87, 121, 234, 0.6)', 'blue', 'red', 'orange'],
                borderColor: "rgba(87, 121, 234, 0.6)",
                order: 1,
                },
            ],
        };
        return (
            <>
                <Link to={'/dashboard'}>Back to Dashboard</Link>
                <PieChart data = {dataSet}/>
            </>);
    }else{
        return "Loading";
    }

}
function bymonth(){
    if(loaded === true){
        let dataSet2 = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                label: "Data1",
                data: data2,
                backgroundColor: ['rgba(87, 121, 234, 0.6)', 'blue', 'red', 'orange'],
                borderColor: "rgba(87, 121, 234, 0.6)",
                order: 1,
                },
            ],
        };
        return  <ExpenseChart data = {dataSet2}/>;
    }else{
        return "Loading";
    }
}
//Inside data props

return (
    <>
        <div className="container w-50">
            {displaySomething()}
        </div>
        <div className="container w-50">
            {bymonth()}
        </div>
    </>
    );
}