import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import FSUAppBar from '../../components/AppBar';
import { Outlet } from 'react-router-dom';
function CreateProject() {
  return (
    <div className="home">

      <FSUAppBar isLogined={Cookies.get('_auth') !== undefined} />
      <div className="mt-[100px]">
       
        <Outlet />
        
      </div>
    </div>

  );
}

export default CreateProject