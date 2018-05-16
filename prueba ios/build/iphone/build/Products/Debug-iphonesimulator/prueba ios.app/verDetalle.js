var Config = require('/libs/Config');
var Permissions = require('/libs/Permissions');
var xhr = require('/mods/xhr');
var ripple = require('/libs/Ripple');

function verDetalle(data) {
	var self;

	var content;

	var myGoalsContainer;

	var leftButton;
	var helpButton;

	var clicking = false;
	var seleccion1 = true;

	var titleHead = '';
	var work = [];

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
		backgroundColor : 'transparent'
	});

	var leftButton = Ti.UI.createButton({
		backgroundImage : '/images/ic_navigate_before_w.png',
		height : 'auto',
		width : 'auto',
		left : '0dp',
		rippleColor : Config.white,
		callback : close,
		finish : finish
	});
	
	leftButton.addEventListener('click', function(e) {
		if (clicking == false) {
			clicking = true;
			ripple.round(e);
		}
	});

	var title = Ti.UI.createLabel({
		text : 'Detalle',
		font : {
			fontSize : '18dp'
		},
		color : Config.white,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		touchEnabled : false
	});

	selector.add(leftButton);
	selector.add(title);

	function finish() {
		clicking = false;
	}

	function close() {
		self.close();
	}


	content.add(selector);
	content.add(contentBody);

	function setBody(data) {

		var resultado = data;

		var contentPelicula = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			top : '10dp',
			left : '0dp',
			right : '0dp',
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
			layout : 'vertical'
		});

		var fecha = Ti.UI.createLabel({
			text : resultado.release_date,
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
			text : resultado.title,
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

		if (resultado.adult == true)
			mayorDe.text = '18+';
		else
			mayorDe.text = '12+';

		var headBottom = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : '20dp',
			top : '0dp',
			left : '0dp',
			right : '0dp',
			backgroundColor : 'transparent'
		});

		var headTop = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			top : '0dp',
			left : '0dp',
			right : '0dp',
			backgroundColor : 'transparent'
		});
		headBottom.add(fecha);
		var cantEst = parseInt(parseFloat(resultado.vote_average) / 2);
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
			image : Config.pathImages + resultado.backdrop_path,
			height : 'auto',
			width : '350dp',
			top : '10dp',
			touchEnabled : false
		});

		var separador = Ti.UI.createView({
			width : Ti.UI.FILL,
			height : '1dp',
			top : '15dp',
			left : '15dp',
			right : '15dp',
			backgroundColor : Config.colorFecha
		});
		
		var descripcion = Ti.UI.createLabel({
			text : resultado.overview,
			font : {
				fontSize : '20dp'
			},
			top : '20dp',
			color : Config.white,
			height : Ti.UI.SIZE,
			width : '370dp',
			touchEnabled : false,
			ellipsize : Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_WORD_WRAP
		});

		contentPelicula.add(imagePic);
		contentPelicula.add(descripcion);
		contentPelicula.add(separador);
		contentBody.add(contentPelicula);

	}


	self.add(bg_image);
	self.add(content);

	nav = Ti.UI.iOS.createNavigationWindow({
		window : self
	});
	
	setBody(data); 

	self.open();

	//construct();
};

module.exports = verDetalle;
