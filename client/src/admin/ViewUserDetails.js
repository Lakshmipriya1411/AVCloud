import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLoginValidate } from "../common/Validate";
import redirectLogin from "../common/redirectLogin";
import Navi from "../common/Navi";
import BasePage from "../common/BasePage";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

let userDetail = {};

const UserDetails = (props) => {

    Axios.defaults.withCredentials = true;
    let { id } = useParams();
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const goBackToAdmin = () =>{
      //console.log(props.viewer_id + userDetail.user_id);
      history.push("/admin/users");
    }

    const upgradeMembership = () =>{
      console.log('in method upgradeMembership');
      Axios.post('http://localhost:3001/admin/upgrade/create', {user_id: id, c_mem_type: userDetail.membership_type})
        .then((response) => {
          })
          .catch((error) => {
          });
    }

    const approveUser = () =>{
      console.log('in method approveUser');
      Axios.post('http://localhost:3001/admin/users/activate', {user_id: id})
        .then((response) => {
            //history.push("/admin");
          })
          .catch((error) => {
          });
    }

    const deleteUser = () =>{
      console.log('in method deleteUser');
      Axios.post('http://localhost:3001/admin/users/delete', {user_id: id})
      .then((response) => {
        //history.push("/admin");
      })
      .catch((error) => {
      });
    }

    const veiwDependents = () =>{
        history.push("/admin/users/view/dependent/" + userDetail.user_id)
    }

    useEffect(() => {
      Axios.get('http://localhost:3001/admin/users/details/' + id).then(function(res) {
      console.log(res);
      userDetail = res.data;
      console.log(userDetail.auth_id.data[0]);
      setLoading(false);
      });
    }, []);

    if (loading) {
        return <BasePage> Loading data.... </BasePage>;
    }

    return (
      <fieldset className="user-details">
        <div className="pure-control-group">
          <label htmlFor="aligned-name">User Id: </label>
          <label id="aligned-name">{userDetail.user_id}</label>
        </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">First Name: </label>
            <label id="aligned-name">{userDetail.f_name}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Last Name: </label>
            <label id="aligned-name">{userDetail.l_name}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Email Id: </label>
            <label id="aligned-name">{userDetail.email_id}</label>
          </div>

          <div className="pure-control-group">
            <label htmlFor="aligned-name">Address: </label>
            <label id="aligned-name">
                <p>{userDetail.street}
                <br/>{userDetail.city} , {userDetail.zip_code}
                </p>
            </label>
          </div>

          {userDetail.membership_name && <div className="pure-control-group">
            <label htmlFor="aligned-name">Membership Type: </label>
            <label id="aligned-name">{userDetail.membership_name}</label>
          </div>}

         {userDetail.start_date && <div className="pure-control-group">
            <label htmlFor="aligned-name">Start Date: </label>
            <label id="aligned-name">{userDetail.start_date}</label>
          </div>
          }

          {userDetail.end_date && <div className="pure-control-group">
            <label htmlFor="aligned-name">End Date: </label>
            <label id="aligned-name">{userDetail.end_date}</label>
          </div>}

          {userDetail.auth_id.data[0] === 0 && <div className="pure-control-group">
            <label htmlFor="aligned-name">Membership Status: </label>
            <label id="aligned-name">{userDetail.status}</label>
          </div>}

          {userDetail.auth_id.data[0] === 1 && <div className="pure-control-group">
            <label htmlFor="aligned-name">User Status: </label>
            <label id="aligned-name">{userDetail.status}</label>
          </div>}

          <br/>
          <br/>
          <div className="pure-control-group">
            {
              (userDetail.status === 'Pending' || userDetail.status === 'Expired') && props.isAdmin === 1 &&
              <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={approveUser}>
                    Activate Member
                </button>
              </div>
            }
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={() => props.updateUserDetails(userDetail)}>
                  Update Details
              </button>
            </div>

            {userDetail.membership_type !== 0 && userDetail.membership_name &&
              <div className="pure-u-1-6">
                  <button className="pure-button pure-button-primary" onClick={veiwDependents}>
                        View Dependents
                  </button>
              </div>
            }

            {props.isAdmin === 0 && userDetail.membership_type !== 2 &&
                <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={upgradeMembership}>
                      Upgrade Membership
                  </button>
                </div>
            }

            { (props.viewer_id !== userDetail.user_id) && props.isAdmin === 1 && 
                <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={deleteUser}>
                      Delete User
                  </button>
                </div>
            }
            { props.isAdmin === 1 && 
                <div className="pure-u-1-6">
                <button className="pure-button pure-button-primary" onClick={goBackToAdmin}>
                      Go to User List
                  </button>
                </div>
           }
          </div>

      </fieldset>
    );
}

