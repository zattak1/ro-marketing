(() => {
    $(function() {
        // Collapsible manifesto functionality
        $(document).on('click', '.manifesto-toggle', function() {
            console.log('manifesto-toggle clicked');
            const $text = $('.manifesto-text');
            const $button = $(this);
            const isExpanded = $button.attr('aria-expanded') === 'true';
            
            if (isExpanded) {
                $text.removeClass('expanded').addClass('collapsed');
                $button.attr('aria-expanded', 'false');
                $button.find('.toggle-text').text('Read more');
                // Scroll to top of manifesto container
                const $container = $('.manifesto-container');
                $('html, body').animate({
                    scrollTop: $container.offset().top - 100 // 100px offset from top
                }, 500);
            } else {
                $text.removeClass('collapsed').addClass('expanded');
                $button.attr('aria-expanded', 'true');
                $button.find('.toggle-text').text('Read less');
            }
        });

        // Hero video - start on scroll or after 1 second, whichever comes first
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            let videoStarted = false;

            const startVideo = function() {
                if (videoStarted) return;
                videoStarted = true;
                heroVideo.play().catch(function(error) {
                    console.log('Video autoplay prevented:', error);
                });
                // Clean up listeners
                window.removeEventListener('scroll', onScroll);
                clearTimeout(timeoutId);
            };

            const onScroll = function() {
                startVideo();
            };

            // Start on scroll
            window.addEventListener('scroll', onScroll, { once: true });

            // Or start after 1 second
            const timeoutId = setTimeout(startVideo, 1000);

            // Loop manually with a 2-second pause between plays
            // (the native `loop` attribute restarts with no gap)
            heroVideo.addEventListener('ended', function() {
                setTimeout(function() {
                    heroVideo.currentTime = 0;
                    heroVideo.play().catch(function(error) {
                        console.log('Video replay prevented:', error);
                    });
                }, 2000);
            });
        }

        // Open source learn-more modal
        const modal = document.getElementById('openSourceModal');
        const openBtn = document.getElementById('openSourceLearnMore');
        if (modal && openBtn && typeof modal.showModal === 'function') {
            openBtn.addEventListener('click', function() {
                modal.showModal();
            });
            modal.querySelector('.open-source-modal-close').addEventListener('click', function() {
                modal.close();
            });
            // Close when clicking the backdrop
            modal.addEventListener('click', function(e) {
                if (e.target === modal) modal.close();
            });
        }
    });
})();
  