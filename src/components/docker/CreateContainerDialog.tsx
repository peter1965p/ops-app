"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function CreateContainerDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Neu Anlegen
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Neuen Container definieren</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <input className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-sm" placeholder="Container Name" />
                    <input className="w-full bg-zinc-900 border border-white/10 rounded p-2 text-sm" placeholder="Image (z.B. nginx:latest)" />
                    <Button className="w-full bg-indigo-600">Container deployen</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}