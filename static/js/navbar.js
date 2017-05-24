//function for dropdown nav inspired by Jerbo06 on Bootsnipp
// This function Allows for a text placeholder to display on pageload, then change when list item is selected- effectively
//  replacing the origional text with the new text so that the user can identify which century he is searching.
$(function(){
	$(window).resize(function(){
		$('ul').css('max-height', ($(window).height() - $('ul').offset().top) + 'px');
	});
});

$(document).on('click', '.navbar', function (e) {
	e.preventDefault();
	var ul = $(this).find("ul");
	if ($(this).hasClass("active")) {
		if (ul.find("li").is(e.target)) {
			var target = $(e.target);
			target.addClass("selected").siblings().removeClass("selected");
			var value = target.html();
			$(this).find(".select").val(value);
			$(this).find(".value").html(value);
		}
		ul.hide();
		$(this).removeClass("active");
	}
	else {
		$('.navbar').not(this).each(function () {
			$(this).removeClass("active").find("ul").hide();
		});
		ul.slideDown(300);
		$(this).addClass("active");
	}
});