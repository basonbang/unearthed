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

const createGift = async (req, res) => {
  try {
    const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
    // insert new gift into gifts table and return all details of the newly inserted gift
    const insertQuery = `
      INSERT INTO GIFTS (name, pricepoint, audience, image, description, submittedby, submittedon)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *` 
    const results = pool.query(insertQuery, [name, pricepoint, audience, image, description, submittedby, submittedon])
    res.status(201).json(results.rows[0]) // 201 = created status code
  } catch (error) {
    res.status(409).json( {error: error.message})
  }
}

const updateGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id)    // parse ID from URL parameter
    const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
    const results = await pool.query(`
      UPDATE GIFTS SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon = $7 WHERE id = $8`,
      [name, pricepoint, audience, image, description, submittedby, submittedon, id]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({error: error.message})
  }
}

const deleteGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM gifts WHERE id = $1', [id])
    res.status(200).json(results.rows[0]) 
  } catch (error) {
    res.status(409).json({error: error.message})
  }
}

export default {
  getGifts,
  getGiftsById,
  createGift,
  updateGift,
  deleteGift
}