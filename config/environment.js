import dotenv from 'dotenv'
dotenv.config()

// our database URL
export const dbURI = 
  process.env.DB_URI || 'mongodb://localhost/itemdb'
export const port = process.env.PORT || 4000
// Secret string for JWT
export const secret = process.env.SECRET || 'shhhh its a secret'
// console.log(secret)