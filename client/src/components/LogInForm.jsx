import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const LogInForm = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [formErrors, setFormErrors] = useState("");
    let history = useHistory();

    const login = (e) => {
        e.preventDefault();
        let formInfo = {email, password};
        axios.post('http://localhost:8000/api/users/login', formInfo, {withCredentials: true})
        .then((response) => {
            console.log(response)
            if(response.data.error){
                setFormErrors(response.data.error)
            }
            else{
                history.push('/dashboard')
            }
        })
        .catch((error) => {console.log(error)});
    }


    return (
        <div className="container">
            <h3>Log in</h3>
            <form onSubmit={login}>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                    <p>{formErrors}</p>
                </div>
                <input type="submit" className="btn btn-secondary mt-2" value="Log In"/>
            </form>
        </div>
    )
}

export default LogInForm;