var sports = ["baseball", "football", "basketball", "soccer"];

function displayGif() {
	$(".gif-view").empty();
	var sport = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=f241e457e606453891a30c097ff16e6c&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		// $(".gif-view").append("<div class='gif-display'>");
		// trying to create a variable for the gif
		for (i = 0; i < response.data.length; i++) {
			var gifObject = response.data[i];
			var animatedGif = gifObject.images.fixed_height.url;
			var pausedGif = gifObject.images.fixed_height_still.url;
			var ratingGif = gifObject.rating;
			$(".gif-view").append("<div class='gif-display'>");
			var gifHeader = $("<h3>").text("Rating: " + ratingGif).addClass("rating-header");
			var gif = $("<img>").attr("src", pausedGif).attr("data-paused", pausedGif).attr("data-animated", animatedGif).addClass("gif-hover");
			$(".gif-display").last().append(gifHeader, gif);
			console.log(pausedGif);
		}
	});
}

function renderButtons() {
	$("#buttons-view").empty();

	for (var i = 0; i < sports.length; i++) {
		var a = $("<button>");
		a.addClass("sport");
		a.attr("data-name", sports[i]);
		a.text(sports[i]);
		$("#buttons-view").append(a);
	}
}

$(".add-sport").on("click", function(event) {
	event.preventDefault();
	var sport = $(".searchForm").val().trim();
	if (sports.indexOf(sport.toLowerCase()) === -1) {
		sports.push(sport.toLowerCase());
		alert("true");
		renderButtons();
	}
});

$(document).on("click", ".sport", displayGif);
$(document).on("mouseover", ".gif-hover", function() {
	$(this).attr("src", $(this).data("animated"));
});
$(document).on("mouseleave", ".gif-hover", function() {
	$(this).attr("src", $(this).data("paused"));
});
renderButtons();
