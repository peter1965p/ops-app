import { NextResponse } from "next/server";

export async function GET() {
    const services = [
        {
            id: 1,
            badge: "API",
            badgeClass: "bg-blue-600 text-white",
            title: "Core API",
            subtitle: "Public REST / GraphQL",
            time: "Deployed 12 min ago",
            tasks: 5,
            issues: 1,
        },
        {
            id: 2,
            badge: "AUTH",
            badgeClass: "bg-emerald-600 text-white",
            title: "Auth Service",
            subtitle: "OIDC / JWT / SSO",
            time: "Deployed 47 min ago",
            tasks: 3,
            issues: 0,
        },
        {
            id: 3,
            badge: "WORK",
            badgeClass: "bg-purple-600 text-white",
            title: "Worker Pool",
            subtitle: "Background jobs & queues",
            time: "Scaled 25 min ago",
            tasks: 8,
            issues: 2,
        },
        {
            id: 4,
            badge: "DB",
            badgeClass: "bg-amber-600 text-black",
            title: "Database Cluster",
            subtitle: "Postgres HA / Read Replicas",
            time: "Backup 1 hour ago",
            tasks: 2,
            issues: 0,
        },
        {
            id: 5,
            badge: "EDGE",
            badgeClass: "bg-pink-600 text-white",
            title: "Edge Gateway",
            subtitle: "Ingress / Rate limiting",
            time: "Config change 5 min ago",
            tasks: 4,
            issues: 1,
        },
    ];

    return NextResponse.json({ services });
}
