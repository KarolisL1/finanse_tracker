import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    let [formErrors, setFormErrors] = useState({});
    let history = useHistory();

    const register = (e) => {
        e.preventDefault();
        let user = {firstName, lastName, email, password, confirmPassword};
        axios.post('http://localhost:8000/api/users/register', user, {withCredentials: true})
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

    return (
        <div className="container">
            <h3>Registration</h3>
            <form onSubmit={register}>
                <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input type="text" name="firstName" className="form-control" onChange={(e)=>setFirstName(e.target.value)}/>
                    <p>{formErrors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="lastName" className="form-control" onChange={(e)=>setLastName(e.target.value)}/>
                    <p>{formErrors.lastName?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                    <p>{formErrors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                    <p>{formErrors.password?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="confirmpw" className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <p>{formErrors.confirmPassword?.message}</p>
                </div>
                <input type="submit" className="btn btn-primary mt-2" value="Register"/>
            </form>
        </div>
    )
}

export default RegistrationForm;