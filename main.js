$(document).ready(function () {
    history.scrollRestoration = "manual"

    // 화면 너비
    let ww = window.innerWidth;
	let wh = window.innerHeight;


	function mob() {
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i) ||
            navigator.maxTouchPoints == 5
        ) {

			// 모바일에서 vh 개별
			document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
            return true;
        } else {
            return false;
        }
    }

    // 페이드인 공통
    let fadeUpOption = { opacity: 0, y: 70, duration: .7 }
    let triggerOption = { start: 'top 90%', toggleActions: 'play none none reverse' }

    $('.motionFadeUp').each(function (i, e) {
        gsap.from(e, {
            opacity: 0, y: 40, duration: .7,
            scrollTrigger: {
                trigger: e,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        })
    })
    $('.motionFadeUp_opct').each(function (i, e) {
        gsap.from(e, {
            opacity: 0, duration: .7,
            scrollTrigger: {
                trigger: e,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        })
    })

    // 섹션제목 공통
    $('section:not(.s4) .titBx').each(function (i, e) {
        gsap.timeline({
            scrollTrigger: {
                trigger: e,
                ...triggerOption,
            }
        })
            .from($(e).find('small'), { ...fadeUpOption })
            .from($(e).find('strong'), { ...fadeUpOption }, '-=80%')
            .from($(e).find('p'), { ...fadeUpOption }, '-=80%')
    })

	// top 버튼 1번 섹션 별도 지정
	ScrollTrigger.create({
		trigger: '.s1',
		start: 'top bottom',
		end:'bottom+=300% bottom',
		// markers: true,
		onEnter: () => {
			$('._asideBtnBx').removeClass('on');
            $('header').removeClass('white');
		},
		onEnterBack: () => {
			$('._asideBtnBx').removeClass('on');
            $('header').removeClass('white');
		},
		onLeave: () => {
			$('._asideBtnBx').addClass('on');
            $('header').addClass('white');
		},
		onLeaveBack: () => {
			$('._asideBtnBx').addClass('on');
            $('header').addClass('white');
		},
	});


    // aside top 버튼 클릭시
    $('._asideBtnBx .top').click(function(){
        gsap.to(mob() ? '#smooth-wrapper':window, {
            duration: 1.5,
            ease: "power2.out",
            scrollTo: { y: "0", offsetY: 0 },
        });
    })

    $('[aside="false"]').each(function(i,e){
        ScrollTrigger.create({
            trigger: e,
            start: 'top bottom',
            // markers: true,
            onEnter: () => {
                $('._asideBtnBx').removeClass('on');
            },
            onEnterBack: () => {
                $('._asideBtnBx').removeClass('on');
            },
            onLeave: () => {
                $('._asideBtnBx').addClass('on');
            },
            onLeaveBack: () => {
                $('._asideBtnBx').addClass('on');
            },
        });
    })

    // s1 --------------

	// $(function(){
	// 	$('#iframeVideo').on('load',function(){
	// 		$('.s1').css('background-color','#038F59')
	// 	})
	// })

    // 진입시 자동 애니메이션
    gsap.timeline()
        .to('.s1 .n1 h3 p ', { y: 0, duration: .7 })
        .to('.s1 .n1 .scroll > div', { opacity: 1, y: 0, duration: .7 }, '-=50%')

    ScrollTrigger.create({
        trigger: '.s1',
        start: 'top top',
        end: `+=${wh * 5}`,
        pin: true,
        pintype:'fixed',
        pinSpacing: false,
    })

	// 영상 팝업
	$('.s1 .bg').click(function () {
		$('.videoPopup').fadeIn(300)
		let videoSrc = $('.s1 .bg iframe').attr('src')
			.replaceAll('&mute=1', '')
			.replaceAll('&mute=true', '')
			.replaceAll('&controls=0', '')
			.replaceAll('&controls=false', '')

		$('.videoPopup iframe').attr('src', videoSrc)
		$('html').css('overflow', 'hidden')
	})
	$('.videoPopup .cancel,.videoPopup .bg').click(function () {
		$('.videoPopup').fadeOut(300)
		$('.videoPopup iframe').attr('src', '')
		$('html').css('overflow', 'auto')
	})

	// 스크롤시 애니메이션
	function s1tlFunction(bgWidth,bgHeight){
		let s1tl = gsap.timeline({
			scrollTrigger: {
				trigger: 'body',
				start: 'top top',
				end: `+=${wh * 2}`,
				scrub: 2,
			}
		})
			.to('header',{y:'-110%',dutaion:.7})
			.to('.s1 .n1 h3 > div > div', { y: '-110%' },'-=100%')
			.to('.s1 .n1 .scroll', { opacity: 0, y: -30 },'-=100%')
			.to('.s1 .bg', { width: bgWidth, height: bgHeight })
			.to('.s1 .n2 img', { opacity: 1, y: 0 })
			.from('.s1 .bg small', { opacity: 0, y: 60 },'-=40%')
			.to('header',{y:0,dutaion:.7,delay:1})
	}

    ScrollTrigger.matchMedia({
        '(min-width:821px)': () => {
			s1tlFunction('35.565%','81.481%')
        },
		'(min-width:501px) and (max-width:820px)': () => {
            s1tlFunction('calc(100% - 160px)','calc(100% - 160px)')
        },
        '(max-width:500px)': () => {
            s1tlFunction('calc(100% - 80px)','calc(100% - 80px)')
        },
    })

    // s2 --------------
	$('.s2 .top').height($('.s2 .txtBx:first-child').height());
    $('.s2').css('margin-top', `${($(window).innerHeight() * 2) + 100}px`)

    let s2_tl01 = gsap.timeline({
        scrollTrigger: {
            trigger: '.s2 .top',
            ...triggerOption,
        }
    })
        .from('.s2 .txtBx small', { ...fadeUpOption })
        .from('.s2 .txtBx strong', { ...fadeUpOption }, '-=80%')
        .fromTo(
            '.s2 .txtBx strong',
            {
                background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(168,168,168,1) 0%, rgba(168,168,168,1) 100%)',
            },
            {
                background: 'linear-gradient(135deg, rgba(0,0,0,1) 100%, rgba(168,168,168,1) 100%, rgba(168,168,168,1) 100%)',
                duration: 1.5,
            }
            , '-=50%')

    var s2Swiper = new Swiper(".s2Swiper", {
        parallax: true,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 1500
        },
        navigation: {
            nextEl: ".s2 .swiper-arrow.next",
            prevEl: ".s2 .swiper-arrow.prev",
        },
        pagination: {
            el: ".s2 .swiper-pagination",
            clickable: true,
        },
        on: {
            slideChangeTransitionStart: function () {
                $('.s2 .txtBx').removeClass('on');
                $('.s2 .txtBx').eq(this.realIndex).addClass('on');
            },
        }
    });


    // s3 --------------
	setTimeout(function(){
		$('.s3 .swiperBx').height($('.s3 .s3Swiper.n1 a').height());
	},300)
	$('.s3 .s3Swiper:not(.n1)').removeClass('on');

    // 동그란 검정배경 탭 클릭시
    $('.s3 ._circleTab li').click(function () {
        $('.s3 ._circleTab li').removeClass('on');
        $(this).addClass('on');
		$('.s3 .wrap .s3Swiper').removeClass('on').eq($(this).index()).addClass('on');
    })

    var s3Swiper = new Swiper(".s3Swiper", {
        autoplay: {
            speed: 5000,
        },
        loop: true,
        loopAdditionalSlides: 1,
        speed: 800,
        breakpoints: {
            1025: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
            821: {
                slidesPerView: 3,
                spaceBetween: 18,
            },
            501: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            0: {
                slidesPerView: 1.2,
                spaceBetween: 12,
            },
        },
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: '.s3 ._circleTab',
            ...triggerOption,
        }
    })
        .from('._circleTab li', { ...fadeUpOption, stagger: .1 })


    // s4 --------------
    gsap.utils.toArray('.s4 .imgBx').forEach(e => {
        gsap.to($(e).find('._2'), {
            opacity: 1, duration: .6,
            scrollTrigger: {
                trigger: $(e).find('._2'),
                start: 'top+=50% 100%',
                end: 'bottom 100%',
                toggleActions: 'play none none reverse'
            }
        })
        gsap.to($(e).find('._3'), {
            opacity: 1, duration: .6,
            scrollTrigger: {
                trigger: $(e).find('._3'),
                start: 'top+=90% 100%',
                end: 'bottom 100%',
                toggleActions: 'play none none reverse'
            }
        })
    });

    /* 이미지 나누는 함수 */
    let s4imgLength = 7; // 나눌 갯수설정
    let s4imgDvidFirst = false;

    function s4imgDvid(divid) {
        if (!s4imgDvidFirst) {

            for (let i = 1; i < divid; i++) {
                let tagClone01 = $('.s4 .n1 .imgBx .box div:first-child').clone();
                let tagClone02 = $('.s4 .n2 .imgBx .box div:first-child').clone();
                $('.s4 .n1 .imgBx .box').append(tagClone01)
                $('.s4 .n2 .imgBx .box').append(tagClone02)
            }

            $('.s4 .n1 .imgBx .box div').each(function (i, e) {
                $(e).addClass(`n${i + 1}`);
            })

            $('.s4 .n2 .imgBx .box div').each(function (i, e) {
                $(e).addClass(`n${i + 1}`);
            })

            // 높이설정
            $('.s4 .imgBx .box div').css('height', `calc(100%/${divid})`)

            let centerIdx = ((divid - 1) / 2) + 1;
            let half = (divid - 1) / 2;

            for (let i = 1; i <= divid; i++) {
                if (i > centerIdx) {
                    $(`.s4 .imgBx .box div.n${i}`).css('background-position', `center calc(50% + ${$('.s4 .imgBx .box div.n1').height() * ((half + 1) - i)}px)`)
                }
                if (i < centerIdx) {
                    $(`.s4 .imgBx .box div.n${i}`).css('background-position', `center calc(50% - ${$('.s4 .imgBx .box div.n1').height() * (i - (half + 1))}px)`)
                }
                if (i == centerIdx) {
                    $(`.s4 .imgBx .box div.n${i}`).css('background-position', 'center center')
                }
            }

            s4imgDvidFirst = true;

            // 반응형
            // if (w) {
            //     $('.s4 .imgBx .box div').css('background-size', `${wh / $('.s4 .imgBx').width() * 100}% 300%`);
            // } else {
            //     $('.s4 .imgBx .box div').css('background-size', `cover`);
            // }

        } else {

            let centerIdx = ((divid - 1) / 2) + 1;
            let half = (divid - 1) / 2;

            for (let i = 1; i <= divid; i++) {
                if (i > centerIdx) {
                    $(`.s4 .imgBx .box div.n${i}`).css('background-position', `center calc(50% + ${$('.s4 .imgBx .box div.n1').height() * ((half + 1) - i)}px)`)
                }
                if (i < centerIdx) {
                    $(`.s4 .imgBx .box div.n${i}`).css('background-position', `center calc(50% - ${$('.s4 .imgBx .box div.n1').height() * (i - (half + 1))}px)`)
                }
                if (i == centerIdx) {
                    $(`.s4 .imgBx .box div.n${i}`).css('background-position', 'center center')
                }
            }
        }
    }
    // s4imgDvid(s4imgLength);

	// let s4tl01 = gsap.timeline({
	// 	scrollTrigger: {
	// 		trigger: '.s4 .n1 .imgBx',
	// 		start: 'top 85%',
	// 		toggleActions: 'play none none reverse',
	// 	},
	// });
	// let s4tl02 = gsap.timeline({
	// 	scrollTrigger: {
	// 		trigger: '.s4 .n2 .imgBx',
	// 		start: 'top 85%',
	// 		toggleActions: 'play none none reverse',
	// 	},
	// });
	// s4tl01.pause();
	// s4tl02.pause();

    // 이미지 하나씩 등장하는 모션
    // $('.s4 .n1 .imgBx .box div').each(function (i, e) {
    //     s4tl01
	// 	.from(e, {opacity: 0, x: '-60%', duration: .8,},i == 0 ? '0':`.${i + 1}`)
    //     .fromTo(e, {filter:'brightness(0.4) grayscale(1)',duration:.8},{filter:'brightness(1) grayscale(0)',duration:.8},'-=78%')
    // })

	// $('.s4 .n2 .imgBx .box div').each(function (i, e) {
    //     s4tl02
	// 	.from(e, {opacity: 0, x: '60%', duration: .8,},i == 0 ? '0':`.${i + 1}`)
    //     .fromTo(e, {filter:'brightness(0.4) grayscale(1)',duration:.8},{filter:'brightness(1) grayscale(0)',duration:.8},'-=78%')
    // })

    // // 이미지선 가리기
    // gsap.to('.s4 .n1 .imgBx .box', {
    //     backgroundImage: 'url(/asset/img/main/s4_img01.jpg)', delay: .7,
    //     scrollTrigger: {
    //         trigger: '.s4 .n1 .imgBx .box div:last-child',
    //         start: 'bottom+=300 bottom',
    //         end: 'bottom+=300 bottom',
    //         toggleActions: 'play none reverse none',
    //         // markers:true,
    //     }
    // })

    // gsap.to('.s4 .n2 .imgBx .box', {
    //     backgroundImage: 'url(/asset/img/main/s4_img02.jpg)', delay: .7,
    //     scrollTrigger: {
    //         trigger: '.s4 .n2 .imgBx .box div:last-child',
    //         start: 'bottom+=300 bottom',
    //         end: 'bottom+=300 bottom',
    //         toggleActions: 'play none reverse none',
    //         // markers:true,
    //     }
    // })

    // 텍스트 모션
    gsap.from('.s4 .n1 .titBx>*', {
        opacity: 0, x: 100, duration: .8, stagger: 0.1 ,
            scrollTrigger: {
                trigger: '.s4 .n1 .titBx',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
    })

    gsap.from('.s4 .n2 .titBx>*', {
        opacity: 0, x: -100, duration: .8, stagger: 0.1 ,
            scrollTrigger: {
                trigger: '.s4 .n2 .titBx',
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
    })

    // s5 --------------
    var s5Swiper = new Swiper(".s5Swiper", {
        autoplay: {
            speed: 5000,
        },
        loop: $('.s5Swiper .swiper-slide').length > 2,
        loopAdditionalSlides: 1,
        speed: 800,
        navigation: {
            nextEl: ".s5 .swiper-arrow.next",
            prevEl: ".s5 .swiper-arrow.prev",
        },
        pagination: {
            el: ".s5 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            821: {
                spaceBetween: 24,
                slidesPerView: 2,
                centeredSlides: false,
            },
            501: {
                spaceBetween: 18,
                slidesPerView: 1.2,
                centeredSlides: true,
            },
            0: {
                slidesPerView: 1,
                spaceBetween: 12,
            },
        },
    });

    // 화살표 위치 이미지 가운데로맞추는 함수
    function arrowPosition(arrow, imgBx, direction) {
        $(arrow).css(direction, $(imgBx).height() / 2)
    }
    arrowPosition('.s5 .swiper-arrow', '.s5 .swiper-slide:nth-of-type(1) .imgBx', 'top');


    // s6 --------------
    var s6Swiper = new Swiper(".s6Swiper", {
        autoplay: {
            speed: 5000,
        },
        loop: true,
        loopAdditionalSlides: 1,
        speed: 800,
        navigation: {
            nextEl: ".s6 .swiper-arrow.next",
            prevEl: ".s6 .swiper-arrow.prev",
        },
        pagination: {
            el: ".s6 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            821: {
                spaceBetween: 24,
                centeredSlides: true,
            },
            501: {
                spaceBetween: 18,
                slidesPerView: 1.2,
                centeredSlides: true,
            },
            0: {
                spaceBetween: 12,
                slidesPerView: 1,
            },
        },
    });

    // s7 --------------
    var s7Swiper = new Swiper(".s7Swiper", {
        autoplay: {
            speed: 5000,
        },
        loop: true,
        loopAdditionalSlides: 1,
        speed: 800,
        navigation: {
            nextEl: ".s7 .swiper-arrow.next",
            prevEl: ".s7 .swiper-arrow.prev",
        },
        pagination: {
            el: ".s7 .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            821: {
                spaceBetween: 24,
                slidesPerView: 3,
                centeredSlides: true,
            },
            501: {
                spaceBetween: 18,
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 12,
                slidesPerView: 1,
            },
        },
    });

	// s8 --------------
	// gsap.to('.s8',{
	// 	backgroundPosition:'center 100%',
	// 	scrollTrigger:{
	// 		trigger:'.s8',
	// 		endTrigger:'footer',
	// 		end:'bottom bottom',
	// 		start:'top bottom',
	// 		scrub:2,
	// 	}
	// })

    // 리사이즈후 0.2초뒤 실행 --------------
    let mainResize;

	if(!mob()){
		$(window).resize(function () {
			console.log('asdfasdfasdf');
			clearTimeout.mainResize;

			let mainResize = setTimeout(function () {
				let ww = $(window).innerWidth();
				let wh = $(window).innerHeight();

				$('.s2 .top').height($('.s2 .txtBx:first-child').height());
				$('.s2').css('margin-top', `${($(window).innerHeight() * 2) + 100}px`)
				setTimeout(function(){
					$('.s3 .swiperBx').height($('.s3 .s3Swiper.n1 a').height());
				},300)
				arrowPosition('.s5 .swiper-arrow', '.s5 .swiper-slide:nth-of-type(1) .imgBx', 'top');

				// s4imgDvid(s4imgLength);

			}, 200)
		})
	}
})