const UpdateUserDetails = (props) => {
  const [invalid, setInvalid] = useState({
    zip_code: false,
    street: false,
    city: false,
  });

  const [message, setMessage] = useState("");

  const updateUserDetails = () => {
    if (
      props.details.city.trim() === "" ||
      props.details.street.trim() === "" ||
      props.details.zip_code.length < 5
    ) {
      setMessage("Please fill all fields");
      props.setShowDetails(false);
    } else if (
      props.details.zip_code.includes(" ") 
    ) {
      setMessage("Space character not allowed in zip_code");
      props.setShowDetails(false);
    }else{
    Axios.post("http://localhost:3001/admin/users/update", 
        { userId: props.details.user_id,
          isAdmin: props.isAdmin,
          street: props.details.street,
          city: props.details.city,
          zip_code: props.details.zip_code,
          start_date: props.details.start_date,
          end_date: props.details.end_date,
          membership_type: props.details.membership_type}
      )
        .then((response) => {
        })
        .catch((error) => {
        });
      }
  };

  const cancelUpdate = () => {} 

  return (
    <fieldset className="user-details">
        <div className="pure-control-group">
          <label htmlFor="aligned-name">User Id: </label>
          <label id="aligned-name">{props.details.user_id}</label>
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">First Name: </label>
          <label id="aligned-name">{props.details.f_name}</label>
        </div>
        
        <div className="pure-control-group">
          <label htmlFor="aligned-name">Last Name: </label>
          <label id="aligned-name">{props.details.l_name}</label>
        </div>

        <div className="pure-control-group">
            <label htmlFor="aligned-name">Email Id: </label>
            <label id="aligned-name">{userDetail.email_id}</label>
          </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-name">Street: </label>
          <input
            type="text"
            id="aligned-name" placeholder="Street" 
            value={props.details.street}
            error={invalid.street}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, street: validation });
              props.setUserDetails({...props.details,street:e.target.value});
            }}
          />
        </div>
        
        <div className="pure-control-group">
          <label htmlFor="aligned-description">City: </label>
          <input
            type="text"
            id="aligned-description" placeholder="City" 
            value={props.details.city}
            error={invalid.city}
            onChange={(e) => {
              const validation =
                e.target.value.length > 25 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, city: validation });
              props.setUserDetails({...props.details,city:e.target.value});
            }}
          />
        </div>

        <div className="pure-control-group">
          <label htmlFor="aligned-description">Zip code: </label>
          <input
            type="text"
            id="aligned-description" placeholder="Zip-Code" 
            value={props.details.zip_code}
            error={invalid.zip_code}
            onChange={(e) => {
              const validation =
                e.target.value.length !== 5 || e.target.value === ""
                  ? true
                  : false;
              setInvalid({ ...invalid, zip_code: validation });
              props.setUserDetails({...props.details,zip_code:e.target.value});
            }}
          />
        </div>

        {props.details.start_date && <div className="pure-control-group">
          <label htmlFor="aligned-start-date">Start Date: </label>
          {props.isAdmin === 1 && <input
            type="date"
            id="aligned-start-date"
            value={props.details.start_date}
            onChange={(e) => {
              props.setUserDetails({...props.details,start_date:e.target.value});
            }}
          />}
          {props.isAdmin === 0 && <label id="aligned-name">{props.details.start_date}</label>}
        </div>}

      {props.details.end_date && <div className="pure-control-group">
          <label htmlFor="aligned-end-date">End Date: </label>
          {props.isAdmin === 1 && <input
            type="date"
            id="aligned-end-date"
            value={props.details.end_date}
            onChange={(e) => {
              props.setUserDetails({...props.details,end_date:e.target.value});
            }}
          />}
          {props.isAdmin === 0 && <label id="aligned-name">{props.details.end_date}</label>}
        </div>
}


        {props.details.membership_name && <div className="pure-control-group">
          <label htmlFor="aligned-status">Membership: </label>
          {props.isAdmin === 1 && 
              <select
                id="aligned-status" placeholder="Membership" 
                value={props.details.membership_type}
                onChange={(e) => {
                  props.setUserDetails({...props.details,membership_type:e.target.value});
                }}>
                  <option value="0">Silver</option>
                  <option value="1">Gold</option>
                  <option value="2">Platinum</option>
                </select>
          }
          {props.isAdmin === 0 && <label id="aligned-name">{props.details.membership_name}</label>}
        </div>
}

        <div className="pure-controls">
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={updateUserDetails}>
                  Update User
              </button>
            </div>
            <div className="pure-u-1-6">
              <button className="pure-button pure-button-primary" onClick={cancelUpdate}>
                  Cancel
              </button>
            </div>
        </div>

      <div className="pure-u-1-3"></div>
      {message && <Alert severity="error">{message}</Alert>}
    </fieldset>
  )

}

const Details = (props) => {
  const [showDetails, setShowDetails] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const updateUserDetails = (details) => {
    setUserDetails(details);
    setShowDetails(false);
  }

  const cancelUpdate = () =>{
    setShowDetails(true);
  }

  if (showDetails){
    return (
      <UserDetails updateUserDetails={updateUserDetails} isAdmin={props.isAdmin} id={props.id} viewer_id={props.viewer_id}/>
      
    )
  } else {
    return (
      <UpdateUserDetails details={userDetails} setUserDetails={setUserDetails} cancelUpdate={cancelUpdate} isAdmin={props.isAdmin}  id={props.id} setShowDetails={setShowDetails}/>
    )
  }
  
}

export default function ViewUserDetails() {
  Axios.defaults.withCredentials = true;
  const { loading, userData } = useLoginValidate();
  
  let {id} = useParams();
  if (loading) {
    return <BasePage> Loading data.... </BasePage>;
  }
  if (!userData.user_id) {
    return redirectLogin();
  } else {
    return (
      <div>
        <Navi></Navi>
        <form className="pure-form pure-form-aligned">
          {userData.auth_id === 1 && <h1 style={{textAlign:"center"}}>User Details</h1>}
          {(userData.auth_id === 0) && <h1 style={{textAlign:"center"}}>My Profile</h1>}
          <Details isAdmin={userData.auth_id} id={id} viewer_id={userData.user_id}/>
         
        </form>
      </div>
    );
  }
}