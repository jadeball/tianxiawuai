var sign = require('../controllers/sign');
var querystring = require('querystring');
var config = require('../config');
var Sina = require('../controllers/sina');
var QQ = require('../controllers/qq');
var Models = require('../models');
var User = Models.User;

/**
 * 需要管理员权限
 */
exports.adminRequired = function (req, res, next) {
  if (!req.session.user) {
    return res.render('notify/notify', {error: '你还没有登录。'});
  }
  if (!req.session.user.is_admin) {
    return res.render('notify/notify', {error: '管理员才能编辑标签。'});
  }
  next();
};

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user) {
    return res.send(403, 'forbidden!');
  }
  next();
};

/**
 * 需要登录，响应错误页面
 */
exports.signinRequired = function (req, res, next) {
  if (!req.session.user) {
    res.render('notify/notify', {error: '未登入用户不能发布话题。'});
    return;
  }
  next();
};

exports.blockUser = function () {
  return function (req, res, next) {
    if (req.session.user && req.session.user.is_block) {
      return res.send('您被屏蔽了。');
    }
    next();
  };
}

exports.sinacallback = function (req, res, next) {
    var sina = new Sina(config.sina);
    sina.oauth.accesstoken(req.query.code , function (error, data){
        if(!error){
            access_token = data.access_token;
            sina.users.show({
                source:config.sina.app_key,
                uid:data.uid,
                access_token:access_token,
                method:"GET"
            }, function(error, data){
                if(error){
//                    res.render('ok', {
//                        result: 'ERROR'
//                    });
                }
                else {
//                    res.render('ok', {
//                        result: JSON.stringify(data)
//                    });

                    User.findOne({sinaId: data.id}, function (err, user) {
                        if (err) {
                            return next(err);
                        }
                        if (user) {
                            user.name = data.name;
                            user.sinaUsername = data.name;
                            user.loginname = data.name;
                            user.email = data.id+"@sina.com";
                            user.avatar = data.profile_image_url;
                            user.save(function (err) {
                                if (err) {
                                    return next(err);
                                }
                                sign.gen_session(user, res);
                                return res.redirect('/');
                            });
                        } else {
                            //req.session.profile = profile; 创建一个
                            //return res.redirect('/auth/sina/new');

                            var user = new User({
                                name: data.name,
                                loginname: data.name,
                                pass: data.access_token,
                                email: data.id+"@sina.com",
                                avatar: data.profile_image_url,
                                sinaId: data.id,
                                sinaUsername: data.name
                            });
                            user.save(function (err) {
                                if (err) {
                                    if (err.err.indexOf('duplicate key error') !== -1) {
                                        if (err.err.indexOf('users.$email') !== -1) {
                                            return res.status(500)
                                                .send('您 Sina 账号的 Email 与之前在 天下无癌 注册的 Email 重复了，也可能是您的 Sina 没有提供公开的 Email 导致注册失败。');
                                        }
                                        if (err.err.indexOf('users.$loginname') !== -1) {
                                            return res.status(500)
                                                .send('您 Sina 账号的用户名与之前在 天下无癌 注册的用户名重复了');
                                        }
                                    }
                                    return next(err);
                                }
                                sign.gen_session(user, res);
                                res.redirect('/');
                            });




                        }
                    })
                }
            });
        }
        else{
            console.log(error);
//            res.render('ok', {
//                result: 'ERROR'
//            });
        }
    });
}

exports.qqcallback = function (req, res, next) {
    var qq = new QQ(config.qq);
    var _openid = "";
    qq.oauth.accesstoken(req.query.code , function (error, token){//{access_token:YOUR_ACCESS_TOKEN, expires_in:7776000}
        if(error){
            console.log(error);
//            res.render('ok', {
//                result: 'ERROR'
//            });
        }
        else{
            var access_token = querystring.parse(token)['access_token'];
            qq.oauth.openid(access_token, function(err, data){//{"client_id":"YOUR_APPID","openid":"YOUR_OPENID"}
                if(err){
//                    res.render('ok', {
//                        result: 'ERROR'
//                    });
                }
                else{
                    _openid = data.openid;
                    qq.user.get_user_info({
                        openid: data.openid,
                        access_token: access_token,
                        oauth_consumer_key: config.qq.client_id,
                        method: "GET"
                    }, function(error, data){
                        if(error){
//                            res.render('ok', {
//                                result: 'ERROR'
//                            });
                        }
                        else {
                            data.id = _openid;

                            User.findOne({qqId: data.id}, function (err, user) {
                                if (err) {
                                    return next(err);
                                }
                                if (user) {
                                    user.name = data.nickname;
                                    user.qqUsername = data.nickname;
                                    user.loginname = data.nickname;
                                    user.email = data.id+"@qq.com";
                                    user.avatar = data.figureurl_qq_1;
                                    user.save(function (err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        sign.gen_session(user, res);
                                        return res.redirect('/');
                                    });
                                } else {
                                    //req.session.profile = profile; 创建一个
                                    //return res.redirect('/auth/sina/new');

                                    var user = new User({
                                        name: data.nickname,
                                        loginname: data.nickname,
                                        pass: data.id,
                                        email: data.id+"@qq.com",
                                        avatar: data.figureurl_qq_1,
                                        qqId: data.id,
                                        qqUsername: data.nickname
                                    });
                                    user.save(function (err) {
                                        if (err) {
                                            if (err.err.indexOf('duplicate key error') !== -1) {
                                                if (err.err.indexOf('users.$email') !== -1) {
                                                    return res.status(500)
                                                        .send('您 QQ 账号的 Email 与之前在 天下无癌 注册的 Email 重复了，也可能是您的 QQ 没有提供公开的 Email 导致注册失败。');
                                                }
                                                if (err.err.indexOf('users.$loginname') !== -1) {
                                                    return res.status(500)
                                                        .send('您 QQ 账号的用户名与之前在 天下无癌 注册的用户名重复了');
                                                }
                                            }
                                            return next(err);
                                        }
                                        sign.gen_session(user, res);
                                        res.redirect('/');
                                    });




                                }
                            })
                        }
                    });
                }
            });
        }

    });
}



