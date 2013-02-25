(function($){

	// Clickable dropdown
	function RoughDropdown(el, options) {

		//Defaults:
		this.defaults = {
			closeOnESC: true,
			closeOnClickOutside: true,
			dropdownClass: 'has-dropdown',
			dropdownOpen: 'is-open'
		};

		//Extending options:
		this.opts = $.extend({}, this.defaults, options);

		//Privates:
		this.$el = $(el);
	}

	// Separate functionality from object creation
	RoughDropdown.prototype = {

		init: function() {
			var _this = this;

			// @todo: Modernizr normally does this for us
			// and do we really need to support no js?
			$('.no-js').removeClass('no-js');

			// Find <li> elements that are dropdowns and mark them
			var $dropdowns = _this.$el.find('li').has('ul').addClass(_this.opts.dropdownClass);

			// Prevent default click
			$dropdowns.children('a').on('click', function(event){
				event.preventDefault();

				// find the dropdown to open
				var $element = $(event.currentTarget);
				// and do it
				_this.open( $element.parent() );
			});
		},

		// Open the dropdown
		open: function(element) {
			var _this = this;

			// Check if the dropdown is already active
			var isOpen = element.hasClass(this.opts.dropdownOpen);
			_this.close();

			if (!isOpen) {
				element.addClass(this.opts.dropdownOpen);
				_this.handleEvents();
			}
		},

		// Handle events
		handleEvents: function() {
			var _this = this;

			// Close on "ESC" click
			$(document).on('keyup', function(e) {
				if (e.keyCode == 27) {
					_this.close();
				}
			});

			// Close on click outside
			$('html').on('click', function() {
				_this.close();
			});
			this.$el.on('click', function(event){
				event.stopPropagation();
			});
		},

		//Close the dropdown
		close: function() {
			var _this = this;

			//this.$el.find(this.opts.dropdownClass).removeClass(this.opts.dropdownOpen);
			$openDropdowns = this.$el.find('.is-open');
			$openDropdowns.removeClass('is-open');

			// Unbind events
			$(document).off('keyup');
			$('html').off('click');
		}
	};

	// The actual plugin
	$.fn.roughDropdown = function(options) {
		if(this.length) {
			this.each(function() {
				var rev = new RoughDropdown(this, options);
				rev.init();
				$(this).data('roughDropdown', rev);
			});
		}
	};
})(jQuery);