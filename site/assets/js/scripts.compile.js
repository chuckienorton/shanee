/*!
 * SITE BUILT FOR SHANEEDELMAN, by Chuck Norton, 2013
 */

// @codekit-prepend "n.jquery.js";
// @codekit-prepend "n.bootstrap.js";
// @codekit-prepend "n.underscore.js";
// @codekit-prepend "n.plugins.js";




/* Shane E Main Scripts ... */

	$.se = new Object();
	$.se.tree = new Object(); // For our beautiful Shane tree of work
	$.se.tree.meta = new Object(); // For tree meta info
	$.se.tree.branch = new Object(); // For each branch with work. 

	$.se.init = function() {
		createTree(); // Create Tree
	}

	$.se.resize = function() { // resizing the browser
		resetWorkBranches(); // Reset tree on resize
	}

	var createTree = function() {
		treeMeta(); // Grab Tree information
		$.se.tree.createWorkBranches();
	}

	var resetWorkBranches = function() {
		treeMeta(); // Grab Tree information
		_.each($.se.tree.branch, function(val,key) {   // Find each item
			var workBranch = key;
			setWorkThumbPositions(workBranch); // change position in the dom
		});	
	}
	
	$.se.tree.createWorkBranches = function() {
		$('#treeWork .item').each(function(i) { // Find each item
			var workBranch	=	$(this).data('branch_attach'); 
			$.se.tree.branch[workBranch] = $(this).detach();	// Cache each item
			setWorkThumbPositions(workBranch);
		});
	}

	var setWorkThumbPositions = function(workBranch) {
		$.se.tree.x_y(workBranch); // set coordinates for this item
		var thumb = $.se.tree.branch[workBranch].find('.thumb'),
			tWidth	=	$.se.tree.meta.width * .05,
			tWidthHalf	=	tWidth / 2; 
		thumb.appendTo('#tree'); // Add to Dom (this allows us to change after resize w same function)
		thumb = $('#'+workBranch+'_thumb'); // REset thumb to dom now. 
		thumb.css({
			'width'			: 	tWidth,
			'height'		: 	tWidth,
			'top'			: 	$.se.tree.meta[workBranch].end_pos.y - tWidthHalf,
		 	'left'			: 	$.se.tree.meta[workBranch].end_pos.x - tWidthHalf,
		 	'border-radius'	: 	tWidthHalf
		});	
	
		// SHOW thumb only if this is first load. 
		if ( thumb.hasClass('hide') ) {
			thumb.toggleClass('hide');  //+ Fade In each item (maybe randomly? )
		}

	}

	// Grab meta & coordinates for each work tree object
	
	var treeMeta = function() {
		$.se.tree.meta.height = $('#tree').height();
		$.se.tree.meta.width = $('#tree').width();
	}


	$.se.tree.x_y = function(workBranch) {
		$('#tree .branch[data-branch="'+workBranch+'"]').each(function(i) {
			var it 		=	$(this).data('branch'),
				pos 	=	$(this).position(),
				side	=	$(this).data('branch_end_side'),
				width	=	$(this)[0].getBBox().width,
				height	=	$(this)[0].getBBox().height,
				end_pos;
			//console.log(width);
			$.se.tree.meta[it] = new Object();
			$.se.tree.meta[it].end_side = side;	
			$.se.tree.meta[it].position = pos;
			$.se.tree.meta[it].end_pos = new Object();
			
			if (side == 'TR') {
				$.se.tree.meta[it].end_pos.y = pos.top;
				$.se.tree.meta[it].end_pos.x = pos.left + width;
			} else if (side == 'BR') {
				$.se.tree.meta[it].end_pos.y = pos.top + width;
				$.se.tree.meta[it].end_pos.x = pos.left + width;
			} else if (side == 'BL') {
				$.se.tree.meta[it].end_pos.y = pos.top + height;
				$.se.tree.meta[it].end_pos.x = pos.left;
			} else { // default side 'TL'
				$.se.tree.meta[it].end_pos.y = pos.top;
				$.se.tree.meta[it].end_pos.x = pos.left;
			} 

		});	
		console.log( 'x: '+ $.se.tree.meta.t30.end_pos.x + ', y: '+ $.se.tree.meta.t30.end_pos.y );
	}




$(function() {
	$.se.init();
	$(window).resize(function() {
		$.se.resize();
	});
});

