import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type KpiProps = {
    title: string;
    value: string | number;
    delta: string;
    color: string;
    icon?: any;
    trend: "up" | "down" | "neutral";
};

export function KpiCard({ title, value, delta, color, icon: Icon, trend }: KpiProps) {
    const TrendIcon =
        trend === "up" ? ArrowUpRight :
            trend === "down" ? ArrowDownRight :
                null;

    return (
        <div className="bg-zinc-900/60 border-white/5 rounded-xl p-4 shadow-[0_18px_45px_rgba(0,0,0,0.55)] hover:bg-zinc-900/80 transition-all">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-2">
                <div className="text-sm text-zinc-400">{title}</div>
                {Icon && <Icon className="w-5 h-5 text-zinc-500" />}
            </div>

            {/* VALUE */}
            <div className="text-3xl font-semibold text-white leading-tight">
                {value}
            </div>

            {/* DELTA */}
            <div className={`text-xs flex items-center gap-1 mt-1 ${color}`}>
                {TrendIcon && <TrendIcon className="w-3 h-3" />}
                {delta}
            </div>
        </div>
    );
}
