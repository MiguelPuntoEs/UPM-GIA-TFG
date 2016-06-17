var textoSalida;
function saida(text)
{
    textoSalida += text;
}

function numeros(ch)              
{
    return ( (ch == '0') || (ch == '1') || (ch == '2') || (ch == '3') ||
             (ch == '4') || (ch == '5') || (ch == '6') || (ch == '7') ||
             (ch == '8') || (ch == '9') );
}

function letras(ch)
{
    return ( (ch >= 'A') && (ch <= 'Z') );
}

function decodificar(codigo)
{

	//AVISO Y NUMERO
	if(codigo == "AD") {
		saida("Aviso número: ");
		return;
	}
		
		
	if(codigo == "WRNG") {
		return;
	}

	
	var numero = /^(\d{1})$/;
	
	if (numero.test(codigo)){
		var matriznumero = numero.exec(codigo);

		saida(""+matriznumero[1]+"");
		
	saida(" ");	
	}
	
	//VALIDEZ
	if(codigo == "VALID"){
	
	saida("\n\nEl período de validez es ");
	return;

	}

	
	var periodo = /^(\d{6})\/(\d{6})(=)?$/; 
	if (periodo.test(codigo)){
		var matrizperiodo = periodo.exec(codigo);
		
		
		saida("del día  "+matrizperiodo[1].substr(0,2)+ " a las "+matrizperiodo[1].substr(2,2)+":"+matrizperiodo[1].substr(4,2)+" hasta");
		saida(" el día  "+matrizperiodo[2].substr(0,2)+ " a las "+matrizperiodo[2].substr(2,2)+":"+matrizperiodo[2].substr(4,2)+"");
		saida("\n");
	}

	
	
	//CALIFICADORES 
	
	if (codigo == "HVY"){
	
	saida("Fuerte ");
	return;
	
	}
	
	if (codigo == "MOD"){
	
	saida("Moderada ");
	return;
	
	}
	
	
	//FENOMENOS METEOROLOGICOS 
	
	
	if (codigo == "SFC"){
	
	return;
	
	}
	
	if (codigo == "WSPD"){
	
	saida("\n Velocidad media del viento de ");
	return;
	
	}
	
	if (codigo == "MAX"){
	
	saida(", con racha maxima de ");
	return;
	
	}
	
	if (codigo == "WIND"){
	
	saida("\n Viento medio en superficie con ");
	return;
	
	}
	
	if (codigo == "TS"){
	
	saida("\n Tormenta ");
	return;
	
	}
	
	if (codigo == "SQ"){
	
	saida("\n Turbonada ");
	return;
	
	}
	
	if (codigo == "GR"){
	
	saida("\n Granizo ");
	return;
	
	}
	
	if (codigo == "SN"){
	
	saida("\n Nieve ");
	return;
	
	}
	
	if (codigo == "FZRA"){
	
	saida("\n Lluvia engelante ");
	return;
	
	}
	
	if (codigo == "FZDZ"){
	
	saida("\n Llovizna engelante ");
	return;
	
	}
	
	if (codigo == "RIME"){
	
	saida("\n Escarcha o cencellada blanca ");
	return;
	
	}
	
	if (codigo == "SS"){
	
	saida("\n Tempestad de arena ");
	return;
	
	}
	
	if (codigo == "DS"){
	
	saida("\n Tempestad de polvo ");
	return;
	
	}
	
	if (codigo == "SA"){
	
	saida("\n Arena llevantada por el viento ");
	return;
	
	}
	
	if (codigo == "DU"){
	
	saida("\n Polvo llevantado por el viento ");
	return;
	
	}
	
	if (codigo == "FROST"){
	
	saida("\n Helada ");
	return;
	
	}
	
	if (codigo == "RAINFALL"){

	return;
	
	}
	
	if (codigo == "IN"){
	
	saida("\n Precipitación acumulada en ");
	return;
	
	}
	
	if (codigo == "1HR"){
	
	saida("1 hora, ");
	return;
	
	}
	
	if (codigo == "12HR"){
	
	saida("12 horas, ");
	return;
	
	}
	
	if (codigo == "MORE"){
	
	saida("con mas ");
	return;
	
	}
	
	if (codigo == "THAN"){
	
	return;
	
	}
	
	
	if (codigo == "TSUNAMI"){
	
	saida("\n Tsunami \n");
	return;
	
	}
	
	if (codigo == "TOX"){
	
	return;
	
	}
	
	if (codigo == "CHEM"){
	
	saida("\n Substancias químicas toxicas \n");
	return;
	
	}
		
	
	if (codigo == "VA"){
	
	saida("\n Ceniza volcánica \n");
	return;
	
	}
	
	var viento = /^(\d{2})(\d{1})?KT(=)?$/;
	if(viento.test(codigo)){
	
		var matrizviento = viento.exec(codigo);
		if(typeof matrizviento[2] != "undefined"){
			saida(""+matrizviento[1]+""+matrizviento[2]+ " nudos");
		}
		else{
			saida(""+matrizviento[1]+" nudos");
		}
			
	return;
	}
	
	
	
	var racha = /^(\d{2})(\d{1})?(=)?$/;
	if (racha.test(codigo)){
	
		var matrizracha = racha.exec(codigo);
		if(typeof matrizracha[2] != "undefined"){
			saida(""+matrizracha[1]+""+matrizracha[2]+ " nudos");
		}
		else{
			saida(""+matrizracha[1]+" nudos");
		}
	saida("\n");
	return;
	}
	
	
	
	var dirvel = /^(\d{3})\/(\d{2})(\d{1})?KT(=)?$/;
	if (dirvel.test(codigo)){
	
		var matrizdirvel = dirvel.exec(codigo);
		if (typeof matrizdirvel[3] != "undefined"){
			saida("con dirección de "+matrizdirvel[1]+" y velocidad de "+matrizdirvel[2]+""+matrizdirvel[3]+" nudos");
		}
		else{
			saida("con dirección de "+matrizdirvel[1]+" y velocidad de "+matrizdirvel[2]+" nudos");
		}
	return;
	}
	
	
	
	var altura = /^(\d{2})(\d{1})?(CM|MM)(=)?$/;
	if (altura.test(codigo)){
	
		var matrizaltura = altura.exec(codigo);
		if (typeof matrizaltura[2] != "undefined"){
			if (matrizaltura[3] == "CM") saida("de "+matrizaltura[1]+""+matrizaltura[2]+" centímetros de espesor.");
			else if (matrizaltura[3] == "MM") saida("de "+matrizaltura[1]+""+matrizaltura[2]+" milímetros de espesor.");
		
		}
		else{
			if (matrizaltura[3] == "CM") saida("de "+matrizaltura[1]+" centímetros de espesor.");
			else if (matrizaltura[3] == "MM") saida("de "+matrizaltura[1]+" milímetros de espesor.");

		}
		
	saida("\n");
	return;
	}
	
	
	var temperatura = /^MS(\d{2})C(=)?$/;
	if (temperatura.test(codigo)){
		saida("con temperatura de -"+codigo.substr(2,2)+"ºC \n");
		return;
	}
	
	
	
	
	var observado = /^(\d{4})Z(=)?$/;
	if (observado.test(codigo)){
		saida(""+codigo.substr(0,2)+":"+codigo.substr(2,2)+" horas.\n");
		return;
	}
	
	
	//OBSERVADO
	
	if ((codigo == "OBS")|(codigo == "OBS=")){
	
	saida("\n Fenómeno observado ");
	return;
	
	}
	
	if (codigo == "AT"){
	
	saida("a las ")
	return;
	
	}
	
	var obs = /^(\d{4})Z(=)?$/;
	if (obs.test(codigo)){
	
	saida(+codigo.substr(0,2)+":"+codigo.substr(2,2)+"\n");
	return;
	
	}
	
	
	//PRONOSTICADO 
	
	if((codigo == "FCST")|(codigo == "FCST=")){
	
	saida("\n Fenómeno prognosticado \n");
	return;
	}
	
	
	//GRUPO DE PROBABILIDAD
	var prob = /^PROB(\d{2})(=)?$/;
	if (prob.test(codigo)){
	
		saida("\nProbabilidad de "+codigo.substr(4,2)+"%: ");
		return;
	}
		


		//CANCELADO 
	if((codigo == "CNL")|(codigo == "CNL="))
	{
		saida("\nCancelado el ");
		return;
	}
		
	 //CAMBIOS DE INTENSIDAD
	if ((codigo == "NC")|(codigo == "NC="))
	{
		saida("\nSin cambios.\n");
		return;
		
	}

		if ((codigo == "INTSF")|(codigo == "INTSF="))
	{
		saida("\n Se prevé que los fenómenos meteorológicos se intensifiquen. \n");
		return;
		
	}
	
	if ((codigo == "WKN")|(codigo == "WKN="))
	{
		saida("\n Se prevé que el fenómeno meteorológico se debilite. \n");
		return;
		
	}

}

