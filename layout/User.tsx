import React, { useContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { AdminContext } from "../context/user.context";
import { hasCookie, getCookie } from "cookies-next";
import Header from "../components/Header";

const User = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useRouter();

  const { currentAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (!hasCookie("authentication")) {
      Router.push("/login");
    }
  }, [currentAdmin]);

  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export async function getServerSideProps(context: any) {
  console.log(getCookie("authentication"));
  return {
    props: "",
  };
}

export default User;
