
var animalList= ['chickens', 'dogs', 'bears']; 
var key = 'dc6zaTOxFJmzC';


//need to create data for animals in buttons
//grab input to create button from submit button



//on click to grab data from button and display the gif
$('button').on('click', function() {
        var animal = $(this).data('animal');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

                console.log(response)

                var results = response.data;
                //--------------------------------

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);

                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#animals').append(animalDiv);
                    
                }

            });
    });