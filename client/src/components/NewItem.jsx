import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const NewItem = () => {

    let [itemName, setItemName] = useState('');
    let [price, setPrice] = useState('');
    let [date, setDate] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState('');

    let [formerrors, setFormErrors] = useState({});

    let history = useHistory();

    const addItem = (e) => {
        e.preventDefault();
        let item = {itemName, price, date, description, category};
        axios.post('http://localhost:8000/api/expenses/new', item, {withCredentials: true})
        .then((response) => {
            console.log(response)
            if(response.data.errors){
                setFormErrors(response.data.errors)
            }
            else{
                history.push('/dashboard')
            }
        })

        .catch((error) => {console.log(error)});
        }

}
export default NewItem;