const db = require("./connection_db");

module.exports = function renewMessage(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    // 找尋
    db.query(
      "UPDATE message_list SET message = $1 , time = $2 WHERE id = $3;",
      [memberData.message, memberData.time, memberData.id],
      function (err, rows) {
        if (err) {
          result.status = "更新失敗";
          result.err = "伺服器錯誤，請稍後在試！";
          reject(result);
          return;
        } else {
          result.status = "更新成功";
          result.err = "資料庫更新成功";
        }
        resolve(result);
      }
    );
  });
};
