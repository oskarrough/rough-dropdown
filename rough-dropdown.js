(function($){

	// Clickable dropdown
	function RoughDropdown(el, options) {

		//Defaults:
		this.defaults = {
			closeOnESC: true,
			closeOnClickOutside: true,
			//dropdownClass: 'has-dropdown',
			dropdownOpenClass: 'is-open'
		};

		//Extending options:
		this.opts = $.extend({}, this.defaults, options);

		//Privates:
		this.$el = $(el);
		this.$allDropdownParents = this.$el.find('li').has('ul');
		this.$dropdownParent;
	}

	// Separate functionality from object creation
	RoughDropdown.prototype = {

		init: function() {
			var _this = this;

			// Find <li> elements that have children <ul> and mark them
			//_this.$allDropdownParents.addClass(_this.opts.dropdownClass);

			// Prevent default click and bind to toggle the dropdown instead
			_this.$allDropdownParents.children('a').on('click', function(event){
				event.preventDefault();

				// Check if the dropdown is already active
				_this.$dropdownParent = $(this).parent();
				var isOpen = _this.$dropdownParent.hasClass(_this.opts.dropdownOpenClass);

				if (!isOpen) {
					_this.open();
				} else {
					_this.close();
				}
			});
		},

		// Open the dropdown
		open: function(element) {
			var _this = this;

			// Open the dropdown
			this.$dropdownParent.addClass(this.opts.dropdownOpenClass);
			
			// and enable the events
			_this.handleEvents();
		},

		//Close the dropdown
		close: function() {
			var _this = this;

			// Close the dropdown
			this.$dropdownParent.removeClass(this.opts.dropdownOpenClass);

			// and disable the  events
			$(document).off('keyup');
			$('html').off('click');
		},

		// Handle events
		handleEvents: function() {
			var _this = this;

			// Close on "ESC" click
			if (this.opts.closeOnESC) {
				$(document).on('keyup', function(e) {
					if (e.keyCode === 27) {
						_this.close();
					}
				});
			}

			// Close on click outside
			if (this.opts.closeOnClickOutside) {
				$('html').on('click', function() {
					_this.close();
				});
				
				// dont close if you click inside a <li> element
				this.$el.on('click', 'li', function(event){
					event.stopPropagation();
				});
			}
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