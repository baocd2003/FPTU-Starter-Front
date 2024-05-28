import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import FSUAppBar from '../../components/AppBar';
import { Outlet } from 'react-router-dom';
function CreateProject() {
  return (
    <div className="home">

      <FSUAppBar isLogined={Cookies.get('_auth') !== undefined} />
      <div className="mt-[100px]">
        <div className='flex justify-center items-center md:h-[1200px] h-fit md:min-h-[1200px] xl:min-h-0 pt-[100px]'>
        <Outlet />
        </div>
      </div>
    </div>

  );
}

export default CreateProject