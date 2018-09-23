// variable called topics with an array of strings 
var topics = ["France", "England", "Italy", "Guam", "Japan", "Greece"]

for (i = 0; i < topics.length; i++) {
    var topicsbtn = $("<button>");
    topicsbtn.addClass("button-display");
    topicsbtn.text(topics[i]);
    $("#buttons").append(topicsbtn);
}

$(".button-display").on("click", function() {

    //variable set to the api and api key
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=2oXigIBYtAC0LfUzZI2oRPnCWUCUQ2ng";

    //using ajax to get the api
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    //getting the response from the url
      .then(function(response) {
          console.log(response);

      // setting a variable to get exactly what you want from the api
        var imageUrl = response.data.image_original_url;

        // setting a variable to create a new image
        var placeImage = $("<img>");

        // Adding an attribute with jquery to the response from the api (showing the image, and then adding an alternate)
        placeImage.attr("src", imageUrl);
        placeImage.attr("alt", "place image");

        // putting the next image before each one
        $("#images").prepend(placeImage);
      });
  });