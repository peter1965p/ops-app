import { Client } from "pg";

export async function POST(req: Request) {
    const { query, params } = await req.json();

    if (!query || typeof query !== "string") {
        return Response.json(
            { error: "Missing or invalid SQL query" },
            { status: 400 }
        );
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();

        const result = await client.query(query, params ?? []);

        return Response.json({
            ok: true,
            rows: result.rows,
            rowCount: result.rowCount,
            fields: result.fields.map((f) => f.name),
        });
    } catch (err: any) {
        return Response.json(
            {
                ok: false,
                error: err.message,
            },
            { status: 500 }
        );
    } finally {
        await client.end();
    }
}
