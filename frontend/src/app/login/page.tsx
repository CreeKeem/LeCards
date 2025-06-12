"use client";

import Image from "next/image";

export default function Login() {
  const handleSubmit = () => {};

  return (
    <div className=" flex items-center justify-center h-screen bg-gradient-to-r from-[#552583] via-[#6B21A8] to-[#552583]">
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
        <div className="h-[20%] bg-gradient-to-r from-[#552583] to-[#7E22CE] rounded-t-[16px] flex flex-col items-center justify-center font-oswald text-white">
          <Image
            src={"/Lebron.svg"}
            alt="Lebron James"
            width={80}
            height={80}
            className="border-[#FDB927] border-4 rounded-full object-cover"
          />
          <h1 className="text-[24px] font-bold">LeCards</h1>
          <h2 className="text-[16px] font-normal">
            Master your knowledge like the King
          </h2>
        </div>

        {/* Sign in and Sign up buttons */}
        <div className="h-[5%] bg-[#E5E7EB]">
          {/* TODO ADD FUNCTIONALITY TO SWITCH BETWEEN SIGN IN AND SIGN UP */}
          <button className="h-full w-[50%] text-[#4B5563] cursor-pointer">
            Sign In
          </button>
          <button className="h-full w-[50%] border-b-3 border-[#552583] border-solid text-[#552583] cursor-pointer">
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="h-[70%] bg-white flex flex-col items-center p-5 gap-5">
          <h1 className="text-[#1F2937] font-bold text-[24px]">
            Join the Kingdom
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col h-full w-[90%] gap-5 text-[#374151]">
            {/* Names */}
            <div className="flex justify-between">
              {/* First Name */}
              <div className="flex flex-col w-[48%]">
                <label htmlFor="">First Name</label>
                <input className="h-[50px] border border-[#E5E7EB] placeholder-[#ADAEBC] rounded-[8px] focus:outline-none p-3" type="text" name="" id="" placeholder="Lebron"/>
              </div>

              {/* Last Name */}
              <div className="flex flex-col w-[48%]">
                <label htmlFor="">Last Name</label>
                <input className="h-[50px] border border-[#E5E7EB] placeholder-[#ADAEBC] rounded-[8px] focus:outline-none p-3" type="text" name="" id="" placeholder="James"/>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input className="h-[50px] border border-[#E5E7EB] placeholder-[#ADAEBC] rounded-[8px] focus:outline-none p-3" type="email" name="" id="" placeholder="your@email.com"/>
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input className="h-[50px] border border-[#E5E7EB] placeholder-[#ADAEBC] rounded-[8px] focus:outline-none p-3" type="password" name="" id="" placeholder="Password"/>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label htmlFor="">Confirm Password</label>
              <input className="h-[50px] border border-[#E5E7EB] placeholder-[#ADAEBC] rounded-[8px] focus:outline-none p-3" type="text" name="" id="" placeholder="Confirm Password"/>
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-[#FDB927] h-[48px] rounded-2xl hover:bg-[#B97C10] duration-300 cursor-pointer">Sign Up</button>
          </form>
        </div>

        {/* Footer */}
        <div className="h-[5%] flex justify-center items-center gap-5 bg-[#E5E7EB] rounded-b-[16px]">
          <Image src="/Logo.svg" alt="LeCards Logo" width={32} height={32} />
          <h4>Greatness awaits. Start your journey today!</h4>
        </div>
      </div>
    </div>
  );
}
