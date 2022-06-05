const db = require("./connection_db");

module.exports = function sortessage(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    // 找尋
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
      "SELECT * FROM message_list WHERE name LIKE ? and message LIKE ? and time LIKE ?;",
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
