"use client";

import { useEffect, useState } from "react";

export function SqlBackupHistory() {
    const [backups, setBackups] = useState([]);

    useEffect(() => {
        fetch("/api/sql/listBackups")
            .then((res) => res.json())
            .then((data) => setBackups(data.backups));
    }, []);

    const restore = async (file: string) => {
        await fetch("/api/sql/restore", {
            method: "POST",
            body: JSON.stringify({ file }),
        });
    };

    const download = (file: string) => {
        window.location.href = `/backups/${file}`;
    };

    return (
        <div className="p-4 bg-zinc-900 rounded-xl border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">
                SQL Backup History
            </h2>

            <div className="space-y-2">
                {backups.map((b: any) => (
                    <div
                        key={b.file}
                        className="flex items-center justify-between bg-zinc-800 px-4 py-2 rounded-lg border border-white/5"
                    >
                        <div>
                            <div className="text-white">{b.file}</div>
                            <div className="text-xs text-zinc-500">
                                {new Date(b.created).toLocaleString()} —{" "}
                                {(b.size / 1024).toFixed(1)} KB
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => download(b.file)}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                            >
                                Download
                            </button>

                            <button
                                onClick={() => restore(b.file)}
                                className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                                Restore
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
