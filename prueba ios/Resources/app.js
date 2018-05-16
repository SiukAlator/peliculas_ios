var Config = require('/libs/Config');
var Permissions = require('/libs/Permissions');
var xhr = require('/mods/xhr');
var ripple = require('/libs/Ripple');

if (Config.isAndroid)
	Config.intentData = Ti.Android.currentActivity.intent.data;
else
	Config.intentData = Ti.App.getArguments().url;

(function() {

	var self;

	var content;

	var myGoalsContainer;

	var leftButton;
	var helpButton;
	var dataEnviar;

	var clicking = false;
	var seleccion1 = true;

	var titleHead = '';
	var work = [];

	var myIndicator = Ti.UI.createActivityIndicator({
		style : Config.isAndroid ? Ti.UI.ActivityIndicatorStyle.BIG_DARK : Ti.UI.ActivityIndicatorStyle.BIG,
		height : '120dp',
		width : '120dp'
	});

	var viewBlack = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		top : '0dp',
		backgroundColor : Config.transparenceBlack2,
		visible : false
	});
	work.push(viewBlack);
	work.push(myIndicator);
	viewBlack.add(myIndicator);

	content = Ti.UI.createView({
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		left : '0dp',
		right : '0dp',
		top : '40dp',
		bottom : '0dp'
	});

	var contentBody = Ti.UI.createScrollView({
		showVerticalScrollIndicator : true,
		width : Ti.UI.FILL,
		top : '80dp',
		left : '0dp',
		right : '0dp',
		bottom : '0dp',
		layout : 'vertical',
		scrollType : 'vertical'
	});

	self = Ti.UI.createWindow({
		title : titleHead,
		navBarHidden : false,
		exitOnClose : true,
		leftNavButtons : [leftButton],
		rightNavButtons : [helpButton],
		windowSoftInputMode : Config.softInput,
		backgroundColor : Config.backgroundColor,
		barColor : Config.actionbarBackgroundColor,
		navTintColor : Config.titleButtonColor,
		orientationModes : Config.orientation,
		titleAttributes : {
			color : Config.titleTextColor,
			fontWeight : 'bold'
		}
	});

	var bg_image = Ti.UI.createImageView({
		image : Config.wallpaperApp,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		top : '0dp'
	});

	var selector = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : '40dp',
		left : '25dp',
		right : '25dp',
		top : '10dp',
		touchEnabled : true,
		backgroundColor : 'transparent',
		borderColor : Config.white,
		borderWidth : '1dp',
		borderRadius : Config.borderRadius
	});

	var selector1 = Ti.UI.createView({
		width : '50%',
		height : Ti.UI.FILL,
		left : '0dp',
		touchEnabled : true,
		rippleColor : Config.white,
		callback : cambioSelector1,
		finish : finish,
		backgroundColor : '#f0813c'
	});

	var selector2 = Ti.UI.createView({
		width : '50%',
		height : Ti.UI.FILL,
		right : '0dp',
		touchEnabled : true,
		rippleColor : Config.white,
		callback : cambioSelector2,
		finish : finish,
		backgroundColor : 'transparent'
	});

	var labelRank = Ti.UI.createLabel({
		text : 'RANKEADAS',
		font : {
			fontSize : '16dp'
		},
		color : Config.white,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		touchEnabled : false
	});

	var labelPop = Ti.UI.createLabel({
		text : 'POPULARES',
		font : {
			fontSize : '16dp'
		},
		color : Config.white,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		touchEnabled : false
	});

	selector1.add(labelRank);
	selector2.add(labelPop);

	function finish() {
		clicking = false;
	}

	function cambioSelector1() {

		selector1.backgroundColor = '#f0813c';
		selector2.backgroundColor = 'transparent';
		contentBody.removeAllChildren();
		callRank();
	}

	function cambioSelector2() {
		selector1.backgroundColor = 'transparent';
		selector2.backgroundColor = '#f0813c';
		contentBody.removeAllChildren();
		callPop();
	}


	selector1.addEventListener('click', function(e) {
		if (clicking == false) {
			clicking = true;
			ripple.round(e);
		}
	});

	selector2.addEventListener('click', function(e) {
		if (clicking == false) {
			clicking = true;
			ripple.round(e);
		}
	});

	selector.add(selector1);
	selector.add(selector2);
	content.add(selector);
	content.add(contentBody);

	function construct() {
		callRank();
	}

	function openDetalle() {
		var Window = require('/verDetalle');
		new Window(dataEnviar);
	}

	function callRank() {
		for (var index in work) {
			work[index].show();
		}
		var params = {
			token : '34738023d27013e6d1b995443764da44'
		};
		xhr.getRank(setBody, params);
	}

	function callPop() {
		for (var index in work) {
			work[index].show();
		}
		var params = {
			token : '34738023d27013e6d1b995443764da44'
		};
		xhr.getPop(setBody, params);
	}

	function setBody(result) {
		

		var resultado = result.results;
		for (var index in resultado) {
			//Ti.API.info('result:', resultado[index]);

			var contentPelicula = Ti.UI.createView({
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				top : '10dp',
				left : '0dp',
				right : '0dp',
				touchEnabled : true,
				backgroundColor : 'transparent',
				layout : 'vertical'
			});

			var head = Ti.UI.createView({
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				top : '0dp',
				left : '15dp',
				right : '15dp',
				backgroundColor : 'transparent',
				layout : 'vertical',
				touchEnabled : false
			});

			var fecha = Ti.UI.createLabel({
				text : resultado[index].release_date,
				font : {
					fontSize : '18dp'
				},
				color : Config.colorFecha,
				height : Ti.UI.SIZE,
				width : '300dp',
				touchEnabled : false,
				left : '0dp',
				top : '0dp',
				ellipsize : Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_WORD_WRAP
			});

			var title = Ti.UI.createLabel({
				text : resultado[index].title,
				font : {
					fontSize : '20dp'
				},
				color : Config.white,
				height : Ti.UI.SIZE,
				width : '340dp',
				touchEnabled : false,
				left : '0dp',
				top : '0dp',
				ellipsize : Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_WORD_WRAP
			});

			var mayorDe = Ti.UI.createLabel({
				font : {
					fontSize : '20dp'
				},
				color : Config.colorMayorDe,
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE,
				touchEnabled : false,
				right : '0dp',
				top : '0dp',
				ellipsize : Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_WORD_WRAP
			});

			if (resultado[index].adult == true)
				mayorDe.text = '18+';
			else
				mayorDe.text = '12+';

			var headBottom = Ti.UI.createView({
				width : Ti.UI.FILL,
				height : '20dp',
				top : '0dp',
				left : '0dp',
				right : '0dp',
				backgroundColor : 'transparent',
				touchEnabled : false
			});

			var headTop = Ti.UI.createView({
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				top : '0dp',
				left : '0dp',
				right : '0dp',
				backgroundColor : 'transparent',
				touchEnabled : false
			});
			headBottom.add(fecha);
			var cantEst = parseInt(parseFloat(resultado[index].vote_average) / 2);
			var separador = 0;
			for (var j = 0; j < cantEst; j++) {
				var estrella = Ti.UI.createImageView({
					image : '/images/estrella.png',
					height : '20dp',
					width : 'auto',
					top : '0dp',
					right : '0dp',
					touchEnabled : false
				});

				if (j != 0) {
					separador = separador + 25;
					estrella.right = separador;
				}

				headBottom.add(estrella);
			}
			//Ti.API.info('cantEst:', cantEst);
			headTop.add(title);
			headTop.add(mayorDe);
			head.add(headTop);
			head.add(headBottom);
			contentPelicula.add(head);

			var imagePic = Ti.UI.createImageView({
				image : Config.pathImages + resultado[index].poster_path,
				height : 'auto',
				width : '280dp',
				top : '10dp',
				touchEnabled : false
			});

			var verDetalle = Ti.UI.createLabel({
				text : 'Ver mas...',
				font : {
					fontSize : '20dp'
				},
				color : Config.colorMayorDe,
				height : '25dp',
				width : Ti.UI.SIZE,
				touchEnabled : true,
				right : '15dp',
				top : '5dp',
				ellipsize : Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_WORD_WRAP,
				rippleColor : Config.white,
				callback : openDetalle,
				data : resultado[index],
				finish : finish
			});

			verDetalle.addEventListener('click', function(e) {

				if (clicking == false) {
					dataEnviar = e.source.data;
					clicking = true;
					ripple.effect(e);
				}
			});

			var separador = Ti.UI.createView({
				width : Ti.UI.FILL,
				height : '1dp',
				top : '15dp',
				left : '15dp',
				right : '15dp',
				backgroundColor : Config.colorFecha,
				touchEnabled : false
			});

			contentPelicula.add(imagePic);
			contentPelicula.add(verDetalle);
			contentPelicula.add(separador);
			contentBody.add(contentPelicula);
		}
		for (var index in work) {
			work[index].hide();
		}
	}


	self.add(bg_image);
	content.add(viewBlack);
	self.add(content);

	nav = Ti.UI.iOS.createNavigationWindow({
		window : self
	});
	

	self.open();
	

	construct();
	

})();
