var topics = ['Arya Stark','Bronn','Daenarys Targaryen','Dragons','Jon Snow','Jaime Lannister','Tyrion Lannister','Tywinn Lannister'];

// Hides the #Gifs Div to keep border from showing when no content is present
$(document).ready(function() {
    $('#gifs').hide();
})

// Function to display GIFS once data has been retrieved
function displayGIFs() {
    // Empties GIF section
    // $('#gifs').empty();
    // Create a userTopic variable from the search field
    var userTopic = $(this).data('name');
    // Create a queryURL to search GIPHY API for user's search term
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=game+of+thrones+' + userTopic + '&api_key=vdcP3rWSIC7Dq5JshDOurRl6sHCU0PWF&limit=15';
    // AJAX Call to GIPHY API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (i = 0; i < response.data.length;i++) {
            // Create a div for each GIF
            var gifDiv = $('<div>');
            // Adding class and attributes to gifDiv
            gifDiv.addClass('gif-container');
            // Create an img element for gif
            var gifImg = $('<img>');
            // URL for still GIF
            gifImg.attr('data-still',response.data[i].images.fixed_height_still.url);
            // URL for animated GIF
            gifImg.attr('data-animate',response.data[i].images.fixed_height.url);
            // Set default Data State
            gifImg.attr('data-state', 'still');
            // Original source of GIF
            gifImg.attr('src',response.data[i].images.fixed_height.url);
            // Create paragraph for rating
            var rating = $('<p>').text('Rating: '+ response.data[i].rating.toUpperCase());
            // Add class to rating
            rating.addClass('rating');
            // Append gifImg and rating to the gifDiv
            gifDiv.append(gifImg);
            gifDiv.append(rating);
            // Prepend to HTML
            $('#gifs').prepend(gifDiv);
        }
        // Show Gifs Div
        $('#gifs').show();
    })
};

// Function to display initial array of topics as buttons
function renderButtons() {
    // Empty the gifs before adding more to it.
    $('#buttons').empty();
    // Loop through the topics array
    for (i = 0; i < topics.length; i++) {
        // Create a button to hold topics data
        var newButton = $('<button>');
        // Adds class to the button
        newButton.addClass('topics-button');
        // Add data attribute for the displayGIFs function
        newButton.attr('data-name', topics[i]);
        // Button text
        newButton.text(topics[i]);
        // Add button to HTML
        $('#buttons').append(newButton);
    }
}

// Button onclick function - Adding Topics
$('#add-topic').on('click', function() {
    // Prevents button from submitting page.
    event.preventDefault();
    // User input variable
    var searchTerm = $('#topic-input').val().trim();
    // Perform renderButtons function unless field is blank
    if (searchTerm === '') {
        alert('Please enter a Game-of-Thrones-related topic!');
    } else {
        topics.push(searchTerm);
        renderButtons();
    }
    // Empty the text box
    $('topic-input').val('');
});

// Function to Animate GIFs by click event
$('#gifs').on('click','.gif-container',function() {
    // State to determine whether the img is currently animated or not
    var state = $(this).attr('data-state');
    console.log(state)
    // Determining state
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
    }
});


// Call renderButtons function to display the initial topics array
renderButtons();

// Calls Function for Displaying Gifs When a Button is Clicked
$(document).on("click", ".topics-button", displayGIFs);