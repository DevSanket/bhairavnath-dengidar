import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import React, { useContext, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { AdminContext } from "../context/user.context";
import { getCookie, setCookie } from "cookies-next";
import { log } from "console";

const Login = () => {
  const { currentAdmin, setCurrentAdmin } = useContext(AdminContext);

  interface resUser {
    username: string;
    mobile: string;
  }

  if (currentAdmin != null) {
    Router.push("/home");
  }

  const [inputFields, setInputFields] = useState({
    mobile: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/api/v1/user/login`,
        inputFields
      )
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);

          const user: resUser = response.data.user;
          setCurrentAdmin(user);

          setCookie("authentication", JSON.stringify(response.data.user));
          Router.push("/home");
          toast.success("Logged in successfully");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <section className="h-[100vh] bg-blue-50 w-full flex justify-center items-center">
        {/* Login Card (Start) */}
        <figure className="rounded-lg shadow-lg bg-white tablet:w-1/4">
          <form
            onSubmit={(event) => handleFormSubmit(event)}
            className="px-10 py-14 text-center space-y-5"
          >
            {/* Login */}
            <div>
              <h1 className="font-semibold text-2xl mb-2">
                भैरवनाथ मंदिर संवर्धन
              </h1>
              <p className="text-xs text-slate-600 mb-6">लॉगिन</p>
            </div>

            {/* Email address */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="input-label">
                आपला मोबाईल नंबर
              </label>
              <input
                type="text"
                value={inputFields.mobile}
                onChange={(event) => handleInputChange(event)}
                name="mobile"
                className="input-md"
                placeholder="आपला मोबाईल नंबर"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="btn-md w-full">
                <AiOutlineLock
                  size={20}
                  className="h-4 w-4 opacity-50 absolute mr-auto"
                />
                Sign in
              </button>
            </div>

            {/* Forgot Password */}
            {/* <div>
              <p className="text-slate-600 text-xs">
                Forgot your password ?{" "}
                <Link
                  href={"/forgot-password"}
                  className="font-medium text-xs text-ascent hover:text-ascent-dark"
                >
                  Reset password
                </Link>
              </p>
            </div> */}
          </form>
        </figure>
        {/* Login Card (End) */}
      </section>
    </React.Fragment>
  );
};

export default Login;
