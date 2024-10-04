/**
 * Stores controller functions which will perform CRUD operations associated with the gifts table
 */

import { pool } from "../config/database.js";

const getGifts = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    
    res.status(200).json(results.rows)
  } catch (error){
    res.status(409).json({error: error.message})
  }
}

const getGiftsById = async (req, res) => {
  try {
    const selectQuery = `SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn FROM gifts WHERE id = $1`
    const id = req.params.giftId
    const values = [
      id
    ]
  
    const results = await pool.query(selectQuery, values)
    res.status(200).json(results.rows[0])
  
  } catch (error) {
    res.status(409).json({error: error.message})
  }
}

export default {
  getGifts,
  getGiftsById
}