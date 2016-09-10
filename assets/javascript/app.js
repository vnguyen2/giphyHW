
var animalList= ['sheep', 'dogs', 'bears']; 
var key = 'dc6zaTOxFJmzC';

//create buttons from the animalList array
function renderButtons(){ 

    $('#animalButtons').empty();

    for (var i = 0; i < animalList.length; i++){

        var a = $('<button>') 
        a.addClass('animal');
        a.attr('data-name', animalList[i]);
        a.text(animalList[i]); 
        $('#animalButtons').append(a); 
    }
}

//adding additional animals to array
$('#addAnimal').on('click', function(){

    if($('#animal-input').val() != "") {

        var animalNew = $('#animal-input').val().trim();

        animalList.push(animalNew);
            
        renderButtons();

        $('#animal-input').val("");
    }

    return false;
})

//function to display animated gif

function displayAnimalGif() {

    var animal = $(this).attr('data-name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + key + "&limit=10";
    console.log(animal);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function(response) {

            console.log(response)

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $('<div>').addClass('animalContainer');
                var p = $('<p>').text("Rating: " + results[i].rating);
                var animalImage = $('<img>');
                
                animalImage.attr('src', results[i].images.fixed_height_still.url);
                //adding attr to handle still/animate gifs
                animalImage.attr('data-state', 'still');
                animalImage.attr('data-animate', results[i].images.fixed_height.url);
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.addClass('animalGif')
        
                animalDiv.append(p);
                animalDiv.append(animalImage);

                $('#animals').prepend(animalDiv);
                    
            }

        });
}

//checking data attr to determine whether to animate or make the gif still
function animateGif() {
    var state = $(this).attr('data-state'); 
    console.log(state);
    if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
}

$(document).on('click', '.animal', displayAnimalGif);

$(document).on('click', '.animalGif', animateGif); 

renderButtons();