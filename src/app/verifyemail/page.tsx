"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function verifyemailpage() {
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, setError] = useState(false);

  const verifyuseremail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setverified(true);
    } catch (error: any) {
        setError(true);
        console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const url = window.location.search.split("=")[1];
    settoken(url||"");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyuseremail();
  }, [token]);

  return (
    <div className="flex items-center flex-col justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-700">Error</h2>
        </div>
      )}
    </div>
  );
}
