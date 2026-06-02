"use server";

import { query } from "@/lib/db";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";
import { mkdir, writeFile } from "fs/promises";
const execAsync = promisify(exec);

/**
 * Synchronisiert den lokalen Docker-Status mit der internen DB
 */
export async function upsertContainerStatus(containerId: string, name: string, status: string) {
    try {
        await query(
            `INSERT INTO system_containers (container_id, name, status, last_updated)
             VALUES ($1, $2, $3, NOW())
                 ON CONFLICT (container_id) 
             DO UPDATE SET
                status = EXCLUDED.status,
                                     name = EXCLUDED.name,
                                     last_updated = NOW()`,
            [containerId, name, status]
        );
        return { success: true };
    } catch (error) {
        console.error("Fehler beim Sync der Container:", error);
        return { success: false, error: "Datenbankfehler" };
    }
}

export async function getDashboardData() {
    // Holen der Container-Daten aus deiner neuen Tabelle
    const result = await query(
        "SELECT container_id, name, status, last_updated FROM system_containers ORDER BY last_updated DESC LIMIT 5"
    );

    // Mapping der DB-Daten auf dein UI-Format
    return result.rows.map((row, index) => ({
        id: index + 1,
        badge: row.name.substring(0, 4).toUpperCase(),
        badgeClass: row.status === 'running' ? "bg-emerald-600 text-white" : "bg-red-600 text-white",
        title: row.name,
        subtitle: "Docker Container",
        time: `Updated ${row.last_updated.toLocaleTimeString()}`,
        tasks: 0, // Hier später mit echten Metrics füllen
        issues: row.status === 'running' ? 0 : 1
    }));
}

export async function toggleContainer(containerId: string, action: 'start' | 'stop') {
    try {
        // Führt den lokalen Docker-Befehl aus
        await execAsync(`docker ${action} ${containerId}`);
        // Danach den DB-Status synchronisieren
        // Hier könntest du eine Funktion aufrufen, die den Status erneut prüft
        return { success: true };
    } catch (error) {
        console.error(`Fehler beim ${action} des Containers:`, error);
        return { success: false, error: "Docker Befehl fehlgeschlagen" };
    }
}

export async function deployStack(stackName: string, yamlContent: string) {
    try {
        // 1. Verzeichnis für Stacks sicherstellen
        const stackDir = path.join(process.cwd(), "stacks");
        await mkdir(stackDir, { recursive: true }); // fs.mkdir -> mkdir

        // 2. YAML-Datei schreiben
        const filePath = path.join(stackDir, `${stackName}.yml`);
        await writeFile(filePath, yamlContent); // fs.writeFile -> writeFile

        // 3. Docker Compose ausführen
        await execAsync(`docker compose -f ${filePath} up -d`);

        return { success: true };
    } catch (error) {
        console.error("Deploy-Fehler:", error);
        return { success: false, error: "Deployment gescheitert" };
    }
}