import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getDashboardData } from "@/lib/actions/sector.actions";
import { KpiCard } from "@/components/ui/KpiCard";
import { ServiceControl } from "@/components/ui/ServiceControl"; // Import hinzugefügt!
import { Activity, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

// Definiere die Typen für die Datenstruktur aus der DB
interface ServiceData {
    id: number;
    badge: string;
    badgeClass: string;
    title: string;
    subtitle: string;
    time: string;
    tasks: number;
    issues: number;
}

export default async function Page() {
    // Holen der Daten aus der Server-Action
    const services: ServiceData[] = await getDashboardData();

    const metrics = [
        { label: "Pipelines today", value: "18", delta: "+3 vs. yesterday", color: "text-emerald-400", icon: Activity, trend: "up" },
        { label: "Successful deploys", value: "14", delta: "78% success rate", color: "text-emerald-400", icon: CheckCircle, trend: "up" },
        { label: "Failed deploys", value: "4", delta: "2 hotfixes open", color: "text-red-400", icon: XCircle, trend: "down" },
        { label: "Open incidents", value: "3", delta: "1 critical • 2 minor", color: "text-amber-400", icon: AlertTriangle, trend: "down" },
    ] as const;

    return (
        <div className="p-8 flex flex-col gap-8">
            {/* TOP DEVOPS METRICS */}
            <div className="grid grid-cols-4 gap-6">
                {metrics.map((m) => (
                    <KpiCard
                        key={m.label}
                        title={m.label}
                        value={m.value}
                        delta={m.delta}
                        color={m.color}
                        icon={m.icon}
                        trend={m.trend}
                    />
                ))}
            </div>

            {/* BOTTOM ROW */}
            <div className="grid grid-cols-3 gap-6">
                {/* LEFT – DEPLOYMENT HISTORY */}
                <Card className="bg-zinc-900/60 border-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
                    <CardHeader>
                        <CardTitle className="text-sm text-zinc-300">Deployment history</CardTitle>
                        <CardDescription className="text-xs text-zinc-500">Latest pipeline runs & rollouts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="h-40 w-full rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-500 text-sm">
                            Pipeline / latency chart
                        </div>
                    </CardContent>
                </Card>

                {/* RIGHT – ACTIVE SERVICES (DYNAMISCH) */}
                <Card className="col-span-2 bg-zinc-900/60 border-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
                    <CardHeader>
                        <CardTitle className="text-sm text-zinc-300">Active services</CardTitle>
                        <CardDescription className="text-xs text-zinc-500">Current production components & workload</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {services.length > 0 ? (
                            services.map((s) => (
                                <div key={s.id} className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold", s.badgeClass)}>
                                            {s.badge}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{s.title}</div>
                                            <div className="text-xs text-zinc-500">{s.subtitle}</div>
                                        </div>
                                    </div>

                                    {/* Button-Container */}
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="text-right text-[11px] text-zinc-500">
                                            <div>{s.time}</div>
                                            <div className="text-zinc-400">
                                                {s.tasks} tasks • {s.issues} issues
                                            </div>
                                        </div>
                                        {/* Die ServiceControl Komponente */}
                                        <ServiceControl
                                            id={s.id.toString()}
                                            status={s.badgeClass.includes("emerald") ? "running" : "stopped"}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-zinc-500 text-sm italic">Keine aktiven Services gefunden...</div>
                        )}
                    </CardContent>
                </Card>
            </div> {/* Ende Bottom Row Grid */}
        </div> // Ende Main Div
    );
}