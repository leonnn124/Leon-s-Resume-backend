const config = require("../config/development_config");

const allMessage = require("../models/get_allmessage");
const encryption = require("../models/encryption");
const jwt = require("jsonwebtoken");

module.exports = class Member {
  getMessage(req, res, next) {
    allMessage().then(
      (result) => {
        // 若寫入成功則回傳
        res.json({
          result: result,
        });
      },
      (err) => {
        // 若寫入失敗則回傳
        res.status(404).json({
          result: err,
        });
      }
    );
  }
};
// };
