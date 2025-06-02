"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
// import CreateUserOnLogin from "@/app/components/createuseronlogin";

export default function Dashboard() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) return <p>Yükleniyor...</p>;

  return (
    <>
    <h2 className="text-xl">

      Hoş geldin {user.firstName} {user.lastName}
    </h2>
    <SignedIn>
        <UserButton/>
      </SignedIn>
    </>
  );
};
