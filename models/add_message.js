const db = require("./connection_db");

module.exports = function patchMessage(memberData) {
  let result = {};
  return new Promise((resolve, reject) => {
    // 找尋
    db.query(
      "INSERT INTO message_list(name, message, time) VALUES ($1, $2, $3);",
      [memberData.name, memberData.message, memberData.time],
      function (err, rows) {
        if (err) {
          result.status = "新增失敗";
          result.err = "伺服器錯誤，請稍後在試！";
          reject(result);
          return;
        } else {
          result.status = "新增成功";
          result.err = "資料庫新增成功";
        }
        resolve(result);
      }
    );
  });
};
