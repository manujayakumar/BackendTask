import dotenv from 'dotenv';

dotenv.config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "4001"),
    debug: process.env.APP_DEBUG === "true",
}

export default config;
