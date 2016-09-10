
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

    var animal = $('#animal-input').val().trim();

    animalList.push(animal);
        
    renderButtons();

    $('#animal-input').val("");

    return false;
})

//on click to grab data from button and display the gif
$('.animal').on('click', function() {
        var animal = $(this).data('animal');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

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
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.addClass('animalGif');

                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#animals').append(animalDiv);
                    
                }

            });
});

// $(document).on('click', '.animal', displayAnimalGif);

//clicking image if still will display the animated gif and vice versa
$('.animalGif').on('click', function(){

	var state = $(this).attr('data-state'); 

	if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
});

renderButtons();