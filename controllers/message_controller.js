const config = require("../config/development_config");

const allMessage = require("../models/get_allmessage");
const patchMessage = require("../models/add_message");
const dropMessage = require("../models/delete_message");
const renewMessage = require("../models/renew_message");
const sortMessage = require("../models/sort_message");
const encryption = require("../models/encryption");
const jwt = require("jsonwebtoken");
const verify = require("../models/verification_model");

module.exports = class Member {
  getMessage(req, res, next) {
    const token = req.headers["token"];
    //確定token是否有輸入
    if (check.checkNull(token) === true) {
      res.json({
        err: "請輸入token！",
      });
    } else if (check.checkNull(token) === false) {
      verify(token).then((tokenResult) => {
        if (tokenResult === false) {
          res.json({
            result: {
              status: "token錯誤。",
              err: "請重新登入。",
            },
          });
        } else {
          allMessage().then(
            (result) => {
              // 若寫入成功則回傳
              res.json({
                result: result.reverse(),
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
      });
    }
  }
  addMessage(req, res, next) {
    const token = req.headers["token"];
    //確定token是否有輸入
    if (check.checkNull(token) === true) {
      res.json({
        err: "請輸入token！",
      });
    } else if (check.checkNull(token) === false) {
      verify(token).then((tokenResult) => {
        if (tokenResult === false) {
          res.json({
            result: {
              status: "token錯誤。",
              err: "請重新登入。",
            },
          });
        } else {
          const memberData = {
            name: req.body.name,
            message: req.body.message,
            time: req.body.time,
          };
          patchMessage(memberData).then(
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
      });
    }
  }
  deleteMessage(req, res, next) {
    const token = req.headers["token"];
    //確定token是否有輸入
    if (check.checkNull(token) === true) {
      res.json({
        err: "請輸入token！",
      });
    } else if (check.checkNull(token) === false) {
      verify(token).then((tokenResult) => {
        if (tokenResult === false) {
          res.json({
            result: {
              status: "token錯誤。",
              err: "請重新登入。",
            },
          });
        } else {
          const id = req.headers["id"];
          const memberData = {
            id: id,
          };
          dropMessage(memberData).then(
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
      });
    }
  }
  updateMessage(req, res, next) {
    const token = req.headers["token"];
    //確定token是否有輸入
    if (check.checkNull(token) === true) {
      res.json({
        err: "請輸入token！",
      });
    } else if (check.checkNull(token) === false) {
      verify(token).then((tokenResult) => {
        if (tokenResult === false) {
          res.json({
            result: {
              status: "token錯誤。",
              err: "請重新登入。",
            },
          });
        } else {
          const id = req.headers["id"];
          const memberData = {
            id: id,
            message: req.body.newMessage,
            time: req.body.newTime,
          };
          renewMessage(memberData).then(
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
      });
    }
  }
  filterMessage(req, res, next) {
    const token = req.headers["token"];
    //確定token是否有輸入
    if (check.checkNull(token) === true) {
      res.json({
        err: "請輸入token！",
      });
    } else if (check.checkNull(token) === false) {
      verify(token).then((tokenResult) => {
        if (tokenResult === false) {
          res.json({
            result: {
              status: "token錯誤。",
              err: "請重新登入。",
            },
          });
        } else {
          const memberData = {
            name: req.body.name,
            message: req.body.message,
            time: req.body.time,
          };
          sortMessage(memberData).then(
            (result) => {
              // 若寫入成功則回傳
              res.json({
                result: result.reverse(),
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
      });
    }
  }
};
// };
