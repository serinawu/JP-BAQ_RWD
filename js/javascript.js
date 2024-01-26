$(function () {
    var swiper = new Swiper('.swiper_banner', {
        loop: true,
        autoWidth: true, //自動高
        autoHeight: true, //自動高
        slidesPerView: 1, //顯示個數
        spaceBetween: 0, //間距
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: { //arrow
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})
$(function () {
    var swiper = new Swiper('.swiper_recommend', {
        autoWidth: true, //自動高
        autoHeight: true, //自動高
        slidesPerView: 2, //顯示個數
        spaceBetween: 0, //間距
        navigation: { //arrow
            nextEl: '.swiper-button-next02',
            prevEl: '.swiper-button-prev02',
        },
    });
})

// topNav 控制器
$(function () {
    $(".page_container .topNav .mainList li").click(function () {
        var n = $(this).index();

        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");

        $(".page_container .contentBlock:eq(" + n + ")")
            .addClass("display")
            .siblings(".contentBlock")
            .removeClass("display");
    })
})

// 篩選器
$(function () {
    $(document).on("click", ".filterBlock li, .filterBlock button", function () {
        var n = $(this).index();
        var tag = $(this).attr('class');

        if ($(this).closest(".filterBlock").hasClass("sportType_preset")) {
            
            $(this)
            .addClass("active")
            .siblings()
            .css("display","none");

            $(this)
            .closest(".filterBlock")
            .siblings(".gameEvent_list.extendable")

            .addClass("display")
            .siblings(".gameEvent_list")
            .removeClass("display");

            console.log(tag);
            
        } if ($(this).hasClass("datePicker")) {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
        } if ($(this).closest(".filterBlock").hasClass("forMyBet")) {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");

            $(this)
                .closest(".topNav")
                .siblings(".gameEvent_list:eq(" + n + ")")
                .addClass("display")
                .siblings(".gameEvent_list")
                .removeClass("display");

            $(".hint_State").removeClass("display");

        } else {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");

            $(this)
                .closest(".filterBlock")
                .siblings(".gameEvent_list:eq(" + n + ")")
                .addClass("display")
                .siblings(".gameEvent_list")
                .removeClass("display");

            $(".hint_State").removeClass("display");
        }
    })
})

//下拉選擇器
$(function () {
    $(document).on("click", ".select", function () {
        $(this)
            .addClass("open")
            .children("ul")
            .toggleClass("display");

        $(".select ul li").click(function (event) {
            var val = $(this).find("p").text();

            $(this)
                .addClass("active")
                .siblings("li")
                .removeClass("active")
                .closest("ul")
                .removeClass("display")
                .closest(".select ")
                .removeClass("open")
                .children("p")
                .text(val);

            event.stopPropagation();
        })
    })
    //球種首頁預設人氣選擇器
    $(document).on("click", ".selectCountry", function () {
        $(this)
            .toggleClass("open")
            .find("ul")
            .toggleClass("display");

        $(".selectCountry>ul").click(function (event) {
            event.stopPropagation();

            $(this)
                .closest(".selectCountry")
                .removeClass("open")
                .find(".selectList")
                .removeClass("display");
        })
        $(".selectCountry>ul li").click(function (event) {
            event.stopPropagation();

            $(this)
                .toggleClass("active");
        })

        $(".selectCountry ul li .teamList li").click(function () {
            var val = $(this).parent(".teamList").prev("div").attr("class");

            $(this)
                .closest(".selectList")
                .removeClass("display");

            $(this)
                .closest(".selectCountry")
                .removeClass("open");

            $(".typeBlock .filterBlock.withFlag ol>li").each(function () {
                if ($(this).hasClass("" + val + "")) {
                    $(this)
                        .css({
                            "background": "#ff0b43",
                            "display": "flex"
                        });
                } else {
                    $(this)
                        .css({
                            "background": "#1D1E23",
                            "display": "none"
                        })
                }
            })

            $(".typeBlock .gameEvent_list.extendable").each(function () {
                if ($(this).hasClass("" + val + "")) {
                    $(this)
                        .addClass("active")
                        .addClass("display");
                } else {
                    $(this)
                        .removeClass("display");
                }
            })
        })
    })
})

//賽事_功能
$(function () {
    //加到我的最愛
    $(".eventBlock .addFavorite").click(function () {
        $(this)
            .closest(".eventBlock")
            .toggleClass("favorites");
    })
    //釘選
    $(".pin_ic").click(function (event) {
        $(this)
            .closest(".gameEvent_list.extendable.display")
            .toggleClass("addPin");

        event.stopPropagation();
    })
})

//提示
$(function () {
    //側邊清單提示
    $(".sideMenu .topGroup .topItem")
        .on("mouseenter", function () {
            var v = $(this).index();

            if (v == 0) {
                $(this)
                    .append("<span class='hintBlock'>ホーム</span>");
            } else if (v == 1) {
                $(this)
                    .append("<span class='hintBlock'>ライブ</span>");
            } else if (v == 2) {
                $(this)
                    .append("<span class='hintBlock'>お気に入り</span>");
            } else if (v == 12) {
                $(this)
                    .append("<span class='hintBlock'>マイベット</span>");
            } else if (v == 13) {
                $(this)
                    .append("<span class='hintBlock'>検索</span>");
            }

            $(this)
                .css("position", "relative")
                .find("span.hintBlock")
                .css({
                    "position": "absolute",
                    "top": "-30px",
                    "left": "50%",
                    "transform": "translateX(-50%)",
                    "background": "#111415",
                    "color": "#ffffff",
                    "font-size": "12px",
                    "white-space": "nowrap",
                    "padding": "10px",
                    "border-radius": "10px",
                    "border-radius": "5px",
                });

            $(this)
                .closest(".topGroup")
                .css("z-index", "150");
        })
        .on("mouseleave", function () {
            $(this)
                .find(".hintBlock")
                .remove();

            $(this)
                .closest(".topGroup")
                .css("z-index", "98");
        })

    //加入我的最愛提示
    $(".gameEvent_list .functionBlock svg.addFavorite")
        .on("mouseenter", function () {
            $(this)
                .closest(".functionBlock")
                .append("<span class='hintBlock'>お気に入り</span>");

            $(this)
                .closest(".functionBlock")
                .css("position", "relative")
                .find("span.hintBlock")
                .css({
                    "position": "absolute",
                    "top": "0",
                    "left": "50%",
                    "transform": "translateX(-50%)",
                })
        })
        .on("mouseleave", function () {
            $(this)
                .closest(".functionBlock")
                .find(".hintBlock")
                .remove();
        })
    $(".gameBasic_Block .functionBlock svg.addFavorite")
        .on("mouseenter", function () {
            $(this)
                .closest(".functionBlock")
                .append("<span class='hintBlock'>お気に入り</span>");

            $(this)
                .closest(".functionBlock")
                .css("position", "relative")
                .find("span.hintBlock")
                .css({
                    "position": "absolute",
                    "top": "-30px",
                    "left": "15%",
                    "transform": "translateX(0%)",
                    "padding": "10px",
                    "z-index": "10",
                })
        })
        .on("mouseleave", function () {
            $(this)
            .closest(".functionBlock")
            .find(".hintBlock")
            .remove();
        })
    //投注項目提示
    $(".eventBlock .scroll > .wrap .itemBlock .itemName p")
    .on("mouseenter", function () {
        var hintText = $(this).text();
        $(this)
            .closest(".itemBlock")
            .append("<span class='hintBlock'>" + hintText + "</span>");

        $(this)
            .closest(".wrap")
            .css({
                "overflow-x": "unset",
                "overflow-y": "unset",
            })
            .closest(".scroll")
            .css({
                "overflow": "unset",
            })
            .find("span.hintBlock")
            .css({
                "position": "absolute",
                "top": "-35px",
            })
            .closest(".eventBlock")
            .addClass("hoverHintText_hintStyle")
            .append("<span class='fake_padding'></span>");
    })
    .on("mouseleave", function () {
        $(this)
            .closest(".itemBlock")
            .find(".hintBlock")
            .remove();
            $(this)
            .closest(".wrap")
            .css({
                "overflow-x": "overlay",
                "overflow-y": "hidden",
            })
            .closest(".scroll")
            .css({
                "overflow": "hidden",
            })
            .closest(".eventBlock")
            .removeClass("hoverHintText_hintStyle")
            .find(".fake_padding")
            .remove();
    })
})

//選擇投注項目
$(function () {
    $(document).on("click", ".itemBlock .selection_Wrap div, .betPoint_Block", function () {

        if ($(this).hasClass("disabled")) {

        } else {
            $(this)
                .css("position", "relative")
                .addClass("selected")
                .append("<span class='animate_Dot normal'></span>");
        }
    })
    $(document).on("click", ".itemBlock .selection_Wrap div.selected, .betPoint_Block.selected", function () {
        $(this)
            .removeClass("selected")
            .find(".animate_Dot.normal")
            .remove();
    })
    $(document).on("click", ".betAgainBtn", function () {

        if ($(this).hasClass("disabled")) {

        } else {
            $(this)
                .css({
                    "background": "#ffffff33",
                    "position": "relative",
                })
                .addClass("selected")
                .append("<span class='animate_Dot betAgain'></span>")
                .closest(".bet_eventBlock")
                .addClass("selected");

            $(this)
                .find("p")
                .text("Remove");
        }
    })
    $(document).on("click", ".betAgainBtn.selected", function () {
        $(this)
            .css({
                "background": "#ff0b43",
            })
            .removeClass("selected")
            .find(".animate_Dot.betAgain")
            .remove();

        $(this)
            .find("p")
            .text("ベットスリップに追加");

        $(this)
            .closest(".bet_eventBlock")
            .removeClass("selected");
    })
})

//我的最愛頁-移除\我的最愛\
$(function(){
    $(".favoritePage .eventBlock.favorites .functionBlock .addFavorite").click(function(){
        var favLength = $(".favoritePage .gameEvent_list.display .eventBlock").length-1;
        
        $(this)
        .closest(".eventBlock")
        .remove();

        if(favLength == 0) {
            $(".favoritePage .gameEvent_list")
            .removeClass("display")
            .prev(".hint_State")
            .addClass("display");
        } else {

        }
    })
})

//搜尋頁
$(function(){
    $(".searchPage .bigSearch").click(function(){


        if ( $(this).children("inout").val() !== "") {
            $(this).toggleClass("searching");
        } else {
        }
    })
})

//球種首頁 可收縮賽事
$(function () {
    $(document).on("click", ".gameEvent_list.extendable.display .titleWrap", function () {

        if ($(this).closest(".gameEvent_list.extendable.display").hasClass("active")) {
            $(this)
                .next("ul")
                .slideToggle('fast');

            $(this)
                .find(".downArrow_ic")
                .css("transform", "rotate(0deg)");
        } else {
            $(this)
                .closest(".gameEvent_list.extendable.display")
                .addClass("active")
                .next("ul")
                .slideToggle('fast');

            $(this)
                .find(".downArrow_ic")
                .css("transform", "rotate(180deg)");
        }
    })
    $(".gameEvent_list.extendable.display .autoRaitoBlock button.toggle_switchBtn").click(function () {
        $(this)
            .siblings(".betSelect_Block.three")
            .toggleClass("active");

        if ($(this).siblings(".betSelect_Block.three").hasClass("active")) {
            $(this)
                .find("p").text("表示を減らす")
                .next("svg")
                .css("transform", "rotate(180deg)");
        } else {
            $(this)
                .find("p")
                .text("さらに表示")
                .next("svg")
                .css("transform", "rotate(0deg)");
        }
    })
})

//跳轉->賽事詳細內層
$(function () {
    $('.countryTeam, .returnAll_markets').click(function () {
        $(this)
            .closest(".outerMode")
            .removeClass("display")
            .siblings(".innerMode_Detail")
            .addClass("display");
    })
})


//-----------------------側邊清單------------------------------------

//手機版最上層收合
$(function () {
    $(".sideMenu .topGroup .expandItem .expandIc .expand").click(function () {
        $(this).toggleClass("turn");
        $(this).closest(".sideMenu").toggleClass("open");
        if ($(".sideMenu .sportGroup").hasClass("display")) {
            $(".sideMenu .sportGroup").removeClass("display").addClass("back")
        } else {
            $(".sideMenu .sportGroup").addClass("display").removeClass("back")
        }
    })
})

// 現在熱門 收合
$(function () {
    $(".sideMenu .hotGroup .title").click(function () {
        $(".sideMenu .hotGroup .hotContent").toggleClass("display");
        $(".sideMenu .hotGroup .title .expand").toggleClass("turn");
    })
})

//球類/國家 收合
$(function () {
    $(".sideMenu .sportGroup ul ol .item .buttonGroup").click(function (event) {
        $(this).toggleClass("display");
        $(this).find(".more").toggleClass("display");
        $(this).parents(".item").siblings(".country").toggleClass("display");
        $(this).parents(".item").parents().toggleClass("display");

        event.stopPropagation();
    })
})

//Esports 收合
$(function () {
    $(".sideMenu .sportGroup ul ol .country .esportGroup .esport .downList").click(function () {
        $(this).toggleClass("turn");
        $(this).parents(".esport").parents(".esportGroup").siblings(".listGroup").toggleClass("display");
    })
})

//上方按鈕 active
$(function () {
    $(".sideMenu .topGroup div").click(function () {
        $(this).toggleClass("active");
        $(this).siblings().removeClass("active");
    })
})

//熱門 active 
$(function () {
    $(".sideMenu .hotGroup .hotContent .hotItem").click(function () {
        $(this).toggleClass("active");
        $(this).siblings().removeClass("active");
    })
})

//球類 active
$(function () {
    $(".sideMenu .sportGroup ul ol .item").click(function () {
        $(this).addClass("active");
        $(this).parents().siblings().find(".item").removeClass("active");
        $(this).parents().siblings().find(".country li").removeClass("active");
    })
})

//國家 active
$(function () {
    $(".sideMenu .sportGroup ul ol .country li").click(function () {
        $(this)
        .toggleClass("active")
        .siblings()
        .removeClass("active");

        $(this)
        .closest("ol")
        .find(".item")
        .addClass("active");

        $(this).closest("ol").siblings().find(".item").removeClass("active");
        $(this).closest("ol").siblings().find(".country li").removeClass("active");
    })
})

//-----------------------側邊清單------------------------------------

// 快速下注
function bet() {
    $("aside .bet .title .left").click(function () {
        if ($("aside .bet .title , aside .bet .content.plzSignIn_bet").hasClass("display")) {
            setTimeout(function () {
                $("aside .bet .content.plzSignIn_bet").toggleClass("display")
                    .siblings(".content").removeClass("display");
            }, 300);
        }
        else if ($("aside .bet .title > div .notice").hasClass("display")) {

            setTimeout(function () {
                $("aside .bet .content.bet-select")
                    .toggleClass("display")
                    .siblings(".content").removeClass("display");
            }, 300);
        }
        else {
            setTimeout(function () {
                $("aside .bet .content.plz-bet")
                    .toggleClass("display")
            }, 300);

        }
        if ($("aside .bet .content").hasClass("display")) {
            $("aside .bet .title .create-down_svg").css("transform", "rotate(0deg)");
        }
        else {
            $("aside .bet .title .create-down_svg").css("transform", "rotate(180deg)");
        }

        ///2023 0926  jadddd
        if ($("header").hasClass("innerpage")
            && $("aside .bet .title").hasClass("display")) {
            setTimeout(() => {
                $("aside .bet .content.inner-bet").addClass("display")
                    .siblings(".content").removeClass("display");
            }, 400);
        }
        if ($("header").hasClass("innerpage")
            && $("aside .bet .title , aside .bet .content.inner-bet").hasClass("display")) {
            setTimeout(() => {
                $("aside .bet .content.inner-bet").removeClass("display")
                    .siblings(".content").removeClass("display")
            }, 300);
            setTimeout(() => {
                $("aside .bet .title").removeClass("display");
                $("aside .bet .content.inner-bet").removeClass("display")
                    .siblings(".content").removeClass("display")
            }, 401);
        }

    });
    $("aside .bet .title .right").click(function () {

        if ($("aside .bet .title").hasClass("display")) {
            setTimeout(function () {
                $("aside .bet .title").removeClass("display");
                $("aside .bet .content.plz-bet").addClass("display")
                $("aside .bet .content.plzSignIn_bet").removeClass("display")
            }, 300)
        }
        else {
            setTimeout(function () {
                $("aside .bet .title").addClass("display");
                $("aside .bet .content.plzSignIn_bet").addClass("display")
                $("aside .bet .content.plz-bet").removeClass("display")
            }, 300);
        }
        //20230923 j add
        if ($("body").children("header").hasClass("innerpage")) {
            setTimeout(() => {
                $("aside .bet .title").addClass("display");
                $("aside .bet .content.inner-bet").addClass("display")
                    .siblings(".content").removeClass("display");
            }, 300);
        };
        if ($("body").children("header").hasClass("innerpage")
            && $("aside .bet .title").hasClass("display")) {
            setTimeout(function () {
                $("aside .bet .title").removeClass("display");
                $("aside .bet .content.plz-bet").addClass("display")
                    .siblings(".content").removeClass("display");
            }, 300)
        };
        //20230923 j add
        let x = $(".eventBlock .scroll > .wrap .itemBlock > .selection_Wrap")
            .children("div")
        let y = $("aside .bet .title")

        if (x.hasClass("selected")) {
            x.removeClass("selected");
            $("aside .bet .title > div .notice span").text(0);
            $("aside .bet .title > div .notice")
                .removeClass("display")
                .siblings(".bet-slip").css("max-width", "80px")
        }
        if (x.hasClass("selected") && y.hasClass("display")) {
            setTimeout(() => {
                $("html body aside .bet .content.bet-select")
                    .toggleClass("display")
                    .siblings(".content").removeClass("display");
            }, 300);
            $("aside .bet .title > div .notice")
                .addClass("display")
                .siblings(".bet-slip").css("max-width", "65px")
        }
        if ($("aside .bet .content.bet-select").hasClass("display")) {
            setTimeout(function () {
                $("aside .bet .title").addClass("display");
                $("aside .bet .content.plzSignIn_bet").addClass("display")
                    .siblings(".content").removeClass("display");
            }, 300);
        }
        //20230926
        if ($("aside .bet .content").hasClass("display")) {
            $("aside .bet .title .create-down_svg").css("transform", "rotate(180deg)");
        }
        else {
            $("aside .bet .title .create-down_svg").css("transform", "rotate(180deg)");
        }
    });
    $("aside .bet .content.plzSignIn_bet > div > button").click(function () {
        setTimeout(function () {
            $("aside .bet .content").removeClass("display")
        }, 300);

        $(".filter , .popup.signin")
            .addClass("display")
            .siblings(".popup").removeClass("display");
        noslide()
        input_reset()
        chkbox_reset()
        $(".filter .popup form > label input[placeholder=メールアドレス]").focus();
    });
    $("aside .bet .content.plzSignIn_bet > div p.apply span").click(function () {
        setTimeout(function () {
            $("aside .bet .content").removeClass("display")
        }, 300);
        $(".filter , .popup.register")
            .addClass("display")
            .siblings(".popup").removeClass("display");
        noslide()
        input_reset()
        chkbox_reset()
        $(".filter .popup form > label input[placeholder=登録メールアドレス]").focus();
    });
    $("aside .bet .content.bet-select .odd-even li").click(function () {
        var text = $(this).text();

        if (text.includes("コンボ")) {
            setTimeout(() => {
                $(this)
                    .addClass("active")
                    .siblings().removeClass("active")
                $(".content.bet-select .content-group")
                    .addClass("even")
                    .removeClass("system");
            }, 300);
        } else if (text.includes("システム")) {
            setTimeout(() => {
                $(this)
                    .addClass("active")
                    .siblings().removeClass("active")
                $(".content.bet-select .content-group")
                    .addClass("system")
                    .removeClass("even");
            }, 300);
        } else if (text.includes("シングル")) {
            setTimeout(() => {
                $(this)
                    .addClass("active")
                    .siblings().removeClass("active")
                $(".content.bet-select .content-group")
                    .removeClass("even , system")
            }, 300);
        }

    });
}
// 關閉按鈕功能
function close() {
    $(".filter .popup .closeBox").click(function () {
        $(".filter , .popup").removeClass("display");
        noslide()
    });
    $(".bars-popup .first .btnBox .close_btn").click(function () {
        $(".bars-popup").removeClass("display");
        noslide()
    });
    $(".filter .s-popup .top .closeBox").click(function () {
        $(".filter , .s-popup").removeClass("display");
        noslide()
    });
}
// aside 登入後功能 
(() => {
    let btn = $(" aside .bet .content.inner-bet .money-box > button")
    let input = $("aside .bet .content.inner-bet > label > input")
    let chk = $("aside .bet .content.inner-bet > label > button")

    $(input).val($(" aside .bet .content.inner-bet .money-box > button:eq(" + 0 + ")").text())

    btn.click(function () {
        $(this).addClass("active").siblings("button").removeClass("active");
        $(input).val($(this).text())
    });
    chk.click(function () {
        $(this).removeClass("display").siblings(".chk_svg").addClass("display");
    });

    input.on("input", function () {

        if ($(this).val() === "") {
            $("aside .bet .content.inner-bet .warn.two").removeClass("display")
                .siblings(".warn.one").addClass("display")
            $("aside .bet .content.inner-bet > label > button").prop("disabled", "true");
        }
        else {
            $("aside .bet .content.inner-bet .warn.one").removeClass("display")
                .siblings(".warn.two").addClass("display")
            $("aside .bet .content.inner-bet > label > button").removeAttr("disabled")
        }

    });
})();
// 註冊 彈窗
function register() {
    $("header .right .register_btn").click(function () {
        $(".filter , .popup.register")
            .addClass("display")
            .siblings(".popup").removeClass("display");

        noslide()
        input_reset()
        chkbox_reset()

        $(".filter .popup form > label input[placeholder=登録メールアドレス]").focus();
    });
    $(".filter .popup.register .textBox > p").click(function () {
        $(".filter , .popup.signin")
            .addClass("display")
            .siblings(".popup").removeClass("display");

        noslide()
        input_reset()
        chkbox_reset()
        $(".filter .popup form > label input[placeholder=メールアドレス]").focus();
    });
}
// 登入彈窗
function signin() {
    $("header .signin_btn, .signin_btn").click(function () {
        $(".filter , .popup.signin")
            .addClass("display")
            .siblings(".popup").removeClass("display");

        noslide()
        input_reset()
        chkbox_reset()
        $(".filter .popup form > label input[placeholder=メールアドレス]").focus();

    });
    $(".filter .popup.signin .textBox > p:first-child").click(function () {
        $(".filter , .popup.register")
            .addClass("display")
            .siblings(".popup").removeClass("display");
        noslide()
        input_reset()
        chkbox_reset()
        $(".filter .popup form > label input[placeholder=登録メールアドレス]").focus();
    });
}
// 忘記密碼 彈窗
function forget() {
    $(".filter .popup .textBox > p:nth-of-type(2)").click(function () {
        $(".filter , .popup.forget")
            .addClass("display")
            .siblings(".popup").removeClass("display");

        $(".filter .popup form > label input[placeholder=登録したメールアドレス]").focus();

        noslide()
        input_reset()
        chkbox_reset()
    });
    $(".filter .popup.forget .btnBox > .btn:nth-of-type(2)").click(function () {
        $(".filter , .popup.signin")
            .addClass("display")
            .siblings(".popup").removeClass("display");

        $(".filter .popup form > label input[placeholder=メールアドレス]").focus()
        noslide()
        input_reset()
        chkbox_reset()
    });
}
// 判斷背景可否滑動
function noslide() {
    if ($(".filter,.popup,.bars-popup").hasClass("display")) {
        $("html,body").css("overflow", "hidden");
    } else {
        $("html,body").css("overflow", "auto");
    }
}
// input reset 空值
function input_reset() {
    $('input').val("");
}
// CHK BOX重製
function chkbox_reset() {
    $('input[type=checkbox]').prop('checked', false);
}
// 切換input type 和 svg 
function eyes_fun() {
    $('.eyesBox').click(function () {
        let type = $(this).siblings("input").attr("type")
        if (type === "password") {
            $(this).siblings("input").attr("type", "text")
            $(this).find(".open").addClass("display")
                .siblings(".close").removeClass("display")
        } else {
            $(this).siblings("input").attr("type", "password")
            $(this).find(".close").addClass("display")
                .siblings(".open").removeClass("display")
        }
    });
}
// 判斷chkbox 是否勾選 如有 button 透明1
function chk_ok() {
    $(".filter .popup.register > button").toggleClass("checked");
};
// 漢堡選單彈窗
function popup_m() {
    $("header .right .bars").click(function () {
        if ($("header .right .bars").hasClass("innerpage")
            && $(window).width() > 900) {
            $("header .right .bars.innerpage .user-menu").toggleClass("display");
            $("header .right .bars.innerpage").toggleClass("active");
        }
        else {
            $("header .right .bars.innerpage .user-menu").removeClass("display");
            $("header .right .bars.innerpage").removeClass("active");
    
            scroll()
            $(".bars-popup")
                .addClass("display")
            noslide()
            $(".bars-popup .third .lang_btn .lang_box").removeClass("display");
            $(".bars-popup .third .lang_btn .angle-right_svg").removeClass("active , origin")
        }
    });
    $(" .bars-popup .third .lang_btn").click(function () {

        if ($(".bars-popup .third .lang_btn .lang_box").hasClass("display")) {

            setTimeout(function () {
                $(".bars-popup .third .lang_btn .lang_box").removeClass("display")
                $(".bars-popup .third .lang_btn .angle-right_svg")
                    .removeClass("active").addClass("origin");
            }, 300)

        } else {
            setTimeout(function () {
                $(".bars-popup .third .lang_btn .angle-right_svg")
                    .addClass("active").removeClass("origin")
                $(".bars-popup .third .lang_btn .lang_box").addClass("display")
            }, 300)
        }
    });
    $(".bars-popup .third .lang_btn .lang_box li").click(function () {
        $(this).addClass("active")
            .siblings().removeClass("active");
    });
    $(".bars-popup .first .btnBox .signin_btn").click(function () {
        $(this).parents(".bars-popup").siblings(".filter")
            .addClass("display")
            .find(".popup.signin")
            .addClass("display")
        $(".filter .popup form > label input[placeholder=メールアドレス]").focus()
        input_reset()
        chkbox_reset()
    });
    $(".bars-popup .third > button.signup_btn").click(function () {
        $(this).parents(".bars-popup").siblings(".filter")
            .addClass("display")
            .find(".popup.register")
            .addClass("display")
        $(".filter .popup form > label input[placeholder=登録メールアドレス]").focus();
        input_reset()
        chkbox_reset()
    });

    $(document).mouseup(function (e) {
        var _con = $('header .right .bars.innerpage .user-menu.display'); // 就是你不希望被點到的 div
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('header .right .bars.innerpage .user-menu.display').removeClass('display'); // 功能代碼
            $("header .right .bars.innerpage").removeClass("active");
        }
    });
};
// for 漢堡選單
function scroll() {
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.delay('0').animate({
        scrollTop: 0,
        scrollLeft: 0
    }, 0)
}
// 入金彈窗 要認證
function transfer() {
    $("header.bars.innerpage .user-menu li , header .transfer-btn, .payWay_support .transfer-btn , .bars-popup .first .transfer-btn").click(function () {
        var text = $(this).text();
        if (text.includes("入金")) {
            $(".filter , .s-popup").addClass("display");
            noslide();
        }
    })
}
// us amount 彈窗 
function amount() {
    $("header .right .amount").click(function () {
        $(this).find(".box").addClass("display");
    });
   //點空白 關 block
   $(document).mouseup(function (e) {
    var _con = $('header .right .amount .box.display'); // 就是你不希望被點到的 div
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $('header .right .amount .box.display').removeClass('display'); // 功能代碼
    }
   });
}

//觸發器
bet();
register();
close();
eyes_fun();
signin();
forget();
popup_m();
transfer();
amount();

// 分數浮動 動畫
(() => {

    $(".eventBlock .scroll > .wrap .itemBlock > .selection_Wrap")
        .children("div:nth-child(odd)").addClass("winTeam")
    $(".eventBlock .scroll > .wrap .itemBlock > .selection_Wrap")
        .children("div:nth-child(even)").addClass("loseTeam")

    setInterval(function () {
        setTimeout(function () {
            $(".eventBlock  .selection_Wrap .teamPoint_Block:first-of-type")
                .find(".point").addClass("flip-top");
        }, 1000);
        setTimeout(function () {
            $(".eventBlock  .selection_Wrap .teamPoint_Block:first-of-type")
                .find(".point").removeClass("flip-top");
        }, 4000);
    }, 5000);


    setInterval(function () {
        setTimeout(function () {
            $(".eventBlock  .selection_Wrap .teamPoint_Block:last-of-type")
                .find(".point").addClass("flip-bottom");
        }, 1000);
        setTimeout(function () {
            $(".eventBlock  .selection_Wrap .teamPoint_Block:last-of-type")
                .find(".point").removeClass("flip-bottom");
        }, 4000);
    }, 6000);


    setInterval(function () {
        setTimeout(function () {
            $(".eventBlock .selection_Wrap .betPoint_Block:nth-child(odd)")
                .find("p:last-of-type").addClass("flip-top")
        }, 1000);
        setTimeout(function () {
            $(".eventBlock .selection_Wrap .betPoint_Block:nth-child(odd)")
                .find("p:last-of-type").removeClass("flip-top")
        }, 4000);
    }, 7000);

    setInterval(function () {
        setTimeout(() => {
            $(".eventBlock .selection_Wrap .betPoint_Block:nth-child(even)")
                .find("p:last-of-type").addClass("flip-bottom")
        }, 1000);
        setTimeout(() => {
            $(".eventBlock .selection_Wrap .betPoint_Block:nth-child(even)")
                .find("p:last-of-type").removeClass("flip-bottom")
        }, 4000);
    }, 8000);
})();

// loading畫面
let loading = () => {
    if ($("html body .loadPage").hasClass("display")) {
        setTimeout(() => {
            $(".loadPage .loading .first-display").removeClass("display");
            $(".loadPage .loading .second-display")
                .addClass("display")
                .parents(".loadPage").css("background", "#151619");
        }, 1000)
        setTimeout(function () {
            $("html body .loadPage .loading").slideUp("slow")
        }, 2900);
        setTimeout(function () {
            $("html body .loadPage.display").slideUp("slow")
        }, 3000);
    } else {
        return;
    }
}; loading();

//  index page  點擊point 後顯示notice 
(() => {
    var count = 0;
    $(".eventBlock .scroll > .wrap .itemBlock > .selection_Wrap")
        .children("div").click(function () {
        if ($(this).hasClass("selected")) {
            count--

            setTimeout(() => {
                $("aside .bet .title > div .notice").addClass("scale");
            }, 400);
            setTimeout(() => {
                $("aside .bet .title > div .notice").removeClass("scale");
            }, 1000);

            if (count == 0) {
                $("aside .bet .title > div .notice")
                    .removeClass("display")
                    .siblings(".bet-slip").css("max-width", "80px")
            }
            if (count < 6) {
                $("aside .bet .title > div .notice span").text(count);
            }
            else if (count >= 6) {
                $("aside .bet .title > div .notice span").text("！")
            }
        }
        else if ($("aside .bet .title").hasClass("display")) {
            $(this).removeClass("selected").addClass("selectedNot")
            setTimeout(() => {
                $(this).removeClass("selectedNot , selected")
            }, 2000);
        }
        else {
            setTimeout(() => {
                $("aside .bet .content").siblings(".content").removeClass("display");
            }, 300);
            $("aside .bet .title .create-down_svg").css("transform", "rotate(0deg)");
            count++
            $("aside .bet .title > div .notice")
                .addClass("display")
                .siblings(".bet-slip").css("max-width", "65px");

            setTimeout(() => {
                $("aside .bet .title > div .notice").addClass("scale");
            }, 400);
            setTimeout(() => {
                $("aside .bet .title > div .notice").removeClass("scale");
            }, 1000);

            if (count < 6) {
                $("aside .bet .title > div .notice span").text(count);
            }
            else {
                $("aside .bet .title > div .notice span").text("！")
            }
        }
        $("aside .bet .title .right").click(function () {
            count = 0
        });
    });

    $(".betAgainBtn").click(function(){
        if ($(this).hasClass("selected")) {
            count--

            setTimeout(() => {
                $("aside .bet .title > div .notice").addClass("scale");
            }, 400);
            setTimeout(() => {
                $("aside .bet .title > div .notice").removeClass("scale");
            }, 1000);

            if (count == 0) {
                $("aside .bet .title > div .notice")
                    .removeClass("display")
                    .siblings(".bet-slip").css("max-width", "80px")
            }
            if (count < 6) {
                $("aside .bet .title > div .notice span").text(count);
            }
            else if (count >= 6) {
                $("aside .bet .title > div .notice span").text("！")
            }
        }
        else if ($("aside .bet .title").hasClass("display")) {
            $(this).removeClass("selected").addClass("selectedNot")
            setTimeout(() => {
                $(this).removeClass("selectedNot , selected")
            }, 2000);
        }
        else {
            setTimeout(() => {
                $("aside .bet .content").siblings(".content").removeClass("display");
            }, 300);
            $("aside .bet .title .create-down_svg").css("transform", "rotate(0deg)");
            count++
            $("aside .bet .title > div .notice")
                .addClass("display")
                .siblings(".bet-slip").css("max-width", "65px");

            setTimeout(() => {
                $("aside .bet .title > div .notice").addClass("scale");
            }, 400);
            setTimeout(() => {
                $("aside .bet .title > div .notice").removeClass("scale");
            }, 1000);

            if (count < 6) {
                $("aside .bet .title > div .notice span").text(count);
            }
            else {
                $("aside .bet .title > div .notice span").text("！")
            }
        }
        $("aside .bet .title .right").click(function () {
            count = 0
        });
    });

    $("aside .bet .bet-select .content-group .detailBox ul .closeBox").click(function () {
        let lis = $("aside .bet .bet-select .content-group .detailBox ul li").length;
        if (lis > 1) {
            $(this).parents("li").remove("li")
        }
        else if (lis <= 1) {
            $("aside .bet .content.bet-select").removeClass("display")
                .siblings(".content").removeClass("display");
            $("aside .bet .title > div .notice")
                .removeClass("display")
                .siblings(".bet-slip").css("max-width", "80px");
            $(".eventBlock .scroll > .wrap .itemBlock > .selection_Wrap")
                .children("div").removeClass("selected");
                count = 0 ; 
            }
        });
    })();

    let RWD = () => {
        $(window).on("resize", function () {
            var w = $(window).innerWidth();
            if (w > 820) {
                $("html body .bars-popup").removeClass("display"); //bars 超過 刪除display
            }
            if (w <= 892 && $("header").hasClass("innerpage")) {
                $("header .right .bars.innerpage .user-menu").removeClass("display");
                $("header .right .bars.innerpage").removeClass("active")
            }
        })
    }; RWD();

//請先登入 彈窗 for index onclick use 
let plsSignIn = () => {
$(".filter , .popup.signin")
    .addClass("display")
    .siblings(".popup").removeClass("display");

    noslide()
    input_reset()
    chkbox_reset()
    $(".filter .popup form > label input[placeholder=メールアドレス]").focus();
};
// search box 功能
let searchBox = () => {
    $("header .right .amount .searchBox > input").on("input", function () {
        if ($(this).val() === '') {
            $("header .right .amount .searchBox > button").removeClass("display");
            $("header .right .amount .box .show").addClass("display");
            $("header .right .amount .box .unsearch-box").removeClass("display");
        }
        else {
            $("header .right .amount .searchBox > button").addClass("display");
            $("header .right .amount .box .show").removeClass("display");
            $("header .right .amount .box .unsearch-box").addClass("display");
        }
    });
    $("header .right .amount .searchBox > button").click(function () {
        input_reset();
        $("header .right .amount .searchBox > button").removeClass("display");
        $("header .right .amount .box .show").addClass("display");
        $("header .right .amount .box .unsearch-box").removeClass("display");
    });
}; searchBox();
//-----------------------account會員帳戶------------------------------------

//rwd leftGroup 收合
$(function (){
    $(".account .container .center .member .leftGroupRWD").click(function (){
        $(".account .container .center .member .leftGroupRWD svg").toggleClass("turn");
        $(".account .container .center .member .leftGroup").toggleClass("display");
    })
})

//kyc active 
$(function () {
    $("body .kyc .center .member .rightGroup .stageGroup .topGroup button").click(function () {
        $(this).addClass("active")
        .siblings().removeClass("active"); 

        if( $(this).text().includes("レベル 2")) {
            $(".account .container.kyc .rightGroup .stageGroup .stageItem .stage.stage2").addClass("display")
            .siblings(".stage").removeClass("display")
        }
        else if( $(this).text().includes("レベル 1")) {
            $(".account .container.kyc .rightGroup .stageGroup .stageItem .stage.stage1").addClass("display")
            .siblings(".stage").removeClass("display")
        }
    })

    $(".account .kyc .levelGroup .info i")
    .on("mouseenter", function (){
        $(this)
        .next(".infoContent")
        .addClass("display");
    })
    $(".account .kyc .levelGroup .info .infoContent")
    .on("mouseleave", function (){
        $(this).removeClass("display");
    })
})
//驗證碼
window.addEventListener('load', () => {

    const codeItem = document.querySelectorAll('.codeItem')
    const codeInput = document.querySelector('.codeInput')

    // 循環顯示到input中的值到codeItem中
    const showNum = () => {
        // 抓目前input的值
        const curVal = codeInput.value
        // 循環顯示到codeItem中
        Array.from(codeItem).map((item, index) => {
            curVal[index] ?
                item.innerText = curVal[index] :
                item.innerText = ''
        })
    }

    //active
    const cutAct = (type) => {
        // 取得目前input中值的長度
        const valLenth = codeInput.value.length
        // 清除之前的active
        Array.from(codeItem).map(item => {
            item.className = 'codeItem'
        })
        // 當type為focus時 計算active位置 否則只清除
        if (type === 'focus') {
            // 計算當前應該active的codeItem並添加active
            // 因為input的值有6個，從1開始的； 
            // 而codeItem位數组，下標示0，從0開始的，所以當input長度為6時,對應的codeItem是不存在的 所以減一
            codeItem[valLenth === 4 ? valLenth - 1 : valLenth].className = 'codeItem active'
        }
    }

    //輸入框
    codeInput.addEventListener('focus', () => {
        //計算active的codeItem
        cutAct('focus')
    })

    codeInput.addEventListener('blur', () => {
        // 移除目前active
        cutAct('blur')
    })

    codeInput.addEventListener('input', () => {
        // 輸入值時，調用循環顯示函式
        showNum()
        cutAct('focus')
    })

})
//setting
$(function () {
    $(".account .container.setting .select-box")
    .on("mouseenter",function () {
       $(this)
       .addClass("display")
       .find("ul")
       .addClass("display");
    });
    $(".account .container.setting .select-box ul")
    .on("mouseleave",function () {
       $(this)
       .removeClass("display")
       .closest(".select-box")
       .removeClass("display");
    });

    $(".account .container.setting .sw").click(function () {
        $(this).toggleClass("open");
    });
});
$(function () {
    $(".account .container.history form ul li").click(function () {
        $(this)
            .addClass("active")
            .siblings().removeClass("active");
        var n = $(this).index();

        $(".account .container.history form > section:eq(" + n + ")")
            .addClass("display")
            .siblings().removeClass("display");
    });
});


//header logo-RWD換圖
$(document).ready(function(){ 
    var width = $(window).width();
        if (width <= 820) {
            $("header.innerpage .left a.logo svg g path:not(.mainLogo)")
            .css("display", "none");
        } else if( width > 820) {
            $("header.innerpage .left a.logo svg g path:not(.mainLogo)")
            .css("display", "unset");
        }
        
    $(window).resize(function(){ 
        var width = $(window).width();
        if (width <= 820) {
            $("header.innerpage .left a.logo svg g path:not(.mainLogo)")
            .css("display", "none");
        } else if( width > 820) {
            $("header.innerpage .left a.logo svg g path:not(.mainLogo)")
            .css("display", "unset");
        }
    }); 
});

//swiper_recommend 拖曳檢視
$(document).ready(function () {

    //偵測.scroll 大小
    var scrollWidth = $(".swiper_recommend").innerWidth();

    if (scrollWidth <= 750) {  //小於750加上提示樣式
        $(".swiper_recommend").addClass("draggable_hintStyle");
    } else {
        $(".swiper_recommend").removeClass("draggable_hintStyle");
    }
    $(window).resize(function(){ 
        var scrollWidth = $(".swiper_recommend").innerWidth();
        if (scrollWidth <= 750) {
            $(".swiper_recommend").addClass("draggable_hintStyle");
        } else {
            $(".swiper_recommend").removeClass("draggable_hintStyle");
        }
    }); 
   
    const $wrap = $('.swiper_recommend .swiper_wrapper');
    const wrap = $wrap[0];

    let isDragging = false;
    let startX, scrollLeft;

    $wrap.on('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - wrap.offsetLeft;
        scrollLeft = wrap.scrollLeft
        $wrap.addClass('draggable');
    });

    $wrap.on('mousemove', function(e) {
        if(!isDragging) return;
        const x = e.pageX - wrap.offsetLeft;
        const walk = (x - startX) *1 ;//調整拖曳的速度
        wrap.scrollLeft = scrollLeft - walk;
    });

    $wrap.on('mouseup', function() {
        isDragging = false;
        $wrap.removeClass('draggable');
    });

    $wrap.on('scroll', function(){
        //判斷是否到達左或右側邊緣
        if(wrap.scrollLeft === 0) {
            $wrap.parents(".swiper_recommend ").removeClass('rightEnd').addClass('leftEnd');
        } else {
            $wrap.parents(".swiper_recommend ").removeClass('leftEnd').addClass('rightEnd');
        }
    })
});

