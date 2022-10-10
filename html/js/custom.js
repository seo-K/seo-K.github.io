//기본 세팅 
// common a
$(function () {
    /*모든 a태그*/
    $('a[href="#"]').click(function (e) {
        e.preventDefault();
    });
}) //기본 세팅 END 

// 팝업용 함수
// body 스크롤 막음
function scrollOff() {
    $('body').addClass('scrollOff').on('scroll touchmove mousewheel', function (e) {
        e.stopPropagation();
    });
}
// body 스크롤 풀기
function scrollOn() {
    $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
} // 팝업용 함수 END



//textarea auto height
function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = (12 + obj.scrollHeight) + "px";
}

//header menu
$(function () {
    var $header = $('#header'),
        $menu = $header.find('.one_depth .list'),
        headerOffset = $header.height(),
        Win_W = $(window).width();

    //mypage 일땐 header 에 mypage_h 추가
    $(document).ready(function () {
        if ($header.siblings('#wrap_content').hasClass('mypage')) {
            $header.addClass('mypage_h')
        }
    });


    //메뉴 호버 반응형 작업
    function MenuHover() {
        $menu.hover(function (e) {
            if (Win_W > 900) {
                $(this).find('.two_depth').stop().slideToggle(300);
                $(this).find('> .link').toggleClass('on');
            } else {
                e.stopPropagation();

            }
        })
    }

    MenuHover()

    $(window).on('resize', function () {
        Win_W = $(window).width();
        $('.login_now .two_depth').hide();
        MenuHover();
    });

    //header높이를 지나면 header + fixed
    $(window).scroll(function () {
        if ($(window).scrollTop() > headerOffset) {
            $header.addClass('fixed');
        } else {
            $header.removeClass('fixed');
        }
    });
}) //header menu

//plus 공통
$(function () {
    var $container = $('#wrap_content'),
        $plus = $container.find('.plus'),
        Win_W = $(window).width();

    //버튼 호버시
    function HoverImg() {
        if($(Win_W > 900)){
            $plus.hover(function () {
                if ($(this).hasClass('minus')) {
                    $(this).find('> img').attr({
                        'src': 'img/common/icon_minus_W.svg'
                    })
                } else {
                    $(this).find('> img').attr({
                        'src': 'img/common/icon_plus_W.svg'
                    })
                }
            }, function () {
                if ($(this).hasClass('minus')) {
                    $(this).find('> img').attr({
                        'src': 'img/common/icon_minus_B.svg'
                    })
                } else {
                    $(this).find('> img').attr({
                        'src': 'img/common/icon_plus_B.svg'
                    })
                }
            })
        }
    }

    HoverImg()

    $(window).on('resize', function () {
        Win_W = $(window).width();
        HoverImg()
      });
    
})


//아코디언
$(function () {
    var $container = $('#wrap_content'),
        $selectWrap = $container.find('.select_wrap'),
        $oneDepth = $selectWrap.find('.one_depth'),
        $twoDepth = $oneDepth.siblings('.two_depth'),
        $twoDepthList = $twoDepth.find('>li'),
        $threeDepth = $twoDepthList.find('.three_depth'),
        $threeDepthList = $threeDepth.find('> li'),
        $searchBtn = $twoDepth.find('.num_search_btn');

    //모든 필터 닫아놓기
    $twoDepth.hide();

    //$oneDepth
    $oneDepth.click(function (e) {
        if ($(this).hasClass('on')) {
            $(this).siblings('.two_depth').slideUp(300)
            $(this).removeClass('on');
            if ($container.hasClass('sell_used_item_write')) {
                borderTimer()
            }
        } else {
            $oneDepth.siblings('.two_depth').slideUp(300);
            $oneDepth.removeClass('on');
            $(this).siblings('.two_depth').slideDown(300);
            $(this).addClass('on');
        }
    }); //$oneDepth

    //twoDepth 
    $twoDepth.click(function () {
        if ($(this).hasClass('select')) {
            $(this).slideUp(300);
            $(this).siblings('.one_depth').removeClass('on')
        }
    })

    $twoDepthList.click(function () {
        if ($(this).hasClass('on')) {
            $(this).find('.three_depth').slideUp('300');
            $(this).removeClass('on')
        } else {
            $threeDepth.slideUp(300);
            $twoDepthList.removeClass('on');
            $(this).find('.three_depth').slideDown('300');
            $(this).addClass('on')
        }
    }) //twoDepth 


    $threeDepthList.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        //메인, 검색페이지 일때 threedepth 클릭시 닫히게 적용
        if($container.hasClass('sell_used_item_write')) {
            $(this).parents('.two_depth').slideUp(300);
            $oneDepth.removeClass('on');

            borderTimer()
        } else {
            $(this).parents('.two_depth').slideUp(300);
            $oneDepth.removeClass('on');
        }

    }) //threeDepth


    //수량 검색 버튼 누를 시 twoDepth 올라가기
    $searchBtn.on('click', function () {
        $twoDepth.slideUp(300);
        $oneDepth.removeClass('on');
    })

    if ($container.hasClass('sell_used_item_write')) {
        $oneDepth.on('click', function () {
            borderTimer()
        })
    }

    //중고거래 글쓰기 필터
    function borderTimer() {
        if ($oneDepth.parents('.select_wrap').hasClass('border')) {
            setTimeout(() => {
                $oneDepth.parents('.select_wrap').removeClass('border')
            }, 300);
        } else {
            $oneDepth.parents('.select_wrap').addClass('border')
        }
    } //중고거래 글쓰기 필터



    //타겟 이외 클릭시 닫기
    $('#wrap').click(function (e) {
        if (!$('.select_wrap').has(e.target).length) {
            $oneDepth.removeClass('on')
            $twoDepth.slideUp(300)
        }
    });
})



