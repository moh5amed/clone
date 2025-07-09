$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, MorphSVGPlugin, ScrollToPlugin);

    // 화면 너비
    let ww = window.innerWidth;
	let wh = window.innerHeight;

    // 스무스
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
            return true;
        } else {
            return false;
        }
    }

    if (!mob()) {
        ScrollSmoother.create({
            smooth: 1,
            // effect: true,
        });
    }
});



// top 버튼 1번 섹션 별도 지정
ScrollTrigger.create({
    trigger: '.sv',
    start: 'bottom bottom-=20%',
    end:'bottom+=300% bottom',
    // markers: true,
    onEnter: () => {
        $('._asideBtnBx').addClass('on');
    },
    onEnterBack: () => {
        $('._asideBtnBx').addClass('on');
    },
    onLeave: () => {
        $('._asideBtnBx').removeClass('on');
    },
    onLeaveBack: () => {
        $('._asideBtnBx').removeClass('on');
    },
});



// aside top 버튼 클릭시
$('._asideBtnBx .top').click(function(){
	gsap.to(window, {
		duration: 1.5,
		ease: "power2.out",
		scrollTo: { y: "0", offsetY: 0 },
	});
})

if($('[aside="false"]').length > 0){
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
}

//서브 비주얼 모션
gsap.utils.toArray('.sub .sv h1 span').forEach(e=>{
    gsap.from(e, {y: '100%', duration: .8, delay: .2})
})

// 서브 상단 탭
$('.sub .filterNav span').click(function() {
    if(!$(this).hasClass('act')) {
        $(this).siblings().removeClass('act');
        $(this).addClass('act');
    }
})

