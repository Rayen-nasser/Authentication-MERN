"use client"
import Logout from './logout/page';
import Login from  './components/login'
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      {/* <CreateUser/>
      <Users /> */}
      {
        !window.localStorage.getItem("adminID")?  <Login/> : <Logout/>
      }
    </div>
  );
}

export default App;
