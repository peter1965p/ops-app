import { exec } from "child_process";

export async function POST() {
    exec("docker stop my-container", (err) => {
        if (err) console.error(err);
    });

    return Response.json({ ok: true });
}
