"use client"

import { Sidebar } from "./sidebar"
import { HeaderBar } from "./header"
import { CommandPalette } from "@/components/CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <HeaderBar />
                <CommandPalette />
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
