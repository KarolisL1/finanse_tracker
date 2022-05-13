import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Main from "./Main";

const Dashboard = (props) => {

    let [user, setUser] = useState({});
    let [expenses, setExpenses] = useState([]);
    let history = useHistory();
    let [time, setTime] = useState(false);
    let [chart, setChart] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getloggedinuser', {withCredentials: true})
            .then(res => {
                console.log("Succesfull log in:", res)
                setTime(false)
                setChart(false)
                if(res.data.results){
                    setUser(res.data.results)
                    props.setLogInUserId(res.data.results._id)
                    console.log("Log in user id is:", res.data.results._id)
                    axios.get(`http://localhost:8000/api/expenses/user/${res.data.results._id}`, {withCredentials: true})
                    .then(res => {
                        console.log("Expenses:", res)
                        setExpenses(res.data.results)
                    }
                    )
                    .catch(err => {
                        console.log("Error :",err)
                    }
                    )
                }
            })
            .catch(err => {
                console.log("Error :",err)
                history.push("/")
            })

    }, [])

    const logout = () => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials: true})
            .then(res => {
                console.log("Succesfull log out:", res)
                history.push("/")
            })
            .catch(err => {
                console.log("Error :",err)
            })
    }

    const deleteExpense = (id) => {
        axios.delete(`http://localhost:8000/api/expenses/delete/${id}`, {withCredentials: true})
            .then(res => {
                console.log("Succesfull delete:", res)
                history.push("/dashboard")
                setExpenses(expenses.filter(expense => expense._id !== id))
            })
            .catch(err => {
                console.log("Error :",err)
            })
    }

    return (
    <div>
        <h1>Hi {user.firstName}</h1>

        <Link className="btn btn-info m-2" to={"/new"}>+ add an item</Link>
        <Link className="btn btn-success"to={"/chart"}>Chart</Link>

        <button className="btn btn-danger m-2" onClick={logout}>Log Out</button>
        <table className="table table-sm container w-50">
            <thead>
                <tr>
                <th>Expense name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(expense => (
                    <tr key={expense._id}>
                        <td>{expense.itemName}</td>
                        <td>{expense.price}</td>
                        <td>{expense.description}</td>
                        <td>{expense.date.slice(0,10)}</td> 
                        <td>{expense.category}</td>
                        <td>
                            <button className="btn btn-secondary" onClick={(e)=>{deleteExpense(expense._id)}}>Delete</button>
                            <Link className="btn btn-secondary m-2" to={`/expenses/${expense._id}/edit`}>Edit</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}

export default Dashboard;