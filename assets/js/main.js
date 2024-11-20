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