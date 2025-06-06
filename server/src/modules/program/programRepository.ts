import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

class ProgramRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
  SELECT * FROM program ORDER BY title ASC
`);

    return rows as Program[];
  }

  async readById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM program WHERE id = ?",
      [id],
    );
    return rows[0] as Program | undefined;
  }

  async create(program: Omit<Program, "id">) {
    const { title, synopsis, poster, country, year, category_id } = program;

    const [result] = await databaseClient.query<Result>(
      `INSERT INTO program (title, synopsis, poster, country, year, category_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, synopsis, poster, country, year, category_id],
    );

    return result.insertId;
  }

  async update(id: number, program: Omit<Program, "id">) {
    const { title, synopsis, poster, country, year, category_id } = program;

    const [result] = await databaseClient.query<Result>(
      `UPDATE program SET title = ?, synopsis = ?, poster = ?, country = ?, year = ?, category_id = ?
       WHERE id = ?`,
      [title, synopsis, poster, country, year, category_id, id],
    );

    return result.affectedRows > 0;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM program WHERE id = ?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new ProgramRepository();
