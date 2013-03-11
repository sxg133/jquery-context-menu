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

	Remove an item (by label) from the context menu.

		$('table tr').contextmenu('detach', 'Mark for Delete');

		$('table tr').contextmenu('attach', [
			'Mark for Delete',
			'Highlight'
		]);


