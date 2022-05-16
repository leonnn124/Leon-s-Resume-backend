const Check = require("../service/member_check");
const toRegister = require("../models/register_model");
const encryption = require("../models/encryption");
const loginAction = require("../models/login_model");

check = new Check();

module.exports = class Member {
  postRegister(req, res, next) {
    // 進行加密
    const password = encryption(req.body.password);

    // 獲取client端資料
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: password,
    };
    const checkEmail = check.checkEmail(memberData.email);
    // 不符合email格式
    if (checkEmail === false) {
      res.json({
        result: {
          status: "註冊失敗。",
          err: "請輸入正確的Eamil格式。(如1234@email.com)",
        },
      });
      // 若符合email格式
    } else if (checkEmail === true) {
      // 將資料寫入資料庫
      toRegister(memberData).then(
        (result) => {
          // 若寫入成功則回傳
          res.json({
            result: result,
          });
        },
        (err) => {
          // 若寫入失敗則回傳
          res.json({
            result: err,
          });
        }
      );
    }
  }
  postLogin = (req, res, next) => {
    const password = encryption(req.body.password);

    // 獲取client端資料
    const memberData = {
      email: req.body.email,
      password: password,
    };

    loginAction(memberData).then((rows) => {
      if (check.checkNull(rows) === true) {
        res.json({
          result: {
            status: "登入失敗。",
            err: "請輸入正確的帳號或密碼。",
          },
        });
      } else if (check.checkNull(rows) === false) {
        res.json({
          result: {
            status: "登入成功。",
            loginMember: "歡迎 " + rows[0].name + " 的登入！",
          },
        });
      }
    });
  };
};
