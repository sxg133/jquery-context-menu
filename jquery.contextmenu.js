(function( $ ) {

	var methods = {};
	// initialize context menu
	methods.init = function(options) {
		// create menu context menu and attach to body
		var menu = document.createElement('div');
		if (options.items) {
			methods.attach.call(this[0], options.items, menu);
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
				$($(this).data('menu')).css('left', e.pageX).css('top', e.pageY).show();
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
			return function() { func.call(elem); };
		}
		var clickedElement = this;
		// remove context menu and context menu items if they are included in selector
		var selector = $(this).selector;
		if (selector.contains('div') || selector.contains('.context-menu')) {
			for (var i=clickedElement.length-1; i>=0; i--) {
				var jelem = $(clickedElement[i]);
				if (jelem.hasClass('context-menu') || jelem.hasClass('context-menu-item')) {
					clickedElement.splice(i, 1);
				}
			}
		}

		// create menu item divs
		var menuitems = [];
		for (var i=0, ii=items.length; i<ii; i++) {
			var curitem = items[i];
			var menuitem = document.createElement('div');
			menuitem.innerHTML = curitem.label;
			menuitem.onclick = createClick(curitem.action, clickedElement);
			$(menuitem).addClass('context-menu-item');
			menuitems.push(menuitem);
		}
		$(menu).append(menuitems);
		return this;
	}
	methods.detach = function(items) {
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