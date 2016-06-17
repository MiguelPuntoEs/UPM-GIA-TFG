var map;
var sigmet;
var phenomenon;
var tipo;
var firPintados;

String.prototype.capitalize = function () {
	var str = this.charAt(0).toUpperCase() + this.slice(1);
	str = str.replace(/ \w/g, function myFunction(x){return x.toUpperCase();});
	return str;
}

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = function() {
	return Math.min.apply(null, this);
};

function initMap() {
	var centro = new google.maps.LatLng(40.4, 3.12);
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: centro,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		draggableCursor: 'pointer'
	});
	map.addListener('mousemove', function(event){
		$('#coordinates').text(event.latLng.lat().toFixed(4)+'   '+event.latLng.lng().toFixed(4));
	});

	google.maps.InfoWindow.prototype.isOpen = function(){
		var map = this.getMap();
		return (map !== null && typeof map !== "undefined");
	}
}

function createPolygon(polyCoords) {
	var polygon = new google.maps.Polygon({
		paths: polyCoords,
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35
	});
	polygon.setMap(map);
}

function createMarker(location) {
	var icon = {
		url: './symbols/'+phenomenon+'.png', // url
		scaledSize: new google.maps.Size(50, 50), // scaled size
		origin: new google.maps.Point(0,0), // origin
		anchor: new google.maps.Point(25, 25) // anchor
	};    
	
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: icon,
	});

	var contentString = '<table><tr><th colspan="2" id="tabletitle">'+tipo+'</th></tr><tr><th>Fenómeno</th><td>'+sigmet.hazard+'</td></tr><tr><th>FIR</th><td>'+sigmet.fir+'</td></tr><tr><th>Secuencia</th><td>'+sigmet.number+'</td></tr><tr><th>Comienzo</th><td>'+sigmet.begins+'</td></tr><tr><th>Fin</th><td>'+sigmet.ends+'</td></tr><tr><th>Base</th><td>'+sigmet.base+'</td></tr><tr><th>Tope</th><td>'+sigmet.top+'</td></tr><tr><td colspan="2">'+sigmet.forecast+'</td></tr><tr><td colspan="2">'+sigmet.movement+'</td></tr><tr><td colspan="2">'+sigmet.changes+'</td></tr><tr><td colspan="2">'+sigmet.position+'</td></tr></table>';


	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	var code = sigmet.code.replace(/[A-Z]{4}-/, function myFunction(x){return x+'<br/>';});
	console.log(code);

	marker.addListener('mouseover', function() {
		infowindow.open(map, marker);
		$('#codigo').html(code);
		$('#codigo').show();
	});
	
	marker.addListener('mouseout', function() {
		$('#codigo').hide();
	});
	

	
	marker.addListener('click', function() {
//    infowindow.close(map, marker);
//    codewindow.open(map, marker);
//    $('#codigo').text(sigmet.code);
		if(infowindow.isOpen()) {
			infowindow.close();
		}
		else {
			infowindow.open(map, marker);
		}
	});
	
	marker.addListener('mousemove', function(event){
		$('#coordinates').text(event.latLng.lat().toFixed(4)+'   '+event.latLng.lng().toFixed(4));
	});
}

function createPolyline(polyCoords) {
	
		var polyline = new google.maps.Polyline({
				path: polyCoords,
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
		});
		polyline.setMap(map);
}

$(document).ready(function() {
	$('#decodificar').click(codigo); 
	$.ajaxSetup({
			async: false
	});
	$('#load_sigmet').click(function() {
		automatico();
	});
	$('#clear_map').click(function() {
		clear();
	});
	
	firPintados = new Array();
});

function automatico() {
	var sigmetstxt;

	$.get("avweather.txt", function(data) {
		sigmetstxt = data.split("\n***\n");
	});
	sigmetstxt.pop();
	console.log('Se recuperaron '+sigmetstxt.length+' items');

	var i;
	for(i=0; i<sigmetstxt.length; i++){
		sigmet = {
			fir:    "",
			hazard: "",
			number: 0,
			begins: "",
			ends:   "",
			forecast:   "",
			base:   "",
			top:    "",
			movement:   "",
			changes:    "",
			position:   "",
			code: ""
		};
		phenomenon = "";
		sigmetstxt[i] = sigmetstxt[i].replace(/(\s)+/g, ' ');
		code = sigmetstxt[i].replace(/( \r\n | \n | \r | \r\n| \n| \r|\r\n |\n |\r |\r\n|\n|\r)/gm,' ');
		
		sigmet.code = sigmetstxt[i];
//    alert(sigmet.code);
		parseSIGMET(code);
	}  
}

