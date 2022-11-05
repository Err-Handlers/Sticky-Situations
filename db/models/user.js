// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt")

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  const { rows } = await client.query(`
    SELECT * FROM users
  `)
  return rows
}

async function createUser({password, email }) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const { rows: [user] } = await client.query(`
    INSERT INTO users (password, email)
    VALUES ($1, $2)
    RETURNING *;
  `, [hashedPassword, email])
  delete user.password
  return user;
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser
};