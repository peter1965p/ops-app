import fs from "fs";
import path from "path";

export async function GET() {
    const backupDir = path.join(process.cwd(), "backups");

    if (!fs.existsSync(backupDir)) {
        return Response.json({ backups: [] });
    }

    const files = fs.readdirSync(backupDir);

    const backups = files.map((file) => {
        const stats = fs.statSync(path.join(backupDir, file));

        return {
            file,
            size: stats.size,
            created: stats.birthtime,
        };
    });

    return Response.json({ backups });
}
