"use client";
import React, { useState } from "react";
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock Login Logic - In production, this would call AWS Cognito or a secure API
    setTimeout(() => {
      if (formData.username === "admin" && formData.password === "rrp@electronics#001") {
        // Simple session mock
        document.cookie = "admin_session=true; path=/admin";
        localStorage.setItem("isLoggedIn", "true");
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-neueMontreal overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/10 rounded-full blur-[100px] -ml-20 -mb-20" />

      <div className="max-w-md w-full animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden ring-1 ring-gray-100">
          {/* Glass reflection effect */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/10 via-primary to-primary/10" />

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20 rotate-12 group hover:rotate-0 transition-transform duration-500 shadow-xl shadow-primary/10">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl  text-gray-900 ">Admin Portal</h1>
            <p className="text-sm text-gray-400 font-medium mt-2">Secure access for content managers</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs  text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <User size={12} className="text-primary" /> Username
              </label>
              <input
                type="text" required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary text-sm transition-all shadow-none"
                placeholder="Enter username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs  text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Lock size={12} className="text-primary" /> Password
              </label>
              <input
                type="password" required
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-primary text-sm transition-all shadow-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 animate-in shake duration-500">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <p className="text-xs  leading-tight">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-gray-900 text-white py-5 rounded-2xl  tracking-widest uppercase text-xs hover:bg-primary shadow-xl shadow-gray-200 hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>Enter Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-400  uppercase tracking-[0.2em] mb-4">Powered by AWS Cloud Infrastructure</p>
            <div className="flex items-center justify-center gap-6 opacity-30 grayscale saturate-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js" className="h-3" />
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-8 font-medium">
          © 2024 RRP Electronics Ltd. All rights reserved. <br />
          Unauthorized access is strictly prohibited and logged.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
