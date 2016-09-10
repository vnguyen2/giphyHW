
var animalList= ['chickens', 'dogs', 'bears']; 
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

    var animalNew = $('#animal-input').val().trim();

    animalList.push(animalNew);
        
    renderButtons();

    $('#animal-input').val("");

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

                var animalDiv = $('<div>');
                var p = $('<p>').text("Rating: " + results[i].rating);
                var animalImage = $('<img>');
                
                animalImage.attr('src', results[i].images.original_still.url);
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

function animateGif() {
    var state = $(this).attr('data-state'); 

    if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
}

$(document).on('click', '.animal', displayAnimalGif);
//clicking image if still will display the animated gif animatednd vice versa
$(document).on('click', 'animalGif', animateGif); 


renderButtons();