function codigo() {
	var code = $('#input').val();
	
	sigmet = {
		fir:    "",
		hazard: "",
		number: 0,
		begins: "",
		ends:   "",
		forecast:   "",
		base:   "",
		top:    "",
		movement:   "",
		changes:    "",
		position:   "",
		code: ""
	};
	phenomenon = "";
	firPintados = new Array();
	
	sigmet.code = code;
	
	code = code.replace(/(\s)+/g, ' ');
	code = code.replace(/( \r\n | \n | \r | \r\n| \n| \r|\r\n |\n |\r |\r\n|\n|\r)/gm,' ');

	initMap();

	parseSIGMET(code);
}
		
function parseSIGMET(txt){
	var re;
	
	
	
	//  Primera linea
	re = /([A-Z]{4}) (AIRMET|SIGMET) (\w{1,3}) VALID (\d{6}\/\d{6}) ([A-Z]{4})-/;
	if(re.test(txt)) {
		var res = re.exec(txt);
		
		tipo = res[2];

		//  Secuencia
		sigmet.number = res[3];

		//  Validez
		sigmet.begins = dhora(res[4].substring(0,6));
		sigmet.ends = dhora(res[4].substring(7,13));
	}

	//  FIR
	re = /\w{4} ((\w|\s){1,200}) (FIR\/UIR|FIR|CTA)/;
	if(re.test(txt)) {
		var res = re.exec(txt);

		var fir = res[1];
		
		//  Algunos FIR lo llaman diferente.
		switch(fir) {
			case 'LISBON':
				fir = 'LISBOA';
				break;
			case 'ROSTOV':
				fir = 'ROSTOV-NA-DONU';
				break;
		}
		
		sigmet.fir = res[3]+' de '+res[1].toLowerCase().capitalize();

		var firData = null;
		console.log(txt);

		$.getJSON('data/fir_coordinates.json', function (data) {
			var i;
			
			for(i=0; i<data.features.length; i+=1) {
				if(data.features[i].properties.FIRname == 'FIR '+fir) {
					if(firPintados.indexOf(fir) == -1) {
						map.data.addGeoJson(data.features[i]);
						map.data.addListener('mousemove', function(event){
							$('#coordinates').text(event.latLng.lat().toFixed(4)+'   '+event.latLng.lng().toFixed(4));
						});
						map.data.setOptions({draggableCursor: 'crosshair'});
					}
					
					map.setCenter(new google.maps.LatLng(data.features[i].properties.LATcent, data.features[i].properties.LONGcent));
					firData = data.features[i];
				}
			}
			
			if(firData != null) {
				firPintados.push(fir);
			}


			map.data.setStyle({
				fillColor: 'green',
				strokeWeight: 1
			});
		});
	}

	//  Cancelacion
	re = /CNL (SIGMET|AIRMET) (\w{1,3}) (VALID )?\d{6}\/\d{6}/;
	if(re.test(txt)) {
		var res = re.exec(txt);
		alert('Cancelado el '+res[1]+' '+res[2]+' del '+sigmet.fir);
	}

	//  Fenomeno
	if(tipo == 'SIGMET') {
		var re = /OBSC TSGR|EMBD TSGR|FRQ TSGR|SQL TSGR|OBSC TS|EMBD TS|FRQ TS|SQL TS|TC [A-Z]{1,10}|SEV TURB|SEV ICE|SEV ICE FZRA|SEV MTW|HVY DS|HVY SS|VA [A-Z]{1,10}|RDOACT CLD/;
		
		if(re.test(txt)) {
			var res = re.exec(txt);

			switch(res[0]) {
				case "OBSC TS":
					sigmet.hazard = 'Tormentas oscurecidas';
					phenomenon = 'tormentas';
					break;
				case "EMBD TS":
					sigmet.hazard = 'Tormentas inmersas';
					phenomenon = 'tormentas';
					break;
				case "FRQ TS":
					sigmet.hazard = 'Tormentas frecuentes';
					phenomenon = 'tormentas';
					break;
				case "SQL TS":
					sigmet.hazard = 'Línea de turbonada';
					phenomenon = 'linea_de_turbonada';
					break;
				case "OBSC TSGR":
					sigmet.hazard = 'Tormentas oscurecidas por granizo';
					phenomenon = 'tormentas_granizo';
					break;
				case "EMBD TSGR":
					sigmet.hazard = 'Tormentas inmersas con granizo';
					phenomenon = 'tormentas_granizo';
					break;
				case "FRQ TSGR":
					sigmet.hazard = 'Tormentas frecuentes con granizo';
					phenomenon = 'tormentas_granizo';
					break;
				case "SQL TSGR":
					sigmet.hazard = 'Línea de turbonada con granizo';
					phenomenon = 'tormentas_granizo';
					break;
				case "SEV TURB":
					sigmet.hazard = 'Turbulencia fuerte';
					phenomenon = 'turbulencia_fuerte';
					break;
				case "SEV ICE":
					sigmet.hazard = 'Engelamiento fuerte';
					phenomenon = 'engelamiento_fuerte';
					break;
				case "SEV ICE FZRA":
					sigmet.hazard = 'Engelamiento fuerte por lluvia engelante';
					phenomenon = 'precipitacion_engelante';
					break;
				case "SEV MTW":
					sigmet.hazard = 'Ondas orográficas fuertes';
					phenomenon = 'ondas_orograficas';
					break;
				case "HVY DS":
					sigmet.hazard = 'Tempestad fuerte de polvo';
					phenomenon = 'tempestad_arena_polvo';
					break;
				case "HVY SS":
					sigmet.hazard = 'Tempestad fuerte de arena';
					phenomenon = 'tempestad_arena_polvo';
					break;
				case "RDOACT CLD":
					sigmet.hazard = 'Nube radioactiva';
					phenomenon = 'nube_radioactiva';
					break;
				default:
					if(res[0].substring(0,2)=='VA'){
						sigmet.hazard = 'Cenizas volcánicas '+res[0].substring(3,res[0].length);
						phenomenon = 'erupcion_volcanica';
					}
					if(res[0].substring(0,2)=='TC'){
						sigmet.hazard = 'Ciclón tropical '+res[0].substring(3,res[0].length);
						phenomenon = 'ciclon_tropical';
					}
					break;                   
			}
		}
	}
	else if(tipo == 'AIRMET') {
		if(/SFC WSPD (\d{1,3})(KT|KMH|MPS)/.test(txt)) {
			res = /SFC WSPD (\d{1,3})(KT|KMH|MPS)/.exec(txt);
			sigmet.hazard = 'Viento en superficie de '+res[1]+units(res[2]);
			phenomenon = 'viento';
		}
		else if(/BKN CLD (\d+)\/(ABV)?(\d+)(M|FT)/.test(txt)) {
			res = /BKN CLD (\d+)\/(ABV)?(\d+)(M|FT)/.exec(txt);
			sigmet.hazard = 'Cielo nuboso';
			sigmet.base = numberWithCommas(res[1])+units(res[4]);
			sigmet.top = numberWithCommas(res[3])+units(res[4]);
			phenomenon = 'bkn';
		}
		else if(/OVC CLD (\d+)\/(ABV)?(\d+)(M|FT)/.test(txt)) {
			res = /OVC CLD (\d+)\/(ABV)?(\d+)(M|FT)/.exec(txt);
			sigmet.hazard = 'Cielo cubierto';
			sigmet.base = numberWithCommas(res[1])+units(res[4]);
			sigmet.top = numberWithCommas(res[3])+units(res[4]);
			phenomenon = 'ovc';
		}
		else if(/SFC VIS (\d+)M (DZ|RA|SN|SG|PL|GR|GS|FG|BR|SA|DU|HZ|FU|VA|PO|SQ|FC|DS|SS)/.test(txt)) {
			res = /SFC VIS (\d+)M (DZ|RA|SN|SG|PL|GR|GS|FG|BR|SA|DU|HZ|FU|VA|PO|SQ|FC|DS|SS)/.exec(txt);
			sigmet.hazard = 'Visibilidad en superficie de '+numberWithCommas(res[1])+' m';
			switch(res[2]) {
				case 'DZ':
					phenomenon = 'llovizna';
					break;
				case 'RA':
					phenomenon = 'lluvia';
					break;
				case 'SN':
					phenomenon = 'nieve';
					break;
				case 'SG':
					phenomenon = 'nieve';
					break;
				case 'PL':
					phenomenon = 'granizo';
					break;
				case 'GR':
					phenomenon = 'granizo';
					break;
				case 'GS':
					phenomenon = 'granizo';
					break;
				case 'FG':
					phenomenon = 'niebla';
					break;
				case 'BR':
					phenomenon = 'neblina';
					break;
				case 'SA':
					phenomenon = 'calima_arena_polvo';
					break;
				case 'DU':
					phenomenon = 'calima_arena_polvo';
					break;
				case 'HZ':
					phenomenon = 'calima';
					break;
				case 'FU':
					phenomenon = 'humo';
					break;
				case 'VA':
					phenomenon = 'nube_cenizas';
					break;
				case 'PO':
					phenomenon = 'tempestad_arena_polvo';
					break;
				case 'SQ':
					phenomenon = 'linea_de_turbonada';
					break;
				case 'FC':
					phenomenon = 'tornado';
					break;
				case 'DS':
					phenomenon = 'tempestad_arena_polvo';
					break;
				case 'SS':
					phenomenon = 'tempestad_arena_polvo';
					break;
			}
		}
		else if(/(ISOL TSGR|OCNL TSGR|ISOL TS|OCNL TS|MT OBSC|ISOL CB|OCNL CB|FRQ CB|ISOL TCU|OCNL TCU|FRQ TCU|MOD ICE|MOD TURB|MOD MTW)/.test(txt)) {
			res = /(ISOL TSGR|OCNL TSGR|ISOL TS|OCNL TS|MT OBSC|ISOL CB|OCNL CB|FRQ CB|ISOL TCU|OCNL TCU|FRQ TCU|MOD ICE|MOD TURB|MOD MTW)/.exec(txt);
			switch(res[1]) {
				case 'ISOL TS':
					sigmet.hazard = 'Tormentas aisladas';
					phenomenon = 'tormentas';
					break;
				case 'OCNL TS':
					sigmet.hazard = 'Tormentas ocasionales';
					phenomenon = 'tormentas';
					break;
				case 'ISOL TSGR':
					sigmet.hazard = 'Tormentas aisladas con granizo';
					phenomenon = 'tormentas_granizo';
					break;
				case 'OCNL TSGR':
					sigmet.hazard = 'Tormentas ocasionales con granizo';
					phenomenon = 'tormentas_granizo';
					break;
				case 'MT OBSC':
					sigmet.hazard = 'Montañas oscurecidas';
					phenomenon = 'montañas_oscurecidas';
					break;
				case 'ISOL CB':
					sigmet.hazard = 'Cumulonimbus aislados';
					phenomenon = 'CB';
					break;
				case 'OCNL CB':
					sigmet.hazard = 'Cumulonimbus ocasionales';
					phenomenon = 'CB';
					break;
				case 'FRQ CB':
					sigmet.hazard = 'Cumulonimbus frecuentes';
					phenomenon = 'CB';
					break;
				case 'ISOL TCU':
					sigmet.hazard = 'Cúmulos en forma de torre aislados';
					phenomenon = 'TCU';
					break;
				case 'OCNL TCU':
					sigmet.hazard = 'Cúmulos en forma de torre ocasionales';
					phenomenon = 'TCU';
					break;
				case 'FRQ TCU':
					sigmet.hazard = 'Cúmulos en forma de torre frecuentes';
					phenomenon = 'TCU';
					break;
				case 'MOD ICE':
					sigmet.hazard = 'Engelamiento moderado';
					phenomenon = 'engelamiento_moderado';
					break;
				case 'MOD TURB':
					sigmet.hazard = 'Turbulencia moderada';
					phenomenon = 'turbulencia_moderada';
					break;
				case 'MOD MTW':
					sigmet.hazard = 'Onda orográfica moderada';
					phenomenon = 'ondas_orograficas';
					break;
			}
		}
		else {
			alert('Error recuperando el fenómeno');
		}
	}
	
	//  Observado o pronosticado
	re = /(OBS|FCST)( AT \d{4}Z)?/; 
	if(re.test(txt)) {
		res = re.exec(txt);
		if(res[1] == 'OBS') {
			sigmet.forecast = 'Fenómeno observado';
		}
		else if(res[1] == 'FCST') {
			sigmet.forecast = 'Fenómeno pronosticado';
		}
		if(res[2]!=null){
			sigmet.forecast += ' a las '+hora(res[2].substring(4,res[2].length));
		} 
	}
	
	//  Nivel
	re = /(FL(\d{3})\/(\d{3})|SFC\/FL\d{3}|SFC\/(\d{1,4})(M|FT)|TOP ABV FL(\d{3})|TOP FL(\d{3})|ABV FL(\d{3})|FL(\d{3}))/;
	if(re.test(txt)) {
		if(/FL(\d{3})\/(\d{3})/.test(txt)) {
			res = /FL(\d{3})\/(\d{3})/.exec(txt);
			sigmet.base = fl2ft(res[1]);
			sigmet.top = fl2ft(res[2]);
		}
		else if(/SFC\/FL\d{3}/.test(txt)) {
			res = /SFC\/FL(\d{3})/.exec(txt);
			sigmet.base = 'Superficie';
			sigmet.top = fl2ft(res[1]);
		}
		else if(/SFC\/(\d{1,4})M/.test(txt)) {
			res = /SFC\/(\d{1,4})M/.exec(txt);
			sigmet.base = 'Superficie';
			sigmet.top = numberWithCommas(parseInt(res[1]/.305))+' ft';
		}
		else if(/SFC\/(\d{1,4})FT/.test(txt)) {
			res = /SFC\/(\d{1,4})FT/.exec(txt);
			sigmet.base = 'Superficie';
			sigmet.top = numberWithCommas(res[1])+' ft';
		}
		else if(/TOP ABV FL(\d{3})/.test(txt)) {
			res = /TOP ABV FL(\d{3})/.exec(txt);
			sigmet.base = '-';
			sigmet.top = fl2ft(res[1]);
		}
		else if(/TOP FL(\d{3})/.test(txt)) {
			res = /TOP FL(\d{3})/.exec(txt);
			sigmet.base = '-';
			sigmet.top = fl2ft(res[1]);
		}
		else if(/ABV FL(\d{3})/.test(txt)) {
			res =/ABV FL(\d{3})/.exec(txt);
			sigmet.base = fl2ft(res[1]);
			sigmet.top = '-';
		}
		else if(/FL(\d{3})/.test(txt)) {
			res = /FL(\d{3})/.exec(txt);
			sigmet.base = fl2ft(res[1]);
			sigmet.top = fl2ft(res[1]);
		}
	}
	
	//  Movimiento o movimiento previsto
	re = /(MOV (N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW) (\d{1,2})?(KMH|KT)?|STNR)/;
	if(re.test(txt)) {
			if(/MOV (N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW) (\d{1,2})?(KMH|KT)?/.test(txt)) {
			var res = /MOV (N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW) (\d{1,2})?(KMH|KT)?/.exec(txt);
			sigmet.movement = 'Movimiento hacia el '+cdirection(res[1]);
			if(res[2]!=null) {
				sigmet.movement += ', '+res[2]+units(res[3]);
			} 
		}
		else if(/STNR/.test(txt)) {
			sigmet.movement = 'Estacionario';
		}
	}
	
	//  Cambios de intensidad
	re = /(WKN|NC|INTSF)/;
	if(re.test(txt)) {
		if(/WKN/.test(txt)) {
			sigmet.changes = 'Debilitándose';
		}
		else if(/NC/.test(txt)) {
			sigmet.changes = 'Sin cambios';
		}
		else if(/INTSF/.test(txt)) {
			sigmet.changes = 'Intensificándose';
		}
	}

	//  Localizacion
		{
		if(/(N|NE|E|SE|S|SW|W|NW) OF LINE (N|S)(\d{2,4}) (E|W)(\d{3,5}) - (N|S)(\d{2,4}) (E|W)(\d{3,5})/.test(txt)) {
			var res = /(N|NE|E|SE|S|SW|W|NW) OF LINE (N|S)(\d{2,4}) (E|W)(\d{3,5}) - (N|S)(\d{2,4}) (E|W)(\d{3,5})/.exec(txt);

			var polyCoords = [];
			polyCoords.push(new google.maps.LatLng(str2coord(res[2]+res[3]), str2coord(res[4]+res[5])));
			polyCoords.push(new google.maps.LatLng(str2coord(res[6]+res[7]), str2coord(res[8]+res[9])));
			createPolyline(polyCoords);

			sigmet.position = 'Al '+cdirection(res[1])+' de la línea';
			createMarker(google.maps.geometry.spherical.interpolate(polyCoords[0], polyCoords[1], 0.5));
		}
		else if(/ENTIRE FIR/.test(txt)) {
			sigmet.position = 'FIR completo';
			if(firData != null) {
				createMarker(new google.maps.LatLng(firData.properties.LATcent, firData.properties.LONGcent));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		else if(/ENTIRE CTA/.test(txt)) {
			if(firData != null) {
				sigmet.position = 'CTA completa';
				createMarker(new google.maps.LatLng(firData.properties.LATcent, firData.properties.LONGcent));
			}
			else {
				alert('Error recuperando informacion de la CTA');
			}
		}
		else if(/WI (N|S)(\d{2,4}) (W|E)(\d{3,5}) - ((N|S)\d{2,4} (W|E)\d{3,5}) - ((N|S)\d{2,4} (W|E)\d{3,5})( - ((N|S)\d{2,4} (W|E)\d{3,5}))?( - ((N|S)\d{2,4} (W|E)\d{3,5}))?( - ((N|S)\d{2,4} (W|E)\d{3,5}))?( - ((N|S)\d{2,4} (W|E)\d{3,5}))?/.test(txt)) {
			var res = /WI (N|S)(\d{2,4}) (W|E)(\d{3,5}) - (N|S)(\d{2,4}) (W|E)(\d{3,5}) - (N|S)(\d{2,4}) (W|E)(\d{3,5})( - (N|S)(\d{2,4}) (W|E)(\d{3,5}))?( - (N|S)(\d{2,4}) (W|E)(\d{3,5}))?( - (N|S)(\d{2,4}) (W|E)(\d{3,5}))?( - (N|S)(\d{2,4}) (W|E)(\d{3,5}))?/.exec(txt);

			var polyCoords = [];
			polyCoords.push(new google.maps.LatLng(str2coord(res[1]+res[2]), str2coord(res[3]+res[4])));
			polyCoords.push(new google.maps.LatLng(str2coord(res[5]+res[6]), str2coord(res[7]+res[8])));
			polyCoords.push(new google.maps.LatLng(str2coord(res[9]+res[10]), str2coord(res[11]+res[12])));

			i = 13;
			while(res[i]!=null){
				polyCoords.push(new google.maps.LatLng(str2coord(res[i+1]+res[i+2]), str2coord(res[i+3]+res[i+4])));
				i+=5;
			}
			createPolygon(polyCoords);

			var bounds = new google.maps.LatLngBounds();
			var i;
			for (i = 0; i < polyCoords.length; i++) {
				bounds.extend(polyCoords[i]);
			}
			createMarker(bounds.getCenter());
			map.setCenter(bounds.getCenter());
		}
		else if(/(N|S) OF (N|S)(\d{2,4}) AND (W|E) OF (W|E)(\d{3,5})/.test(txt)) {
			var res = /(N|S) OF (N|S)(\d{2,4}) AND (W|E) OF (W|E)(\d{3,5})/.exec(txt);
			
			if(firData != null) { 
				var lat = str2coord(res[2]+res[3]);
				var long = str2coord(res[5]+res[6]);
				var corteslat = getCortes(firData, res[2]+res[3]);
				var corteslong = getCortes(firData, res[5]+res[6]);
				
				
				
				corteslat = corteslat.sort(function(a, b){return a-b});
				corteslong = corteslong.sort(function(a, b){return a-b});
				
				console.log(corteslat);
				console.log(corteslong);
					
				polyCoords = new Array();
				
				pto = new google.maps.LatLng(lat, long);
				console.log(pto.lat(), pto.lng());
				
				if(res[1]=='N' && res[4]=='E') {
					polyCoords.push(new google.maps.LatLng(lat, long));  
					polyCoords.push(new google.maps.LatLng(corteslong.max(), long));  
					createPolyline(polyCoords);
					
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, long));  
					polyCoords.push(new google.maps.LatLng(lat, corteslat.max()));  
					createPolyline(polyCoords);
				}
				else if(res[1]=='N' && res[4]=='W') {
					polyCoords.push(new google.maps.LatLng(lat, long));  
					polyCoords.push(new google.maps.LatLng(corteslong.max(), long));  
					createPolyline(polyCoords);
					
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, corteslat.min()));  
					polyCoords.push(new google.maps.LatLng(lat, long));  
					createPolyline(polyCoords);
				}
				else if(res[1]=='S' && res[4]=='W') {
					polyCoords.push(new google.maps.LatLng(corteslong.min(), long));  
					polyCoords.push(new google.maps.LatLng(lat, long));  
					createPolyline(polyCoords);
					
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, corteslat.min()));  
					polyCoords.push(new google.maps.LatLng(lat, long));  
					createPolyline(polyCoords);
				}
				else if(res[1]=='S' && res[4]=='E') {
					polyCoords.push(new google.maps.LatLng(corteslong.min(), long));  
					polyCoords.push(new google.maps.LatLng(lat, long));  
					createPolyline(polyCoords);
					
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, long));  
					polyCoords.push(new google.maps.LatLng(lat, corteslat.max()));  
					createPolyline(polyCoords);
				}
					
				
				sigmet.position = 'Al '+cdirection(res[1])+' de '+res[2]+res[3]+' y '+cdirection(res[4])+' de '+res[5]+res[6];

				createMarker(new google.maps.LatLng(str2coord(res[2]+res[3]), str2coord(res[5]+res[6])));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		else if(/(N|S) OF (N|S)(\d{2,4}) AND (N|S) OF (N|S)(\d{2,4})/.test(txt)) {
			var res = /(N|S) OF (N|S)(\d{2,4}) AND (N|S) OF (N|S)(\d{2,4})/.exec(txt);
			
			if(firData != null) { 
				var lat1 = str2coord(res[2]+res[3]);
				var lat2 = str2coord(res[5]+res[6]);
				var corteslat1 = getCortes(firData, res[2]+res[3]);
				var corteslat2 = getCortes(firData, res[5]+res[6]);
				
				cortes = corteslat1;
				lat = lat1;
				var polyCoords;
				for(i = 0; i<cortes.length; i=i+2) {
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, cortes[i]));
					polyCoords.push(new google.maps.LatLng(lat, cortes[i+1]));
					createPolyline(polyCoords);
					console.log(lat, cortes[i]);
					console.log(lat, cortes[i+1]);
				}
				
				cortes = corteslat2;
				lat = lat2;
				for(i = 0; i<cortes.length; i=i+2) {
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, cortes[i]));
					polyCoords.push(new google.maps.LatLng(lat, cortes[i+1]));
					createPolyline(polyCoords);
					console.log(lat, cortes[i]);
					console.log(lat, cortes[i+1]);
				}
					
				sigmet.position = 'Al '+cdirection(res[1])+' de '+res[2]+res[3]+' y '+cdirection(res[4])+' de '+res[5]+res[6];

				createMarker(new google.maps.LatLng(lat1/2+lat2/2, firData.properties.LONGcent));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		else if(/(E|W) OF (E|W)(\d{3,5}) AND (E|W) OF (E|W)(\d{3,5})/.test(txt)) {
			var res = /(E|W) OF (E|W)(\d{3,5}) AND (E|W) OF (E|W)(\d{3,5})/.exec(txt);
			
			if(firData != null) { 
				var long1 = str2coord(res[2]+res[3]);
				var long2 = str2coord(res[5]+res[6]);
				var corteslong1 = getCortes(firData, res[2]+res[3]);
				var corteslong2 = getCortes(firData, res[5]+res[6]);
				
				cortes = corteslong1;
				long = long1;
				var polyCoords;
				for(i = 0; i<cortes.length; i=i+2) {
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(cortes[i], long));
					polyCoords.push(new google.maps.LatLng(cortes[i+1], long));
					createPolyline(polyCoords);
				}
				
				cortes = corteslong2;
				long = long2;
				var polyCoords;
				for(i = 0; i<cortes.length; i=i+2) {
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(cortes[i], long));
					polyCoords.push(new google.maps.LatLng(cortes[i+1], long));
					createPolyline(polyCoords);
				}
					
				sigmet.position = 'Al '+cdirection(res[1])+' de '+res[2]+res[3]+' y '+cdirection(res[4])+' de '+res[5]+res[6];

				createMarker(new google.maps.LatLng(firData.properties.LATcent, long1/2+long2/2));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		else if(/(N|S) OF (N|S)(\d{2,4})/.test(txt)) {
			var res = /(N|S) OF (N|S)(\d{2,4})/.exec(txt);
			
			if(firData != null) { 
				var lat = str2coord(res[2]+res[3]);
			
				cortes = getCortes(firData, res[2]+res[3]);

				var polyCoords;
				for(i = 0; i<cortes.length; i=i+2) {
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(lat, cortes[i]));
					polyCoords.push(new google.maps.LatLng(lat, cortes[i+1]));
					createPolyline(polyCoords);
//          console.log(lat, cortes[i]);
//          console.log(lat, cortes[i+1]);
				}
				
				sigmet.position = 'Al '+cdirection(res[1])+' de la latitud '+res[2]+res[3];

				createMarker(new google.maps.LatLng(str2coord(res[2]+res[3]), (cortes.max()+cortes.min())/2));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		else if(/(W|E) OF (W|E)(\d{3,5})/.test(txt)) {
			var res = /(W|E) OF (W|E)(\d{3,5})/.exec(txt);
			
			if(firData != null) {
				var long = str2coord(res[2]+res[3]);

				cortes = getCortes(firData, res[2]+res[3]);
				
				var polyCoords;
				for(i = 0; i<cortes.length; i=i+2) {
					polyCoords = new Array();
					polyCoords.push(new google.maps.LatLng(cortes[i], long));
					polyCoords.push(new google.maps.LatLng(cortes[i+1], long));
					createPolyline(polyCoords);
				}
				
				sigmet.position = 'Al '+cdirection(res[1])+' de la longitud '+res[2]+res[3]; 
				createMarker(new google.maps.LatLng((cortes.max()+cortes.min())/2, str2coord(res[2]+res[3])));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		else if(/(N|S)(\d{2,4}) (W|E)(\d{3,5})/.test(txt)) {
			var res = /(N|S)(\d{2,4}) (W|E)(\d{3,5})/.exec(txt);
			sigmet.position = 'Punto '+res[0];
			var location = new google.maps.LatLng(str2coord(res[1]+res[2]),str2coord(res[3]+res[4]));
			createMarker(location);
		}
		else {
			if(firData != null) {
				sigmet.position = 'Localización no reconocida';
				createMarker(new google.maps.LatLng(firData.properties.LATcent, firData.properties.LONGcent));
			}
			else {
				alert('Error recuperando informacion del FIR');
			}
		}
		}
}

function cdirection(txt) {
	switch(txt) {
		case 'N':
			return 'Norte';
			break;
		case 'NNE':
			return 'Nornordeste';
			break;
		case 'NE':
			return 'Noreste';
			break;
		case 'ENE':
			return 'Estenordeste';
			break;
		case 'E':
			return 'Este';
			break;
		case 'ESE':
			return 'Estesudeste';
			break;
		case 'SE':
			return 'Sudeste';
			break;
		case 'SSE':
			return 'Sudsudeste';
			break;
		case 'S':
			return 'Sur';
			break;
		case 'SSW':
			return 'Sudsudoeste';
			break;
		case 'SW':
			return 'Sudoeste';
			break;
		case 'WSW':
			return 'Oestesudoeste';
			break;
		case 'W':
			return 'Oeste';
			break;
		case 'WNW':
			return 'Oesnoroeste';
			break;
		case 'NW':
			return 'Noroeste';
			break;
		case 'NNW':
			return 'Nornoroeste';
			break;
	}
}

function giveFormat(number, unit){
	return  numberWithCommas(parseInt(number)+units(unit));
	
//  return numberWithCommas(parseInt(/\d+/.exec(txt)))+units(/[A-Z]+/.exec(txt));
	
//  re = /(\d+)([A-Z]+)/;
//  if(re.test(txt)) {
//    var res = re.exec(txt);
//    return numberWithCommas(parseInt(res[1]))+units(res[2]);
//  }
//  else {
//    return 'Error de formato';
//  }
	
}

function units(txt) {
	switch(txt) {
		case 'KT':
			return ' kts';
			break;
		case 'KMH':
			return ' km/h';
			break;
		case 'MPS':
			return ' m/s';
			break;
		case 'M':
			return ' m';
			break;
		case 'FT':
			return ' ft';
			break;      
	}
}

function fl2ft(txt) {
	return numberWithCommas(parseInt(txt)*100)+' ft';
}

function fl2m(txt) {
	return numberWithCommas(parseInt(txt)*100*.305)+' m';
}

function numberWithCommas(x) {
//  return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return x;
}

function str2coord(txt){
	if(txt[0]=='N'||txt[0]=='S') {
		if(txt.length == 5) {
			return parseInt(txt.replace('N','').replace('S','-'))/100.;
		}
		else if(txt.length == 3) {
			return parseInt(txt.replace('N','').replace('S','-'));
		}
	}
	else {
		if(txt.length == 6){
			return parseInt(txt.replace('E','').replace('W','-'))/100.;
		}
		else if(txt.length == 4) {
			return parseInt(txt.replace('E','').replace('W','-'));
		}
	}
}

function hora(txt){
	// var d = new Date();
	// d.setUTCHours(txt.substring(0,2));
	// d.setUTCMinutes(txt.substring(2,4));
	// d.setSeconds(0);
	return txt.substring(0,2)+':'+txt.substring(2,4)+' Z';
}

function dhora(txt){ //  Convierte dia y hora a formato legible
	var d = new Date();
	d.setUTCHours(txt.substring(2,4));
	d.setUTCMinutes(txt.substring(4,6));
	d.setSeconds(0);
	return txt.substring(2,4)+':'+txt.substring(4,6)+' Z'+' del día '+txt.substring(0,2);
}

function clear(){
	$('#input').val('');
	initMap();
	sigmet = {
		fir:    "",
		hazard: "",
		number: 0,
		begins: "",
		ends:   "",
		forecast:   "",
		base:   "",
		top:    "",
		movement:   "",
		changes:    "",
		position:   "",
		code: ""
	};
	
	firPintados = new Array();  
}

function getCortes(firData, txt) {
	if(firData != null) { 
		
		var cortes = new Array();
		
		if(txt.charAt(0)=='N'||txt.charAt(0)=='S') {
			var lat = str2coord(txt);
			
			for(i = 0; i<firData.geometry.coordinates[0][0].length; i++) {
				p = [firData.geometry.coordinates[0][0][i][1], firData.geometry.coordinates[0][0][i][0]];

				if(i==0) {
					p_1 = [firData.geometry.coordinates[0][0][firData.geometry.coordinates[0][0].length-1][1], firData.geometry.coordinates[0][0][firData.geometry.coordinates[0][0].length-1][0]];
				}
				else {
					p_1 = [firData.geometry.coordinates[0][0][i-1][1], firData.geometry.coordinates[0][0][i-1][0]];
				}


				if((p[0]-lat)*(p_1[0]-lat)<0) {
					m = (p[0]-p_1[0])/(p[1]-p_1[1]);
					cortes.push(p_1[1]+(lat-p_1[0])/m);
				}
				else if(p_1[0]-lat==0) {
					cortes.push(p_1[1]);
				}
			}
		}
		else if(txt.charAt(0)=='E'||txt.charAt(0)=='W') {
			var long = str2coord(txt);

			for(i = 0; i<firData.geometry.coordinates[0][0].length; i++) {
				p = [firData.geometry.coordinates[0][0][i][1], firData.geometry.coordinates[0][0][i][0]];
				
				if(i==0) {
					p_1 = [firData.geometry.coordinates[0][0][firData.geometry.coordinates[0][0].length-1][1], firData.geometry.coordinates[0][0][firData.geometry.coordinates[0][0].length-1][0]];
				}
				else {
					p_1 = [firData.geometry.coordinates[0][0][i-1][1], firData.geometry.coordinates[0][0][i-1][0]];
				}

				if((p[1]-long)*(p_1[1]-long)<0) {
					m = (p[0]-p_1[0])/(p[1]-p_1[1]);
//            cortes.push((p[1]+p_1[1])/2);
					cortes.push(p_1[0]+(long-p_1[1])*m);
				}
				else if(p_1[1]-long==0) {
					cortes.push(p_1[0]);
				}
			}
		}
		
		
		cortes = cortes.sort(function(a, b){return a-b});
		console.log(cortes);
		
		return cortes;
	}
}

function getCoordinatesFromFIR(firData) {
	var polyCoords = new Array();
	for(i = 0; i<firData.geometry.coordinates[0][0].length; i++) {
		polyCoords.push(new google.maps.LatLng(firData.geometry.coordinates[0][0][i][1], firData.geometry.coordinates[0][0][i][0]));
	}
	return new google.maps.Polygon({paths: polyCoords});
}

function printCoords(latlng) {
	console.log(latlng.lat(), latlng.lng());
}