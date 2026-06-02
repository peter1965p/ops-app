import { NextResponse } from 'next/server';

// Explizite Typisierung der Antwort
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();

        // ... deine Logik ...
        const result = { success: true }; // Beispiel-Daten

        return NextResponse.json(result);
    } catch (error) {
        console.error("API Error:", error);
        // Rückgabe einer Response im Fehlerfall ist Pflicht!
        return NextResponse.json(
            { error: "Failed to inspect container" },
            { status: 500 }
        );
    }
}