//eventBlock 拖曳檢視
$(document).ready(function () {
    
    $('.eventBlock .wrap').each(function(){
        $.fn.hasScrollBar = function() {
            return this.get(0).scrollWidth > this.width();
        }

        //偵測.wrap是否可以滾動
        var scrollWidth = $(this).hasScrollBar();

        if (scrollWidth == true) {
            $(this).closest(".scroll").addClass("draggable_hintStyle");
        } else if (scrollWidth == false && $("scroll").hasClass("draggable_hintStyle")) { //加這個以防範和ready的行為抵銷
            $(this).closest(".scroll").removeClass("draggable_hintStyle");
        } else if ($(this).closest(".eventBlock").hasClass("separated_betBlock")) {

        }

        //拖曳行為判斷
        const $wrap =$(this);
        const wrap = this;

        let isDragging = false;
        let startX, scrollLeft;

        $wrap.on('mousedown', function(e) {
            isDragging = true;
            startX = e.pageX - wrap.offsetLeft;
            scrollLeft = wrap.scrollLeft
            $wrap.addClass('draggable');
        });
    
        $wrap.on('mousemove', function(e) {
            if(!isDragging) return;
            const x = e.pageX - wrap.offsetLeft;
            const walk = (x - startX) *1 ;//調整拖曳的速度
            wrap.scrollLeft = scrollLeft - walk;

            $(this).children().css("pointer-events", "none");
        });
    
        $wrap.on('mouseup', function() {
            isDragging = false;
            $wrap.removeClass('draggable');

            $(this).children().css("pointer-events", "unset");
        });
    
        $wrap.on('scroll', function(){
            //判斷是否到達左或右側邊緣
            if(wrap.scrollLeft === 0) {
                $wrap.parents(".scroll").removeClass('rightEnd').addClass('leftEnd');
            } else {
                $wrap.parents(".scroll").removeClass('leftEnd').addClass('rightEnd');
            }
        })
    });

    $(window).resize(function(){  //視窗調整時偵測

        $('.eventBlock .wrap').each(function(){
            $.fn.hasScrollBar = function() {
                return this.get(0).scrollWidth > this.width();
            }
    
            //偵測.wrap是否可以滾動
            var scrollWidth = $(this).hasScrollBar();
    
            if (scrollWidth == true) {
                $(this).closest(".scroll").addClass("draggable_hintStyle");
            } else if (scrollWidth == false && $("scroll").hasClass("draggable_hintStyle")) { //加這個以防範和ready的行為抵銷
                $(this).closest(".scroll").removeClass("draggable_hintStyle");
            } else if ($(this).closest(".eventBlock").hasClass("separated_betBlock")) {

            }

            
        //拖曳行為判斷
        const $wrap =$(this);
        const wrap = this;

        let isDragging = false;
        let startX, scrollLeft;

        // $wrap.on('mousedown', function(e) {
            
        // });
    
        $wrap.on('mousemove', function(e) {
            isDragging = true;

            startX = e.pageX - wrap.offsetLeft;
            scrollLeft = wrap.scrollLeft
            $wrap.addClass('draggable');
            if(!isDragging) return;
            const x = e.pageX - wrap.offsetLeft;
            const walk = (x - startX) *1 ;//調整拖曳的速度
            wrap.scrollLeft = scrollLeft - walk;

            $(this).children().css("pointer-events", "none");
        });
    
        $wrap.on('mouseup', function() {
            isDragging = false;
            $wrap.removeClass('draggable');

            $(this).children().css("pointer-events", "unset");
        });
    
        $wrap.on('scroll', function(){
            //判斷是否到達左或右側邊緣
            if(wrap.scrollLeft === 0) {
                $wrap.parents(".scroll").removeClass('rightEnd').addClass('leftEnd');
            } else {
                $wrap.parents(".scroll").removeClass('leftEnd').addClass('rightEnd');
            }
        })
        })
    }); 
});
