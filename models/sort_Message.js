const db = require("./connection_db");

module.exports = function sortMessage(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    let newData = [];
    if (memberData.name.length <= 0) {
      newData.name = "%%";
    } else newData.name = `%${memberData.name}%`;
    if (memberData.message.length <= 0) {
      newData.message = "%%";
    } else newData.message = `%${memberData.message}%`;
    if (memberData.time.length <= 0) {
      newData.time = "%%";
    } else newData.time = `%${memberData.time}%`;
    db.query(
      "SELECT * FROM message_list WHERE name LIKE $1 and message LIKE $2 and time LIKE $3;",
      [newData.name, newData.message, newData.time],
      function (err, rows) {
        if (err) {
          result.status = "查無訊息";
          result.err = "伺服器錯誤，請稍後在試！";
          reject(result);
          return;
        }
        resolve(rows);
      }
    );
  });
};
