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

		// Webkit detection script
		Modernizr.addTest('webkit', function(){
			return RegExp(" AppleWebKit/").test(navigator.userAgent);
		});

		// Mobile Webkit
		Modernizr.addTest('mobile', function(){
			return RegExp(" Mobile/").test(navigator.userAgent);
		});

	}

	var launchStart	=	function() {
		$('body').on('click', '#startS', function(e) {
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
			winWidth	=	$.se.win.width,
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

		// adjust for orientation diffs
		if ( winMinName == 'h') { // height is smaller
			height 		=	winMinSize;
			width 		=	height * scale;
		} else { // width is smaller
			width 		=	winMinSize;
			height 		=	width / scale;
		}
		// adjust for touching edge of screen
		console.log('winWidth - width: '+ winWidth + ',' + width + ',' + (winWidth - width));
		if (winWidth - width < 60) {
			width = (width * .95);
			height = (height * .95);
		}
		
		// adjust width & height difference 
		tWidthDif	=	661 / width;
		tHeightDiff	=	533 / height;


		// This is used for viewing the entire $.se.tree.meta on screen. 
		// Simply set the width/height you want here:
			// width 	= 	320;
			// height 	=	258;
			// tWidthDif	=	661 / width;
			// tHeightDiff	=	533 / height;
		// and then print JSON.stringify($.se.tree.meta) in console log of browser. 
		// Copy that below to the manual width/height you want to use. 

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


		//resets for non flexbox
		//alert(Modernizr.webkit);
		if (!Modernizr.webkit) {
			if (width > 1050) {
				width 	= 	1010.6;
				height 	=	815;
				$.se.tree.meta =  $.parseJSON('{"widthDif":0.6540668909558678,"heightDif":0.6539877300613497,"height":815,"scale":"1.24","width":1010.6,"t1":{"position":{"top":46.93818664550781,"left":226.8515625},"pos_end":{"y":46.93818664550781,"x":226.8515625}},"t2":{"end_side":"TR","position":{"top":62.736175537109375,"left":506.7677001953125},"pos_end":{"y":62.736175537109375,"x":699.0205094930444}},"t3":{"end_side":"TL","position":{"top":35.216217041015625,"left":301.7669677734375},"pos_end":{"y":35.216217041015625,"x":301.7669677734375}},"t9":{"end_side":"TL","position":{"top":285.95355224609375,"left":356.96435546875},"pos_end":{"y":285.95355224609375,"x":356.96435546875}},"t10":{"end_side":"TR","position":{"top":74.96725463867188,"left":506.7677001953125},"pos_end":{"y":74.96725463867188,"x":768.021115680181}},"t11":{"end_side":"TL","position":{"top":389.9652099609375,"left":412.9307861328125},"pos_end":{"y":389.9652099609375,"x":412.9307861328125}},"t12":{"end_side":"MR","position":{"top":316.23468017578125,"left":503.71142578125},"pos_end":{"y":357.6551511095344,"x":706.1787862942186}},"t13":{"end_side":"TR","position":{"top":24.134857177734375,"left":765.446044921875},"pos_end":{"y":24.134857177734375,"x":910.3198871745284}},"t14":{"end_side":"TL","position":{"top":245.1475830078125,"left":0},"pos_end":{"y":245.1475830078125,"x":0}},"t16":{"end_side":"TR","position":{"top":300.1324462890625,"left":169.85311889648438},"pos_end":{"y":300.1324462890625,"x":271.50052647208304}},"t17":{"end_side":"TR","position":{"top":119.82632446289062,"left":501.5908203125},"pos_end":{"y":119.82632446289062,"x":746.4972585242383}},"t18":{"end_side":"TL","position":{"top":114.51190185546875,"left":438.5303955078125},"pos_end":{"y":114.51190185546875,"x":438.5303955078125}},"t23":{"end_side":"TL","position":{"top":264.174560546875,"left":800.8228759765625},"pos_end":{"y":264.174560546875,"x":800.8228759765625}},"t24":{"end_side":"TR","position":{"top":268.0074768066406,"left":892.3909912109375},"pos_end":{"y":268.0074768066406,"x":987.4626265948551}},"t25":{"end_side":"TL","position":{"top":191.3338623046875,"left":29.032012939453125},"pos_end":{"y":191.3338623046875,"x":29.032012939453125}},"t28":{"end_side":"TL","position":{"top":177.60137939453125,"left":817.3974609375},"pos_end":{"y":177.60137939453125,"x":817.3974609375}},"t29":{"end_side":"TR","position":{"top":172.29005432128906,"left":962.828369140625},"pos_end":{"y":172.29005432128906,"x":1014.2362426203787}},"t30":{"end_side":"TL","position":{"top":65.09677124023438,"left":134.31112670898438},"pos_end":{"y":65.09677124023438,"x":134.31112670898438}},"t31":{"end_side":"BL","position":{"top":204.53271484375,"left":92.30343627929688},"pos_end":{"y":280.358238492182,"x":92.30343627929688}}}');
				$.se.tree.meta.sizeOverride 	=	'L';
				tOffset 	=	(winHeight * .2);
				console.log('No Flexbox. Size: L');
			} else if (width > 700) {
				width 	= 	652.24;
				height 	=	526;
				$.se.tree.meta =  $.parseJSON('{"widthDif":1.0134306390285783,"heightDif":1.0133079847908746,"height":526,"scale":"1.24","width":652.24,"t1":{"position":{"top":30.294418334960938,"left":146.40936279296875},"pos_end":{"y":30.294418334960938,"x":146.40936279296875}},"t2":{"end_side":"TR","position":{"top":40.490386962890625,"left":327.06640625},"pos_end":{"y":40.490386962890625,"x":452.2099371587202}},"t3":{"end_side":"TL","position":{"top":22.729095458984375,"left":194.75958251953125},"pos_end":{"y":22.729095458984375,"x":194.75958251953125}},"t9":{"end_side":"TL","position":{"top":184.55426025390625,"left":230.3837890625},"pos_end":{"y":184.55426025390625,"x":230.3837890625}},"t10":{"end_side":"TR","position":{"top":48.384300231933594,"left":327.06640625},"pos_end":{"y":48.384300231933594,"x":496.74284372857767}},"t11":{"end_side":"TL","position":{"top":251.68310546875,"left":266.50433349609375},"pos_end":{"y":251.68310546875,"x":266.50433349609375}},"t12":{"end_side":"MR","position":{"top":204.09759521484375,"left":325.093994140625},"pos_end":{"y":231.3622181733151,"x":456.82998387046734}},"t13":{"end_side":"TR","position":{"top":15.57720947265625,"left":494.0167236328125},"pos_end":{"y":15.57720947265625,"x":588.581927344341}},"t14":{"end_side":"TL","position":{"top":158.21820068359375,"left":0},"pos_end":{"y":158.21820068359375,"x":0}},"t16":{"end_side":"TR","position":{"top":193.70526123046875,"left":109.62274169921875},"pos_end":{"y":193.70526123046875,"x":176.28965750874622}},"t17":{"end_side":"TR","position":{"top":77.33621215820312,"left":323.725341796875},"pos_end":{"y":77.33621215820312,"x":482.8514602010153}},"t18":{"end_side":"TL","position":{"top":73.90631103515625,"left":283.0262451171875},"pos_end":{"y":73.90631103515625,"x":283.0262451171875}},"t23":{"end_side":"TL","position":{"top":170.4981689453125,"left":516.848876953125},"pos_end":{"y":170.4981689453125,"x":516.848876953125}},"t24":{"end_side":"TR","position":{"top":172.97190856933594,"left":575.9466552734375},"pos_end":{"y":172.97190856933594,"x":638.3695757788862}},"t25":{"end_side":"TL","position":{"top":123.48696899414062,"left":18.7371826171875},"pos_end":{"y":123.48696899414062,"x":18.7371826171875}},"t28":{"end_side":"TL","position":{"top":114.62408447265625,"left":527.5460205078125},"pos_end":{"y":114.62408447265625,"x":527.5460205078125}},"t29":{"end_side":"TR","position":{"top":111.19615173339844,"left":621.40673828125},"pos_end":{"y":111.19615173339844,"x":655.6491204289192}},"t30":{"end_side":"TL","position":{"top":42.01392364501953,"left":86.68402099609375},"pos_end":{"y":42.01392364501953,"x":86.68402099609375}},"t31":{"end_side":"BL","position":{"top":132.0054931640625,"left":59.5723876953125},"pos_end":{"y":182.0069967702898,"x":59.5723876953125}}}');
				$.se.tree.meta.sizeOverride 	=	'M';
				tOffset 	=	(winHeight * .2);
				console.log('No Flexbox. Size: M');
			} else {
				width 	= 	320;
				height 	=	258;
				$.se.tree.meta	=	$.parseJSON('{"widthDif":2.065625,"heightDif":2.065891472868217,"height":258,"scale":"1.24","width":320,"t1":{"position":{"top":14.844436645507812,"left":71.8428955078125},"pos_end":{"y":14.844436645507812,"x":71.8428955078125}},"t2":{"end_side":"TR","position":{"top":19.846153259277344,"left":160.4656982421875},"pos_end":{"y":19.846153259277344,"x":223.391384938481}},"t3":{"end_side":"TL","position":{"top":11.133209228515625,"left":95.56146240234375},"pos_end":{"y":11.133209228515625,"x":95.56146240234375}},"t9":{"end_side":"TL","position":{"top":90.517822265625,"left":113.0372314453125},"pos_end":{"y":90.517822265625,"x":113.0372314453125}},"t10":{"end_side":"TR","position":{"top":23.71857452392578,"left":160.4656982421875},"pos_end":{"y":23.71857452392578,"x":245.23998377074273}},"t11":{"end_side":"TL","position":{"top":123.44839477539062,"left":130.7564697265625},"pos_end":{"y":123.44839477539062,"x":130.7564697265625}},"t12":{"end_side":"MR","position":{"top":100.10496520996094,"left":159.498046875},"pos_end":{"y":114.24236582457236,"x":225.65810561649016}},"t13":{"end_side":"TR","position":{"top":7.624794006347656,"left":242.36444091796875},"pos_end":{"y":7.624794006347656,"x":290.28788196373273}},"t14":{"end_side":"TL","position":{"top":77.59844970703125,"left":0.0206298828125},"pos_end":{"y":77.59844970703125,"x":0.0206298828125}},"t16":{"end_side":"TR","position":{"top":95.00692749023438,"left":53.79693603515625},"pos_end":{"y":95.00692749023438,"x":88.03300413746337}},"t17":{"end_side":"TR","position":{"top":37.92115783691406,"left":158.82666015625},"pos_end":{"y":37.92115783691406,"x":238.42478031037257}},"t18":{"end_side":"TL","position":{"top":36.23859405517578,"left":138.8614501953125},"pos_end":{"y":36.23859405517578,"x":138.8614501953125}},"t23":{"end_side":"TL","position":{"top":83.62249755859375,"left":253.56494140625},"pos_end":{"y":83.62249755859375,"x":253.56494140625}},"t24":{"end_side":"TR","position":{"top":84.83601379394531,"left":282.5557861328125},"pos_end":{"y":84.83601379394531,"x":314.7096781997565}},"t25":{"end_side":"TL","position":{"top":60.56077575683594,"left":9.2122802734375},"pos_end":{"y":60.56077575683594,"x":9.2122802734375}},"t28":{"end_side":"TL","position":{"top":56.21302032470703,"left":258.8125},"pos_end":{"y":56.21302032470703,"x":258.8125}},"t29":{"end_side":"TR","position":{"top":54.53142547607422,"left":304.8565673828125},"pos_end":{"y":54.53142547607422,"x":323.18460964831934}},"t30":{"end_side":"TL","position":{"top":20.593536376953125,"left":42.544189453125},"pos_end":{"y":20.593536376953125,"x":42.544189453125}},"t31":{"end_side":"BL","position":{"top":64.73960876464844,"left":29.24432373046875},"pos_end":{"y":90.79357821409072,"x":29.24432373046875}}}');
				$.se.tree.meta.sizeOverride 	=	'S';
				tOffset 	=	(winHeight * .2);
				console.log('No Flexbox. Size: S');
			}

		}


		// set the svg tree size
		$('#tree').width(width).height(height);
		$('#tree').css({
			'top'	: 	tOffset
		});
		$('#treeSVG').width(width).height(height);
		$('#treeSVG').attr('width',width).attr('height',height);




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
			 	//alert(Modernizr.video.webm + Modernizr.video.h264);
			 	if (Modernizr.video.h264 || Modernizr.video.webm) { // Check to see that h264 works! 
			 		setWorkThumbPositions(workBranch);
			 		setModalSizes(workBranch);
			 		setModalDefaults(workBranch);
			 		//console.log('here: ');
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
		

		if ( !$.se.tree.meta.sizeOverride ) {
			$.se.tree.x_y(workBranch); // set coordinates for this item
		} else {
			// coordinates already set with setTreeSize
		}


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

			//console.log( it + ' : ' + posOffset.left  );
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
				    pluginPath: '.assets/player/',
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
				       mediaElement.player.load(); // Load Video
				    },
				    error: function () {  // fires when a problem is detected
				     	console.log('error!');
				    }
				}
			);
			//$.se.tree.branch[workBranch].player.setSrc(videoSrc); // Set VIDEO
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

