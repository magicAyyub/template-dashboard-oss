import { NextResponse } from 'next/server';
import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/app/backend/duckdb/database.duckdb');

export async function GET() {
  try {
    const db = await DuckDBInstance.create(dbPath);
    const con = await db.connect();

    // Describe database
    const result = await con.runAndReadAll(`
        DESCRIBE logs;
    `);

    await result.readAll();
    const data = result.getRowObjects();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}