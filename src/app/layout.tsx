import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "@/components/ui/sonner";

const firaSans = Fira_Sans({
    subsets: ["latin"],
    variable: "--font-fira-sans",
    weight: ["300", "400", "500", "600", "700"], // optional, aber sinnvoll
});

export const metadata: Metadata = {
    title: "Ops App",
    description: "Operator UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full antialiased font-sans",
                firaSans.variable
            )}
        >
        <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
        <Toaster />
        </body>
        </html>
    );
}
