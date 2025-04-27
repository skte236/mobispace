// --- Mobispace Custom Script (js/script.js) ---

document.addEventListener('DOMContentLoaded', function() {

    // Add preload class removal after short delay to prevent FOUC (Flash Of Unstyled Content)
    // This assumes you add class="preload" to the <body> tag in HTML initially.
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100); // Adjust delay as needed

    /**
     * Throttle Function Utility
     * Limits how often a function can be called. Useful for scroll/resize events.
     */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Debounce function utility (if needed later, not strictly required for current functions)
    /*
    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }
    */

    /**
     * Header Scroll Effect
     * Adds/removes 'scrolled' class to header based on scroll position.
     */
    const header = document.querySelector('.js-header');
    if (header) {
        const scrollThreshold = 30; // Pixels down before applying 'scrolled' class
        let isScrolled = false;

        const handleHeaderScroll = () => {
            const shouldBeScrolled = window.scrollY > scrollThreshold;
            if (shouldBeScrolled !== isScrolled) {
                isScrolled = shouldBeScrolled;
                header.classList.toggle('scrolled', isScrolled);
            }
        };

        // Throttle the scroll event listener for better performance
        window.addEventListener('scroll', throttle(handleHeaderScroll, 100), { passive: true });
        // Initial check in case the page loads already scrolled down
        handleHeaderScroll();
    } else {
        console.warn("Header element '.js-header' not found.");
    }

    /**
     * Mobile Navigation Toggle
     * Handles opening/closing the mobile menu and preventing body scroll.
     */
    const spNavButton = document.querySelector('.js-spnav');
    const spNavContents = document.querySelector('.js-spnavContents');
    const body = document.body; // Cache body element

    if (spNavButton && spNavContents) {
        spNavButton.addEventListener('click', () => {
            const isActive = spNavButton.classList.toggle('active');
            spNavContents.classList.toggle('active');
            spNavButton.setAttribute('aria-expanded', isActive); // Update accessibility state
            body.classList.toggle('no-scroll', isActive); // Toggle body scroll lock class (needs CSS)
        });

        // Close mobile menu if a link inside it is clicked (useful for single-page apps or #hash links)
        spNavContents.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 if (spNavButton.classList.contains('active')) {
                    // Simulate click to close menu
                    spNavButton.click();
                 }
            });
        });
    } else {
         console.warn("Mobile navigation elements ('.js-spnav' or '.js-spnavContents') not found.");
    }

    /**
     * Hero Section Typing Animation (Typed.js)
     * Initializes the typing effect for the main headline.
     */
    if (typeof Typed !== 'undefined') { // Check if Typed.js library is loaded
        const typingElement = document.querySelector('.js-typingTextMv');
        if (typingElement) {
            try {
                // Initialize Typed.js
                new Typed('.js-typingTextMv', {
                    strings: ['Virtual Platforms', 'Spatial Analytics', 'Seamless Integration', 'Mobispace Solutions'], // Customize these strings
                    typeSpeed: 55,         // Speed of typing in ms
                    backSpeed: 25,         // Speed of backspacing
                    backDelay: 2000,       // Pause before backspacing
                    loop: true,            // Loop the animation
                    smartBackspace: true,  // Only backspace what doesn't match
                    cursorChar: '▍',       // Cursor character
                    autoInsertCss: true    // Let Typed.js inject basic cursor CSS
                });
            } catch (e) {
                // Log error and provide fallback
                console.error("Typed.js initialization failed:", e);
                if(typingElement) typingElement.textContent = 'Mobispace'; // Display static text if Typed fails
            }
        } else {
            console.warn("Typing target element '.js-typingTextMv' not found.");
        }
    } else {
        console.warn("Typed.js library not found. Typing animation disabled.");
         // Fallback if Typed.js doesn't load at all
         const typingElement = document.querySelector('.js-typingTextMv');
         if(typingElement) typingElement.textContent = 'Mobispace';
    }

    /**
     * Service Section Slider (SwiperJS)
     * Initializes the services carousel.
     */
    if (typeof Swiper !== 'undefined') { // Check if Swiper library is loaded
        const swiperContainer = document.querySelector('.js-topServiceSlider');
        if (swiperContainer) {
            console.log("Swiper container found:", swiperContainer);
            // Check if there are actually slides inside the container
            if (swiperContainer.querySelectorAll('.swiper-slide').length > 0) {
                console.log("Swiper slides found, attempting initialization...");
                try {
                    // Initialize Swiper
                    const swiperInstance = new Swiper('.js-topServiceSlider', {
                        loop: false,            // Set to true if you want infinite looping
                        slidesPerView: 1,       // Slides visible on mobile
                        spaceBetween: 25,       // Space between slides on mobile
                        grabCursor: true,       // Show grab cursor on hover

                        // Responsive settings
                        breakpoints: {
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            // when window width is >= 1024px
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40
                            }
                        },

                        // Navigation arrows
                        navigation: {
                            nextEl: '.swiper-button-next.-topService',
                            prevEl: '.swiper-button-prev.-topService',
                        },

                        // Pagination
                        pagination: {
                            el: '.swiper-pagination.-topService',
                            type: 'progressbar', // Or 'bullets'
                        },

                        // Accessibility & Keyboard Navigation
                        keyboard: {
                            enabled: true,
                            onlyInViewport: true, // Only enable when slider is visible
                        },

                        // Performance & Reliability
                        watchOverflow: true,      // Disable nav/pagination if not enough slides to scroll
                        observer: true,         // Re-initialize Swiper if container size changes
                        observeParents: true,   // Re-initialize Swiper if parent size changes
                        observeSlideChildren: true, // Re-initialize Swiper if slide children change

                        // Optional: Lazy loading (requires adding 'swiper-lazy' class and data-src to images)
                        // preloadImages: false,
                        // lazy: {
                        //     loadPrevNext: true,
                        // },
                    });
                    console.log("Swiper initialized successfully:", swiperInstance);

                } catch (e) {
                    // Log any errors during Swiper initialization
                    console.error("Swiper initialization failed:", e);
                }
            } else {
                console.warn("Swiper container found, but no '.swiper-slide' elements were inside it.");
                // Optionally hide controls if no slides found
                 const controls = swiperContainer.parentElement.querySelectorAll('.swiper-button-prev, .swiper-button-next, .swiper-pagination');
                 controls.forEach(el => el.style.display = 'none');
            }
        } else {
            console.warn("Swiper container element '.js-topServiceSlider' not found.");
        }
    } else {
        console.warn("Swiper library not found. Service slider disabled.");
    }

    /**
     * Back to Top Button Logic
     * Shows/hides the button based on scroll position and scrolls to top on click.
     */
    const toTopButton = document.querySelector('.js-toTop');
    if (toTopButton) {
        const scrollThreshold = 400; // Pixels down before showing button
        let isVisible = false;

        const handleScrollTopVisibility = () => {
            const shouldBeVisible = window.scrollY > scrollThreshold;
            if (shouldBeVisible !== isVisible) {
                isVisible = shouldBeVisible;
                toTopButton.classList.toggle('visible', isVisible); // Toggle visibility class
            }
        };

        // Throttle the scroll check for performance
        window.addEventListener('scroll', throttle(handleScrollTopVisibility, 150), { passive: true });

        // Scroll to top smoothly on click
        toTopButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Initial check in case page loads scrolled down
        handleScrollTopVisibility();
    } else {
        console.warn("Back to Top button '.js-toTop' not found.");
    }

    /**
     * Initialize AOS (Animate On Scroll)
     * Triggers animations on elements as they enter the viewport.
     */
     if (typeof AOS !== 'undefined') { // Check if AOS library is loaded
        try {
            AOS.init({
                duration: 800,              // Duration of animation in milliseconds
                easing: 'ease-out-cubic',   // Animation timing function
                once: true,                 // Whether animation should happen only once
                offset: 80,                 // Offset (in px) from the original trigger point
                // disable: 'mobile'        // Optionally disable animations on mobile devices
            });
            console.log("AOS initialized successfully.");
        } catch(e) {
            console.error("AOS initialization failed:", e);
        }
     } else {
         console.warn("AOS library not found. Scroll animations disabled.");
     }

    /**
     * Update Footer Year
     * Automatically sets the current year in the footer copyright.
     */
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    } else {
        console.warn("Footer year element '#footer-year' not found.");
    }

    // --- End of DOMContentLoaded ---
});