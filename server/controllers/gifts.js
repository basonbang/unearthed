/**
 * Stores controller functions which will perform CRUD operations associated with the gifts table
 */

import { pool } from "../config/database";

const getGifts = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    res.send(200).json(results.rows)
  } catch (error){
    res.status(409).json({error: error.message})
  }
}

export default {
  getGifts
}