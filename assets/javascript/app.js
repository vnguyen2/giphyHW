
var giphyList= ['football', 'yoda', 'fail']; 
var key = 'dc6zaTOxFJmzC';

//create buttons from the giphyList array
function renderButtons(){ 

    $('#giphyButtons').empty();

    for (var i = 0; i < giphyList.length; i++){
        var a = $('<button>') 
        a.addClass('giphy');
        a.attr('data-name', giphyList[i]);
        a.text(giphyList[i]); 
        $('#giphyButtons').append(a); 
    }
}
//adding additional gifs to array
$('#addGiphy').on('click', function(){

    if($('#giphy-input').val() != "") {

        var giphyNew = $('#giphy-input').val().trim();

        giphyList.push(giphyNew);
            
        renderButtons();

        $('#giphy-input').val("");
    }

    return false;
})

//function to display animated gif
function displayGiphyGif() {

    var giphy = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=" + key + "&limit=10";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function(response) {

            console.log(response)

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var giphyDiv = $('<div>').addClass('giphyContainer');
                
                var rating = results[i].rating;
                if(rating == "") rating = 'N/A';
                
                var p = $('<p>').text("Rating: " + rating);
                    p.addClass('rating');
                var giphyImage = $('<img>');
        
                giphyImage.attr('src', results[i].images.fixed_height_still.url);
                //adding attr to handle still/animate gifs
                giphyImage.attr('data-state', 'still');
                giphyImage.attr('data-animate', results[i].images.fixed_height.url);
                giphyImage.attr('data-still', results[i].images.fixed_height_still.url);
                giphyImage.addClass('giphyGif');
                giphyDiv.append(p);
                giphyDiv.append(giphyImage);

                $('#giphys').prepend(giphyDiv);               
            }
        });
}
//checking data attr to determine whether to animate or make the gif still
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

$(document).on('click', '.giphy', displayGiphyGif);

$(document).on('click', '.giphyGif', animateGif); 

renderButtons();