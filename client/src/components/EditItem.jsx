import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory, Link } from "react-router-dom";

const EditItem = () => {
    const { id } = useParams();
    let [itemName, setItemName] = useState('');
    let [price, setPrice] = useState('');
    let [date, setDate] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState('');

    let [formErrors, setFormErrors] = useState({});

    let history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/expenses/${id}`)
        .then(res => {
            console.log(res)
            setItemName(res.data.results.itemName);
            setPrice(res.data.results.price);
            setDate(res.data.results.date);
            setDescription(res.data.results.description);
            setCategory(res.data.results.category);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const updateExpense = (e) => {
        e.preventDefault();
        let updateForm = {itemName, price, date, description, category};
        console.log(updateForm)
        axios.put(`http://localhost:8000/api/expenses/edit/${id}`, updateForm )
            .then(res => { 
                console.log("bla bla", res.data)
                if(res.data.error){
                    setFormErrors(res.data.error.errors);
                }else{
                    console.log("Success:")
                    history.push('/dashboard')
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="container w-50">
        <h3>Let's Edit an expense</h3>
        <form onSubmit={updateExpense}>
            <div className="form-group">
                <label htmlFor="">Expense Name</label>
                <input type="text" name="itemName" className="form-control" onChange={(e)=>setItemName(e.target.value)} value={itemName}/>
                <p>{formErrors.itemName?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Price</label>
                <input type="text" name="price" className="form-control" onChange={(e)=>setPrice(e.target.value)} value={price}/>
                <p>{formErrors.price?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Description</label>
                <input type="text" name="description" className="form-control" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                <p>{formErrors.description?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Date</label>
                <input type="date" name="date" className="form-control" onChange={(e)=>setDate(e.target.value)} value={date.slice(0,10)}/>
                <p>{formErrors.date?.message}</p>
            </div>
            <div className="form-group">
                <label htmlFor="">Category: </label>
                {/* <input type="text" name="category" className="form-control" onChange={(e)=>setCategory(e.target.value)} value={category}/> */}
                <select value={category} className="custom-select w-75" onChange={(e)=>setCategory(e.target.value)}>
                    {/* <option selected>{category}</option> */}
                    <option>Food</option>
                    <option>Gas</option>
                    <option>Clothes</option>
                    <option>Other</option>
                </select>
                <p>{formErrors.category?.message}</p>
            </div>
            <input type="submit" className="btn btn-primary m-2" value="Update"/>
            <Link to="/dashboard" className="btn btn-secondary m-2">Dashboard</Link>
        </form>
    </div>
    )

}
export default EditItem