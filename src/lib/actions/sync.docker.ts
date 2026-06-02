"use server";

import { query } from "@/lib/db";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * Synchronisiert den aktuellen Docker-Status direkt mit der Datenbank.
 * Wird idealerweise beim Laden der Seite oder via Webhook/Button aufgerufen.
 */
export async function syncDockerToDb() {
    try {
        // Docker-Container als JSON auflisten
        const { stdout } = await execAsync('docker ps -a --format "{{json .}}"');

        // Fallback falls keine Container laufen
        if (!stdout.trim()) return { success: true, count: 0 };

        const lines = stdout.trim().split('\n');
        const containers = lines.map(line => JSON.parse(line));

        for (const c of containers) {
            await query(
                `INSERT INTO system_containers (container_id, name, status, last_updated) 
         VALUES ($1, $2, $3, NOW()) 
         ON CONFLICT (container_id) 
         DO UPDATE SET 
            status = EXCLUDED.status, 
            last_updated = NOW()`,
                [c.ID, c.Names, c.Status.includes('Up') ? 'running' : 'stopped']
            );
        }
        return { success: true, count: containers.length };
    } catch (error) {
        console.error("Docker Sync Fehler:", error);
        return { success: false, error: "Sync fehlgeschlagen" };
    }
}