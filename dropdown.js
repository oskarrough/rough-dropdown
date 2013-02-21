// Make sure it works without javascript
$('.no-js').removeClass('no-js');


var $nav = $('#js-rough-dropdown');
var $dropdowns = $nav.find('li:has("ul")').addClass('has-dropdown').children('a');

// Prevent default click
$dropdowns.click(function(event){
	event.preventDefault();

	// … and toggle dropdown instead
	toggleDropdown( $(this).parent() );
});

// Close dropdowns
function closeDropdown() {
	$nav.find('.has-dropdown').removeClass('is-open');

	// Unbind events
	$(document).off('keyup');
	$('html').off('click');
}

// Toggle the dropdown
function toggleDropdown(element) {
	var isActive = element.hasClass('is-open');
	closeDropdown();

	if (!isActive) {
		element.addClass('is-open');

		// Bind events to close the dropdown on ESC and click
		$(document).on('keyup', function(e) {
			if (e.keyCode == 27) {
				closeDropdown();
			}
		});
		$('html').on('click', function() {
			closeDropdown();
		});
		$nav.click(function(event){
			event.stopPropagation();
		});
	}
}
