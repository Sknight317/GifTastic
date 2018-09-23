// variable called topics with an array of strings 
var topics = ["France", "England", "Italy", "Guam", "Japan", "Greece"]

for (i = 0; i < topics.length; i++) {
    var topicsbtn = $("<button>");
    topicsbtn.addClass("button-display");
    topicsbtn.attr("data-place", topics[i]);
    topicsbtn.text(topics[i]);
    $("#buttons").append(topicsbtn);
}

$(".button-display").on("click", function() {

    var place = $(this).attr("data-place");
    //variable set to the api and api key
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
            //Creating a variable called p and adding a p tag. Changing the text of the p tag to display the rating of the image
            var p = $("<p>").text("Rating: " + rating).addClass("text");
            // Creating a variable and setting it equal to an image element
            var placeImage = $("<img>");
            //Adding an attribute to the images
            placeImage.attr("src", results[i].images.fixed_height.url);
            // prepending the p tag to the gifDiv
            gifDiv.prepend(placeImage);
            // prepending the placeImage to the gifDiv
            gifDiv.prepend(p);
            // Adding a class to the gifdiv
            gifDiv.addClass("imagediv");
            //prepending each gifDiv to the images container
            $("#images").prepend(gifDiv);
          }
        });
    });