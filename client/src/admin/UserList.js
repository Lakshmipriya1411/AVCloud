import React, { useState } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Navi from "../common/Navi";

var rows = [];

export default function UserList() {
    Axios.defaults.withCredentials = true;
    
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const userItemClick = (user) =>{
        let id = user.target.parentElement.dataset.key;
        history.push("/admin/users/details/" + id);
    }

    Axios.get('http://localhost:3001/admin/users/list',).then(function(res) {
      console.log(res);
      rows = res.data;
      setLoading(false);
    });

    
    if (loading) {
        return (<BasePage> Loading data.... </BasePage>);
    }
        return (
        <div>
         <h4>Members</h4>
            <table className="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Member Name</th>
                        <th>Membership Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(res =>
                        <tr key={res.user_id} data-key={res.user_id} onClick={userItemClick}>
                          <td>{res.user_id}</td>
                          <td>{res.f_name} {res.l_name}</td>
                          <td>{res.membership_name}</td>
                          <td>{res.start_date}</td>
                          <td>{res.end_date}</td>
                          <td>{res.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        );
    }