//아이디 비밀번호찾기 hover시 메세지 출력
$(function () {
    var $con = $('#wrap_content.forgot .alert'),
        $alretBtn = $con.find('.hover_img'),
        $msg = $con.find('.alret_msg');

    $alretBtn.mouseenter(function () {
        $msg.show()
    }), $alretBtn.mouseleave(function () {
        $msg.hide()
    })
})


// 문의하기 팝업
$(function () {
    var $con = $('#wrap_content'),
        $inquiry_Btn = $con.find('.inquiry_btn'),
        $modal = $con.find('.modal'),
        $overlay = $modal.find('> li'),
        $closeBtn = $modal.find('.close_btn'),
        $submitBtn = $modal.find('.submit_btn');

    function closed() {
        $overlay.eq(1).hide();
    }

    function autoClose() {
        setTimeout(closed, 2000);
    }


    //섹션 클릭하면 팝업창 모달상태로 나타내기!!
    $inquiry_Btn.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        $overlay.eq(0).show();
        scrollOff()
    });

    //닫기버튼
    $closeBtn.on('click', function (e) {
        e.preventDefault();
        $modal.removeClass('show');
        $overlay.hide();
        scrollOn()
    })

    //제출버튼
    $submitBtn.on('click', function (e) {
        e.preventDefault();
        $overlay.eq(0).hide()
        $overlay.eq(1).show();
        autoClose()
    })

    //타겟 이외 클릭시 닫기
    $('body').click(function (e) {
        if ($(e.target).hasClass('overlay')) {
            $modal.removeClass('show');
            $overlay.hide();
            scrollOn();
        }
    })

}) //회원가입 더보기 popup 옵션


//farmer_info 농가 정보 팝업 모달
$(function () {
    var $con = $('.farmer_info'),
        $slider = $con.find('.farm_img .swiper-slide');

    $slider.click(function () {
        $con.find('.swiper_pop .overlay').show();
        scrollOff()
    })
})

//search_item 최신농장순 필터 스몰필터
$(function () {
    var $con = $('#wrap_content.half_layout'),
        $filter_btn = $con.find('.order_of_wrap .one_depth'),
        $filter = $filter_btn.siblings('.two_depth');

    $filter_btn.click(function () {
        $(this).parents('.order_of_wrap').toggleClass('on');
        $filter.slideToggle(200);
    })

    $filter.on('click', '>li', function (e) {
        e.preventDefault();
        $filter.hide();
        $(this).parents('.order_of_wrap').removeClass('on');
        if ($(this).hasClass('distance')) {
            $con.find('.want_area .one_depth').addClass('on');
            $con.find('.want_area .region.two_depth').show();
        }
    })


    $('#wrap').click(function (e) {
        if (!$('.order_of_wrap').has(e.target).length) {
            $filter.slideUp(200);
            $('.order_of_wrap').removeClass('on');
        }
    });
})

