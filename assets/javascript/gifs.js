var topics = ['Arya Stark','Bronn','Daenarys Targaryen','Dragons','Jon Snow','Jaime Lannister','Tyrion Lannister','Tywinn Lannister'];

// Function to display GIFS once data has been retrieved
function displayGIFs() {
    // Empties GIF section
    $('#gifs').empty();
    // Create a userTopic variable from the search field
    var userTopic = $(this).data('name');
    // Create a queryURL to search GIPHY API for user's search term
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=game+of+thrones+' + userTopic + 
    '&api_key=vdcP3rWSIC7Dq5JshDOurRl6sHCU0PWF&limit=15';
    // AJAX Call to GIPHY API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // For Loop to Populate 15 Gifs
    for (var i=0; i < response.data.length;i++){    
        // Create a div to hold the image
        var gifDiv = $('<div>');
        // Add class to Div
        gifDiv.addClass('gif-container');
        // Create an img tag
        var gifImg = $('<img>');
        // Add class to GIF
        gifImg.addClass('gif');
        // URL for Image Source
        gifImg.attr('src', response.data[i].images.fixed_height_still.url);
        // URL for Data Still State
        gifImg.attr('data-still', response.data[i].images.fixed_height_still.url);
        // URL for Data Animate State
        gifImg.attr('data-animate', response.data[i].images.fixed_height.url);
        // Setting the Default State
        gifImg.attr('data-state','still');
        // Create paragraph for rating
        var rating = $('<p>').text('Rating: '+ response.data[i].rating.toUpperCase());
        // Add class to rating
        rating.addClass('rating');

        // Append gifImg and rating to gifDiv
        gifDiv.append(gifImg);
        gifDiv.append(rating);

        // Prepend to HTML
        $('#gifs').prepend(gifDiv);
    }
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

// Onclick Function to Animate GIFs
// This part was so tough for me, I still don't fully understand it sometimes
$('#gifs').on('click', ".gif", function(){

    // Variable State Assigned to Data State of Clicked Gif
    var state = $(this).attr('data-state');
    // Troubleshoot State
    console.log($(this));
    // Troubleshoot Current State
    // console.log(state);
    // If The Gifs State is "Still", Change it to "Animate" When Clicked
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');  
    // If The Gifs State is "Animated", Change it to "Still" When Clicked
    } else {
      $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
    } 
  });

// Call renderButtons function to display the initial topics array
renderButtons();

// Calls Function for Displaying Gifs When a Button is Clicked
$(document).on("click", ".topics-button", displayGIFs);

// The End, Hallelujah