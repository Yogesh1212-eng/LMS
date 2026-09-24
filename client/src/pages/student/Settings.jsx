import React from "react";
import { Settings as SettingsIcon, Bell, Lock, Palette } from "lucide-react";

function Settings() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        Account Settings
      </h1>

      <div className="space-y-6">
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Password & Security</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage your login security and credentials</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition">
            Update
          </button>
        </div>

        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Notifications</h3>
              <p className="text-xs text-slate-400 mt-0.5">Configure quiz alerts and course email notifications</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition">
            Configure
          </button>
        </div>

        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Theme Preferences</h3>
              <p className="text-xs text-slate-400 mt-0.5">Slate Dark + Royal Blue (Default active)</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}

export default Settings;