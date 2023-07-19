"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setdata] = useState("");
  const Logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message);
    }
  };

  const getuserdetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setdata(res.data.data._id);
  };
  return (
    <div className="flex items-center flex-col justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-12">Profile Page</h1>
      <h2 className="text-2xl font-bold">User Profile</h2>
      <h2>{data==="" ? "" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        onClick={Logout}
        className="p-2 mt-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-yellow-400 font-bold hover:text-black hover:border-yellow-400"
      >
        Logout
      </button>

      <button
        onClick={getuserdetails}
        className="p-2 mt-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-yellow-400 font-bold hover:text-black hover:border-yellow-400"
      >
        Get User Details
      </button>
    </div>
  );
}
