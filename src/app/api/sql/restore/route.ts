import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        const { file } = await req.json();

        if (!file || typeof file !== "string") {
            return Response.json(
                { ok: false, error: "Missing or invalid file name" },
                { status: 400 }
            );
        }

        // Restore-Verzeichnis
        const backupDir = path.join(process.cwd(), "backups");
        const filePath = path.join(backupDir, file);

        // Sicherheitscheck: Datei MUSS im backups/ Ordner liegen
        if (!filePath.startsWith(backupDir)) {
            return Response.json(
                { ok: false, error: "Invalid file path" },
                { status: 400 }
            );
        }

        // Existiert die Datei?
        if (!fs.existsSync(filePath)) {
            return Response.json(
                { ok: false, error: "Backup file not found" },
                { status: 404 }
            );
        }

        // Restore ausführen
        await execAsync(`psql "${process.env.DATABASE_URL}" < "${filePath}"`);

        return Response.json({
            ok: true,
            restored: file,
        });
    } catch (err: any) {
        return Response.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