// sign_form terms_더보기
$(function () {
    var $con = $('#wrap_content.sign_form'),
        $termsBtn = $con.find('.toggle_terms'),
        $content = $con.find('.terms_content'),
        easing = 'linear';

    $termsBtn.click(function () {
        $content.slideToggle(300, easing)
    })
})

//heart 공통 좋아요 클릭시! 하트 뿅
$(function () {
    var $con = $('#wrap_content'),
        $likeBtn = $con.find('.icon.heart');

    $likeBtn.click(function () {
        $(this).toggleClass('active');

        if ($likeBtn.hasClass('active')) {
            $(this).find('img').attr({
                'src': 'img/common/icon_heart_color.svg',
                alt: '찜하기 완료'
            });
        } else {
            //only_heart > 흰하트 / 기본 > 검은하트
            if ($(this).hasClass('only_heart')) {
                $(this).find('img').attr({
                    'src': 'img/common/icon_heart_W.svg',
                    alt: "찜하기"
                })
            } else {
                $(this).find('img').attr({
                    'src': 'img/common/icon_heart.svg',
                    alt: "찜하기"
                })
            }
        }
    })
})

//4가지 게시판 컨텐츠 content

$(function () {
    var $con = $('.board_content'),
        $optionBtn = $con.find('.option_btn'),
        $optionList = $con.find('.option_list'),
        $replyBtn = $con.find('.reply_btn'),
        $readmoreBtn = $con.find('.plus'),
        $popup = $con.find('.option_pop_list'),
        $win_W = $(window).width();


    //종이비행기 버튼 호버시/아닐시
    $replyBtn.hover(function () {
        $(this).find('> img').attr({
            'src': 'img/community/icon_paper_plain_fly.svg'
        }).addClass('fly')
    }, function () {
        $(this).find('> img').attr({
            'src': 'img/community/icon_paper_plain.svg'
        }).removeClass('fly')
    })

    //+ 버튼 누를시 더보기
    //+ 버튼토글 / + 누를 시 하단에 대댓글 모두 보이기 + '-' 로 보이게하기 / '-' 누를시 다시 닫기게하기
    $readmoreBtn.on('click', function () {
        if ($(this).hasClass('minus')) {
            $(this).find('> img').attr({
                'src': 'img/common/icon_plus_B.svg'
            });
            $(this).removeClass('minus');
            $(this).siblings('.big_reply').hide();
        } else {
            $(this).find('> img').attr({
                'src': 'img/common/icon_minus_B.svg'
            })
            $(this).addClass('minus');
            $(this).siblings('.big_reply').css({
                'display': 'flex'
            })
        }
    })

    $optionBtn.click(function () {
        if (!($(this).parents('.layout').find('.option_list').is(":visible"))) {
            $optionList.hide();
            //   $(this).closest(".comt_box .box").children(".comment_write.on").show();
            $(this).parents('.layout').find('.option_list').show();
        } else {
            $optionList.hide();
        }
    });

    //타겟 이외 클릭시 닫기
    $('#wrap').click(function (e) {
        if (!$optionList.has(e.target).length && !$optionBtn.has(e.target).length) {
            $optionList.hide();
        }
    });


    //... 옵션 선택시 삭제/신고/답글쓰기
    $optionList.find('li').click(function () {
        function closed() {
            $popup.find('.pop_text').hide();
        }

        function autoClose() {
            setTimeout(closed, 2000);
        }

        if ($(this).hasClass('reply')) {

            $(this).closest('.origin_cmt').siblings('.cmt_add_cmt').addClass('open');
            $(this).parent('ul').hide();

        } else if ($(this).hasClass('delete')) {

            $popup.find('.del_pop').show();
            autoClose()
            $(this).parent('ul').hide();

        } else if ($(this).hasClass('sos')) {

            $popup.find('.sos_pop').show();
            autoClose()
            $(this).parent('ul').hide();

        } else {
            $(this).parent('ul').hide()
        }
    })


})


//mypage 전체 서브메뉴
$(function () {
    $con = $('.mypage'),
        $menu = $con.find('.one_depth > .list'),
        $menuList = $menu.find('.two_depth');

    $menu.on('click', function (e) {
        e.stopPropagation();
        $menuList.slideUp(300);
        $(this).find('.two_depth').stop().slideToggle(300)
        $(this).find('.arrow').toggleClass('rotate');
    })
})

