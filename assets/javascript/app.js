// variable called topics with an array of strings 
var topics = ["France", "England", "Italy", "Guam", "Japan", "Sierra Leone","Greece", "Brazil", "Croatia", "Colombia", "Spain", "Mexico", "Denmark", "Argentina", "Nigeria", "Germany", "Australia"]

// for loop to append a button for each item in the topics array
for (var i = 0; i < topics.length; i++) {
    var topicsbtn = $("<button>");
    topicsbtn.addClass("button-display");
    topicsbtn.attr("data-place", topics[i]);
    // Changing the text of each button to be the text from each item in the topics array
    topicsbtn.text(topics[i]);
    //Appending the buttons to the buttons div
    $("#buttons").append(topicsbtn);
}

// Calling the buttonclick function so that it runs
buttonClick();

//buttonClick function
function buttonClick() {
$(".button-display").on("click", function() {
  //Creating a variable called place
    var place = $(this).attr("data-place");
    //variable set to the api and api key; putting place variable inside the queryurl so that when the usually clicks on a button, the info gets pulled from the API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + place + "&api_key=2oXigIBYtAC0LfUzZI2oRPnCWUCUQ2ng&limit=10";

    
    //using ajax to get the api
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    //getting the response from the url
      .then(function(response) {
          console.log(response);

      // setting a variable to get exactly what you want from the api
        var results = response.data;

    //Creating a for loop to create a div for each place
        for (var i = 0; i < results.length; i++) {
            //creating a new div and setting it to a variable called gifDiv
            var gifDiv = $("<div>");
            // creating a variable and making it equal to the rating of whatever image gets displayed from the object
            var rating = results[i].rating;
            var Rating = rating.toUpperCase()
            // Creating a variable for the title
            var title = results[i].title;
            var Title = title.charAt(0).toUpperCase()+ title.slice(1)
            //Creating a variable called p and adding a p tag. Changing the text of the p tag to display the rating of the image
            var p = $("<p>").text("Rating: " + Rating).addClass("text");
            var titleTag = $("<p>").text("Title: " + Title).addClass("text");

            // Creating a variable and setting it equal to an image element
            var placeImage = $("<img>");
            //Adding an attribute to the images
            placeImage.attr("src", results[i].images.fixed_height_still.url);
            //Adding a data attribute for the still gif
            placeImage.attr("data-still", results[i].images.fixed_height_still.url); 
            //Adding a data attribute for the animated gif
            placeImage.attr("data-animate", results[i].images.fixed_height.url);
            placeImage.attr("data-state", 'still')
            placeImage.addClass("image");
            // prepending the placeImage to the gifDiv
            
            gifDiv.prepend(placeImage);
            
            gifDiv.prepend(p);
            gifDiv.prepend(titleTag);
            
            // Adding a class to the gifdiv
            gifDiv.addClass("imagediv");
            //prepending each gifDiv to the images container
            $("#images").prepend(gifDiv);
            // Adding a border style to the images div
            $("#images").css({ "border-style": "outset" });
             
          
           

          }
           

        });
    });
  }
  
    
  // onclick function for the dynamically created image divs 
    $(document).on("click", ".image", function() {
        var state = $(this).attr("data-state");
        // To change the gif from still to animate
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
      // onclick function for the submit button
      $("#submit").on("click", function(event) {
        //Prevents the automatic default; and prevents the page from automatically reloading
          event.preventDefault();
          //create a variable and set it equal to the information that is retreived from the submit button, when the user presses submit
          var placeinput = $("#placeInput").val().trim();
          console.log(placeinput);
        //Setting a varible equal to a new button
        var placebtn = $("<button>");
        placebtn.addClass("button-display");
        placebtn.attr("data-place", placeinput);
        placebtn.text(placeinput);
        // appending these buttons into the buttons div; this is going to happen when the user clicks submit
        $("#buttons").append(placebtn);
        //Calling the buttonClick function; so that when these new buttons are clicked; they will also retreive the information from the API
        buttonClick();
    });
      
