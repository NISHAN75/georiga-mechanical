(function ($) {
    $(document).ready(function () {
        // testing
        $(window).on('resize load', function() {
            var windowWidth = $(window).width();
            var containerOffsetLeft = $('.container').offset().left;
            var leftPosition = windowWidth - (containerOffsetLeft + 24);
            $('.title-section-wrapper').css('right', leftPosition + 'px');
        });
        // testing
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
        $(".animate-line p").each(function (index, element) {
            gsap.from(element, {
                duration: 0.9,
                opacity: 0,
                y: 50,
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: !1,
                    toggleActions: "play none none reverse"
                }
            });
        });
        // animation

        //    main menu
        const $mainMenu = $(".main-menu");
        $mainMenu.find("> ul > li > a").on("click", function (event) {
            const $menuItem = $(this).closest("li");

            if ($menuItem.hasClass("menu-link")) {
                event.preventDefault();
            }
            $menuItem.addClass("active").siblings().removeClass("active");
        });
        // On hover over the main menu items
        $mainMenu.find("> ul > li").hover(
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
        //    main menu

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
              start: "top top",
              end: "bottom 30%",
              pin: $block.find(".section-title")[0],
              pinSpacing: true
            });
          });
        // sticky title


        //paralax
        $(window).on("load resize", function () {
            if ($(window).width() > 991) {
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