/* jQuery clicked_edit 클래스 추가시 수정버튼 누를시 나타나는 변화 */
/* input/ textarea 배경 바뀜, 대표이름선택지 나옴, 파일추가 input 나옴, 버튼변경(수정 - > 변경)  */
$(function () {
    var $con = $('.my_info'),
        $btn = $con.find('.btn_wrap > button'),
        $content = $con.find('.content'),
        $selectArea = $con.find('.selet_main_name'),
        $selectInput = $selectArea.find('input[type="radio"]');

    //수정버튼 누를시 clicked_edit 클래스 추가 + input, textarea 비활성화
    $btn.on('click', function () {
        if ($(this).hasClass('edit')) {
            $content.addClass('clicked_edit');
            $content.find('input, textarea').attr("readonly", false);
        } else {
            $content.removeClass('clicked_edit');
            $content.find('input, textarea').attr("readonly", true);
        }
    })


    //대표이름으로 지정된 곳에 selected 클래스 추가
    $selectInput.click(function () {
        if ($(this).is(":checked")) {
            $selectArea.removeClass('selected');
            $(this).parents('.selet_main_name').addClass('selected');
        } else {
            $(this).parents('.selet_main_name').removeClass('selected');
        }
    })


    // $("#inputId").attr("disabled", true); //설정
    // $("#inputId").attr("disabled", false); //해제
    // jQuery(function () {
    //     $("input[name=checkall]:checkbox").click(function () {
    //         if ($("input[name=checkall]:checkbox").is(":checked")) {
    //             $("input[name=chk]:checkbox").attr("checked", "checked");
    //         } else {
    //             $("input[name=chk]:checkbox").removeAttr("checked");
    //         }
    //     })
    // });



    // $btn.on('click', function(){
    //     $(this).getElementsByClassName = edit ? $content.addClass('clicked_edit') : $content.remove('clicked_edit')
    // })

})

//mypage my_like_list
$(function () {
    var $con = $('.mypage');
    $tabMenu = $con.find('.section_list'),
        $tabList = $con.find('.all_list_wrap'),
        $tabContent = $con.find('.all_list_wrap > .tab_list'),
        $likeBtn = $con.find('.icon.heart'),
        $delBtn = $con.find('.icon.trash');

    $tabMenu.on('click', 'li', function () {
        var idx = $(this).index();

        $tabContent.hide();
        $tabMenu.find('button').removeClass('o_liner_R_btn');
        $(this).children('button').toggleClass('o_liner_R_btn');
        $tabList.find('.tab_list').eq(idx).show();

        // if (idx === 2) {
        //     $con.find('.content').addClass('wide_padding')
        // } else {
        //     $con.find('.content').removeClass('wide_padding')
        // }
        if ($(this).hasClass('wide')) {
            $con.find('.content').addClass('wide_padding')
        } else {
            $con.find('.content').removeClass('wide_padding')
        }
    })


    //삭제코드
    // $likeBtn.on('click', function () {
    //     if ($con.hasClass('my_like_list')) {
    //         $(this).parents('.item, .item_list').remove();
    //     }
    // })

    // $delBtn.on('click', function () {
    //     $(this).parents('.item, .item_list').remove();
    // })
})


// 1:1문의 답변 클릭 my_inquiry
$(function () {
    var $con = $('.my_inquiry'),
        $inquiry = $con.find('.question'),
        $win_W = $(window).width();
    // $answer = $con.find('.qna_N_answer');

    $inquiry.on('click', function (e) {
        e.preventDefault();
        if ($win_W > 900) {
            $(this).toggleClass('bold')
        }
        $(this).parents('.q_row').find('.qna_N_answer').slideToggle()
    })


})

//마이페이지 찜리스트
$(function () {
    var $con = $('.my_like_list'),
        $btnList = $con.find('.col_5 > button');

    $btnList.on('click', function () {
        $(this).addClass('end_btn');

        if ($(this).hasClass('inquiry_btn')) {
            $(this).text("문의완료")
        } else if ($(this).hasClass('buy_now')) {
            $(this).text('요청완료')
        }

        console.log($(this))

    })
})

//모바일 jQuery START!

