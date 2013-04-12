jquery-context-menu
===================

Author: Sahil Grover

Date:   2013-03-11

A context menu plugin for jQuery

Documentation
-------------

###Overview

Override the default context menu for a subset of elements on the page.

Start by including jQuery, and the context-menu plugin:

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.contextmenu.js"></script>

Optionally, include the default style for the context menu*:

    <link rel="stylesheet" href="jquery.contextmenu.style.css" />

*Note: for custom styles, the .context-menu class must have "postion: absolute;" for the menu to function properly.

Initialize the context menu with (or without) some default items:

    $('tbody tr').contextmenu({
		items: [
			{label: 'Mark for Delete', action: markForDelete},
			{label: 'Highlight', action: highlight}
		]
	});

### Methods

*	**attach**

	Add an additional context menu item(s).

		$('table tr').contextmenu('attach', {label: 'Mark for Delete', action: markForDelete} );

		$('table tr').contextmenu('attach', [
			{label: 'Mark for Delete', action: markForDelete},
			{label: 'Highlight', action: highlight}
		]);

*	**detach**

	Remove an item(s) (by label) from the context menu.

		$('table tr').contextmenu('detach', 'Mark for Delete');

		$('table tr').contextmenu('detach', [
			'Mark for Delete',
			'Highlight'
		]);

*	**attachSubItem**

	Add a submenu item(s) to an existing menu item.

		$('table tr').contextmenu('attachSubItem', 'Highlight', [
			{label: 'yellow', action: highlightYellow },
			{label: 'green', action: highlightGreen }
		]);

	*Only one level of submenus is currently supported.

### Menu Options

When you initialize the menu, you can pass in the following options.

*	_id_ - Specify the ID attribute for the context menu.

*	_items_	- An initial list of menu items.  See the Menu Item Options section for additional details.

*	_className_ - Add a custom CSS class to the context menu.

### Menu Item Options

**Required**

*	_label_	- The text displayed on the menu for the item.

*	_action_ - Pointer to the click function for the menu item.  You may exclude this option if you plan on adding a submenu to the item.

**Optional**

*	_className_ - Add a custom CSS class(s) to the menu item.