function codigo(text)
{
	textoSalida = "";


    var juntarlinhas = text.replace(/(\x0d\x0a)|\x0D|\x0A/g, " ");
    var matrizCodigo;
    matrizCodigo = juntarlinhas.split(" ");
    var numeroCodigo = 0;


	 
    // VERIFICA O TIPO DE MENSAGEM 
    if(matrizCodigo[numeroCodigo] == "WWSP60")
    {
	saida("Aviso de aeródromo  \n");
	 numeroCodigo++; 
    }
    else if(matrizCodigo[numeroCodigo] == "WWCR60")
    {
        saida("Aviso de aeródromo para Canarias \n");
        numeroCodigo++;
    }
	
	

    // LOCALIZACION
    if (matrizCodigo[numeroCodigo].length == 4)   //verificando el tamaño de la cadena inicial 
    {
	if((matrizCodigo[numeroCodigo]== "LEMD")||(matrizCodigo[numeroCodigo]== "lemd")){
		saida("Aeropuerto de Madrid/Barajas - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEAB")||(matrizCodigo[numeroCodigo]== "leab")){
		saida("Aeropuerto de Albacete - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEAL")||(matrizCodigo[numeroCodigo]== "leal")){
		saida("Aeropuerto de Alicante - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBL")||(matrizCodigo[numeroCodigo]== "lebl")){
		saida("Aeropuerto de Barcelona - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEMG")||(matrizCodigo[numeroCodigo]== "lemg")){
		saida("Aeropuerto de Málaga - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEPA")||(matrizCodigo[numeroCodigo]== "lepa")){
		saida("Aeropuerto de Palma de Mallorca - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEVC")||(matrizCodigo[numeroCodigo]== "levc")){
		saida("Aeropuerto de Valencia - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBT")||(matrizCodigo[numeroCodigo]== "lebt")){
		saida("Aeropuerto de Valencia/Bétera - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEZL")||(matrizCodigo[numeroCodigo]== "lezl")){
		saida("Aeropuerto de Sevilla - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEEC")||(matrizCodigo[numeroCodigo]== "leec")){
		saida("Aeropuerto de Sevilla/El Copero - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEMO")||(matrizCodigo[numeroCodigo]== "lemo")){
		saida("Aeropuerto de Sevilla/Morón - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEAG")||(matrizCodigo[numeroCodigo]== "leag")){
		saida("Aeropuerto de Algeciras - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEAM")||(matrizCodigo[numeroCodigo]== "leam")){
		saida("Aeropuerto de Almeria - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LESU")||(matrizCodigo[numeroCodigo]== "lesu")){
		saida("Aeropuerto de Andorra/ La Seu d'Urgell - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEAS")||(matrizCodigo[numeroCodigo]== "leas")){
		saida("Aeropuerto de Asturias - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBZ")||(matrizCodigo[numeroCodigo]== "lebz")){
		saida("Aeropuerto de  Badajoz/Talavera La Real - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBA")||(matrizCodigo[numeroCodigo]== "leba")){
		saida("Aeropuerto de Córdoba - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEAO")||(matrizCodigo[numeroCodigo]== "leao")){
		saida("Aeropuerto de Ciudad Real/Almagro - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBR")||(matrizCodigo[numeroCodigo]== "lebr")){
		saida("Aeropuerto de Bardenas \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBB")||(matrizCodigo[numeroCodigo]== "lebb")){
		saida("Aeropuerto de Bilbao - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEBG")||(matrizCodigo[numeroCodigo]== "lebg")){
		saida("Aeropuerto de Burgos - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LECO")||(matrizCodigo[numeroCodigo]== "leco")){
		saida("Aeropuerto de La Coruña - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LECH")||(matrizCodigo[numeroCodigo]== "lech")){
		saida("Aeropuerto de Castellon - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEDA")||(matrizCodigo[numeroCodigo]== "leda")){
		saida("Aeropuerto de Lleida - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEGE")||(matrizCodigo[numeroCodigo]== "lege")){
		saida("Aeropuerto de Girona - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEGR")||(matrizCodigo[numeroCodigo]== "legr")){
		saida("Aeropuerto de Granada - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEGA")||(matrizCodigo[numeroCodigo]== "lega")){
		saida("Aeropuerto de Granada/Armilla - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEHC")||(matrizCodigo[numeroCodigo]== "lehc")){
		saida("Aeropuerto de Huesca/ Pirineos - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEIB")||(matrizCodigo[numeroCodigo]== "leib")){
		saida("Aeropuerto de Ibiza - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEJR")||(matrizCodigo[numeroCodigo]== "lejr")){
		saida("Aeropuerto de Jerez - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LELC")||(matrizCodigo[numeroCodigo]== "lelc")){
		saida("Aeropuerto de Murcia/San Javier - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LERI")||(matrizCodigo[numeroCodigo]== "leri")){
		saida("Aeropuerto de Murcia/Alcantarilla - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LELL")||(matrizCodigo[numeroCodigo]== "lell")){
		saida("Aeropuerto de Sabadell - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LELN")||(matrizCodigo[numeroCodigo]== "leln")){
		saida("Aeropuerto de León/ Virgen del Camino - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LELO")||(matrizCodigo[numeroCodigo]== "lelo")){
		saida("Aeropuerto de Logroño/ Agoncillo - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEMH")||(matrizCodigo[numeroCodigo]== "lemh")){
		saida("Aeropuerto de Menorca - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEPP")||(matrizCodigo[numeroCodigo]== "lepp")){
		saida("Aeropuerto de Pamplona - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LERS")||(matrizCodigo[numeroCodigo]== "lers")){
		saida("Aeropuerto de Reus - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LESA")||(matrizCodigo[numeroCodigo]== "lesa")){
		saida("Aeropuerto de Salamanca - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LESO")||(matrizCodigo[numeroCodigo]== "leso")){
		saida("Aeropuerto de San Sebastian - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LESU")||(matrizCodigo[numeroCodigo]== "lesu")){
		saida("Aeropuerto de La Seu-Andorra - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEST")||(matrizCodigo[numeroCodigo]== "lest")){
		saida("Aeropuerto de Santiago - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LETL")||(matrizCodigo[numeroCodigo]== "letl")){
		saida("Aeropuerto de Teruel - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEVD")||(matrizCodigo[numeroCodigo]== "levd")){
		saida("Aeropuerto de Valladolid - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEVS")||(matrizCodigo[numeroCodigo]== "levs")){
		saida("Aeropuerto de Madrid/Cuatro Vientos - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LECV")||(matrizCodigo[numeroCodigo]== "lecv")){
		saida("Aeropuerto de Madrid/Colmenar Viejo - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEGT")||(matrizCodigo[numeroCodigo]== "legt")){
		saida("Aeropuerto de Madrid/Getafe - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LETO")||(matrizCodigo[numeroCodigo]== "leto")){
		saida("Aeropuerto de Madrid/Torrejón - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEVT")||(matrizCodigo[numeroCodigo]== "levt")){
		saida("Aeropuerto de Vitoria - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEVX")||(matrizCodigo[numeroCodigo]== "levx")){
		saida("Aeropuerto de Vigo - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEXJ")||(matrizCodigo[numeroCodigo]== "lexj")){
		saida("Aeropuerto de Santander - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LEZG")||(matrizCodigo[numeroCodigo]== "lezg")){
		saida("Aeropuerto de Zaragoza - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCFV")||(matrizCodigo[numeroCodigo]== "gcfv")){
		saida("Aeropuerto de Fuerteventura - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCGM")||(matrizCodigo[numeroCodigo]== "gcgm")){
		saida("Aeropuerto de La Gomera - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCHI")||(matrizCodigo[numeroCodigo]== "gchi")){
		saida("Aeropuerto de El Hierro - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCLA")||(matrizCodigo[numeroCodigo]== "gcla")){
		saida("Aeropuerto de La Palma - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCLP")||(matrizCodigo[numeroCodigo]== "gclp")){
		saida("Aeropuerto de Gran Canaria - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCRR")||(matrizCodigo[numeroCodigo]== "gcrr")){
		saida("Aeropuerto de Lanzarote - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCTS")||(matrizCodigo[numeroCodigo]== "gcts")){
		saida("Aeropuerto de Tenerife Sur - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GCXO")||(matrizCodigo[numeroCodigo]== "gcxo")){
		saida("Aeropuerto de Tenerife Norte - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="GEML")||(matrizCodigo[numeroCodigo]== "geml")){
		saida("Aeropuerto de Merilla - España \n\n");
		numeroCodigo++;}
	else if((matrizCodigo[numeroCodigo]=="LERT")||(matrizCodigo[numeroCodigo]== "lert")){
		saida("Aeropuerto de Cádiz/ Rota  - España \n\n");
		numeroCodigo++;}
       else {

                saida("Localizacion: " + matrizCodigo[numeroCodigo] + "\n\n");
                numeroCodigo++;
            }
     }
 else
    {
        alert("Mensaje no válido , inténtalo de nuevo!");
        return;
    }


    // DATA Y HORA
    if ( (
           ( (matrizCodigo[numeroCodigo].length == 7)  )
           
         ) &&
         numeros(matrizCodigo[numeroCodigo].charAt(0)) &&
         numeros(matrizCodigo[numeroCodigo].charAt(1)) &&
         numeros(matrizCodigo[numeroCodigo].charAt(2)) &&
         numeros(matrizCodigo[numeroCodigo].charAt(3)) &&
         numeros(matrizCodigo[numeroCodigo].charAt(4)) &&
         numeros(matrizCodigo[numeroCodigo].charAt(5))    )
    {
        saida("Día del mes: " + matrizCodigo[numeroCodigo].substr(0,2) + "\n");    
        saida("Hora: " + matrizCodigo[numeroCodigo].substr(2,2) +":" +         
               matrizCodigo[numeroCodigo].substr(4,2) + " UTC");           

       

        saida("\n");
        numeroCodigo++;
    }
 


    // LOOPING PARA VERFIFICAR EL RESTO
    for (var i=numeroCodigo; i<matrizCodigo.length; i++)
    {
        if(matrizCodigo[i].length > 0)
        {
            decodificar(matrizCodigo[i].toUpperCase());
        }
        else
        {
            saida("");
        }
    }
    return textoSalida.replace(/(\n\n|\n)/gm,"<br/>");
}