import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params?: any[]) => {
    try {
        console.log("Query wird ausgeführt:", text); // Debug-Log
        return await pool.query(text, params);
    } catch (error) {
        console.error("Datenbank-Fehler in lib/db.ts:", error);
        throw error; // Lässt uns den Fehler im Terminal sehen
    }
};

export default pool;