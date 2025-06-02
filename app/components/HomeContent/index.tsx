"use client";

import {
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeContent() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to BookBox 📚</h1>
      <p className="text-lg mb-8">Please sign in or sign up to continue.</p>

      <SignedOut>
        <div className="flex gap-4">
          <SignInButton mode='redirect' >
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

    </div>
  );
}
