"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {
    try {
      const response=await axios.post("/api/users/signup",user)
      console.log(response.data+"hello");
      router.push("/login");

    } catch (error:any)
     {
      console.log("Signup failed",error.message);
      toast.error(error.message);
    }
  };

  const router=useRouter();
  const [buttondisabled,setbuttondisabled]=React.useState(false);

  useEffect(()=>{
    if(user.email.length>0&&user.password.length>0&&user.username.length>0) setbuttondisabled(false);
    else{
      setbuttondisabled(true);
    }
  },[user]);

  return (
    <div className="flex items-center flex-col justify-center min-h-screen py-2">
      <div className="flex items-center flex-col justify-center border border-gray-300 rounded-lg p-[60px] shadow-white shadow-md">
      <h1 className="text-3xl font-bold text-center shadow-lg mb-3">Signup</h1>
      <div className="border border-b-white w-[150px] mb-10"></div>
      <label className="text-xl font-bold"htmlFor="username">Username</label>
      <input
        className="mt-2 rounded-lg p-4 border-gray-300 mb-10 focus:outline-none text-black  focus:border-gray-600 "
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label className="text-xl font-bold"htmlFor="password">Password</label>
      <input
        className="mt-2 rounded-lg p-4 border-gray-300 mb-10 focus:outline-none text-black  focus:border-gray-600 "
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <label className="text-xl font-bold"htmlFor="email">Email</label>
      <input
        className="mt-2 rounded-lg p-4 border-gray-300 mb-10 focus:outline-none text-black  focus:border-gray-600 "
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <button
      onClick={onSignup}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-yellow-400 font-bold hover:text-black hover:border-yellow-400">
        {buttondisabled?"No Signup":"Signup here"}
      </button>
      <Link href="/login" className="hover:text-yellow-400" >Visit Login Page</Link>
      </div>
    </div>
  );
}
