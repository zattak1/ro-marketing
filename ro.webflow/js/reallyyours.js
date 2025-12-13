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
            } else {
                $text.removeClass('collapsed').addClass('expanded');
                $button.attr('aria-expanded', 'true');
                $button.find('.toggle-text').text('Read less');
            }
        });
    });
})();
  