import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST() {
    try {
        // Backup-Verzeichnis
        const backupDir = path.join(process.cwd(), "backups");

        // Falls nicht vorhanden → erstellen
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        // Dateiname mit Timestamp
        const fileName = `backup_${Date.now()}.sql`;
        const filePath = path.join(backupDir, fileName);

        // pg_dump ausführen
        await execAsync(`pg_dump "${process.env.DATABASE_URL}" > "${filePath}"`);

        return Response.json({
            ok: true,
            file: fileName,
            path: `/backups/${fileName}`,
        });
    } catch (err: any) {
        return Response.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
