const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU5jREVJeHVrcjFvZmpObFBYRzl4RUxPMW1TYlEwQW9SMGhWYXVOZi8zRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3pmTVJyclY5RExaOWh1YXhJOENudlNPVmJkc0NROWcrdUdKV3IrNVpraz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTkh5RXc5cFZqa042ODk2ZndIbGFWc3ROZ2dKek55SFVPM3NaU2FaQkdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxZkZveUp0K1BvOUhoQ2xHREpvSllHL2NkWGJHOG9jOFV5MkNnU0VneUFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNNjRkN2gyVXZ1ekpCYncxZHFpVTlmei9tOCtoRml3RWRUcVpHUGhCbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5SMmFDbjA2ekZwdXZoK3Y0MjVLVFBuU3A5a0NKNWtpSFhxa3o1aktuenM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JQNjFPSjJmSG00NXlyOFR2ZlhaemFXSHBFN1pYc2JJWWpjWTd5Vi9GOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0R4YlZ3Uy9ENEowZzdOT1FHS29oTlYyNXVFY2xGTWNESjBWOTVGdFdSND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik82SzIyNWF3VGswcTQzdU9EMFdkWXh0Q2RMejA0d2ttbWdjQ3g1NUtjOXZxVCtpa292dUhvZ3c2QXVSRk5nanp4U1NvK1lRNDhuU1hzMHZwc1Z4NGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6IndPQkNZZVRoOEE0U3ZVY1hYSC9SYXJySkxTY2ZlS3A5VkNSTzVlb08vMHc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImZzMUJISmhkU1lPbWphXzAxQncxNUEiLCJwaG9uZUlkIjoiMTc3MTZkNTMtZTFmMi00NmY3LWJjZWMtNWIyNGEzNWZjMzI2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRoT3hpQnZJY3Nkc0g3ZmlLdW5hR1haZVhjTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuMUVGcWRMQ255NERqRTZINU10TGpvSE4zanM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMlRNQzdMQlMiLCJtZSI6eyJpZCI6IjI1MjkwNzAyNzc1Njo0N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwlqOY4Ze34ZGM4ZaH4ZGV4Zep4ZeqS+GXqeKBgiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2lpL3FNQkVJS2R1YnNHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaFh3ODJlSFU1NGhXSUI5dFpNR0F4aWN2eS91TUV5VVMxa0o3NGtlN0xrYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMDRudnAzREVsOHplNWpmMzVub3QzU29RMDZBT0FBN09tb1ZhSVRtVmU2NDhoOVhaWktNQit1U1NpaXlvYitoQ1BCUEhPaExxSnVxMGMrbWg4MmFVREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkVrRHpFZnlDNUpuN3Z5TXlPSVFPNHlxV0JGMkxSdG5ERHhjM3F5MUxiUVU4dnRWcmpRV1ZxUlZ2WFhqZE4wSllvcit4OVd1aS9VT3R1MjFka29kWWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjUyOTA3MDI3NzU2OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllWOFBObmgxT2VJVmlBZmJXVEJnTVluTDh2N2pCTWxFdFpDZStKSHV5NUgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzUyODIzMjAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRjA5In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "mushaqibka",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 252907027756",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
