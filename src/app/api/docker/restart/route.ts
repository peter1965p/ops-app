import { exec } from "child_process";

export async function POST(req: Request) {
    const { name } = await req.json();
    exec(`docker restart ${name}`);
    return Response.json({ ok: true });
}
