import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const NewItem = (logInUserId) => {

    const options = [
        {
            label: "Food",
            value: "Food",
        },
        {
            label: "Gas",
            value: "Gas",
        },
        {
            label: "Clothes",
            value: "Clothes",
        },
        {
            label: "Other",
            value: "Other",
        },];
    let [itemName, setItemName] = useState('');
    let [price, setPrice] = useState('');
    let [date, setDate] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState(options[0].value);
    // let [user1, setUser1] = useState({});

    let [formErrors, setFormErrors] = useState({});

    let history = useHistory();

    const addExpense = (e) => {
        e.preventDefault();
        // console.log(logInUserId.logInUserId)
        let item = {itemName, price, date, description, category, user_id: logInUserId.logInUserId};
        axios.post('http://localhost:8000/api/expenses/new', item, {withCredentials: true})
        .then((response) => {
            // console.log("I'm here")
            // console.log(response)
            // console.log("User info:",props)
            if(response.data.errors){
                setFormErrors(response.data.errors)
            }
            else{
                console.log("I'm HERE Succesfull add:", item)
                history.push('/dashboard')
            }
        })
        .catch((error) => {console.log(error)});
        }

    return (

        <div className="container w-25">
        <h3>Let's add an expense</h3>
        <form onSubmit={addExpense}>
            <div className="form-group">
                <label htmlFor="">Expense Name</label>
                <input type="text" name="itemName" className="form-control" onChange={(e)=>setItemName(e.target.value)}/>
                <p>{formErrors.itemName?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Price</label>
                <input type="text" name="price" className="form-control" onChange={(e)=>setPrice(e.target.value)}/>
                <p>{formErrors.price?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Description</label>
                <input type="text" name="description" className="form-control" onChange={(e)=>setDescription(e.target.value)}/>
                <p>{formErrors.description?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Date</label>
                <input type="date" name="date" className="form-control" onChange={(e)=>setDate(e.target.value)}/>
                <p>{formErrors.date?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Category: </label>
                {/* <input type="text" name="category" className="form-control" onChange={(e)=>setCategory(e.target.value)}/> */}
                <select className="custom-select w-75" onChange={(e)=>setCategory(e.target.value)}>
                    <option >Food</option>
                    <option >Gas</option>
                    <option >Clothes</option>
                    <option >Other</option>
                </select>

                {/* <div id="App">
                    <div className="select-container">
                        <select onChange={(e)=>setCategory(e.target.value)}>
                            {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div> */}

                <p>{formErrors.category?.message}</p>
            </div>
            <input type="submit" className="btn btn-primary m-2" value="Register"/>
            <Link to="/dashboard" className="btn btn-secondary m-2">Dashboard</Link>
        </form>
    </div>
    )
}
export default NewItem;