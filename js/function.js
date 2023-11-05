//로딩중
$(function () {
  const $loading = $(".loading");
  $loading.children("p").fadeOut();
  $loading.delay(250).fadeOut(800);
});

//메뉴 스크롤
$(function () {
  const $h1 = $("h1");
  const $home = $("#home");
  const $header = $home.nextAll("header");
  const $intro = $home.children(".intro");
  const $nav = $header.find("nav"); // 직계자손 선택 find()
  const $mnus = $nav.find("a");
  const $btnGnb = $header.find(".btn-gnb");
  const $aside = $("aside");
  const $resume = $(".resume");

  const $headerH = $header.height();
  const arrTopVal = [];

  $(window).on("load resize", function () {
    /*
		  브라우저 화면의 크기
	
		  1) 스크롤바와 툴바를 포함하지 않은 브라우저 화면의 크기
			 window.innerWidth
			 window.innerHeight
	
		  2) 스크롤바와 툴바를 포함한 브라우저 화면의 크기
			 window.outerWidth
			 window.outerHeight
	   */
    $home.height(window.innerHeight);

    if (window.innerWidth > 640) {
      //pc모드
      $h1.css({
        //선택된 요소가 body로부터 이르는 거리 (left, top)
        top: $intro.offset().top - 72,
      });
      $nav.show();
    } else {
      //모바일
      $h1.css({
        //선택된 요소가 body로부터 이르는 거리 (left, top)
        top: $intro.offset().top - 100,
      });
      $btnGnb.removeClass("clse");
      $nav.hide();

      $home.css({
        transform: "scale(1)",
      });
    }

    $("header~section").each(function (idx) {
      arrTopVal[idx] = $(this).offset().top;
    });
  }); //end load resize

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();
    const $aboutme = $home.nextAll("#aboutme");

    //비주얼에 재미있는 효과
    if (window.innerWidth > 640) {
      if (scrollTop > $(this).height() - 400) {
        $home.css({
          transform: "scale(0.9)",
        });
      } else {
        $home.css({
          transform: "scale(1)",
        });
      }
    }

    //헤더고정
    if (scrollTop > $(this).height()) {
      $header.addClass("fixed");
      $aboutme.css({
        marginTop: $headerH,
      });
    } else {
      $header.removeClass("fixed");
      $aboutme.css({
        marginTop: 0,
      });
    }

    //메뉴 활성화 표시
    for (let i = 0; i < $mnus.length; i++) {
      if (scrollTop >= arrTopVal[i] - $headerH - 150) {
        $mnus.eq(i).parent().addClass("on").siblings().removeClass("on");
      } else if (scrollTop < arrTopVal[0] - $headerH - 150) {
        $mnus.parent().removeClass("on");
      }
    } //end 메뉴활성화

    //탑버튼 노출처리
    if (scrollTop > 120) {
      $aside.fadeIn();
    } else {
      $aside.fadeOut();
    }
  }); //end scroll

  $mnus.on("click", function (evt) {
    evt.preventDefault();

    //nowIdx
    let nowIdx = $mnus.index(this);

    //animate
    $("html, body").stop().animate({
      scrollTop: arrTopVal[nowIdx],
    });
    if (!(window.innerWidth > 640)) {
      $btnGnb.trigger("click"); //클릭이벤트 강제발생
      $("html, body")
        .stop()
        .animate({
          scrollTop: arrTopVal[nowIdx] - 66,
        });
    }
  });

  //반응형 햄버거 버튼
  $btnGnb.on("click", function () {
    $(this).toggleClass("clse");
    $nav.toggle();
  });

  $(".logo")
    // 이벤트 진행시킬 변수추가 방법
    .add($aside)
    .on("click", function (evt) {
      evt.preventDefault();
      $("html,body").stop().animate({ scrollTop: 0 });
    });
});

//ability 영역
// $(function () {
// 	$(window).on('scroll', function () {
// 		const scrollTop = $(this).scrollTop();
// 		//offset.top이 3000 - 1000(window.innerHeight) +400 = 2400일때  리턴
// 		if (scrollTop > $('#ability').offset().top - window.innerHeight + 400) {
// 			$('#ability .bar').each(function () {
// 				$(this).width($(this).children('span').text());
// 			});
// 		} else if (scrollTop < $('#ability').offset().top - window.innerHeight) {
// 			$('#ability .bar').width(0);
// 		}

// 		if (scrollTop > $('#ability').offset().top + window.innerHeight) {
// 			$('#ability .bar').width(0);
// 		}
// 	});
// });

//resume 이력서 띄우기
// $(function () {
//   const $resume = $(".resume_click");
//   const $lightbox = $(".lightbox");
//   const $shadow = $(".shadow");

//   $resume.on("click", function (evt) {
//     evt.preventDefault();
//     const imgSrc = $lightbox.children().attr("src");
//     const imgAlt = $lightbox.children().attr("alt");

