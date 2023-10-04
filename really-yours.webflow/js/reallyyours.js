(() => {
    $(function() {

        document.getElementById('toggleButtonGroup').addEventListener('click', function(event) {
          
          // Ensure that one of the buttons was clicked
          if (event.target.id == "community") {
            $("#benefits-creator").css("display", "none");
            $("#features-creator").css("display", "none");
            $("#pricing-creator").css("display", "none");

            $("#benefits-community").css("display", "block");
            $("#features-community").css("display", "block");
            $("#pricing-community").css("display", "block");

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
          $("#main-content-select").css("display", "none");
          $("#main-content-container").fadeIn(1000);  
          $('html, body').animate({
            scrollTop: $('#benefits').offset().top
          }, 1000);  // 1000 is the duration in milliseconds
      
        });
        

    });
})();
  