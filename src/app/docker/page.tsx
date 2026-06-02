import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ServiceControl } from "@/components/ui/ServiceControl";
import { syncDockerToDb } from "@/lib/actions/sync.docker";
import { query } from "@/lib/db";
import { Terminal, Play, Box, Plus } from "lucide-react";
import Link from "next/link";

export default async function DockerPage() {
    await syncDockerToDb();

    const result = await query("SELECT * FROM system_containers ORDER BY name ASC");
    const containers = result?.rows || [];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header mit Compose-Link */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-zinc-100">Docker Infrastruktur</h1>
                <Link href="/docker/compose/new">
                    <Button className="bg-indigo-600 hover:bg-indigo-500 gap-2">
                        <Plus className="w-4 h-4" /> Neuer Stack
                    </Button>
                </Link>
            </div>

            {/* Container Liste */}
            <Card className="bg-zinc-900/40 border-white/5">
                <CardHeader>
                    <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Aktive Container
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent text-slate-700">
                                <TableHead className="text-zinc-400">Service</TableHead>
                                <TableHead className="text-zinc-400">Status</TableHead>
                                <TableHead className="text-right text-zinc-400">Aktionen</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {containers.map((c) => (
                                <TableRow key={c.container_id} className="border-white/5">
                                    <TableCell className="flex items-center gap-3">
                                        <Box className="w-4 h-4 text-orange-600" />
                                        <div>
                                            <div className="text-sm text-blue-400 font-medium">{c.name}</div>
                                            <div className="text-[9px] text-orange-600 font-mono">{c.container_id.substring(0, 8)}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'running' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            <span className="text-[10px] font-bold uppercase text-blue-400">{c.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <ServiceControl id={c.container_id} status={c.status} />
                                            <button className="p-2 text-orange-600 hover:text-slate-700 transition-colors">
                                                <Terminal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}