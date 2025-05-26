import { DuckDBInstance } from '@duckdb/node-api';
import path from 'path';

const dbPath = path.join(__dirname, 'database.duckdb');
const csvPath = path.join(__dirname, '../data/joined_df2.csv');

async function init() {
  const db = await DuckDBInstance.create(dbPath);
  const con = await db.connect();

  // Create the table and load data
  await con.run(`
    CREATE TABLE IF NOT EXISTS logs AS
    SELECT * FROM read_csv_auto('${csvPath}', HEADER=true);
  `);

  console.log('CSV loaded into DuckDB');
}

init();