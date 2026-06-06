(function ($) {
   "use strict";
    const $window = $(window);
    const CONFIG = { mobileBreakpoint: 768, formAction: "form-process.php" };

    // Preloader
    $window.on("load", () => setTimeout(() => $(".preloader").fadeOut(1000), 700));

	 // Sticky Header
    if ($('.active-sticky-header').length) {

		const $window = $(window);
		const $mainHeader = $(".main-header");
		const $stickyHeader = $('header .header-sticky');

		function setHeaderHeight() {
			$mainHeader.css("height", $stickyHeader.outerHeight());
		}

		$window.on('resize', setHeaderHeight);

		$stickyHeader.removeClass("active hide");

		$window.on("scroll", function () {
			var fromTop = $window.scrollTop();
			setHeaderHeight();

			var siteHeaderHeight = $mainHeader.outerHeight();

			if (fromTop > siteHeaderHeight) {
				$stickyHeader.addClass("active").removeClass("hide");
			} else {
				$stickyHeader.removeClass("active hide");
			}
		});
	}
    // Active Navigation
    $(() => {
        let page = location.pathname.split("/").pop().toLowerCase() || "index.html";
        document.querySelectorAll("#sisf-page-header .nav-link").forEach(link => {
            const href = (link.getAttribute("href") || "").split("/").pop().toLowerCase() || "index.html";
            if (href === page) {
                link.classList.add("active");
                let parent = link.closest("li.submenu");
                while (parent) {
                    parent.querySelector(":scope > .nav-link")?.classList.add("active");
                    parent = parent.parentElement.closest("li.submenu");
                }
            }
        });
    });

	
    // Mobile Menu
        const initialMenuItems = $('#menu > li').toArray();
        const initialMenu2Items = $('#menu2 > li').toArray();

        const handleMobileMenus = () => {
            const isMobile = $window.width() <= CONFIG.mobileBreakpoint;
            const hasSlickNav = $(".slicknav_nav").length;

            if (isMobile && !hasSlickNav && $.fn.slicknav) {

                $("#menu2").children().appendTo("#menu");

                $("#menu").slicknav({
                    label: "",
                    prependTo: ".responsive-menu",

                    beforeOpen: function () {
                        $('body').addClass('mobile-menu-open');
                    },

                    beforeClose: function () {
                        $('body').removeClass('mobile-menu-open');
                    }
                });

            } else if (!isMobile && hasSlickNav) {

                $("#menu").slicknav("destroy");

                initialMenuItems.forEach(item => $("#menu").append(item));
                initialMenu2Items.forEach(item => $("#menu2").append(item));
            }
        };

        handleMobileMenus();

        let resizeTimer;
        $window.on("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleMobileMenus, 200);
        });


        // submenu scroll fix
        $(document).on('click', '.slicknav_arrow', function () {
            setTimeout(() => {
                const parent = $(this).closest('.slicknav_parent');
                const menu = $('.slicknav_menu');

                menu.animate({
                    scrollTop: parent.position().top + menu.scrollTop() - 80
                }, 300);
            }, 200);
        });
	
	// Swiper Helper
    const swiperOptions = { slidesPerView: 1, speed: 1000, loop: true, autoplay: { delay: 5000 } };
    const initSwiper = (selector, options) => typeof Swiper !== "undefined" && document.querySelector(selector) ? new Swiper(selector, options) : null;

	function animateActiveSlideText() {
        gsap.set(".text-anime-style-2", { clearProps: "all" });

        const activeSlide = document.querySelector(".swiper-slide-active");
        const animatedTextElements = activeSlide.querySelectorAll(".text-anime-style-2");

        animatedTextElements.forEach((element) => {
            const animationSplitText = new SplitText(element, { type: "chars, words" });

            gsap.from(animationSplitText.chars, {
				opacity: 0,
                duration: 0.11,         
				delay: 0.14,
				x: 250,                 
				autoAlpha: 0,
				stagger: 0.09,         
				ease: "power5.out",
            });
        });
    }
    /* Hero Slider Start */
	initSwiper(".hero-slider-layout .swiper", {
        ...swiperOptions,
        autoplay: { delay: 4000 },
        pagination: { el: ".hero-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
		on: {
			init: function () {
				animateActiveSlideText(); 
			},
			slideChangeTransitionStart: function () {
				animateActiveSlideText(); 
			}
		}
    });
    /* Hero Slider End */
	
	initSwiper(".comman-swiper-slider .swiper", {
        ...swiperOptions,
        spaceBetween: 15,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2, centeredSlides: true }, 1024: { slidesPerView: 4 } }
    });
	
	/* =====================================================
   	SINGLE SLIDER (SAFE INIT)
	===================================================== */
	if (typeof Swiper !== "undefined") {

		const singleSliders = document.querySelectorAll(".sisf-single-slider");

		if (singleSliders.length) {

			singleSliders.forEach(sliderContainer => {

				const swiperEl = sliderContainer.querySelector(".swiper");
				if (!swiperEl) return;

				const nextBtn = sliderContainer.querySelector(".custom-icon-right");
				const prevBtn = sliderContainer.querySelector(".custom-icon-left");
				const paginationEl = sliderContainer.querySelector(".swiper-pagination");

				new Swiper(swiperEl, {
					slidesPerView: 1,
					speed: 1000,
					loop: true,
					spaceBetween: 10,
					navigation: {
						nextEl: nextBtn || null,
						prevEl: prevBtn || null
					},
					pagination: paginationEl ? {
						el: paginationEl,
						clickable: true
					} : false,
					breakpoints: {
						0: {
							slidesPerView: 1,
							centeredSlides: false
						},
						768: {
							slidesPerView: 1,
							centeredSlides: true
						},
						1024: {
							slidesPerView: 1,
							centeredSlides: true
						}
					}
				});

			});

		}
	}
	// Back to Top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        $window.on('scroll', () => backToTop.classList.toggle('show', window.scrollY > 300));
        backToTop.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

	// Skills Progress Bar
    if ($.fn.waypoint && $('.skills-progress-bar').length) {
        let animated = false;
        $('.skills-progress-bar').waypoint(() => {
            if (animated) return;
            animated = true;
            $('.skillbar').each(function () {
                const $this = $(this);
                const percent = parseInt($this.attr('data-percent'), 10) || 0;
                const $bar = $this.find('.count-bar');
                const $text = $this.find('.skill-no');

                $bar.css('width', '0%').animate({ width: percent + '%' }, 2000, 'swing');
                $({ value: 0 }).animate({ value: percent }, { duration: 2000, easing: 'swing', step: val => $text.text(Math.ceil(val) + '%') });
            });
        }, { offset: '50%' });
    }
	 // GSAP Reveal & Text Animations
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll(".reveal").forEach(container => {
            const image = container.querySelector("img"); if (!image) return;
            const tl = gsap.timeline({ scrollTrigger: { trigger: container, toggleActions: "play none none none" } });
            tl.set(container, { autoAlpha: 1 });
            tl.from(container, { xPercent: -100, duration: 1, ease: "power2.out" });
            tl.from(image, { xPercent: 100, duration: 1, delay: -1, scale: 1, ease: "power2.out" });
        });

        ['.text-anime-style-1', '.text-anime-style-3'].forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const split = new SplitText(element, { type: selector === '.text-anime-style-1' ? "chars, words" : "chars, words" });
                gsap.from(selector === '.text-anime-style-1' ? split.words : split.chars, {
                    duration: 1, delay: selector === '.text-anime-style-1' ? 0.5 : 0.2, x: selector === '.text-anime-style-1' ? 20 : 40,
                    autoAlpha: 0, stagger: selector === '.text-anime-style-1' ? 0.05 : 0.03, ease: "power2.out",
                    scrollTrigger: { trigger: element, start: "top 85%" }
                });
            });
        });
    }
	// Forms
    if ($.fn.validator && $("#enquiryForm").length) {
        $("#enquiryForm").validator({ focus: false }).on("submit", e => {
            if (!e.isDefaultPrevented()) { e.preventDefault(); submitForm($(e.target)); }
        });
    }
    function submitForm($form) {
        $.post(CONFIG.formAction, $form.serialize(), response => {
            if (response?.trim() === "success") { $form[0].reset(); showMsg(true, "Booking email sent successfully!"); }
            else showMsg(false, response || "Something went wrong.");
        });
    }
    function showMsg(valid, msg) { $("#msgSubmit").removeClass().addClass(valid ? "text-success" : "text-danger").text(msg); }
	// Optional Plugins
    if (typeof WOW !== "undefined") new WOW().init();
    if (typeof Plyr !== "undefined" && $('#player').length) new Plyr('#player');

    // YouTube Background
    if (typeof $.fn.YTPlayer !== "undefined" && $('#herovideo').length) $('#herovideo').YTPlayer();

    // Counter Up
    if ($.fn.counterUp && $('.counter').length) $('.counter').counterUp({ delay: 6, time: 3000 });

    // Magnific Popup - Gallery
    if ($.fn.magnificPopup && $('.gallery-items').length) {
        $('.gallery-items').magnificPopup({
            delegate: 'a', type: 'image', closeOnContentClick: false, closeBtnInside: false,
            mainClass: 'mfp-with-zoom', image: { verticalFit: true }, gallery: { enabled: true },
            zoom: { enabled: true, duration: 300, opener: el => el.find('img') }
        });
    }
	
	 // Magnific Popup - Video
    if ($.fn.magnificPopup && $('.popup-video').length) {
        $('.popup-video').magnificPopup({
            type: 'iframe', mainClass: 'mfp-fade', removalDelay: 160, preloader: false, fixedContentPos: true,
            callbacks: {
                open: function () {
                    const videoSrc = $.magnificPopup.instance.currItem.src;
                    setTimeout(() => {
                        const content = document.querySelector('.mfp-content'); if (!content) return;
                        const iframe = content.querySelector('iframe'); if (iframe) iframe.remove();
                        const video = document.createElement('video');
                        video.src = videoSrc; video.autoplay = true; video.muted = true;
                        video.controls = true; video.playsInline = true;
                        video.style.width = '100%'; video.style.height = 'auto';
                        video.addEventListener('click', e => e.stopPropagation());
                        content.appendChild(video); video.play().catch(() => {});
                    }, 50);
                },
                close: function () {
                    const video = document.querySelector('.mfp-content video');
                    if (video) { video.pause(); video.remove(); }
                }
            }
        });
    }

})(jQuery);