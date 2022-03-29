import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Dashboard = () => {

    let [user, setUser] = useState({});
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/getloggedinuser', {withCredentials: true})
            .then(res => {
                console.log("Succesfull log in:", res)
                if(res.data.results){
                    setUser(res.data.results)
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

    return (
    <div>
        <h1>Hi {user.firstName}</h1>
        <Link to={"/new"}>+ add an item</Link>
        <button className="btn btn-danger m-2" onClick={logout}>Log Out</button>
        <table class="table table-sm container w-50">
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                </tr>
            </tbody>
        </table>

    </div>
);
}

export default Dashboard;