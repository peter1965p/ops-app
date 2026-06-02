"use client";

import { useState, useEffect } from "react";
import { Search, Terminal, RefreshCcw, Server, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

import { commands } from "./commands"; // ✔ einziges commands
import type { CommandItem } from "./Command.Types";
import type { IconName } from "./Icon.Types";

// ICON MAP — perfekt typisiert
const icons: Record<IconName, JSX.Element> = {
    terminal: <Terminal className="h-4 w-4" />,
    refresh: <RefreshCcw className="h-4 w-4" />,
    server: <Server className="h-4 w-4" />,
    activity: <Activity className="h-4 w-4" />,
};

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }

            if (!open) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelected((s) => Math.min(s + 1, commands.length - 1));
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelected((s) => Math.max(s - 1, 0));
            }

            if (e.key === "Enter") {
                e.preventDefault();
                commands[selected].action();
                setOpen(false);
            }

            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, selected]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/60 backdrop-blur-sm">
            <div className="w-[600px] rounded-xl bg-zinc-900 border border-white/10 shadow-2xl">

                {/* Search Bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                    <Search className="h-4 w-4 text-zinc-500" />
                    <input
                        autoFocus
                        placeholder="Type a command…"
                        className="w-full bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                </div>

                {/* Commands */}
                <div className="py-2">
                    {commands.map((cmd, i) => (
                        <button
                            key={cmd.id}
                            onClick={() => {
                                cmd.action();
                                setOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-left transition",
                                i === selected ? "bg-white/10" : "hover:bg-white/5"
                            )}
                        >
                            <div className="text-zinc-400">{icons[cmd.icon]}</div>
                            <span className="text-sm text-white">{cmd.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
