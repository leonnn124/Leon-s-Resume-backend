const db = require("./connection_db");

module.exports = function memberMessage() {
  let result = {};
  return new Promise((resolve, reject) => {
    // 找尋
    db.query("SELECT * FROM message_list", function (err, rows) {
      if (err) {
        result.status = "查無訊息";
        result.err = "伺服器錯誤，請稍後在試！";
        reject(result);
        return;
      }
      resolve(rows);
    });
  });
};
