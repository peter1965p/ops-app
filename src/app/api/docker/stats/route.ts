import { NextResponse } from 'next/server';
import { upsertContainerStatus } from '@/lib/actions/sector.actions';

export async function GET() {
    // 1. Hier würdest du normalerweise den Docker-Socket abfragen
    // const stats = await fetchDockerStats(); 

    // Beispiel-Daten (Simulation)
    const mockData = [
        { id: "123", name: "db", status: "running" },
        { id: "456", name: "sys-core", status: "exited" }
    ];

    // 2. Synchronisation mit der DB
    for (const item of mockData) {
        await upsertContainerStatus(item.id, item.name, item.status);
    }

    return NextResponse.json(mockData);
}