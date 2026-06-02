"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// SSR-Fix für den Monaco Editor
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function NewComposePage() {
    const [stackName, setStackName] = useState("");
    const [containers, setContainers] = useState([{ name: "nginx", image: "nginx:latest", port: "8080:80" }]);
    const [yaml, setYaml] = useState(`services:
  nginx:
    image: nginx:latest
    restart: unless-stopped
    ports:
      - 8080:80
networks: {}`);

    const handleDeploy = () => toast.success("Stack wird deployed...");
    const handleSave = () => toast.success("Konfiguration gespeichert.");

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-500">Compose</h1>
                <div className="flex gap-2">
                    <Button onClick={handleDeploy} className="bg-orange-600 hover:bg-orange-700 rounded text-white">Deployen</Button>
                    <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 rounded border-orange-600 text-white" variant="outline">Speichern</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* LINKE SPALTE: Konfiguration */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/40 p-6 border-white/5">
                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Allgemein</h2>
                        <Label className="text-xs text-slate-400">Stack-Name</Label>
                        <Input className="bg-zinc-950 border-white/10 mt-1 mb-4" value={stackName} onChange={(e) => setStackName(e.target.value)} />
                        <Label className="text-xs text-slate-400">Agent</Label>
                        <Select>
                            <SelectTrigger className="bg-zinc-950 border-white/10 mt-1"><SelectValue placeholder="(online) Aktuell" /></SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/10"><SelectItem value="local">Aktuell</SelectItem></SelectContent>
                        </Select>
                    </Card>

                    <Card className="bg-zinc-900/40 p-6 border-white/5">
                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Container</h2>
                        <div className="flex gap-2 mb-4">
                            <Input placeholder="Containername..." className="bg-zinc-950 border-white/10 text-slate-300"/>
                            <Button className="bg-green-800 hover:bg-green-700 text-white rounded">Hinzufügen</Button>
                        </div>
                        {containers.map((c, i) => (
                            <div key={i} className="bg-zinc-950 p-4 rounded border border-white/10 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-slate-200">{c.name}</div>
                                    <div className="text-xs text-zinc-500">{c.image}</div>
                                </div>
                                <div className="flex gap-2">
                                    <Button className="bg-green-800 hover:bg-green-700 text-white rounded" size="sm">Bearbeiten</Button>
                                    <Button className="bg-red-800 hover:bg-red-700 text-white rounded" size="sm">Löschen</Button>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>

                {/* RECHTE SPALTE: Editor & .env */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/40 border-white/5 overflow-hidden">
                        <div className="p-2 px-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">docker-compose.yml</div>
                        <div className="h-[400px]">
                            <Editor
                                height="100%"
                                theme="vs-dark"
                                defaultLanguage="yaml"
                                value={yaml}
                                onChange={(value) => setYaml(value || "")}
                                options={{ minimap: { enabled: false }, fontSize: 13 }}
                            />
                        </div>
                    </Card>

                    <Card className="bg-zinc-900/40 p-6 border-white/5">
                        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">.env</h2>
                        <Input className="bg-zinc-950 border-white/10 font-mono text-emerald-400" placeholder="VARIABLE=value" />
                    </Card>
                </div>
            </div>
        </div>
    );
}