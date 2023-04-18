import { createContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";
import { hasCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { MyProp, contextUser, resUser } from "@/Types/AllTypes";

export const AdminContext = createContext<contextUser>({
  currentAdmin: null,
  setCurrentAdmin: (user: resUser) => null,
});

export const AdminProvider = ({ children }: MyProp) => {
  const [currentAdmin, setCurrentAdmin] = useState<null | resUser>(null);
  const value = {
    currentAdmin: currentAdmin,
    setCurrentAdmin: (user: resUser) => {
      setCurrentAdmin(null);
      return null;
    },
  };

  const [inputFields, setInputFields] = useState({
    mobile: "",
  });

  useEffect(() => {
    if (hasCookie("authentication")) {
      try {
        const authenticationCookie = getCookie("authentication");
        if (authenticationCookie !== undefined) {
          JSON.parse(authenticationCookie);
        }
      } catch (err) {
        console.log(err);
        deleteCookie("authentication");
        window.location.href = new URL("/").href;
      }

      const authenticationCookie = getCookie("authentication");

      if (authenticationCookie !== undefined) {
        let mobile = JSON.parse(authenticationCookie).mobile;
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/user/getUser/${mobile}`
          )
          .then((response) => {
            if (response.status == 200) {
              setCurrentAdmin(response.data.user);
              setCookie("authentication", JSON.stringify(response.data.user));
            } else {
              deleteCookie("authentication");
            }
          })
          .catch((error) => {
            console.log(error);
            deleteCookie("authentication");
          });
      }
    }
  }, []);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
