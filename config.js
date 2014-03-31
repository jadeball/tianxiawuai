/**
 * config
 */

var path = require('path');
var pkg = require('./package.json');

var config = {
  debug: false,
  name: '天下无癌',
  description: '天下无癌是一个癌症预防、癌症患者交流、询医专业网站 希望能给广大癌症肿瘤患者带来一些帮助 God bless love!',
  version: pkg.version,

  // site settings
  site_headers: [
    '<meta name="author" content="tianxiawuaicn@126.com" />'
  ],
  host: 'www.tianxiawuai.com',
  // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
  google_tracker_id: 'UA-48547697-1',
  site_logo: '', // default is `name`
  site_navs: [
    // [ path, title, [target=''] ]
    [ '/about', '关于' ]
  ],
  site_static_host: '', // 静态文件存储域名
  mini_assets: false, // 静态文件的合并压缩，详见视图中的Loader
  site_enable_search_preview: false, // 开启google search preview
  site_google_search_domain:  'tianxiawuai.com',  // google search preview中要搜索的域名

  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),
//mongodb://user:pass@localhost:port/database
  //db: 'mongodb://tianxiawuai:1740355@107.170.233.60:27017/tianxiawuai',
  db: 'mongodb://tianxiawuai:1740355@127.0.0.1/tianxiawuai',
  session_secret: 'node_club',
  auth_cookie_name: 'node_club',
  port: 8080,

  // 话题列表显示的话题数量
  list_topic_count: 20,

  // 限制发帖时间间隔，单位：毫秒
  post_interval: 10000,

  // RSS
  rss: {
      title: 'tianxiawuai：天下无癌－－－－癌症患者交流社区',
      link: 'http://www.tianxiawuai.com',
      language: 'zh-cn',
      description: 'tianxiawuai：天下无癌－－－－癌症患者交流社区',

    //最多获取的RSS Item数量
    max_rss_items: 50
  },

  // site links
  site_links: [
    {
      'text': '丁香园',
      'url': 'http://www.dxy.cn/'
    },
     {  'text':'IT技术支持',
        'url':'http://www.jadeball.cn/'
     }
  ],

  // sidebar ads
  side_ads: [
//    {
//      'url': 'http://www.upyun.com/?utm_source=nodejs&utm_medium=link&utm_campaign=upyun&md=nodejs',
//      'image': 'http://site-cnode.b0.upaiyun.com/images/upyun_logo.png',
//      'text': ''
//    },
//    {
//      'url': 'http://ruby-china.org/?utm_source=nodejs&utm_medium=link&utm_campaign=upyun&md=nodejs',
//      'image': 'http://site-cnode.b0.upaiyun.com/images/ruby_china_logo.png',
//      'text': ''
//    },
//    {
//      'url': 'http://adc.taobao.com/',
//      'image': 'http://adc.taobao.com/bundles/devcarnival/images/d2_180x250.jpg',
//      'text': ''
//    }
  ],

  // mail SMTP
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'tianxiawuaicn@126.com',
      pass: 'Wyq1740355'
    }
  },

  //weibo app key
  weibo_key: 1499072991,
  qq_key:101045314,  //25b46df2c5e64fad6c27f2a55b441881

  // admin 可删除话题，编辑标签，设某人为达人
  admins: { admin: true },

  // [ { name: 'plugin_name', options: { ... }, ... ]
  plugins: [
    // { name: 'onehost', options: { host: 'localhost.cnodejs.org' } },
    // { name: 'wordpress_redirect', options: {} }
  ],
  GITHUB_OAUTH: {
    clientID: 'your GITHUB_CLIENT_ID',
    clientSecret: 'your GITHUB_CLIENT_SECRET',
    callbackURL: 'http://cnodejs.org/auth/github/callback'
  },

    sina : {
        "client_id" : "1499072991",
        "app_key" : "1499072991",
        "app_secret" : "e8fbffb6372149852ee06b549db5b18e",
        "redirect_uri" : "http://www.tianxiawuai.com:8080/auth/sina/callback"
    },
    renren : {
        "client_id" : "appkey",
        "app_key" : "appkey",
        "app_secret" : "appsecret",
        "redirect_uri" : "http://test.com/renren_auth_cb"
    },
    qq : {
        "client_id" : "appid",
        "app_key" : "appkey",
        "redirect_uri" : "http://test.com/qq_auth_cb"
    },
    allow_sign_up: true
};

module.exports = config;
module.exports.config = config;