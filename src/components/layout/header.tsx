"use client";

import { cn } from "@/lib/utils";
import { Bell, Server, User, ChevronDown } from "lucide-react";

export function HeaderBar() {
    return (
        <header
            className={cn(
                "w-full h-14 px-6 flex items-center justify-between",
                "bg-zinc-900/80 border-b border-white/5 backdrop-blur-md"
            )}
        >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white tracking-wide">
            PROD‑Cluster
          </span>
                </div>

                <span className="text-[11px] text-zinc-500">
          Node: eu‑central‑1a
        </span>

                <span className="text-[11px] text-emerald-400">
          Healthy
        </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-6">
                <button className="relative">
                    <Bell className="h-5 w-5 text-zinc-400 hover:text-white transition" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                    <User className="h-5 w-5 text-zinc-400" />
                    <span className="text-sm text-white">Peter</span>
                    <ChevronDown className="h-4 w-4 text-zinc-500" />
                </div>
            </div>
        </header>
    );
}
