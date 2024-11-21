(function ($) {
   $(document).ready(function () {


       // animation
       gsap.registerPlugin(SplitText, ScrollTrigger);
       let textWrappers = $(".animation-text");

       // Split text into lines and letters
       let mainTitleSplit = new SplitText(textWrappers, {
           type: "lines,chars", // Split into lines and characters
           linesClass: "line-wrapper overflow-hidden", // Add line-specific class
           charsClass: "letter", // Add letter-specific class
           tag: "span" // Wrap the text in spans
       });

       // Animate each line's letters
       $(".line-wrapper").each(function () {
           let letters = $(this).find(".letter"); // Select letters inside each line
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

    // On hover over the main menu items
    $mainMenu.find("> ul > li").hover(
        function () {
            // Find the sub-menu
            const $subMenu = $(this).find(".sub-menu");
            const $progressBar= $(".offcanvas").find(".progress-bar")
            

            if ($subMenu.length) {
                // Set opacity and visibility for the sub-menu
                $subMenu.css({
                    opacity: 1,
                    visibility: "visible",
                });
                $progressBar.css({
                    opacity: 1,
                    visibility: "visible",
                });

                // Calculate and set the top position of the sub-menu
                const mainMenuOffset = $mainMenu.offset().top;
                const parentMenuOffset = $(this).offset().top;
                const topPosition = parentMenuOffset - mainMenuOffset;
                $subMenu.css({
                    top: -topPosition + "px",
                });
                $progressBar.css({
                    top: topPosition + "px",
                });
            }
        },
        function () {
            // Reset opacity and visibility when the mouse leaves
            const $subMenu = $(this).find(".sub-menu");
            const $progressBar= $(".offcanvas").find(".progress-bar")
            if ($subMenu.length) {
                $subMenu.css({
                    opacity: 0,
                    visibility: "hidden",
                });
            }
            if ($progressBar.length) {
                $progressBar.css({
                    opacity: 0,
                    visibility: "hidden",
                });
            }
        }
    );
    //    


    //   paralax
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

    // sticky-sidebar
    function createScrollTriggerForSidebars() {
        // Get all time-line-wrapper elements
        const wrappers = gsap.utils.toArray(".sticky-sidebar-div");
        const windowWidth = $(window).width();
            if(windowWidth > 991){
            wrappers.forEach((wrapper) => {
                const sidebar = wrapper.querySelector(".sidebar");
                const endTrigger = wrapper.querySelector(".end-sidebar");
    
                if (sidebar && endTrigger) {
                    const trigger = sidebar;
                    const start = "top +120px";
                    const pin = true;
                    const invalidateOnRefresh = true;
        
                    ScrollTrigger.create({
                        trigger: trigger,
                        start: start,
                        end: () => `bottom center`,
                        endTrigger: endTrigger,
                        pin: pin,
                        pinSpacing: false,
                        invalidateOnRefresh: invalidateOnRefresh,
                    });
                } else {
                    console.warn("Sidebar or end trigger element not found within wrapper:", wrapper);
                }
            });
            }

    }
    
    createScrollTriggerForSidebars();













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