"use client";
import {  useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isSignedIn } = useUser();
  

  if (!isSignedIn) return <p>Yükleniyor...</p>;

  return (
    <>
    <h2 className="text-xl">

      Hoş geldin {user.firstName} {user.lastName} 
    </h2>
</>
  );
};
