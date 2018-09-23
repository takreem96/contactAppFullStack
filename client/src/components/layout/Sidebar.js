import React from 'react';

import { Link } from 'react-router-dom';
import flatavatar from './flat-avatar.png';
const Sidebar = () => {

  return (
    <div className="dashboard-page ui-view"> 
          <div className="container-fluid"> 
             
                <div className="text-center"> 
                
                  <img src={flatavatar} alt="logo"  className="user-avatar" />
                  <br /> <br/>
                  <Link to="/login" className="btn btn-white  white btn-outline btn-rounded btn-sm">Logout</Link> 
             
 </div> 
                <ul className="link"> 
                  <li className ="sidelist"> 
                    <Link className="sidebarlink btn btn-white btn-outline btn-rounded btn-sm" to="/">Overview</Link>
                  </li> 
                  <li>
                    <Link  className="sidebarlink btn btn-white btn-outline btn-rounded btn-sm" to="/about">Reports</Link>
                  </li> 
                 
                </ul> 
               
              </div>
            </div> 
        
  );
}

  export default Sidebar;