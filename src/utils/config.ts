import dotenv from "dotenv";

dotenv.config();

require("dotenv").config();

const config = {
  database: {
    name: process.env.DB_NAME ?? "",
    username: process.env.DB_USERNAME ?? "",
    password: process.env.DB_ROOT_PASSWORD ?? "",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
  },
  port: process.env.PROD_PORT || process.env.DEV_PORT,
  backend: process.env.BACKEND_URL
}

export default config;