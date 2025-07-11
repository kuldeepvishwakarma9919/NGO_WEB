// Add this to your existing js/script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS library (keep this as it is)
    AOS.init({
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 120,
        delay: 0,
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });

    // Smooth scrolling for anchor links (keep this as it is)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Gallery Load More Functionality ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const itemsPerPage = 4; // Number of items to show initially and load more
    let visibleItems = itemsPerPage;

    // Initially hide all items beyond the first set
    for (let i = itemsPerPage; i < galleryItems.length; i++) {
        galleryItems[i].classList.add('hidden-gallery-item');
    }

    // Check if there are more items to hide initially
    if (galleryItems.length <= itemsPerPage) {
        if (loadMoreBtn) {
             loadMoreBtn.style.display = 'none'; // Hide button if all items are visible
        }
    }


    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show the next set of hidden items
            for (let i = visibleItems; i < visibleItems + itemsPerPage; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].classList.remove('hidden-gallery-item');
                    // Manually trigger AOS animation for newly revealed items
                    AOS.refreshHard(); // Recalculate all positions and animate
                }
            }
            visibleItems += itemsPerPage;

            // Hide button if all items are now visible
            if (visibleItems >= galleryItems.length) {
                loadMoreBtn.style.display = 'none';
                document.getElementById('load-more-container').remove(); // Remove the entire container
            }
        });
    }


    // --- Lightbox Configuration ---
    // Make sure Lightbox is initialized AFTER DOMContentLoaded
    // Lightbox's default behavior is to auto-initialize on window.load.
    // However, if you add dynamic content, you might need to re-initiate
    // For this setup, simply including the JS will usually be enough.
    // If issues arise with dynamically loaded images, consider:
    // lightbox.option({
    //     'resizeDuration': 200,
    //     'wrapAround': true
    // })

});