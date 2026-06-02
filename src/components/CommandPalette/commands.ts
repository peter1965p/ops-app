import type { CommandItem } from "./Command.Types";

export const commands: CommandItem[] = [
    {
        id: "docker-start",
        label: "Docker: Start Container",
        icon: "server",
        action: () =>
            fetch("/api/docker/start", {
                method: "POST",
                body: JSON.stringify({ name: "my-container" }),
            }),
    },
    {
        id: "docker-stop",
        label: "Docker: Stop Container",
        icon: "server",
        action: () =>
            fetch("/api/docker/stop", {
                method: "POST",
                body: JSON.stringify({ name: "my-container" }),
            }),
    },
    {
        id: "docker-restart",
        label: "Docker: Restart Container",
        icon: "refresh",
        action: () =>
            fetch("/api/docker/restart", {
                method: "POST",
                body: JSON.stringify({ name: "my-container" }),
            }),
    },
    {
        id: "docker-logs",
        label: "Docker: Show Logs",
        icon: "terminal",
        action: () =>
            fetch("/api/docker/logs", {
                method: "POST",
                body: JSON.stringify({ name: "my-container" }),
            }),
    },
    {
        id: "docker-inspect",
        label: "Docker: Inspect Container",
        icon: "activity",
        action: () =>
            fetch("/api/docker/inspect", {
                method: "POST",
                body: JSON.stringify({ name: "my-container" }),
            }),
    },
    {
        id: "docker-stats",
        label: "Docker: Container Stats",
        icon: "activity",
        action: () =>
            fetch("/api/docker/stats", {
                method: "POST",
                body: JSON.stringify({ name: "my-container" }),
            }),
    },
    {
        id: "sql-show-tables",
        label: "SQL: Show Tables",
        icon: "server",
        action: () =>
            fetch("/api/sql/showTables", {
                method: "POST",
            }),
    },
    {
        id: "sql-run-query",
        label: "SQL: Run Query",
        icon: "terminal",
        action: () =>
            fetch("/api/sql/runQuery", {
                method: "POST",
                body: JSON.stringify({
                    query: "SELECT NOW();",
                }),
            }),
    },
    {
        id: "sql-backup",
        label: "SQL: Backup Database",
        icon: "refresh",
        action: () =>
            fetch("/api/sql/backup", {
                method: "POST",
            }),
    },
    {
        id: "sql-restore",
        label: "SQL: Restore Backup",
        icon: "refresh",
        action: () =>
            fetch("/api/sql/restore", {
                method: "POST",
                body: JSON.stringify({
                    file: "backup.sql",
                }),
            }),
    },
];
