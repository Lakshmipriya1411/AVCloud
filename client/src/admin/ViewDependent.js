import React, { useState, useEffect  } from "react";
import BasePage from "../common/BasePage";
import Axios from "axios";
import { useParams } from 'react-router-dom';
import Navi from "../common/Navi";
import { useHistory } from "react-router-dom";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";

var rows = [];


const DependentDetails = (props) => {
  Axios.defaults.withCredentials = true;
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    
    const [showmessage, setShowMessage] = useState(false);
    const defaultValues = {
      user_id: props.user_id,
      d_name: "",
      relationship: "",
    };


    const [depDetails, setDepDetails] = useState(defaultValues);

    const deleteDependent = (dep) => {
      let d_name = dep.target.parentElement.id;
      
      Axios.post('http://localhost:3001/admin/users/dependent/delete', {user_id: props.user_id, d_name: d_name})
      .then((response) => {
        
        console.log('delete successfull.');
        window.location.reload();
      })
      .catch((error) => {
      });
    }

    const addNewDependent = (props) =>{
      Axios.post('http://localhost:3001/admin/users/dependent/insert', 
        { user_id: depDetails.user_id,
          d_name: depDetails.d_name,
          relationship: depDetails.relationship
        }
      ).then((response) => {
          setShowMessage(true);
          window.location.reload();

        })
        .catch((error) => {
        });
    }

    const backToUserDetail = () =>{
      history.goBack();
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/admin/users/view/dependent/' + id).then(function(res) {
        console.log(res);
        rows = res.data;
        console.log(rows);
        setLoading(false);
        
        if(res.data.length === 2){
          if(rows[0].name !== null){
            props.setCanAdd(false);}
          }
        });
      }, []);

  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  } else {
    return (
        
        <div className="pure-form pure-form-aligned">
          <h1 style={{textAlign:"center"}}>Dependents List of {props.user_id}</h1>
          <div className="pure-controls">
          {props.canAdd && <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={() => props.showAddDep()}>
                      Add New Dependent
                  </button>
          </div>}
          <div className="pure-u-1-6"></div>
          <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={backToUserDetail}>
                      Back to User Details
                  </button>
          </div>
          </div>
        <br/>
        <br/>
          <table className="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Dependent Name</th>
                        <th>Relationship</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows[0].name !== null && rows.map(res =>
                        <tr>
                          <td>#</td>
                          <td>{res.name}</td>
                          <td>{res.relationship}</td>
                          <td id={res.name} key={res.name} data-key={res.user_id}>
                            <button className="pure-button pure-button-primary" onClick={deleteDependent}>
                    Delete
                </button></td>                          
                        </tr>
                    )}
                    {props.addDependent && <tr>
                      <td>#</td>
                      <td>
                        <input type="text" id="aligned-name" placeholder="d_name" 
                            onChange={(e) => {
                              setDepDetails({...depDetails, d_name:e.target.value});
                            }}
                        />
                      </td>
                      <td>
                        <input type="text" id="aligned-name" placeholder="relationship" 
                            onChange={(e) => {
                              setDepDetails({...depDetails, relationship:e.target.value});
                            }}
                        />
                      </td>
                      {<td><button className="pure-button pure-button-primary" onClick={addNewDependent}>
                    Add
                </button></td>}
                      </tr>}
                </tbody>
            </table>
            <br/>
            <br/>
            {showmessage && <h2>New dependent added</h2>}
        </div>
    );
  }
}
export default function ViewDependent() {
    Axios.defaults.withCredentials = true;
    
    const { loading, userData } = useLoginValidate();

    let {id} = useParams();    
  
    const [addDependent, setAddDependent] =useState(false);
    const [canAdd, setCanAdd] = useState(true);
    
  
    
    const showAddDep = () =>{
      setAddDependent(true);
      //setDepDetails(defaultValues);
      
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/admin/users/view/dependent/' + id).then(function(res) {
        console.log(res);
        rows = res.data;
        });
      }, []);

      
  
 
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else {
    return (
      <div>
        <Navi></Navi>
      <DependentDetails user_id={id} canAdd={canAdd} setCanAdd={setCanAdd} showAddDep={showAddDep} addDependent={addDependent}/>
      </div>
    )};
  
}
