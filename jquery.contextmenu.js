(function( $ ) {

	var methods = {};
	// initialize context menu
	methods.init = function(options) {
		// create menu context menu and attach to body
		var menu = document.createElement('div');
		if (options.items) {
			methods.attach(options.items, menu);
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
		if (!(items instanceof Array)) {
			items = [items];
		}
		if (!menu) {
			var menu = $(this).data('menu');
		}
		for (var i=0, ii=items.length; i<ii; i++) {
			var menuitem = document.createElement('div');
			menuitem.innerHTML = items[i].label;
			menuitem.onclick = items[i].action;
			$(menuitem).addClass('context-menu-item');
			$(menu).append(menuitem);
		}
		return this;
	}
	methods.detach = function(items) {
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