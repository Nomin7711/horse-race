import React from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import NavBar from "../NavBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Outlet />

      <NavBar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default MainLayout;
