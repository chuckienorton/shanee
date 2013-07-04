/*!
 * SITE BUILT FOR SHANEEDELMAN, by Chuck Norton, 2013
 */

// @codekit-prepend "n.jquery-1.10.0.js";
// @codekit-prepend "n.bootstrap.js";
// @codekit-prepend "n.underscore.js";
// @codekit-prepend "n.get_metrics.js";
// @codekit-prepend "n.mediaelement-and-player.js";
// @codekit-prepend "n.fittext.js";
// @codekit-prepend "n.plugins.js";



/* Shane E Main Scripts ... */

	$.se = new Object();
	$.se.tree = new Object(); // For our beautiful Shane tree of work
	$.se.tree.meta = new Object(); // For tree meta info
	$.se.tree.branch = new Object(); // For each branch with work. 
	$.se.win = new Object();
	$.se.init = function() {
		setBrowserInfo(); 
		fonts();
		createTree(); // Create Tree
		startWorkModal(); // Start Work Modals
		launchStart();
	}

	$.se.resize = function() { // resizing the browser
		setBrowserInfo();
		fonts();
		resetWorkBranches(); // Reset tree on resize
	}

	var setBrowserInfo	=	function() {
		$.se.win.height =	$(window).height();
		$.se.win.width =	$(window).width();
		//console.log( $.se.win.width );
	}

	var launchStart	=	function() {
		$('body').on('click', '#menu', function(e) {
			e.preventDefault();
			e.stopPropagation(); // stop event bubbling	
			$('body').toggleClass('start').toggleClass('work');	
		});
	}

	var fonts 	=	function() {

		// $(".rText").fitText(
		// 	// 1, { 
		// 	// 	minFontSize: '20px', 
		// 	// 	maxFontSize: '40px' 
		// 	// 	}
		// );

	}

	var createTree = function() {
		//treeMeta(); // Grab Tree information
		setTreeSize();		
		$.se.tree.createWorkBranches();	
		
	}

	var setTreeSize = function()	{
		var winHeight 	=	$.se.win.height,
			winWidth	=	$(window).width(),
			winBoth		=	[{name : 'h', size : winHeight}, {name : 'w', size : winWidth}],
			winMin 		= 	_.min(winBoth, function(winMinSize){ return winMinSize.size; }),
			winMinName	= 	winMin.name,
			winMinSize	=	winMin.size,
		 	scale	=	$('#treeSVG').attr('scale'),
			width,
			height,
			tWidthDif,
			tHeightDiff,
			tOffset 	=	(winHeight * .1);
			//console.log('tOffset: ' + tOffset);

		if ( winMinName == 'h') { // height is smaller
			height 		=	winMinSize;
			width 		=	height * scale;
			tWidthDif	=	661 / width;
			tHeightDiff	=	533 / height;
		} else { // width is smaller
			width 		=	winMinSize;
			height 		=	width / scale;
			tWidthDif	=	661 / width;
			tHeightDiff	=	533 / height;
		}

		// set the svg tree size
		$('#tree').width(width).height(height);
		$('#tree').css({
			'top'	: 	tOffset
		});
		$('#treeSVG').width(width).height(height);
		$('#treeSVG').attr('width',width).attr('height',height);
		// set global vars...
		$.se.tree.width 			=	width;
		$.se.tree.height 			=	height;
		$.se.tree.meta.widthDif		=	tWidthDif;
		$.se.tree.meta.heightDif	=	tHeightDiff;
		$.se.win.minName 			=	winMinName;
		$.se.win.minSize 			=	winMinSize;
		$.se.tree.meta.height 		= 	height;
		$.se.tree.meta.scale 		=  	scale;
		//$.se.tree.meta.width 		= 	( $.se.tree.meta.height * $.se.tree.meta.scale);
		$.se.tree.meta.width 		=	width;
		//$.se.tree
		//console.log( $.se.tree.meta.height );




	}
	
	$.se.tree.createWorkBranches = function() {
		$('#treeWork .item').each(function(i) { // Find each item
			var $this 		=	$(this)
				innerMedia	=	$(this)[0],
				workBranch	=	$(this).data('branch_attach'), 
				workType	=	$(this).data('type');
			$.se.tree.branch[workBranch] = $(this).find('.thumb').detach();	// Cache each item
			$.se.tree.branch[workBranch].type = workType;
			

			if (workType == 'image') { // for images we'll check to see if it's downloaded first
				
				$.se.tree.branch[workBranch].img 		= 	new Image();
 				$.se.tree.branch[workBranch].img.src 	=	$this.find('img').attr('src');
				
				//+ This bad boy is messing up firefox, dang it. 
				//$.se.tree.branch[workBranch].img.onLoad = 	imageLoaded();
				// var imageLoaded = function() {
				// 	setWorkThumbPositions(workBranch);
				// 	setModalSizes(workBranch);
				// 	setModalDefaults(workBranch);
				// }

				setWorkThumbPositions(workBranch);
				setModalSizes(workBranch);
				setModalDefaults(workBranch);

			 } else if (workType == 'video')  { // other media like videos we'll go ahead & load
			 	if (Modernizr.video.h264) { // Check to see that h264 works! 
			 		setWorkThumbPositions(workBranch);
			 		setModalSizes(workBranch);
			 		setModalDefaults(workBranch);
			 	}
			 } else {
			 	setWorkThumbPositions(workBranch);
			 	setModalSizes(workBranch);
			 	setModalDefaults(workBranch);
			 }

			
		});



	}

	var resetWorkBranches = function() {
		treeMeta(); // Grab Tree information
		setTreeSize();
		_.each($.se.tree.branch, function(val,key) {   // Find each item
			var workBranch = key;
			setWorkThumbPositions(workBranch); // change position in the dom
			setModalSizes(workBranch); // change width of modals
		});	
	}	

	var setWorkThumbPositions = function(workBranch) {
		$.se.tree.x_y(workBranch); // set coordinates for this item
		var thumb 		= 	$.se.tree.branch[workBranch],
			tWidth		=	$.se.tree.meta.width * .05,
			tWidthHalf	=	tWidth / 2,
			tX			=	$.se.tree.meta[workBranch].pos_end.x,
			tY			=	$.se.tree.meta[workBranch].pos_end.y,
			tWidthDif	=	$.se.tree.meta.widthDif,
			tHeightDif	=	$.se.tree.meta.heightDif,
			workType	=	$.se.tree.branch[workBranch].type;

		//console.log('$.se.tree.meta.width: ' + $.se.tree.meta.width);
		// console.log('tWidth: ' + tWidth);
		// console.log('tWidthHalf: ' + tWidthHalf);
		// console.log('tWidthDif: ' + tWidthDif);
		thumb.appendTo('#tree'); // Add to Dom (this allows us to change after resize w same function)
		thumb = $('#'+workBranch+'_thumb'); // REset thumb to dom now. 
		thumb.css({
			'width'			: 	tWidth,
			'height'		: 	tWidth,
			'top'			: 	(tY - tWidthHalf + tHeightDif),
		 	'left'			: 	(tX - tWidthHalf + tWidthDif),
		 	'border-radius'	: 	tWidthHalf
		});	
		thumb.find('.overlay').css({
			'width'			: 	tWidth,
			'height'		: 	tWidth,
			'border-radius'	: 	tWidthHalf * 1.2
		});
		thumb.addClass(workType);

		//console.log('$.se.tree.meta[workBranch].pos_end.y: ' + $.se.tree.meta[workBranch].pos_end.y);
		//console.log( ($.se.tree.meta[workBranch].pos_end.x * tHeightDif) - tWidthHalf );

	
		// SHOW thumb only if this is first load. 
		if ( thumb.hasClass('hide') ) {
			thumb.toggleClass('hide');  //+ Fade In each item (maybe randomly? )
		}

	}

	// Grab meta & coordinates for each work tree object
	var treeMeta = function() {
		// var winHeight 	=	$.se.win.height,
		// 	winWidth	=	$(window).width(),
		// 	winBoth		=	[{name : 'h', size : winHeight}, {name : 'w', size : winWidth}],
		// 	winMin 		= 	_.min(winBoth, function(winMinSize){ return winMinSize.size; }),
		// 	winMinName	= 	winMin.name,
		// 	winMinSize	=	winMin.size;
		// //console.log('winMin: ' + winMin);
		// $.se.win.minName 	=	winMinName;
		// $.se.win.minSize 	=	winMinSize;
		// //console.log('name: '+ winMinName + '; size: '+ winMinSize);
		// $.se.tree.meta.height = $('#treeSVG').height();
		// $.se.tree.meta.scale = $('#treeSVG').attr('scale');
		// $.se.tree.meta.width = ( $.se.tree.meta.height * $.se.tree.meta.scale);
		// //$.se.tree
		// //console.log( $.se.tree.meta.height );
	}

	$.se.tree.x_y = function(workBranch) { // set coordinates for any item
		$('#tree .branch[data-branch="'+workBranch+'"]').each(function(i) {
			var it 				=	$(this).data('branch'),
				pos 			=	$(this).position(),
				posOffset 		=	$(this).offset(),
				// posHack 		=	$(this).positionHack(), this didn't fix the FF problem. 
				side			=	$(this).data('branch_end_side'),
				stroke			=	3,
				getBBox			=	$(this)[0].getBBox(),
				widthOffset		=	(getBBox.width / $.se.tree.meta.widthDif) + stroke,
				heightOffset	=	(getBBox.height / $.se.tree.meta.heightDif) + stroke,
				pos_end;

			// translate quickly for fixing FF bug
			// pLeft 	= 	getBBox.x;
			// pTop 	=	getBBox.y;
			// pLeft 	= 	posOffset.left;
			// pTop 	=	posOffset.top;
			pLeft 	= 	pos.left;
			pTop 	=	pos.top;

			console.log( it + ' : ' + posOffset.left  );
			//console.log(it + ' pos.left: ' + pos.left);
			//console.log(it + ' offsetParent.left: '+  $(this).offsetParent()  );
			$.se.tree.meta[it] = new Object();
			$.se.tree.meta[it].end_side = side;	
			$.se.tree.meta[it].position = pos;
			$.se.tree.meta[it].pos_end = new Object();
			
			if (side == 'TR') { 		// Top Right
				$.se.tree.meta[it].pos_end.y = pTop;
				$.se.tree.meta[it].pos_end.x = pLeft + widthOffset;
			} else if (side == 'TM') {	// Top Middle
				$.se.tree.meta[it].pos_end.y = pTop + widthOffset;
				$.se.tree.meta[it].pos_end.x = pLeft + widthOffset;
			} else if (side == 'BR') {	// Bottom Right
				$.se.tree.meta[it].pos_end.y = pTop + widthOffset;
				$.se.tree.meta[it].pos_end.x = pLeft + widthOffset;
			} else if (side == 'BL') {	// Bottom Left
				$.se.tree.meta[it].pos_end.y = pTop + heightOffset;
				$.se.tree.meta[it].pos_end.x = pLeft;
			} else if (side == 'MR') {	// Middle Right
				$.se.tree.meta[it].pos_end.y = pTop + (heightOffset / 2);
				$.se.tree.meta[it].pos_end.x = pLeft + widthOffset;
			} else { // default side 'TL'
				$.se.tree.meta[it].pos_end.y = pTop;
				$.se.tree.meta[it].pos_end.x = pLeft;
			} 

		});	
	}

	var setModalSizes = function(workBranch) {
		var workType 	= 	$.se.tree.branch[workBranch].type,
			winWidth	=	($.se.win.width),
			winHeight	=	($.se.win.height),
			winSmallest	=	Math.min(winWidth,winHeight),
			modalWidth	=	700, // width default
			modalHeight, // height auto as default
			marginTop,
			marginLeft,
			top;

		if (winWidth >= 1300 ) {
			modalWidth = 830;
		} else if (winWidth >= 900 ) {
			modalWidth = 700;
		} else {
			modalWidth = (winWidth * 0.97);
		}

		if (workType == 'image') {
			getImageData(workBranch); //+ this doesn't work correctly. 
			var imgWidth 	= 	$.se.tree.branch[workBranch].imgWidth,
				imgHeight 	= 	$.se.tree.branch[workBranch].imgHeight,
				imgRatio	=	(imgWidth / imgHeight);

				if (imgRatio < 1) { // If horizontal image
					modalHeight = 	Math.min(imgHeight,(winHeight * 0.9) );// set by height
					modalWidth	= 	(modalHeight * imgRatio);
				} else {
					modalWidth  = 	Math.min(imgWidth,(winWidth * 0.9) );// set by width
					modalHeight	=	(modalWidth / imgRatio);
				}
		}

		if (workType == 'video') {
			var video 		=	$('#'+workBranch+'_modal video'),
				videoWidth 	=	video.attr('width'),
				videoHeight =	video.attr('height'),
				videoRatio	=	(videoWidth / videoHeight);

			if (videoRatio < 1) { // If horizontal vid
				modalHeight = 	Math.min(videoHeight,(winHeight * 0.9) );// set by height
				modalWidth	= 	(modalHeight * videoRatio);
			} else {
				modalWidth  = 	Math.min(videoWidth,(winWidth * 0.9) );// set by width
				modalHeight	=	(modalWidth / videoRatio);
			}
		}


		// last check for screen sizes
		var modalRatio = modalWidth / modalHeight;
		
		if 	( modalHeight > winHeight ) {
			modalHeight = winHeight * .95;
			modalWidth = modalHeight * modalRatio;
		}

		if (modalWidth > winWidth ) {
			modalWidth = winWidth * .95;
			modalHeight = modalWidth / modalRatio;
		}


		// Set JS Dimensions
		$.se.tree.branch[workBranch].width = modalWidth;
		$.se.tree.branch[workBranch].height = modalHeight;
		
		if (modalHeight) { 
			top 		=	Math.abs(winHeight / 2);
			marginTop 	= 	-Math.abs(modalHeight/2); 
		} else {
			top 		=	null;
			marginTop 	=	null;
		}
		marginLeft 	=	-Math.abs(modalWidth/2);

		// Set DOM Modals
		$('#'+workBranch+'_modal').css({
			'width'			: 	modalWidth,
			'height'		: 	modalHeight,
			'top'			: 	top,
			'margin-top'	: 	marginTop,
			'margin-left'	: 	marginLeft			
		});


	}

	var getImageData 	= function(workBranch) {
			var img 		=	$('#'+workBranch+'_modal img')[0],
				imgWidth,
				imgHeight;
			var t = $.se.tree.branch[workBranch].img;
			t.src = (img.getAttribute ? img.getAttribute("src") : false) || img.src;
    		$.se.tree.branch[workBranch].imgWidth = t.width;
    		$.se.tree.branch[workBranch].imgHeight = t.height;
	}

	var setModalDefaults = function(workBranch)  {
		//console.log('yo: ');
		var workType 	= 	$.se.tree.branch[workBranch].type,
			modalWidth	=	$.se.tree.branch[workBranch].width,
			modalHeight	=	$.se.tree.branch[workBranch].height;


		$('#'+workBranch+'_modal').on('shown', function() { // on Image Opened
			$('#'+workBranch+'_modal,.modal-backdrop').addClass('fadeIn');
		});
		$('#'+workBranch+'_modal').on('hide', function() { // on Video Closing
			$('#'+workBranch+'_modal,.modal-backdrop').removeClass('fadeIn');
		});
		$('#'+workBranch+'_modal').on('hidden', function() { // on Video Closed

		});


		// Change Size for each modal
		if (workType == 'image') { // IMAGES
			$('#'+workBranch+'_modal').on('show', function() { // on Image Opening
				$(this).on('click', function(e) { // allow 'click image to close'
					$(this).modal('hide');
				});
			});


		} else if (workType == 'video') { // VIDEOS
			var video 		=	$('#'+workBranch+'_modal video'),
				videoSrc 	= 	video.find('source').attr('src'),
				videoWidth 	=	video.attr('width'),
				videoHeight =	video.attr('height'),
				videoRatio	=	(videoWidth / videoHeight);
				modalHeight	=	(modalWidth / videoRatio);
				// console.log(modalHeight);

				$.se.tree.branch[workBranch].height = modalHeight;

			// Create VIDEO object: 
			$.se.tree.branch[workBranch].player = new MediaElementPlayer('#'+workBranch+'_modal video', 
				{
					// shows debug errors on screen
    				enablePluginDebug: true,
					// if the <video width> is not specified, this is the default
					 defaultVideoWidth: modalWidth,
				    // if the <video height> is not specified, this is the default
				    defaultVideoHeight: modalHeight,
				    // if set, overrides <video width>
				    videoWidth: modalWidth,
				    // if set, overrides <video height>
				    videoHeight: modalHeight,
				    /// width of audio player
				    audioWidth: modalWidth,
				    // height of audio player
				    audioHeight: 30,
				    // initial volume when the player starts
				    startVolume: 1,
				    // useful for <audio> player loops
				    loop: true,
				    // enables Flash and Silverlight to resize to content size
				    enableAutosize: true,
				    // the order of controls you want on the control bar (and other plugins below)
				    features: ['progress'],
				    // Hide controls when playing and mouse is not over the video
				    alwaysShowControls: false,
				    // force iPad's native controls
				    iPadUseNativeControls: true,
				    // force iPhone's native controls
				    iPhoneUseNativeControls: true, 
				    // force Android's native controls
				    AndroidUseNativeControls: true,
				    // forces the hour marker (##:00:00)
				    alwaysShowHours: false,
				    // show framecount in timecode (##:00:00:00)
				    showTimecodeFrameCount: false,
				    // used when showTimecodeFrameCount is set to true
				    framesPerSecond: 25,
				    // turns keyboard support on and off for this instance
				    enableKeyboard: true,
				    // when this player starts, it will pause other players
				    pauseOtherPlayers: true,
				    // array of keyboard commands
				    keyActions: [],
				    // shows debug errors on screen
				    enablePluginDebug: true,
				    // remove or reorder to change plugin priority
				    plugins: ['flash','silverlight'],
				    // specify to force MediaElement to use a particular video or audio type
				    type: '',
				    // path to Flash and Silverlight plugins
				    pluginPath: '/.assets/player/',
				    // name of flash file
				    flashName: 'flashmediaelement.swf',
				    // name of silverlight file
				    silverlightName: 'silverlightmediaelement.xap',
				    success: function (mediaElement, domObject) { // method that fires when the Flash or Silverlight object is ready
				        // add event listener
				        // mediaElement.addEventListener('paused', function(e) {
				        //    e.preventDefault();
				        //    //console.log('paused: ');
				        // }, false);
				       mediaElement.player.play(); // Load Video
				    },
				    error: function () {  // fires when a problem is detected
				     	console.log('error!');
				    }
				}
			);
			$.se.tree.branch[workBranch].player.setSrc(videoSrc); // Set VIDEO
			$.se.tree.branch[workBranch].player.load(); // Load Video
			
			$('#'+workBranch+'_modal').on('show', function() { // on Video Opening
				
			});

			$('#'+workBranch+'_modal').on('shown', function() { // on Video Opening
				$.se.tree.branch[workBranch].player.play(); // Start Playing Video
			});

			$('#'+workBranch+'_modal').on('hide', function() { // on Video Closing
				$.se.tree.branch[workBranch].player.pause();
			});


			$('#'+workBranch+'_modal').on('hidden', function() { // on Video Closed
				//$.se.tree.branch[workBranch].player.play();
			});

			
			$('.mejs-mediaelement').on('click', function(e) { // Close Player on Video Click 
				e.preventDefault();
				$.se.tree.branch[workBranch].player.pause();
				$('#'+workBranch+'_modal').modal('hide');
			});

		}

	}

	var startWorkModal = function() {
		$('#tree .thumb').on('click', function (e) { // Show Modal on Thumb Click
			e.preventDefault();
			var workBranch 	=	$(this).data('branch_attach');
			$('#'+workBranch+'_modal').modal('toggle');
		});
	}	


	$.fn.positionHack = function() {
	    var t = $(this), p = t.position();
	    (t.css("-moz-transform") || "").replace(/matrix\(([^\)]+)\)/,
	        function(str, mozmat) {
	            var mozarr = mozmat.split(",");
	            p.left += parseInt(mozarr[4]);
	            p.top += parseInt(mozarr[5]);
	    });
	    return p;
	};




$(function() {
	
	var go = function() {
		if (document.readyState != "complete") {
    		setTimeout( 
    		go, // try again in 100 milloseconds 
    		100);
    	return;
  		} else {
  			$('body').removeClass('loading');
			$.se.init();
  		}
  	}
  	go();
	$(window).resize(function() {
		$.se.resize();
	});	
	// if (Modernizr.video.h264) {
	// 	alert('h264!');
	// } else {
	// 	alert('	');
	// }
	//console.log( 'x: '+ $.se.tree.meta.t12.pos_end.x + ', y: '+ $.se.tree.meta.t12.pos_end.y );

});

