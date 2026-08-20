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
  
// ro#258: stills sliders -- scroll-snap carousels replacing the feature GIFs.
// Dots + gentle auto-advance; auto-advance only while on screen, stops for
// good on any user interaction, and never runs under prefers-reduced-motion.
(() => {
    const init = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        document.querySelectorAll('.still-slider').forEach((slider) => {
            const track = slider.querySelector('.still-slider-track');
            const slides = track ? Array.from(track.children) : [];
            if (slides.length < 2) return;

            let timer = null;
            const stop = () => { clearInterval(timer); timer = null; };
            const pause = () => { stop(); slider.dataset.paused = '1'; };

            const dots = document.createElement('div');
            dots.className = 'still-slider-dots';
            slides.forEach((_, i) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'still-slider-dot' + (i === 0 ? ' active' : '');
                b.setAttribute('aria-label', 'Go to slide ' + (i + 1) + ' of ' + slides.length);
                b.addEventListener('click', () => {
                    pause();
                    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
                });
                dots.appendChild(b);
            });
            slider.appendChild(dots);

            const current = () => Math.round(track.scrollLeft / track.clientWidth);
            track.addEventListener('scroll', () => {
                const i = current();
                dots.querySelectorAll('.still-slider-dot').forEach((d, j) => {
                    d.classList.toggle('active', j === i);
                });
            }, { passive: true });

            ['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach((ev) => {
                track.addEventListener(ev, pause, { passive: true });
            });

            new IntersectionObserver((entries) => {
                entries.forEach((e) => {
                    if (!e.isIntersecting || reduceMotion.matches || slider.dataset.paused) {
                        stop();
                    } else if (!timer) {
                        timer = setInterval(() => {
                            track.scrollTo({
                                left: ((current() + 1) % slides.length) * track.clientWidth,
                                behavior: 'smooth'
                            });
                        }, 3500);
                    }
                });
            }, { threshold: 0.4 }).observe(slider);
        });
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
