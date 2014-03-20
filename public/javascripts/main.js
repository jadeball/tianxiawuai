$(document).ready(function () {
  $('#search_form').submit(function (e) {
    //e.preventDefault();
    search(); 
  });
  
  function search() {
    var q = document.getElementById('q');
    if (q.value) {
      /*
      var hostname = window.location.hostname;      
      var url = 'http://www.google.com/search?q=site:' + hostname + '%20';
      window.open(url + q.value, '_blank');
      */
      return true;
    } else {
      return false;
    }
  } 
  
  var $wrapper = $('#wrapper');
  var $backtotop = $('#backtotop');
  var $sidebar = $('#sidebar');
  var top = $(window).height() - $backtotop.height() - 200;
  function moveBacktotop() {
    $backtotop.css({ top: top, right: 0});
  }
  $backtotop.click(function () {
    $('html,body').animate({ scrollTop: 0 });
    return false;
  });
  $(window).scroll(function () {
    var windowHeight = $(window).scrollTop();
    if (windowHeight > 200) {
      $backtotop.fadeIn();
    } else {
      $backtotop.fadeOut();
    }
  });

  moveBacktotop();
  $(window).resize(moveBacktotop);

  $('.topic_content a,.reply_content a').attr('target', '_blank');
});

(function($, win){

    var warning = function(str) {
        str = '<up.floatCS> [ERROR]: ' + str;
        if(win.console)
            win.console.error(str);
        else
            win.alert(str);
    }

    if (win.undefined == $) {
        warning('jquery未存在！');
        return;
    }

    if (win.undefined == win.up) {
        win.up = {};
    }

    var inited = false,
        sys_time = new Date(),
        check_interval = 30,
        screen_width = win.screen.width;

    win.up.floatCS = {
        _el: null,
        _arg: null,
        _icon: null,
        _insertHTML: function() {

            var str = "<style type='text/css'>.rightservice{ position:fixed; left:" + this._arg.right + "px; top:" + this._arg.top + "px; width:" + this._arg.width + "px;z-index:500;}"
                + "*html,*html body{background-attachment:fixed}"
                + "*html .rightservice{position:absolute;right:15px;top:expression(eval(document.documentElement.scrollTop)+180); }"
                + "</style>";

            $(str).appendTo($('head'));
            str = "<div class='rightservice' id='rightservice'><a href='https://95516.unionpay.com/web/icc/chat/chat?c=1&s=4&st=1&depid=ff8080813daaa230013de380641900ec&' target='_blank' class='" + this._arg._class + "' id='rightservice_img'></a>";
            this._el = $(str);
            this._el.appendTo(win.document.body);
            this._icon = this._el.find('#rightservice_img');
        },
        init: function(arg) {
            if (inited)
                return;
            else
                inited = true;
            arg = arg || {};

            //参数校验
            if (arg.currentTime && !(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/.test(arg.currentTime))) {
                warning('参数错误！currentTime 格式为[yyyy/MM/dd hh:mm:ss]');
                return;
            }
            if (arg.startTime && !(/^\d{2}:\d{2}$/.test(arg.startTime))) {
                warning('参数错误！starttTime 格式为[mm:ss]');
                return;
            }
            if (arg.endTime && !(/^\d{2}:\d{2}$/.test(arg.endTime))) {
                warning('参数错误！endTime 格式为[mm:ss]');
                return;
            }
            arg = $.extend({
                currentTime:	sys_time,
                startTime:		'08:30',
                endTime:		'22:30',
                right:			screen_width > 1024 ? 5 : 2,
//                width:			screen_width > 1024 ? 53 : 38,
                top:			152,
                zIndex:			500,
                _class:			'service' + (screen_width <= 1024 ? '_small' : '')
            }, arg);
            arg.currentTime = new Date(arg.currentTime);
            arg.startTime = parseInt(arg.startTime.replace(':', ''), 10);
            arg.endTime = parseInt(arg.endTime.replace(':', ''), 10);

            this._arg = arg;
            //参数校验完毕

            this._insertHTML();
            this.checkTime();


            //自动检测时间
            win.setInterval(function() {
                win.up.floatCS.checkTime();
            }, check_interval*1000);
            if ($.browser.msie && $.browser.version == "6.0") {
                this._el.css('position', 'absolute');
                var t = this;
                $(win).bind('scroll', function() {
                    t._el.css('top', win.document.documentElement.scrollTop + t._arg.top)
                });
            }
        },
        checkTime: function() {
            var period = new Date() - sys_time,
                now = new Date(this._arg.currentTime.getTime() + period);
            //得出当前时间，并获取时分
            now = now.getHours() * 100 + now.getMinutes();
            //判断是否在设定区间
            if (now >= this._arg.startTime && now <= this._arg.endTime) {
                this._icon.removeClass('un' + this._arg._class).addClass(this._arg._class);
            } else {
                this._icon.removeClass(this._arg._class).addClass('un' + this._arg._class);
            }

        }
    }

    $(win).bind('load', function(){
        win.up.floatCS.init();
        $('#rightservice').qrcode({
        background: "#ffffff",
        ecLevel: "H",
        fill: "#333333",
        fontcolor: "#ff9818",
        fontname: "Ubuntu",
        mPosX: 0.5,
        mPosY: 0.5,
        mSize: 0.11,
        minVersion: 6,
        mode: 2,
        quiet: 1,
        radius: 0.5,
        size:100,
        label:'扫描分享',
        render:"image",
        text:window.location.href
        });
    })

})(jQuery, window);