//     $lightbox.children("img").attr({
//       src: imgSrc,
//       alt: imgAlt,
//     });
//     $lightbox.show();
//     $shadow.show();
//   });
//   $(".clse").on("click", function () {
//     $shadow.fadeOut();
//   });
// });

//uxdesign 영역
$(function () {
  const $container = $("#skill>.slides>.slides-container");
  const $indicator = $("#skill>.slides>.slides-pagination>li>a");
  const $btnPrev = $("#skill>.slides>.slides-prev");
  const $btnNext = $("#skill>.slides>.slides-next");

  let nowIdx = 0;

  let aniChk = false; //'현재 애니메이트중이 아님'을 의미

  $btnNext.on("click", function (evt) {
    evt.preventDefault();

    if (!aniChk) {
      aniChk = !aniChk;

      if (nowIdx < $indicator.length - 1) {
        nowIdx++;
      } else {
        nowIdx = 0;
      }

      $container
        .stop()
        .animate({ left: "-100%" }, 400, "easeInOutCubic", function () {
          const $slides = $("#skill>.slides>.slides-container>li");
          $slides.first().appendTo($container); //마지막 자식으로 li를 이동
          $container.css({ left: 0 });
          aniChk = !aniChk;
        });

      $indicator
        .eq(nowIdx)
        .parent()
        .addClass("on")
        .siblings()
        .removeClass("on");
    }
  });

  $btnPrev.on("click", function (evt) {
    evt.preventDefault();

    if (!aniChk) {
      aniChk = !aniChk;

      if (nowIdx > 0) {
        nowIdx--;
      } else {
        nowIdx = $indicator.length - 1;
      }

      const $slides = $("#skill>.slides>.slides-container>li");
      $slides.last().prependTo($container);
      $container.css({ left: "-100%" });
      $container
        .stop()
        .animate({ left: 0 }, 400, "easeInOutCubic", function () {
          aniChk = !aniChk;
        });

      $indicator
        .eq(nowIdx)
        .parent()
        .addClass("on")
        .siblings()
        .removeClass("on");
    }
  });

  $indicator.on("click", function (evt) {
    evt.preventDefault();
    nowIdx = $indicator.index(this);
    $container.stop().animate({
      left: -100 * nowIdx + "%",
    });

    $indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
  });

  //3초마다 자동실행 -인터벌, 다음인덱스 , 이동 다음버튼에 클릭이벤트 트리거 설정

  setInterval(function () {
    $btnNext.trigger("click"); //이벤트 강제발생
  }, 3000);
});

//portfolio 영역
$(function () {
  const $slides = $(".slides-container>figure");
  const $indicator = $("#portfolio .slides-pagination a");
  const $btnPrev = $("#portfolio .slides-prev");
  const $btnNext = $("#portfolio .slides-next");
  let nowIdx = 0;
  let oldIdx = nowIdx;

  const fadeFn = function () {
    $slides.eq(oldIdx).stop().fadeOut(200);
    $slides.eq(nowIdx).stop().fadeIn(200).css({ display: "flex" });

    $indicator.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
  };

  $indicator.on("click", function (evt) {
    evt.preventDefault();

    oldIdx = nowIdx;
    nowIdx = $indicator.index(this);
    fadeFn();
  });
  $btnPrev.on("click", function (evt) {
    evt.preventDefault();
    oldIdx = nowIdx;
    if (nowIdx > 0) {
      nowIdx -= 1;
      console.log(nowIdx);
    } else {
      nowIdx = $slides.length - 1;
    }
    fadeFn();
  });
  $btnNext.on("click", function (evt) {
    evt.preventDefault();
    oldIdx = nowIdx;
    if (nowIdx < $slides.length - 1) {
      nowIdx += 1;
      console.log(nowIdx);
    } else {
      console.log(nowIdx);
      nowIdx = 0;
    }

    fadeFn();
  });

  // //작업과정 라이트박스

  // const $btnProc = $("#portfolio .proc");
  // const $shadow = $("#portfolio .shadow");
  // const $btnClse = $shadow.children(".clse");

  // $btnProc.on("click", function (evt) {
  //   evt.preventDefault();
  //   $shadow.show();
  // });

  // $btnClse.on("click", function () {
  //   $shadow.hide();
  // });

  // // 그림자 영역 클릭시 닫힘
  // $shadow.on("click", function () {
  //   $(this).hide();
  // });

  // // 이벤트전파 차단
  // $shadow.children(".lightbox").on("click", function (evt) {
  //   evt.stopPropagation();
  // });

  // //esc키로 닫기
  // $(document).on("keyup", function (evt) {
  //   if (evt.which === 27) {
  //     $shadow.hide();
  //   }
  // });
});

//contact 영역
$(function () {
  const $tit = $("#contact dt>a");

  $tit.on("click", function (evt) {
    evt.preventDefault();

    $(this).parent().toggleClass("on").next().slideToggle(150);
  });
});
