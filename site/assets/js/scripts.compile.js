/*!
 * SITE BUILT FOR SHANEEDELMAN, by Chuck Norton, 2013
 */

// @codekit-prepend "n.jquery.js";
// @codekit-prepend "n.bootstrap.js";
// @codekit-prepend "n.underscore.js";
// @codekit-prepend "n.get_metrics.js";
// @codekit-prepend "n.plugins.js";


/* Shane E Main Scripts ... */

	$.se = new Object();
	$.se.tree = new Object(); // For our beautiful Shane tree of work
	$.se.tree.meta = new Object(); // For tree meta info
	$.se.tree.branch = new Object(); // For each branch with work. 
	$.se.win = new Object();
	$.se.init = function() {
		createTree(); // Create Tree
		startWorkModal(); // Start Work Modals
	}

	$.se.resize = function() { // resizing the browser
		resetWorkBranches(); // Reset tree on resize
	}

	var createTree = function() {
		treeMeta(); // Grab Tree information
		setTreeSize();
		$.se.tree.createWorkBranches();
	}

	var setTreeSize = function()	{
		var scale	=	$.se.tree.meta.scale,
			width,
			height,
			tWidthDif,
			tHeightDiff;

		if ( $.se.win.minName == 'h') { // height is smaller
			height 		=	$.se.win.minSize;
			width 		=	height * scale;
			tWidthDif	=	661 / width;
			tHeightDiff	=	533 / height;
		} else { // width is smaller
			width 		=	$.se.win.minSize;
			height 		=	width / scale;
			tWidthDif	=	661 / width;
			tHeightDiff	=	533 / height;
		}
		// console.log('tWidthDif: ' + tWidthDif);

		// console.log('width: ' + width + '; height: ' + height );
		// set the svg tree size
		$('#tree').width(width).height(height);
		$('#treeSVG').attr('width',width).attr('height',height);
		// set global vars...
		$.se.win.width 				=	width;
		$.se.win.height 			=	height;
		$.se.tree.meta.widthDif		=	tWidthDif;
		$.se.tree.meta.heightDif	=	tHeightDiff;
	}
	
	$.se.tree.createWorkBranches = function() {
		$('#treeWork .item').each(function(i) { // Find each item
			var workBranch	=	$(this).data('branch_attach'); 
			$.se.tree.branch[workBranch] = $(this).find('.thumb').detach();	// Cache each item
			$.se.tree.branch[workBranch].type = $(this).data('type');
			setWorkThumbPositions(workBranch);
			setModalDefaults(workBranch);
		});
	}

	var resetWorkBranches = function() {
		treeMeta(); // Grab Tree information
		setTreeSize();
		_.each($.se.tree.branch, function(val,key) {   // Find each item
			var workBranch = key;
			setWorkThumbPositions(workBranch); // change position in the dom
		});	
	}	

	var setWorkThumbPositions = function(workBranch) {
		$.se.tree.x_y(workBranch); // set coordinates for this item
		var thumb 		= $.se.tree.branch[workBranch],
			tWidth		=	$.se.tree.meta.width * .05,
			tWidthHalf	=	tWidth / 2,
			tX			=	$.se.tree.meta[workBranch].pos_end.x,
			tY			=	$.se.tree.meta[workBranch].pos_end.y,
			tWidthDif	=	$.se.tree.meta.widthDif,
			tHeightDif	=	$.se.tree.meta.heightDif;

			//console.log('tWidthDif: ' + tWidthDif);
		thumb.appendTo('#tree'); // Add to Dom (this allows us to change after resize w same function)
		thumb = $('#'+workBranch+'_thumb'); // REset thumb to dom now. 
		thumb.css({
			'width'			: 	tWidth,
			'height'		: 	tWidth,
			'top'			: 	(tY - tWidthHalf + tHeightDif),
		 	'left'			: 	(tX - tWidthHalf + tWidthDif),
		 	'border-radius'	: 	tWidthHalf
		});	

		//console.log('$.se.tree.meta[workBranch].pos_end.y: ' + $.se.tree.meta[workBranch].pos_end.y);
		//console.log( ($.se.tree.meta[workBranch].pos_end.x * tHeightDif) - tWidthHalf );

	
		// SHOW thumb only if this is first load. 
		if ( thumb.hasClass('hide') ) {
			thumb.toggleClass('hide');  //+ Fade In each item (maybe randomly? )
		}

	}

	// Grab meta & coordinates for each work tree object
	var treeMeta = function() {
		var winHeight 	=	$(window).height(),
			winWidth	=	$(window).width(),
			winBoth		=	[{name : 'h', size : winHeight}, {name : 'w', size : winWidth}],
			winMin 		= 	_.min(winBoth, function(winMinSize){ return winMinSize.size; }),
			winMinName	= 	winMin.name,
			winMinSize	=	winMin.size;
	
		$.se.win.minName 	=	winMinName;
		$.se.win.minSize 	=	winMinSize;
		//console.log('name: '+ winMinName + '; size: '+ winMinSize);
		$.se.tree.meta.height = $('#tree svg').height();
		$.se.tree.meta.scale = $('#tree svg').attr('scale');
		$.se.tree.meta.width = ( $.se.tree.meta.height * $.se.tree.meta.scale);
		$.se.tree
		//console.log( $.se.tree.meta.height );
	}


	$.se.tree.x_y = function(workBranch) { // set coordinates for any item
		$('#tree .branch[data-branch="'+workBranch+'"]').each(function(i) {
			var it 				=	$(this).data('branch'),
				pos 			=	$(this).position(),
				side			=	$(this).data('branch_end_side'),
				stroke			=	3,
				width			=	$(this)[0].getBBox().width,
				height			=	$(this)[0].getBBox().height,
				widthOffset		=	(width / $.se.tree.meta.widthDif) + stroke,
				heightOffset	=	(height / $.se.tree.meta.heightDif) + stroke,
				pos_end;

			$.se.tree.meta[it] = new Object();
			$.se.tree.meta[it].end_side = side;	
			$.se.tree.meta[it].position = pos;
			$.se.tree.meta[it].pos_end = new Object();
			
			if (side == 'TR') { 		// Top Right
				$.se.tree.meta[it].pos_end.y = pos.top;
				$.se.tree.meta[it].pos_end.x = pos.left + widthOffset;
			} else if (side == 'BR') {	// Bottom Right
				$.se.tree.meta[it].pos_end.y = pos.top + widthOffset;
				$.se.tree.meta[it].pos_end.x = pos.left + widthOffset;
			} else if (side == 'BL') {	// Bottom Left
				$.se.tree.meta[it].pos_end.y = pos.top + heightOffset;
				$.se.tree.meta[it].pos_end.x = pos.left;
			} else if (side == 'MR') {	// Middle Right
				$.se.tree.meta[it].pos_end.y = pos.top + (heightOffset / 2);
				$.se.tree.meta[it].pos_end.x = pos.left + widthOffset;
			} else { 					// default side 'TL'
				$.se.tree.meta[it].pos_end.y = pos.top;
				$.se.tree.meta[it].pos_end.x = pos.left;
			} 

		});	
	}

	var setModalDefaults = function(workBranch)  {
		//console.log('yo: ');
		var workType = $.se.tree.branch[workBranch].type;

		$('#'+workBranch+'_modal').on('show', function() {
			if (workType == 'image') {
				$(this).on('click', function(e) {
					$(this).modal('hide');
				});
			};
		});

	}

	var startWorkModal = function() {
		$('#tree .thumb').on('click', function (e) { // Show Modal on Thumb Click
			e.preventDefault();
			var workBranch 	=	$(this).data('branch_attach');
			$('#'+workBranch+'_modal').modal('toggle');
		});
	}	



$(function() {
	$.se.init();
	$(window).resize(function() {
		$.se.resize();
	});	

	//console.log( 'x: '+ $.se.tree.meta.t12.pos_end.x + ', y: '+ $.se.tree.meta.t12.pos_end.y );

});

