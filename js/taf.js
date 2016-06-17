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
    
	
	 var juntarlinhas = codigo.replace(/(\x0d\x0a)|\x0D|\x0A/, " ");
	
	

    //VIENTO
    var vientoKT  = /^(\d{3}|VRB|000|P)(\d{2})(G\d{2})?(KT|MPS)(=)?$/;
    if(vientoKT.test(codigo))                                                   
    {  
        var matrizviento = vientoKT.exec(codigo);                                
        
    if(matrizviento[1]=="VRB"){
        saida("  Dirección variable del viento");
		saida(", con velocidad de " + parseInt(matrizviento[2],10));

		if(matrizviento[4]=="KT") 
			saida(" nudos");
        else if(matrizviento[4]=="MPS") 
			saida(" m/s");
	
		}
		
	else if(matrizviento[1] == "000")
		saida("  Viento Calmo");
	
	else if(matrizviento[1] == "P"){
	
		if(matrizviento[4] == "KT") 
			saida("  Velocidad del viento mayor que 100 nudos.");
		else if(matrizviento[4] == "MPS")
			saida("  Velocidad del viento mayor que 50 m/s.");
	}
		
    else{
          	saida("  Dirección del viento: " + matrizviento[1] + " grados");
        	saida(", y velocidad " + parseInt(matrizviento[2],10));
	
		if(matrizviento[4]=="KT") 
			saida(" nudos");
        else if(matrizviento[4]=="MPS") 
			saida(" m/s");
		}


    if(matrizviento[3] != null)
    {
            if (matrizviento[3]!="")
            {
                saida(", con rachas de " + parseInt(matrizviento[3].substr(1,matrizviento[3].length),10));
                if(matrizviento[4]=="KT") 
			saida(" nudos");
                else if(matrizviento[4]=="MPS") 
			saida(" m/s");
             }
    }

        saida("\n");  
        return;
    }


    var ventovaria = /^(\d{3})V(\d{3})(=)?$/;                                     
    if (ventovaria.test(codigo))
		{
		saida("  Dirección del viento varia entre " +codigo.substr(0,3)+ " y " +codigo.substr(4,3)+ " grados \n");	
		return;
		}



    // Visibilidad
    var visibilidade = /^(\d{4})$/;                   
    if (visibilidade.test(codigo))                                        
		{
		var matrizvisib = visibilidade.exec(codigo);
		
		if (matrizvisib[1] == 9999)
			saida ("  Visibilidad: 10 km o más \n");
		else if (matrizvisib[1] == 0000)
			saida ("  Visibilidad: abajo del 50 metros \n");
		else 
			saida("  Visibilidad: " +matrizvisib[1]+ " metros \n");
				
		}
		
  //Visibilidad minima
  	var visibmin = /^(\d{4})(N|S)?(E|W)?$/;

	if (visibmin.test(codigo))
		{
		var matrizvisibmin = visibmin.exec(codigo);
		var direccion = "";
        	if(typeof matrizvisibmin[2] != "undefined")
        	{
         		 direccion= matrizvisibmin[2];
        	}
        	if(typeof matrizvisibmin[3] != "undefined")
        	{
         		 direccion= matrizvisibmin[3];
        	}
        	if(direccion != "")
        	{
          
          		if(direccion=="N") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Norte \n");
         		else if(direccion=="S") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Sur \n");
          		else if(direccion=="E") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Leste \n");
         		else if(direccion=="W")
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Oeste \n");
          		else if(direccion=="NE") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Nordeste \n");
          		else if(direccion=="NW") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Noroeste \n");
          		else if(direccion=="SE") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Sudeste \n");
         		else if(direccion=="SW") 
				saida("  Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Suroeste \n");
        	}
         	 return;
    
		}
		

 //Fenomenos metereologicos 
 

	var fenmet = /^(\+|\-)?(MI|BC|PR|VC|DR|BL|SH|TS|FZ|DZ|RA|SN|SG|PL|GR|GS|UP|DS|SS|FU|VA|SQ|PO|FC|HZ|DU|SA|BR|FG)?(DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS|TS|VC)?(DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS|TS|VC|SH)?(=)?$/;
	if (fenmet.test(codigo)){

		var matrizfenmet = fenmet.exec(codigo);
		saida("  Tiempo significativo: ");
		
		
		
		if ((matrizfenmet[1] == "+")||(matrizfenmet[1] == "-")){                
				if(matrizfenmet[2]== "DZ"){ 
				saida("Llovizna");
						{
						if(matrizfenmet[1] == "+") saida (" fuerte ");
						if(matrizfenmet[1] == "-") saida (" débil ");
						}   
					if(matrizfenmet[3] == "RA") saida("y lluvia");
					if(matrizfenmet[3] == "SN") saida("y nieve");
					if(matrizfenmet[3] == "SG") saida("y cinarra");
					if(matrizfenmet[3] == "PL") saida("y hielo granulado");
					if(matrizfenmet[3] == "GR") saida("y granizo");
					if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
					if(matrizfenmet[3] == "UP") saida("y precipitación desconocida"); 
				}																	
				if(matrizfenmet[2]== "RA"){ 
					saida("Lluvia");
						{
						if(matrizfenmet[1] == "+") saida (" fuerte ");
						if(matrizfenmet[1] == "-") saida (" débil ");
						}   
					if(matrizfenmet[3] == "DZ") saida("y llovizna");
					if(matrizfenmet[3] == "SN") saida("y nieve");
					if(matrizfenmet[3] == "SG") saida("y cinarra");
					if(matrizfenmet[3] == "PL") saida("y hielo granulado");
					if(matrizfenmet[3] == "GR") saida("y granizo");
					if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
					if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
				}
				if(matrizfenmet[2]== "SN"){
					saida("Nieve");
						{
						if(matrizfenmet[1] == "+") saida (" fuerte ");
						if(matrizfenmet[1] == "-") saida (" débil ");
						}   
					if(matrizfenmet[3] == "RA") saida("y lluvia");
					if(matrizfenmet[3] == "DZ") saida("y llovizna");
					if(matrizfenmet[3] == "SG") saida("y cinarra");
					if(matrizfenmet[3] == "PL") saida("y hielo granulado");
					if(matrizfenmet[3] == "GR") saida("y granizo");
					if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
					if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
				}
				if(matrizfenmet[2]== "SG"){
					saida("Cinarra");
						{
						if(matrizfenmet[1] == "+") saida (" fuerte ");
						if(matrizfenmet[1] == "-") saida (" débil ");
						}   
					if(matrizfenmet[3] == "RA") saida("y lluvia");
					if(matrizfenmet[3] == "DZ") saida("y llovizna");
					if(matrizfenmet[3] == "SN") saida("y nieve");
					if(matrizfenmet[3] == "PL") saida("y hielo granulado");
					if(matrizfenmet[3] == "GR") saida("y granizo");
					if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
					if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
				}
				if(matrizfenmet[2]== "PL"){
					saida("Hielo Granulado");
						{
						if(matrizfenmet[1] == "+") saida (" fuerte ");
						if(matrizfenmet[1] == "-") saida (" débil ");
						}   
					if(matrizfenmet[3] == "RA") saida("y lluvia");
					if(matrizfenmet[3] == "DZ") saida("y llovizna");
					if(matrizfenmet[3] == "SN") saida("y nieve");
					if(matrizfenmet[3] == "SG") saida("y cinarra");
					if(matrizfenmet[3] == "GR") saida("y granizo");
					if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
					if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
				}
				if(matrizfenmet[2]== "DS"){
				saida("Tempestad de polvo");
					if(matrizfenmet[1] == "+") saida (" fuerte ");
					if(matrizfenmet[1] == "-") saida (" débil ");
					}   
				if(matrizfenmet[2]== "SS"){
				saida("Tempestad de arena");
					if(matrizfenmet[1] == "+") saida (" fuerte ");
					if(matrizfenmet[1] == "-") saida (" débil ");
					}   
				if(matrizfenmet[2]== "FZ"){
					if(matrizfenmet[3] == "DZ") saida("Llovizna engelante");
					if(matrizfenmet[3] == "RA") saida("Lluvia engelante");
					if(matrizfenmet[3] == "UP") saida("Precipitación desconocida engelante");
								{
								if(matrizfenmet[1] == "+") saida (" fuerte ");
								if(matrizfenmet[1] == "-") saida (" débil ");
								}
				}
				if(matrizfenmet[2]== "SH"){
					saida("Chubascos");
					           {
								if(matrizfenmet[1] == "+") saida (" fuertes ");
								if(matrizfenmet[1] == "-") saida (" débiles ");
								}
					if(matrizfenmet[3] == "GS") saida ("de granizo pequeño");			
					if(matrizfenmet[3] == "GR") saida ("de granizo");
					if(matrizfenmet[3] == "RA") saida ("de lluvia");
					if(matrizfenmet[3] == "SN") saida ("de nieve");
					if(matrizfenmet[3] == "UP") saida("de precipitación desconocida");
				}
				if(matrizfenmet[2]== "TS"){
					saida("Tormenta");
							{
							if(matrizfenmet[1] == "+") saida (" fuerte ");
							if(matrizfenmet[1] == "-") saida (" débil ");
							}
					if(matrizfenmet[3] == "GS") saida ("de granizo pequeño");
					if(matrizfenmet[3] == "GR"){ saida ("de granizo");
							if(matrizfenmet[4] == "RA") saida(" y lluvia");}
					if(matrizfenmet[3] == "RA"){ saida ("de lluvia");
							if(matrizfenmet[4] == "SN") saida(" y nieve");}
					if(matrizfenmet[3] == "SN") saida ("de nieve");
					if(matrizfenmet[3] == "UP") saida("de precipitación desconocida");
				}

			}
			else{                                                                 
					if (typeof matrizfenmet[3] == "undefined"){                   
						if(matrizfenmet[2]== "FG") saida("Niebla");
						if(matrizfenmet[2]== "BR") saida("Neblina");
						if(matrizfenmet[2]== "SA") saida("Arena");
						if(matrizfenmet[2]== "DU") saida("Polvo extendido");
						if(matrizfenmet[2]== "HZ") saida("Calima");
						if(matrizfenmet[2]== "FU") saida("Humo");
						if(matrizfenmet[2]== "VA") saida("Ceniza volcanica");
						if(matrizfenmet[2]== "SQ") saida("Turbonadas");
						if(matrizfenmet[2]== "PO") saida("Remolinos de polvo/arena");
						if(matrizfenmet[2]== "FC") saida("Nueb en forma de embudo");
						if(matrizfenmet[2]== "TS") saida("Tormenta");
						if(matrizfenmet[2]== "DZ") saida("Llovizna");
						if(matrizfenmet[2]== "RA") saida("Lluvia");
						if(matrizfenmet[2]== "SN") saida("Nieve");
						if(matrizfenmet[2]== "SG") saida("Cinarra");
						if(matrizfenmet[2]== "PL") saida("Hielo Granulado");
						if(matrizfenmet[2]== "DS") saida("Tempestad de polvo");
						if(matrizfenmet[2]== "SS") saida("Tempestad de arena");
						if(matrizfenmet[2]== "UP") saida("Precipitación no identificada");
					}                                                                 
					else{                                                            //los que vienen acompañados con mas uno elemento
						if(matrizfenmet[2]== "BC"){
							if(matrizfenmet[3] == "FG") saida("Bancos de niebla");
						}
						if(matrizfenmet[2]== "BL"){
							if(matrizfenmet[3] == "DU") saida ("Polvo extendido levantado por el viento a cierta altura");
							if(matrizfenmet[3] == "SA") saida ("Arena levantado por el viento a cierta altura");
							if(matrizfenmet[3] == "SN") saida ("Nieve levantado por el viento a cierta altura");
						}
						if(matrizfenmet[2]== "DR"){
							if(matrizfenmet[3] == "DU") saida ("Polvo extendido levantado por el viento a poca altura");
							if(matrizfenmet[3] == "SA") saida ("Arena levantado por el viento a poca altura");
							if(matrizfenmet[3] == "SN") saida ("Nieve levantado por el viento a poca altura");
						}
						if(matrizfenmet[2]== "FZ"){
							if(matrizfenmet[3] == "FG") saida ("Niebla engelante");
						}
						if(matrizfenmet[2]== "MI"){
							if(matrizfenmet[3] == "FG") saida ("Niebla baja");
						}
						if(matrizfenmet[2]== "PR"){
							if(matrizfenmet[3] == "FG") saida ("Niebla parcial(cubriendo parte del aerodromo)");
						}
						if(matrizfenmet[2]== "SH"){
							if(matrizfenmet[3] == "VC") saida ("Chubascos en las proximidades");
						}
						if(matrizfenmet[2]== "VC"){
							if(matrizfenmet[3] == "DS") saida ("Llovizna en las proximidades");
							if(matrizfenmet[3] == "SS") saida ("Tempestad de arena en las proximidades");
							if(matrizfenmet[3] == "FG") saida ("Niebla en las proximidades");
							if(matrizfenmet[3] == "FC") saida ("Nube ne forma de embudo en las proximidades");
							if(matrizfenmet[3] == "SH") saida ("Chubascos en las proximidades");
							if(matrizfenmet[3] == "TS") saida ("Tormenta en las proximidades ");
							if(matrizfenmet[3] == "PO") saida ("Remolinos de polvo/arena en las proximidades");
						}
						if(matrizfenmet[2]== "FZ"){
							if(matrizfenmet[3] == "DZ") saida("Llovizna engelante");
							if(matrizfenmet[3] == "RA") saida("Lluvia engelante");
							if(matrizfenmet[3] == "UP") saida("Precipitación desconocida engelante");
						}
						if(matrizfenmet[2]== "SH"){
							if(matrizfenmet[3] == "GS") saida ("Chubascos de granizo pequeño");
							if(matrizfenmet[3] == "GR") saida ("Chubascos de granizo");
							if(matrizfenmet[3] == "RA") saida ("Chubascos de lluvia");
							if(matrizfenmet[3] == "SN") saida ("Chubascos de nieve");
							if(matrizfenmet[3] == "UP") saida("Chubascos de precipitación desconocida");
						}
						if(matrizfenmet[2]== "TS"){
							if(matrizfenmet[3] == "GS") saida ("Tormenta de granizo pequeño");
							if(matrizfenmet[3] == "GR"){ saida ("Tormenta de granizo");
										if(matrizfenmet[4] == "RA") saida(" y lluvia");}
							if(matrizfenmet[3] == "RA"){ saida ("Tormenta de lluvia");
										if(matrizfenmet[4] == "SN") saida(" y nieve");}
							if(matrizfenmet[3] == "SN") saida ("Tormenta de nieve");
							if(matrizfenmet[3] == "UP") saida("Tormenta de precipitación desconocida");
						}
						if(matrizfenmet[2]== "DZ"){ saida("Llovizna ");
							if(matrizfenmet[3] == "RA") saida("y lluvia");
							if(matrizfenmet[3] == "SN") saida("y nieve");
							if(matrizfenmet[3] == "SG") saida("y cinarra");
							if(matrizfenmet[3] == "PL") saida("y hielo granulado");
							if(matrizfenmet[3] == "GR") saida("y granizo");
							if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
							if(matrizfenmet[3] == "UP") saida("y precipitación desconocida"); 
						}
						if(matrizfenmet[2]== "RA"){ saida("Lluvia ");
							if(matrizfenmet[3] == "DZ") saida("y llovizna");
							if(matrizfenmet[3] == "SN") saida("y nieve");
							if(matrizfenmet[3] == "SG") saida("y cinarra");
							if(matrizfenmet[3] == "PL") saida("y hielo granulado");
							if(matrizfenmet[3] == "GR") saida("y granizo");
							if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
							if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
						}
						if(matrizfenmet[2]== "SN"){ saida("Nieve ");
							if(matrizfenmet[3] == "RA") saida("y lluvia");
							if(matrizfenmet[3] == "DZ") saida("y llovizna");
							if(matrizfenmet[3] == "SG") saida("y cinarra");
							if(matrizfenmet[3] == "PL") saida("y hielo granulado");
							if(matrizfenmet[3] == "GR") saida("y granizo");
							if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
							if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
						}
						if(matrizfenmet[2]== "SG"){ saida("Cinarra ");
							if(matrizfenmet[3] == "RA") saida("y lluvia");
							if(matrizfenmet[3] == "SN") saida("y nieve");
							if(matrizfenmet[3] == "DZ") saida("y llovizna");
							if(matrizfenmet[3] == "PL") saida("y hielo granulado");
							if(matrizfenmet[3] == "GR") saida("y granizo");
							if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
							if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
						}
						if(matrizfenmet[2]== "PL"){ saida("Hielo Granulado ");
							if(matrizfenmet[3] == "RA") saida("y lluvia");
							if(matrizfenmet[3] == "SN") saida("y nieve");
							if(matrizfenmet[3] == "SG") saida("y cinarra");
							if(matrizfenmet[3] == "DZ") saida("y llovizna");
							if(matrizfenmet[3] == "GR") saida("y granizo");
							if(matrizfenmet[3] == "GS") saida("y granizo pequeño");
							if(matrizfenmet[3] == "UP") saida("y precipitación desconocida");
						}
					}
			}
		saida("\n");
		return;

		
	}	
		
		


      //Termino de fenomenos meteorologicos	
	if(codigo == "NSW")
	{
		saida("  Ausencia de tiempo significativo.\n");
	}
	else if(codigo =="NSW=")
	{
		saida("  Ausencia de tiempo significativo.\n");
	}
		
	

     //Nubes


	//Nubosidad y altura de nubes 
		var nubosidad = /^(FEW|SCT|BKN|OVC|\/{3})(\d{3})?(CB|TCU|\/{3})?(=)?$/;
		if (nubosidad.test(codigo))
		{

		var matriznubosidad = nubosidad.exec(codigo);

			if(matriznubosidad[1] == "FEW")
				saida("  Nubosidad escasa (1 a 2 octas), con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "SCT")
				saida("  Nubosidad dispersa (3 a 4 octas), con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "BKN")
				saida("  Muy nuboso (5 a 7 octas), con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "OVC")
				saida("  Cielo cubierto, con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "///")
				saida("  No se puede observarse la cantidad nubosa y la altura de la base de las nubes.");
		
			if(matriznubosidad[3] == "CB")
				saida(", nubes del tipo cumulonimbos.");
			else if(matriznubosidad[3] == "TCU")
				saida( ", nubes del tipo cúmulos en forma de torre.");
			else if(matriznubosidad[3] == "///")
				saida(". No se puede observarse el tipo de nuben.");
		

		saida("\n");
		return;
		}





     //Visibilidad vertical 
		var visibvert = /^VV(\d{3}|\/{3})$/;
		if(visibvert.test(codigo))
		{
		var matrizvisibvert = visibvert.exec(codigo);
		if(matrizvisibvert[1] == "///")
			saida("  No se puede prognostigar la nubosidad ni la visilibidad vertical \n")
		else
			saida("  Visibilidad vertical es de " +100*(parseInt(matrizvisibvert[1],10))+ " pies \n");
			return;
		}


     //NSC
     if ((codigo == "NSC")|(codigo == "NSC="))
     {
   	  saida("Sin nubes de importancia para las operaciones. \n");
   	  return;
     }
	 
	
    //NCD
    if ((codigo == "NCD")|(codigo == "NCD="))
    {
	saida("Sistema de observaccion automático y no se ha detectado ninguna nube. \n");
	return;
    }



    // CAVOK
    if((codigo == "CAVOK")|(codigo == "CAVOK="))
    {
        saida("  Visibilidad de 10 km o más, ausencia de nubes por debajo de la altura de referencia, ningún cumulonimbo ni cúmulo en forma de torre, y ningún fenómeno significativo de importancia. \n");
        return;
    }


    // NOSIG
    if((codigo == "NOSIG=")|(codigo == "NOSIG"))
    {
        saida("\nNingun cambio significativo en un futuro proximo. \n");
        return;
    }

		//NIL
	if((codigo == "NIL")|(codigo == "NIL="))
	{
		saida("Ausencia de TAF \n");
		return;

	}
	
	
		//CNL
	if((codigo == "CNL")|(codigo == "CNL="))
	{
		saida("Pronóstico anulado \n");
		return;
	}
		
		
	//TEMPO Y BECMG

	if((codigo == "TEMPO")|(codigo == "TEMPO="))
	{
		saida("\nTemporalmente en el periodo del pronóstico:");
		return;
	}
	
	if((codigo == "BECMG")|(codigo == "BECMG="))
	{
		saida("\nSe espera que predominen las siguientes condiciones durante el periodo del pronstico:");
		return;
	}
		
		
		
		//Periodo del pronostico
	var periodo = /^(\d{2})(\d{2})\/(\d{2})(\d{2})(=)?$/;
	if (periodo.test(codigo)){
		var matrizperiodo = periodo.exec(codigo);
		
		saida(" Desde el día  " +matrizperiodo[1]+ " a las " +matrizperiodo[2]+ ":00 horas, hasta el día  "+matrizperiodo[3]+ " a las "+matrizperiodo[4]+ ":00 horas:");
		saida("\n");
		return;
	
	}
		
		
		//Cambio de tendencia para TAF
	var cambio = /^(FM)(\d{2})(\d{2})(\d{2})(=)?$/;
	if (cambio.test(codigo)){
		var matrizcambio = cambio.exec(codigo);
		
		saida("El comienzo del cambio se dará en el día  "+matrizcambio[2]+" a las "+matrizcambio[3]+":"+matrizcambio[4]+ " horas");
		saida("\n");
		return;
		
	
	}
		
		//Grupo de probabilidad 
	var prob = /^PROB(\d{2})(=)?$/;
	if (prob.test(codigo)){
	
		saida("\nPronóstico con probabilidad de "+codigo.substr(4,2)+"%:");
		return;
	}
		
		
		//Grupo de temperaturas maximas y mínimas 
				
	var tempmax = /^TX(M)?(\d{2})\/(\d{2})(\d{2})Z(=)?$/;
	if (tempmax.test(codigo)){
		var matriztempmax = tempmax.exec(codigo);
		
		saida("\n  Temperaturas previstas: \n");
		if(matriztempmax[1] =! "undefined")
			saida("   Máxima de -" +matriztempmax[2]+"ºC en el día  "+matriztempmax[3]+" a las "+matriztempmax[4]+":00 horas" );
		else
			saida("   Máxima de "+matriztempmax[2]+"ºC en el día  "+matriztempmax[3]+" a las "+matriztempmax[4]+":00 horas");
			
		saida("\n");
		return;
	}

	var tempmin = /^TN(M)?(\d{2})\/(\d{2})(\d{2})Z(=)?$/;
	if (tempmin.test(codigo)){
		var matriztempmin = tempmin.exec(codigo);
		
		if(matriztempmin[1] =! "undefined")
			saida("   Mínima de -" +matriztempmin[2]+"ºC en el día  "+matriztempmin[3]+" a las "+matriztempmin[4]+":00 horas" );
		else
			saida("   Mínima de "+matriztempmin[2]+"ºC en el día  "+matriztempmin[3]+" a las "+matriztempmin[4]+":00 horas");
			
		saida("\n");
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

	if(matrizCodigo[numeroCodigo] == "TAF")
	{
		saida("Pronóstico de aeródromo \n\n");
		numeroCodigo++;
	}


	//Tipos de Predicciones
	if (matrizCodigo[numeroCodigo] == "AMD")
	{
		saida("Predicción enmendada \n\n");
		numeroCodigo++;
	}
	else if(matrizCodigo[numeroCodigo] == "CNL")
	{
		saida("Predicción cancelada \n\n");
		numeroCodigo++;
	}
	else if(matrizCodigo[numeroCodigo] == "COR")
	{
		saida("Predicción corregida \n\n");
		numeroCodigo++;
	}
	else if(matrizCodigo[numeroCodigo] == "NIL")
	{
		saida("Predicción ausente \n\n");
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
           ( (matrizCodigo[numeroCodigo].length == 7) && (matrizCodigo[numeroCodigo].charAt(6) == 'Z') )
           
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
               matrizCodigo[numeroCodigo].substr(4,2) + " UTC\nPeríodo del pronóstico:");                
        numeroCodigo++;
    }
    else
    {
        alert("Fecha y hora no especificados o mal posicionados, inténtalo de nuevo! ");
        return;
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