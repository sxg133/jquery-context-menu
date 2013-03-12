(function( $ ) {

	var methods = {};
	// initialize context menu
	methods.init = function(options) {
		// create menu context menu and attach to body
		var menu = document.createElement('div');
		if (options.id) {
			menu.id = options.id;
		}
		if (options.items) {
			methods.attach.call(this.get(), options.items, menu);
		}
		$(menu).hide().addClass('context-menu').appendTo('body');

		// bind onmousedown to document so we can hide all menus
		if (!window.bindedclick) {
			window.onclick = function() {
				$('.context-menu').hide();
			}
			window.bindedclick = true;
		}

		// attach oncontextmenu event
		return this.each(function() {
			$(this).data('menu', menu);
			this.oncontextmenu = function(e) {
				var contextmenu = $($(this).data('menu'));
				contextmenu.data('last-clicked', this);
				contextmenu.css('left', e.pageX).css('top', e.pageY).show();
				e.preventDefault();
			}
		});
	}
	// attach new items to menu
	methods.attach = function(items, menu) {
		// allow for arrays or single object
		if (!(items instanceof Array)) {
			items = [items];
		}
		// passed in menu for other functions in plugin
		if (!menu) {
			var menu = $(this).data('menu');
		}

		var createClick = function(func, elem) {
			return function() { 
				var contextmenu = $(elem).data('menu');
				var clicked = $(contextmenu).data('last-clicked');
				func.call( clicked );
			};
		}

		// create menu item divs
		var menuitems = [];
		for (var i=0, ii=items.length; i<ii; i++) {
			var curitem = items[i];
			var menuitem = document.createElement('div');
			menuitem.innerHTML = curitem.label;
			menuitem.onclick = createClick(curitem.action, this);
			$(menuitem).addClass('context-menu-item');
			menuitems.push(menuitem);
		}
		$(menu).append(menuitems);
		return this;
	}
	// remove item from menu
	methods.detach = function(items) {
		// allow single item removal or array
		if (typeof items === 'string') {
			items = [items];
		}
		var menu = $(this).data('menu');
		for (var i=0, ii=items.length; i<ii; i++) {
			var menuitems = $(menu).children();
			for(var j=menuitems.length-1; j>=0; j--) {
				if (menuitems[j].innerHTML == items[i]) {
					$(menuitems[j]).remove();
				}
			}
		}
		return this;
	}
	
	$.fn.contextmenu = function(method) {
		if ( methods[method] ) {	// specific method called
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
		} else if (typeof method === 'object' || !method) {	// init
			return methods.init.apply(this, arguments);
		} else {
			$.error('No method ' + method + ' for jQuery context menu.');
		}
	}

}) ( jQuery );