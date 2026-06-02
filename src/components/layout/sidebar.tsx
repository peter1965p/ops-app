"use client"

import { Home, Server, Terminal, Settings, Infinity, BoxIcon } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
    return (
        <aside className="w-64 bg-muted/40 border-r border-border flex flex-col p-4">
            <div className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-orange-600 text-[20px] font-semibold tracking-wide">Dev</span>
                <span className="text-blue-700 flex items-center gap-1">
                    <Infinity size={22} strokeWidth={3} className="text-green-400 text-[20px] font-semibold tracking-wide" />
                        OPS
                </span>
            </div>


            <nav className="space-y-2">
                <Link href="/" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                    <Home size={18} /> Dashboard
                </Link>

                <Link href="/connections" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                    <Server size={18} /> Connections
                </Link>

                <Link href="/docker" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                    <BoxIcon size={18} /> Infrastructure
                </Link>

                <Link href="/terminal" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                    <Terminal size={18} /> Terminal
                </Link>

                <Link href="/settings" className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                    <Settings size={18} /> Settings
                </Link>
            </nav>
        </aside>
    )
}
