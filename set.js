const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0kyTEp3a01GRUxrbXg4SmNzNFc2cXBvaFFEa3lLL2pTOVRwY3htemNVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWt2N3lXYWxMLzE1bUx3UjNoM0NSTnRaOUp4WFVmaThUcG5tdTNWOWlHYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTVY0Y3hnMTBOQkhUbit6OEp1OWNLZ1RSYm1qN2J1bnFRdTRWSjRFVUhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYZFVhbEVzWDRTNWNCSUlGT3lzc3hoRFA4MFFVOXQxU0JHOVc3aXRvbTNZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCdTk3RGtwdkdqUGJkMW5DeFFwTXJJWDVGNk16cmxKVFZoV2FSTGpXMkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllpMHc1NWwyUTVrSXJYdWtVdnRTVWxHOEVINCs4TmlkUUxLc3N5ZTN6eXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia09KT3kyR1lUbENyQWFnUUxNZ25tSlNXWVEzVHEvVEEyVGFuMzJLNC8wbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1kvNlRiYmZYTmVPVDNLbGhQakJlVERVQnhvdlhjTTEwZTRIUGpBOCtBVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFpUjJjOU1CY3NrOGFMUVJSamJad1hmZGV3dERYaVNETmlmYWtlMXo2M1pkaUwvZloxSmtQb0dNOGVkZktldHNmZXlOTVdObW9jL3BYRDNXYlhITkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6IjV4VjY5em4vQTlIWXh2ZEl2aHltQkhORTFSMDk3ZmNSYWx5bkVCb2t0MmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkVJTXRzV1RCU2VLMHhKdF9jZWU2UEEiLCJwaG9uZUlkIjoiZDgxODQ5NTEtZmI1NC00MzA0LTk4NDgtYTkwYTljYWY3NTUxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhOTUlEVVFpejczVzg0d2RETUZtVzBZSUhpaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5bGR6Y0hxZUxINUc4bzhVWjVhK1lxY3dyRzQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ0dSMkpaNFEiLCJtZSI6eyJpZCI6IjI1MjkwNzE3MTY5MDoyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJUGEzTjBGRUwvSDFic0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvOFBmcUF1NU5MeTF2Yk1WTXRlR2s1b0l4Y0VndUFyd3BsS1FEZW9tK0NjPSIsImFjY291bnRTaWduYXR1cmUiOiJjR3VzaGtKMS9wWEFJd2t1bVk2eG95WVh2TjQzOUtLSGYzTnpIMFB5TWZaWWJrNGFJelJ4SENPc2NYQlpHaWFwZW15UWxYRlpsUmFreUVHZUxtQmpEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaUpDLzR6Zm1HNmUxc1VRZ1ZwL1dFQWZmRzBQeThjcVNtOVlGd3ZUcW1XcWFaaDRWVkVkNjdlOVNyN1kxVXl1eloxTC83VDVqNy9xc0dEajh1aGF0RFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTI5MDcxNzE2OTA6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmL0QzNmdMdVRTOHRiMnpGVExYaHBPYUNNWEJJTGdLOEtaU2tBM3FKdmduIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1NzQ2NTA5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUx0diJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "mahanoow",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 2520907171690",              
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
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
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
