(() => {
    $(function() {
        $("#myDialog").dialog({
          autoOpen: false,
          show: {
            effect: "fade",
            duration: 500
          },
          hide: {
            effect: "explode",
            duration: 500
          },
          width: $(window).width(),
          height: $(window).height(),
          open: function(event, ui) {
            $('body').css('overflow', 'hidden'); // Prevents scroll on the body
          },
          close: function(event, ui) {
              $('body').css('overflow', 'auto'); // Re-enables scroll on the body
          }
        });

        document.getElementById('toggleButtonGroup').addEventListener('click', function(event) {
          
          // Ensure that one of the buttons was clicked
          if (event.target.id == "community") {
            $("#benefits-creator").css("display", "none");
            $("#features-creator").css("display", "none");

            $("#benefits-community").css("display", "block");
            $("#features-community").css("display", "block");
          }

          if (event.target.classList.contains('toggle-button')) {
              
              // Get all buttons
              var buttons = document.querySelectorAll('.toggle-button');
              
              // Reset all buttons to inactive state
              buttons.forEach(function(button) {
                  button.classList.remove('active');
              });
      
              // Set the clicked button to active state
              event.target.classList.add('active');
          }

          $("#myDialog").dialog("close");
          $('html, body').animate({
            scrollTop: $('#benefits').offset().top
          }, 1000);  // 1000 is the duration in milliseconds

        });
        
        var dialogOpened = false;
    
        $(window).scroll(function() {
            var targetOffset = $("#benefits").offset().top;
            var windowHeight = $(window).height();
            var scrollPosition = $(this).scrollTop();
    
            if (!dialogOpened && scrollPosition + windowHeight > targetOffset) {
              $("#myDialog").dialog("open");
              dialogOpened = true; // Prevent dialog from opening multiple times
            }
        });
    });
})();
  