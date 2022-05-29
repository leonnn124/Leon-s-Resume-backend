const db = require("./connection_db");

module.exports = function dropMessage(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    // 找尋
    db.query(
      "DELETE FROM message_list WHERE id= ?;",
      [memberData.id],
      function (err, rows) {
        if (err) {
          result.status = "刪除失敗";
          result.err = "伺服器錯誤，請稍後在試！";
          reject(result);
          return;
        } else {
          result.status = "刪除成功";
          result.err = "資料庫刪除成功";
        }
        resolve(result);
      }
    );
  });
};