//mobile menu toggle
//메뉴 슬라이드
$(function () {
    var menuArea = $('.all_menu_list'),
        btn = $('.gnb_btn > a'),
        menuBg = $('.mobile_bg'),
        filter_area = $('.half_layout .container > .left_con');

    btn.click(function (e) {
        e.preventDefault();

        //클릭한 버튼이 open일때, 메뉴슬라이드 open / 배경 oepn
        if ($(this).hasClass('on')) {
            menuArea.animate({
                'right': 0
            }, 'smooth')

            menuBg.show();
            scrollOff()
            // 필터 인덱스 낮추기
            filter_area.addClass('index_down')

            //클릭한 버튼이 open 아닐때, 메뉴슬라이드 / 배경 클래스 제거
        } else {
            menuArea.animate({
                'right': '-100%'
            }, 'smooth')
            menuBg.hide();
            scrollOn();
            filter_area.removeClass('index_down')
        }

        //배경 누르면 모든 open 클래스 제거
        menuBg.click(function () {
            if ($(this).show()) {
                // menuArea.removeClass('open');
                menuArea.animate({
                    'right': '-100%'
                }, 'smooth')

                menuBg.hide();
                scrollOn();
                filter_area.removeClass('index_down')
            }
        })
    });
}) //mobile menu toggle
//main script END

//Footer 팝업들
$(function () {
    var $con = $('#wrap_content'),
        $footerList = $('.footer_sub > li'),
        $modal = $con.find('.footer_pop'),
        $overlay = $modal.find('> li'),
        $closeBtn = $modal.find('.close_btn');


    //섹션 클릭하면 팝업창 모달상태로 나타내기!!
    $footerList.click(function (e) {
        e.stopPropagation();
        e.preventDefault();

        var idx = $(this).index();
        $overlay.eq(idx).show();
        scrollOff()

        console.log(idx)
    });

    //닫기버튼
    $closeBtn.on('click', function (e) {
        e.preventDefault();
        $modal.removeClass('show');
        $overlay.hide();
        scrollOn()
    })


    //타겟 이외 클릭시 닫기
    // $('body').click(function (e) {
    //     if ($(e.target).hasClass('overlay')) {
    //         $modal.removeClass('show');
    //         $overlay.hide();
    //         scrollOn();
    //     }
    // })

})

//mobile MAIN four_borard 4가지 게시판 리스트
$(function () {
    var $con = $('.main'),
        $tabMenu = $con.find('.tab_menu'),
        $ContentList = $con.find('.board_wrap > article');

    $tabMenu.on('click', 'li', function () {
        var idx = $(this).index();

        // $tabContent.hide();
        // $tabMenu.find('li').removeClass('active');
        $(this).toggleClass('active').siblings().removeClass('active');
        $ContentList.hide();
        $ContentList.eq(idx).show();
    })
})

//mobile 상품검색 필터 클릭시 필터 리스트 open
$(function () {
    var $con = $('.search_item'),
        $filter_Btn = $con.find('.mob_filter_btn'),
        $filter_List = $con.find('.all_filter_wrap'),
        $submit_Btn = $filter_List.find('.btn_wrap > .submit');

    $filter_Btn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $filter_List.slideToggle(300);
 
    })

    $submit_Btn.on('click', function () {
        $con.find('.one_depth').removeClass('on')
        $con.find('.two_depth').slideUp(300);
        $con.find('.two_depth > .list').removeClass('on');
        $con.find('.three_depth').slideUp(300)
        $filter_List.slideUp(300);
    })
})

//mobile 상품검색 검색 아이콘 클릭시 검색창 show
$(function () {
    var $searchBtn = $('.mob_search_btn'),
        $search_bar = $('.half_layout .left_con .search_bar');

    $searchBtn.on('click', function (e) {
        e.preventDefault();
        $search_bar.toggleClass('add_flex');
    })

})

//mobile 커뮤니티 필터 메뉴
$(function () {
    var $con = $('.half_layout'),
        $filterMenu = $con.find('.comu_filter .f_title'),
        $MenuList = $filterMenu.siblings('.all_filter_wrap'),
        Win_W = $(window).width();



    //메뉴 호버 반응형 작업
    function MobComuSlide() {
        $filterMenu.on('click', function (e) {
            e.preventDefault;

            if (Win_W > 900) {
                e.stopPropagation();
            } else {
                $MenuList.slideToggle(0);
            }

            //타겟 이외 클릭시 닫기
            $('#wrap').click(function (e) {
                if (!$('.left_con').has(e.target).length) {
                    $MenuList.slideUp(0);
                }
            });

        })
    }

    MobComuSlide();

    $(window).on('resize', function () {
        Win_W = $(window).width();
        if (Win_W > 900) {
            $MenuList.show();
        }else{
            $MenuList.hide();
        }
        MobComuSlide()
    });


    
})