const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU5GSnltZVVlOG5ZR1NPZVhidVZQN3VpZlFPbXdVZFpPc2UwQnhvT1JHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHFOeldmeXFHWUZ2ZVNnMnRSd2xoQytqREFiWmV2WW9wVUlIVlU4dkdRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TlJWY2RsWjFPYlJ5akI4M2hDVnBGZW1rMElYUCt4UUlZVUlaUkoza0g0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNZlVtMlAxTFlMNklScGNVUGE2Y2pyRllobFBxeW1MRkxmSzd3QnYwdlZVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNFYjRhWlJBM0dHazRhQmUwcHpCSUZSN0FWNllyNHhiUlpSdGswNTZJa2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5GSEFSR0xKN2hkTEE0RFB1VWtTZDl0bk9pbDZKaURLK3Vsek9hcThLWFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUljT1dzQ2ZCMWpBblgzb0ptWU4xL3ZGeVVFRDhKbGVVT1VsQWpFMXNGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRFdhY1VwYThPNk1pTjFxckw4ckkrUDBlWGFmZm83T0Q3ZVBxNE5ieWlrTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRmYjZaclErR2N4ZTFaZXhneWt5SHU3WGpGT3h5aGpCMGNmSU1tbXdnRVFLTk9DZVo0MDlCTVlWelRzMjA5YlhpR0NNNUIza3huU2FCTk55cFNOVUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiJibXFEazdnbXBWaEd6OGRqc25xV2NTeU1FUG9oTjFmZmkxSDREYStvUlJRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJwWm8tdUF1ZFFzeUFtOFpHajNVY0VnIiwicGhvbmVJZCI6ImJiYzZkNWJhLTJiM2MtNGVhNi1hZDgyLTQ3MjI1MWU2MWY3MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2N1puc2x5WVdML3lzWTF2YXpxb3R6YVlNLzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDBPMVY5bEZBbFRZcGRiZzNCOGhTVU9vV0FBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJHTjc0NjdCIiwibWUiOnsiaWQiOiIyNTI5MDcwMjc3NTY6NDZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8JajmOGXt+GRjOGWh+GRleGXqeGXqkvhl6nigYIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tpaS9xTUJFUCtUdWJzR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhYdzgyZUhVNTRoV0lCOXRaTUdBeGljdnkvdU1FeVVTMWtKNzRrZTdMa2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImZzR2t4dERoTnNsRnBjSFZodmprOC9mWDFyVzBydnUxUTFYTmViSHJ3OWdHU1ZsbTluOGRSRGZWS3UvVFprS2JtWnRYYkk1eUJWQnpvMjhkbndlcUR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSQks2UVVtU2ovaTRTVTM2emp4TDZsc2VNcHdBdzhwZzZTQ05xWEsrRGxMcXc2Znc3TjFMMmxwY1pESzJRa2RGWHUxUkZ6aldEaFg3SGVKUFlFVG1BUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1MjkwNzAyNzc1Njo0NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZVjhQTm5oMU9lSVZpQWZiV1RCZ01Zbkw4djdqQk1sRXRaQ2UrSkh1eTVIIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1MjgxMTYzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUYwOSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "mushaqibka",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2520907027756",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
