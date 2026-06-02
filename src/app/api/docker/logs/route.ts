import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();

        // ... hier kommt deine Docker-Logik hin ...
        // Beispiel: const logs = await getDockerLogs(body.id);

        // WICHTIG: Die Rückgabe MUSS NextResponse.json(...) sein
        return NextResponse.json({ success: true, logs: "deine-logs-hier" });
    } catch (error) {
        console.error("API Error:", error);

        // WICHTIG: Auch der Fehlerfall muss eine NextResponse zurückgeben
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}