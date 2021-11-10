import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ErrorPath } from "./login/ErrorPath";
import Main from "./public/Main";
import Registration from "./login/Register";
import Login from "./login/Login";
import Logout from "./login/Logout";
import AdminHome from "./admin/AdminHome";
import AdminCreateEvent from "./admin/CreateEvent";
import AdminReadEvent from "./admin/ReadEvent";
import BasePage from "./common/BasePage";
import MyBookings from "./user/MyBookings";
import AdminUserDetails from "./admin/ViewUserDetails";
import AdminUserList from "./admin/ViewUserList";
import AdminCreateAdmin from "./admin/CreateNewAdmin"
import SportsList from "./user/sports/SportsList";
import AdminCreateVenue from "./admin/CreateVenue";
import AdminReadVenue from "./admin/ReadVenue";
import MyProfile from "./user/MyProfile";
import ViewDependent from "./admin/ViewDependent";

function App() {
  return (
    <BasePage>
      <Router
      // Hanldes all url requests
      >
        <Switch>
          <Route
            path="/registration"
            exact
            render={(props) => <Registration />}
          />
          <Route path="/login" exact render={(props) => <Login />} />
          <Route path="/" exact render={(props) => <Main />} />
          <Route path="/logout" exact render={(props) => <Logout />} />
          <Route path="/admin" exact render={(props) => <AdminHome />} />
          <Route path="/admin/events/create" exact render={(props) => <AdminCreateEvent />} />
          <Route path="/user/myBookings" exact render={(props) => <MyBookings />} />
          <Route path="/admin/events/details/:id" exact render={(props) => <AdminReadEvent />} />
          <Route path="/admin/users/details/:id" exact render={(props) => <AdminUserDetails />} />
          <Route path="/admin/users" exact render={(props) => <AdminUserList />} />
          <Route path="/admin/newadmin/create" exact render={(props) => <AdminCreateAdmin />} />
          <Route path="/admin/users/sportsList" exact render={(props) => <SportsList />} />
          <Route path="/admin/venue/create" exact render={(props) => <AdminCreateVenue />} />
          <Route path="/admin/venue/details/:id" exact render={(props) => <AdminReadVenue />} />
          <Route path="/user/myProfile" exact render={(props) => <MyProfile />} />
          <Route path="/admin/users/view/dependent/:id" exact render={(props) => <ViewDependent/>}/>
          <Route path="*">
            <ErrorPath></ErrorPath>
          </Route>
        </Switch>
      </Router>
    </BasePage>
  );
}

export default App;
