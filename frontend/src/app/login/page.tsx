"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup, signin } from "@/api/auth";
import { SignInDto, SignUpDto } from "@/types/auth";

export default function Login() {

  const [signUp, setSignUp] = useState(true);
  const [authError, setAuthError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(false);

    if (signUp) {
      if (password !== confirmPassword) {
        setAuthError(true);
        return;
      }

      const data: SignUpDto = {
        email,
        password,
        fName,
        lName,
      };

      const user = await signup(data);
      if (!user) {
        setAuthError(true);
        return;
      }
      router.push("/dashboard");
    } else {
      const data: SignInDto = {
        email,
        password,
      };

      const user = await signin(data);
      if (!user) {
        setAuthError(true);
        return;
      }
      router.push("/dashboard");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFName("");
    setLName("");
    setConfirmPassword("");
    setAuthError(false);
  };

  const inputClass = `h-[50px] border ${
    authError ? "border-red-500" : "border-[#E5E7EB]"
  } placeholder-[#ADAEBC] rounded-[8px] focus:outline-none p-3`;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-laker-purple via-[#6B21A8] to-laker-purple">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-screen w-screen object-cover absolute z-1 opacity-50"
      >
        <source src="/LeFu3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="h-[800px] w-[448px] z-10">
        {/* Title */}
        <div className="h-[20%] bg-gradient-to-r from-laker-purple to-[#7E22CE] rounded-t-[16px] flex flex-col items-center justify-center font-oswald text-white">
          <Image
            src={"/Logo.svg"}
            alt="Lebron James"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <h1 className="text-[24px] font-bold">LeCards</h1>
          <h2 className="text-[16px] font-normal">
            Master your knowledge like the King
          </h2>
        </div>

        {/* Sign in and Sign up buttons */}
        <div className="h-[5%] bg-[#E5E7EB] flex">
          <button
            onClick={() => {
              setSignUp(false);
              resetForm();
            }}
            className={`h-full w-[50%] cursor-pointer ${
              !signUp
                ? "border-b-3 border-laker-purple text-laker-purple"
                : "text-[#4B5563]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setSignUp(true);
              resetForm();
            }}
            className={`h-full w-[50%] cursor-pointer ${
              signUp
                ? "border-b-3 border-laker-purple text-laker-purple"
                : "text-[#4B5563]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        <div
          className={`${
            signUp ? "h-[70%]" : "h-[45%]"
          } bg-white flex flex-col items-center p-5 gap-5`}
        >
          <h1 className="text-[#1F2937] font-bold text-[24px]">
            {signUp ? "Join the Kingdom" : "Welcome Back"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full w-[90%] gap-5 text-[#374151]"
          >
            {/* Names */}
            {signUp && (
              <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                  <label>First Name</label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="LeBron"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-[48%]">
                  <label>Last Name</label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="James"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className={inputClass}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label>Password</label>
              <input
                className={inputClass}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            {signUp && (
              <div className="flex flex-col">
                <label>Confirm Password</label>
                <input
                  className={inputClass}
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-laker-gold h-[48px] rounded-2xl hover:bg-[#E0A322] duration-300 cursor-pointer"
            >
              {signUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="h-[5%] flex justify-center items-center gap-3 bg-[#E5E7EB] rounded-b-[16px]">
          <Image src="/Logo.svg" alt="LeCards Logo" width={32} height={32} />
          <h4>Greatness awaits</h4>
        </div>
      </div>
    </div>
  );
}
