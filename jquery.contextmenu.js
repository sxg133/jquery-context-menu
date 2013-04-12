(function($) {

	// constants for jQuery data (not using "const" keyword for IE compatibility)
	var DATA_KEY_MENU = 'menu', DATA_KEY_LAST_CLICKED = 'last-clicked';

	var settings = {
		contextMenuClass: 'context-menu',			// css class for context menus
		contextMenuItemClass: 'context-menu-item',	// css class for context menu items
		submenuClass: 'submenu',					// css class for submenu
		submenuItemClass: 'submenu-item',			// css class for submenu item
		hasSubmenuClass: 'has-submenu',				// css class for menu items that have submenus
	}

	// function creates the click event for a menu item or sub-menu item
	var createClick = function(func, elem) {
		return function(e) {
			var contextmenu = $(elem).data(DATA_KEY_MENU);
			var clicked = $(contextmenu).data(DATA_KEY_LAST_CLICKED);
			if (func) {
				func.call( clicked );
			}
		};
	}

	var methods = {};

	// initialize context menu
	methods.init = function(options) {

		// create menu context menu and attach to body
		var menu = document.createElement('div');

		// check if 'id' option is specified for menu
		if (options.id) {
			menu.id = options.id;
		}

		// set CSS classes for menu
		menu.className = (settings.contextMenuClass + ' ' + (options.className || '')).trim();

		// attach any initial items
		if (options.items) {
			methods.attach.call(this.get(), options.items, menu);
		}

		// hide menu and append to the body of the page
		$(menu).hide().appendTo('body');

		// bind click to window so we can hide all menus
		window.onclick = function() {
			$(menu).hide();
		}

		// attach oncontextmenu event
		return this.each(function() {
			var $this = $(this);
			$this.data(DATA_KEY_MENU, menu);
			this.oncontextmenu = function(e) {
				var $contextmenu = $($this.data(DATA_KEY_MENU));
				$contextmenu.data(DATA_KEY_LAST_CLICKED, this);
				$contextmenu.css('left', e.pageX).css('top', e.pageY).show();
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
			var menu = $(this).data(DATA_KEY_MENU);
		}

		// detach from parent for performance
		var $parent = $(menu).parent();
		$(menu).detach();

		// create menu item divs
		var menuitems = [];
		for (var i=0, ii=items.length; i<ii; i++) {
			var curitem = items[i];
			var menuitem = document.createElement('div');
			menuitem.innerHTML = curitem.label;
			menuitem.onclick = createClick(curitem.action, this);
			menuitem.className = (settings.contextMenuItemClass + ' ' + (curitem.className || '')).trim();
			menuitems.push(menuitem);
		}

		// add items to menu and reattach to parent
		$(menu).append(menuitems);
		$parent.append(menu);

		return this;
	}

	// remove item from menu
	methods.detach = function(items) {

		// allow single item removal or array
		if (typeof items === 'string') {
			items = [items];
		}

		// detach menu for performance
		var menu = $(this).data(DATA_KEY_MENU);
		var $parent = $(menu).parent();
		$(menu).detach();

		// remove menu items
		for (var i=0, ii=items.length; i<ii; i++) {
			var menuitems = $(menu).children();
			for(var j=menuitems.length-1; j>=0; j--) {
				if (menuitems[j].innerHTML == items[i]) {
					$(menuitems[j]).remove();
				}
			}
		}

		// reattach menu
		$parent.append(menu);

		return this;
	}

	// add submenu
	methods.attachSubItem = function(parent, items) {

		// allow single item removal or array
		if (typeof items === 'string') {
			items = [items];
		}

		// detach menu for performance
		var menu = $(this).data(DATA_KEY_MENU);
		var $parent = $(menu).parent();
		$(menu).detach();

		// remove menu items
		var menuitems = $(menu).children();
		for (var i=0, ii=menuitems.length; i<ii; i++) {
			if (menuitems[i].innerHTML == parent) {
				var submenu;
				if (!$(menuitems[i]).has('div').length) {
					submenu = $('<div></div>')
						.addClass(settings.submenuClass)
						.addClass(settings.contextMenuClass);
					$(menuitems[i]).addClass(settings.hasSubmenuClass)
						.append('<span>►</span>');
				}
				var subitems = [];
				for (var j=0, jj=items.length; j<jj; j++) {
					var $subitem = $('<div>' + items[j].label + '</div>');
					$subitem.addClass(settings.submenuItemClass)
						.addClass(settings.contextMenuItemClass)
						.addClass(items[i].className || '');
					$subitem.click( createClick(items[j].action, this) );
					subitems.push($subitem);
				}
				$(submenu).append(subitems);
				$(menuitems[i]).append(submenu);
				break;
			}
		}

		// reattach menu
		$parent.append(menu);

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

})(jQuery);