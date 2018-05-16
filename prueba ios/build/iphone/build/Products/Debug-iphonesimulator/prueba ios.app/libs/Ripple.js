exports.round = function(e) {

	var OS_IOS = Titanium.Platform.osname != 'android';
	var _x = (OS_IOS || e.dp) ? e.x : (e.x / Ti.Platform.displayCaps.logicalDensityFactor);
	var _y = (OS_IOS || e.dp) ? e.y : (e.y / Ti.Platform.displayCaps.logicalDensityFactor);

	var maxHeightWidth = Math.max(e.source.rect.width, e.source.rect.height);
	var minHeightWidth = Math.min(e.source.rect.width, e.source.rect.height);

	if (e.source.ripple == undefined) {

		var ripple = Titanium.UI.createView({
			borderRadius : maxHeightWidth / 2,
			height : maxHeightWidth,
			width : maxHeightWidth,
			backgroundColor : e.source.rippleColor,
			opacity : 0.2,
			zIndex : 999,
			touchEnabled : false
		});

		e.source.add(ripple);
		e.source.ripple = ripple;

		var anim_1 = Titanium.UI.createAnimation({
			backgroundColor : e.source.rippleColor,
			opacity : 0.4,
			duration : 0
		});

		anim_1.addEventListener('complete', function() {
			e.source.ripple.animate(e.source.anim_2);
		});

		var anim_2 = Titanium.UI.createAnimation({
			backgroundColor : e.source.rippleColor,
			opacity : 0.2,
			curve : Ti.UI.ANIMATION_CURVE_LINEAR,
			duration : 250
		});

		anim_2.addEventListener('complete', function() {
			e.source.ripple.animate(e.source.anim_3);
			if (e.source.callback) {
				e.source.callback(e.source.params);
			}
		});

		var anim_3 = Titanium.UI.createAnimation({
			backgroundColor : e.source.rippleColor,
			opacity : 0,
			curve : Ti.UI.ANIMATION_CURVE_LINEAR,
			duration : 100
		});

		anim_3.addEventListener('complete', function() {
			e.source.finish();
		});

		e.source.anim_1 = anim_1;
		e.source.anim_2 = anim_2;
		e.source.anim_3 = anim_3;

		e.source.ripple.animate(e.source.anim_1);

	} else {

		e.source.ripple.animate(e.source.anim_1);

	}

};

exports.effect = function(e) {

	var OS_IOS = Titanium.Platform.osname != 'android';
	var _x = (OS_IOS || e.dp) ? e.x : (e.x / Ti.Platform.displayCaps.logicalDensityFactor);
	var _y = (OS_IOS || e.dp) ? e.y : (e.y / Ti.Platform.displayCaps.logicalDensityFactor);

	var maxHeightWidth = Math.max(e.source.rect.width, e.source.rect.height);
	var minHeightWidth = Math.min(e.source.rect.width, e.source.rect.height);

	if (e.source.ripple == undefined) {

		var ripple = Titanium.UI.createView({
			overrideCurrentAnimation : true,
			borderRadius : minHeightWidth / 2,
			height : minHeightWidth,
			width : minHeightWidth,
			center : {
				x : _x,
				y : _y
			},
			backgroundColor : e.source.rippleColor,
			opacity : 0.2,
			zIndex : 999,
			touchEnabled : false
		});

		e.source.add(ripple);
		e.source.ripple = ripple;

		var anim_1 = Titanium.UI.createAnimation({
			center : {
				x : _x,
				y : _y
			},
			backgroundColor : e.source.rippleColor,
			opacity : 0.2,
			duration : 0,
			transform : Ti.UI.create2DMatrix().scale(20 / maxHeightWidth, 20 / maxHeightWidth)
		});

		anim_1.addEventListener('complete', function() {
			e.source.ripple.animate(e.source.anim_2);
			if (e.source.callback) {
				setTimeout(function() {
					e.source.callback(e.source.params);
				}, 200);
			}
		});

		var anim_2 = Titanium.UI.createAnimation({
			curve : Ti.UI.ANIMATION_CURVE_LINEAR,
			backgroundColor : e.source.rippleColor,
			opacity : 0.3,
			duration : 350,
			transform : Ti.UI.create2DMatrix().scale((maxHeightWidth * 2) / minHeightWidth, (maxHeightWidth * 2) / minHeightWidth)
		});

		anim_2.addEventListener('complete', function() {
			e.source.ripple.animate(e.source.anim_3);
		});

		var anim_3 = Titanium.UI.createAnimation({
			backgroundColor : e.source.rippleColor,
			opacity : 0,
			duration : 100,
			curve : Ti.UI.ANIMATION_CURVE_LINEAR
		});

		anim_3.addEventListener('complete', function() {
			if (e.source.finish != undefined) {
				e.source.finish();
			}
			
		});

		e.source.anim_1 = anim_1;
		e.source.anim_2 = anim_2;
		e.source.anim_3 = anim_3;

		e.source.ripple.animate(e.source.anim_1);

	} else {

		e.source.ripple.center = {
			x : _x,
			y : _y
		};
		e.source.anim_1.center = {
			x : _x,
			y : _y
		};
		e.source.ripple.animate(e.source.anim_1);

	}

};

