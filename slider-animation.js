document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-popup-home'); // Selects all elements with the class 'slide-popup-home'
    const sliderContainer = document.querySelector('.slider-popup-home') || document.querySelector('.mask-popup-home'); // Selects the slider container or the mask container
    let animationApplied = false; // Flag to track if the animation has been applied

    // Check if the slider container or slides are found
    if (!sliderContainer || slides.length === 0) {
        console.error('No slider container found or there are no slides'); // Logs an error if no slides or container is found
        return; // Exits the function if no slides or container are present
    }

    function prepareAndAnimateSlides() {
        if (animationApplied) return; // Prevents reapplying the animation if it has already been applied

        slides.forEach((slide, index) => {
            // Force the initial state
            slide.style.transition = 'none'; // Disables transitions for initial setup
            slide.style.opacity = '0'; // Sets initial opacity to 0 (invisible)
            slide.style.transform = 'translateX(100%)'; // Moves the slide out of view to the right
            
            // Force a reflow
            void slide.offsetWidth; // Triggers a reflow to ensure the styles are applied immediately

            // Set up the animation
            setTimeout(() => {
                slide.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out'; // Defines the transition properties
                slide.style.opacity = '1'; // Sets opacity to 1 (fully visible)
                slide.style.transform = 'translateX(0)'; // Moves the slide back into view
                console.log(`Animation applied to slide ${index + 1}`); // Logs which slide has been animated
            }, 50 + index * 100); // Small initial delay plus staggered timing based on the index
        });

        animationApplied = true; // Sets the flag to true after animations are applied
    }

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animationApplied) { // Checks if the slider container is visible and no animation has been applied
            console.log('Slide section visible, starting animation'); // Logs that the slide section is visible
            prepareAndAnimateSlides(); // Calls the function to prepare and animate the slides
            observer.disconnect(); // Stops observing once the animation starts
        }
    }, { threshold: 0.1 }); // Sets the threshold for when the observer callback should be triggered

    observer.observe(sliderContainer); // Starts observing the slider container
});
