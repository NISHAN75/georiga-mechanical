(function ($) {
    $(document).ready(function () {
        
        // header sticky
        var windowOn = $(window);
        windowOn.on('scroll', function () {
            if($("body").hasClass("home")){
                var scroll = windowOn.scrollTop();
                if (scroll < 100) {
                    $(".header-area").removeClass("header-sticky");
                    $(".header-offcanvas").removeClass("version-2");
                } else {
                    $(".header-area").addClass("header-sticky");
                    $(".header-offcanvas").addClass("version-2");
                }
            }
        });


        $(".modal-area").on("shown.bs.modal", function () {
            OverlayScrollbars($(".modal-body"), {
                className: "os-theme-custom",
                scrollbars: {
                    visibility: "auto", 
                    autoHide: "leave",
                    autoHideDelay: 500,
                    dragScrolling: true,
                    clickScrolling: true, 
                },
                scrollBehavior: 'smooth', 
            });
        });
 



        // testing
        // title set
        if (windowOn.width() > 1499) {
            windowOn.on('resize load', function () {
                const windowWidth = windowOn.width();
                const $container = $(".container").eq(4);
                const containerOffsetLeft = $container.offset().left;
                const leftPosition = windowWidth - (containerOffsetLeft + 24);
                if (windowOn.width() > 1699) {
                    const fixPosition = leftPosition + 92;
                    $('.title-section-wrapper').css('right', fixPosition + 'px');
                } else if (windowOn.width() < 1699) {
                    const fixPosition = leftPosition + 30;
                    $('.title-section-wrapper').css('right', fixPosition + 'px');
                }
            });
        }


        // title set
        let offcanvasElement = $(".header-offcanvas");
        offcanvasElement.on("show.bs.offcanvas", function () {
            $(".menu-icon").addClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: "rotate(45deg)"
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "rotate(-45deg)",
                marginTop: "-1px"
            });
        });
        offcanvasElement.on("hide.bs.offcanvas", function () {
            $(".menu-icon").removeClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: ""
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "",
                marginTop: ""
            });
        });
        // animation
        gsap.registerPlugin(SplitText, ScrollTrigger);
        let textWrappers = $(".animation-text");

        // Split text into lines and letters
        let mainTitleSplit = new SplitText(textWrappers, {
            type: "lines,chars",
            linesClass: "line-wrapper overflow-hidden",
            charsClass: "letter",
            tag: "span"
        });

        // Animate each line's letters
        $(".line-wrapper").each(function () {
            let letters = $(this).find(".letter");
            gsap.from(letters, {
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: "power3.inOut"
            });
        });
        // animation line
        gsap.utils.toArray(".animation-line").forEach((element) => {
            gsap.fromTo(
              element,
              {
                y: 100, 
                opacity: 0, 
              },
              {
                y: 0,
                opacity: 1,
                duration: 1.5, 
                ease: "power2.out", 
                scrollTrigger: {
                  trigger: element, 
                  start: "top 90%",
                  toggleActions: "play none none reverse",

                },
              }
            );
          });
        // animation

        // main menu
        const $mainMenu = $(".main-menu");
        $mainMenu.find(" ul > li > a").on("click", function (event) {
            const $menuItem = $(this).closest("li");
            if ($menuItem.hasClass("menu-link")) {
                event.preventDefault();
            }
            $menuItem.addClass("active").siblings().removeClass("active");
        });
        // On hover over the main menu items
        $mainMenu.find("ul > li").hover(
            function () {
                // Find the sub-menu
                const $subMenu = $(this).find(".sub-menu");
                const $progressBar = $(".offcanvas").find(".progress-bar");
                $(this).addClass("active").siblings().removeClass("active");
                // Calculate and set the top position of the sub-menu
                const mainMenuOffset = $mainMenu.offset().top;
                const parentMenuOffset = $(this).offset().top;
                const topPosition = parentMenuOffset - mainMenuOffset;
                $progressBar.css({
                    top: topPosition + "px",
                });
                if ($subMenu.length) {
                    $subMenu.css({
                        top: -topPosition + "px",
                    });
                }
            }
        );
        // main menu


        // offcanvas animation
        // Trigger animation when the offcanvas is shown
        gsap.set(".main-menu > ul", {
            x: -100,
            opacity: 0
        });
        gsap.set(".mobile-menu > ul", {
            x: -100,
            opacity: 0
        });
        gsap.set(".emergency-wrapper", {
            x: -100,
            opacity: 0
        });
        gsap.set(".contact-button-wrapper", {
            x: -100,
            opacity: 0
        });
        gsap.set(".social-link-wrapper", {
            x: 100,
            opacity: 0
        });
        // Animate on offcanvas show
        $(".header-offcanvas").on('shown.bs.offcanvas', function () {
            gsap.fromTo(
                ".main-menu > ul", {
                    x: -100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }
            );
            gsap.fromTo(
                ".mobile-menu > ul", {
                    x: -100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }
            );
            gsap.fromTo(
                ".emergency-wrapper", {
                    x: -100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3,
                    ease: 'power2.out'
                }
            );
            gsap.fromTo(
                ".contact-button-wrapper", {
                    x: -100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.5,
                    ease: 'power2.out'
                }
            );
            gsap.fromTo(
                ".social-link-wrapper", {
                    x: 100,
                    opacity: 0
                }, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }
            );
        });
        $(".header-offcanvas").on('hidden.bs.offcanvas', function () {
            gsap.set(".main-menu > ul", {
                x: -100,
                opacity: 0
            });
            gsap.set(".mobile-menu > ul", {
                x: -100,
                opacity: 0
            });
            gsap.set(".emergency-wrapper", {
                x: -100,
                opacity: 0
            });
            gsap.set(".contact-button-wrapper", {
                x: -100,
                opacity: 0
            });
            gsap.set(".social-link-wrapper", {
                x: 100,
                opacity: 0
            });
        });

        // offcanvas animation

        // mobile menu
        const $mobileMenu = $(".mobile-menu");
        $mobileMenu.find("ul > li > a").on("click", function (e) {
            const $menuItem = $(this).closest("li");

            // Remove 'active' class from all other menu items
            $mobileMenu.find("ul > li").removeClass("active");
            $menuItem.addClass("active");
            const $submenu = $(this).siblings(".sub-menu");

            if ($submenu.is(":visible")) {
                $submenu.slideUp();
                $menuItem.removeClass("active");
            } else {
                // Slide down if not visible
                $(".sub-menu").slideUp();
                $(".menu-link > a").removeClass("active");
                $submenu.stop(true, true).slideDown();
            }
            // Prevent default behavior for menu-link class items
            if ($menuItem.hasClass("menu-link")) {
                e.preventDefault();
            }
        });
        // mobile menu


        // sticky title
        $(".title-sticky").each(function () {
            const $block = $(this);
            ScrollTrigger.create({
                trigger: $block[0],
                start: "top 30%",
                end: "bottom 60%",
                pin: $block.find(".section-title")[0],
                pinSpacing: true
            });
        });
        // sticky title

         // testimonial slider
        let teamSlider = new Swiper(".featured-project-slider", {
            slidesPerView: 2,
            spaceBetween: 30,
            keyboard: {
            enabled: true,
            },
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            },
            navigation: {
            nextEl: ".tp-swiper-project-button-next",
            prevEl: ".tp-swiper-project-button-prev",
            },
            // Responsive breakpoints
            breakpoints: {
            // when window width is >= 640px
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 2,
            },
            // when window width is >= 1200px
            1200: {
                slidesPerView: 2,
            }
            }
        });



        //paralax
        windowOn.on("load resize", function () {
            if (windowOn.width() > 991) {
                const commitmentImg = $(".trigger-parallax");
                if (commitmentImg.length) {
                    commitmentImg.each(function () {
                        const currentItem = $(this).find(".parallax-img");
                        const currentItemHeight = currentItem.height();
                        currentItem.parent().css("height", currentItemHeight);
                        currentItem.css("height", currentItemHeight + 120);

                        // Clear existing ScrollTriggers to prevent duplicates
                        if (currentItem.data("parallax-trigger")) {
                            currentItem.data("parallax-trigger").kill();
                        }

                        const trigger = gsap.to(currentItem, {
                            y: -120,
                            ease: "none",
                            scrollTrigger: {
                                trigger: currentItem[0],
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        });

                        // Store the ScrollTrigger instance for later cleanup
                        currentItem.data("parallax-trigger", trigger);
                    });
                }
            } else {
                // Disable the parallax effect for smaller screens
                $(".parallax-img").each(function () {
                    const currentItem = $(this);
                    if (currentItem.data("parallax-trigger")) {
                        currentItem.data("parallax-trigger").kill(); // Kill the ScrollTrigger instance
                        currentItem.removeData("parallax-trigger"); // Clear stored data
                    }
                    currentItem.css("transform", "none"); // Reset transform
                });
            }
        });
        //  paralax


        // modal
        const $myModal = $('#myModal');
        const $myInput = $('#myInput');

        $myModal.on('shown.bs.modal', function () {
            $myInput.focus();
        });
        // modal

        // OverlayScrollbars
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true, 
                    autoHide: "leave", 
                    dragScrolling: true, 
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });
        // lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        lenis.on('scroll', (e) => {
            console.log(e);
        });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis


    });
})(jQuery);