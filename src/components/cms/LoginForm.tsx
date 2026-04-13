"use client";
import React from "react";

interface LoginFormProps {
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-[350px] space-y-8 bg-white p-12 rounded-lg shadow-sm border border-gray-100">
        <div className="text-center space-y-3">
          <h1 className="text-body2 font-medium tracking-normal text-gray-900 border-b border-gray-100 pb-4">
            Admin Console
          </h1>
          <p className="text-body4 font-neueMontreal text-gray-400 font-normal">Secure entry point</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-body4 font-neueMontreal text-gray-500 tracking-normal pl-0.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-11 bg-transparent border border-gray-200 rounded-md px-4 text-body4 font-neueMontreal outline-none transition-all focus:border-[#FF5C19] placeholder:text-gray-400"
              placeholder="admin"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-body4 font-neueMontreal text-gray-500 tracking-normal pl-0.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 bg-transparent border border-gray-200 rounded-md px-4 text-body4 font-neueMontreal outline-none transition-all focus:border-[#FF5C19] placeholder:text-gray-400"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 bg-[#FF5C19] text-white rounded-md text-body4 font-neueMontreal tracking-normal hover:bg-orange-600 transition-colors cursor-pointer active:scale-98 shadow-sm flex items-center justify-center disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Sign in to console"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
