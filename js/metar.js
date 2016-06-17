var textoSalida;
function saida(text)                                      // función para salida de la información. Argumento "text"
{
  textoSalida += text;
}

function numeros(ch)                                      //función para numeros
{
    return ( (ch == '0') || (ch == '1') || (ch == '2') || (ch == '3') ||
             (ch == '4') || (ch == '5') || (ch == '6') || (ch == '7') ||
             (ch == '8') || (ch == '9') );
}

function letras(ch)                                       //función para letras
{
    return ( (ch >= 'A') && (ch <= 'Z') );
}

function decodificar(codigo)                              //función para decodificar. Argumento "codigo"
{                                                         //Aqui siempre utiliza una variable (var) del modelo de la cadena y cuando es encontrada, puede ser decodificada.
    
	
	



    //VIENTO
    var vientoKT  = /^(\d{3}|VRB|000|P)(\d{2})(G\d{2})?(KT|MPS)(=)?$/;
    if(vientoKT.test(codigo))                                                   // .test es el metodo para verificar en la cadena coincidencias
    {  
        var matrizviento = vientoKT.exec(codigo);                               // .exec verifica la cadena y devuelve una informacion 

        // window.alert(matrizviento);
        
		if(matrizviento[1]=="VRB"){
			saida(" Dirección variable del viento");
			saida(", con velocidad de " + parseInt(matrizviento[2],10));

			if(matrizviento[4]=="KT") 
			saida(" nudos");
			else if(matrizviento[4]=="MPS") 
			saida(" m/s");
	
		}
		
		else if(matrizviento[1] == "000")
			saida(" Viento: En calma");
	
		else if(matrizviento[1] == "P"){
	
			if(matrizviento[4] == "KT") 
			saida(" Velocidad del viento mayor que 100 nudos.");
			else if(matrizviento[4] == "MPS")
			saida(" Velocidad del viento mayor que 50 m/s.");
		}
		
		else{
          	saida(" Dirección del viento: " + matrizviento[1] + " grados");
        	saida(", y velocidad " + parseInt(matrizviento[2],10));
	
			if(matrizviento[4]=="KT") 
			saida(" nudos");
			else if(matrizviento[4]=="MPS") 
			saida(" m/s");
		}


		if(matrizviento[3] != null){
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


    var ventovaria = /^(\d{3})V(\d{3})(=)?$/;                     //dirección variable del vento. 
    if (ventovaria.test(codigo))
		{
		saida(" La dirección del viento varia entre " +codigo.substr(0,3)+ " y " +codigo.substr(4,3)+ " grados \n");	//codigo.substr devolve o valor encontrado na posicao que se pede
		return;
		}



    // Visibilidad
    var visibilidade = /^(\d{4})(=)?$/;                   
    if (visibilidade.test(codigo))           
		{
		var matrizvisib = visibilidade.exec(codigo);
		
		if (matrizvisib[1] == 9999)
			saida (" Visibilidad: 10 km o más \n");
		else if (matrizvisib[1] == 0000)
			saida (" Visibilidad: por debajo de 50 metros \n");
		else 
			saida(" Visibilidad: " +matrizvisib[1]+ " metros \n");
				
		}
		
  //Visibilidad minima
  	var visibmin = /^(\d{4})(N|S)?(E|W)?(=)?$/;

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
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Norte \n");
         		else if(direccion=="S") 
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Sur \n");
          		else if(direccion=="E") 
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Este \n");
         		else if(direccion=="W")
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Oeste \n");
          		else if(direccion=="NE") 
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Nordeste \n");
          		else if(direccion=="NW") 
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Noroeste \n");
          		else if(direccion=="SE") 
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Sureste \n");
         		else if(direccion=="SW") 
				saida(" Visibilidad mínima es de " +matrizvisibmin[1]+ " metros, con dirección Suroeste \n");
        	}
         	 return;
    
		}
		


      //Pistas
	var pistas = /^R(\d{2})(R|C|L)?\/(M|P)?(\d{4})(U|N|D)?(=)?$/;
	if(pistas.test(codigo)){
		var matrizpistas = pistas.exec(codigo);
		if (typeof matrizpistas[2] != "undefined"){
			if (matrizpistas[2] == "R") saida(" Alcance visual en pista " +matrizpistas[1]+ "R:");
			else if(matrizpistas[2] == "C") saida(" Alcance visual en pista " +matrizpistas[1]+ "C:");
			else if(matrizpistas[2] == "L") saida(" Alcance visual en pista " +matrizpistas[1]+ "L:");
            // alert(matrizpistas);
		}
		else{
			saida(" Alcance visual en pista " +matrizpistas[1]+ ":");
		}

		if(typeof matrizpistas[3] != "undefined"){
			if(matrizpistas[3] == "M") saida(" menor que " +matrizpistas[4]+ " metros");
			else if(matrizpistas[3] == "P") saida(" mayor que " +matrizpistas[4]+ " metros");
		}
		else{
			saida(" " +matrizpistas[4]+ " metros");
		}

		if(matrizpistas[5] != "undefined"){
			if(matrizpistas[5] == "U") saida(" con tendencia a aumentar.");
			else if(matrizpistas[5] == "N") saida(" con tendencia a mantenerse constante.");
			else if(matrizpistas[5] == "D") saida(" con tendencia a disminuir.");
		}
		else{
			saida(".");
		}
		saida("\n");
		return;

	}




    //Fenomenos metereologicos 
// Son tres clases combinadas entre ellas. Tiene que montar las possibilidades. 
//Estoy dejando en las tres unidades de la matriz la possibilidad de las precipitaciones combinaren entre si. 

	var fenmet = /^(\+|\-)?(MI|BC|PR|VC|DR|BL|SH|TS|FZ|DZ|RA|SN|SG|PL|GR|GS|UP|DS|SS|FU|VA|SQ|PO|FC|HZ|DU|SA|BR|FG)?(DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS|TS|VC|SH)?(DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS|TS|VC|SH)?(=)?$/;
	if (fenmet.test(codigo)){

		var matrizfenmet = fenmet.exec(codigo);
		saida(" ");
		
		
		
			if ((matrizfenmet[1] == "+")||(matrizfenmet[1] == "-")){               //las possibilidades que pueden tener intensidad. 
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
				}																	// en ese caso no tiene que separar los que vienen con el tercero elemento, porque los que vienen con el tercero elemento no se quedan solos nunca
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
			else{                                                                 // las possibilidades que no tienen intensidad (Las que no pueden llevar y las que pueden o no pueden)
					if (typeof matrizfenmet[3] == "undefined"){                   //los que vienen sin el elemento tres de la matriz. Los que viene solos
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
		saida(" Ausencia de tiempo significativo.\n");
	}
	else if(codigo =="NSW=")
	{
		saida(" Ausencia de tiempo significativo.\n");
	}
		
	

     //Nubes


	//Nubosidad y altura de nubes 
		var nubosidad = /^(FEW|SCT|BKN|OVC|\/{3})(\d{3})?(CB|TCU|\/{3})?(=)?$/;
		if (nubosidad.test(codigo))
		{

		var matriznubosidad = nubosidad.exec(codigo);

			if(matriznubosidad[1] == "FEW")
				saida(" Nubosidad escasa (1 a 2 octas), con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "SCT")
				saida(" Nubosidad dispersa (3 a 4 octas), con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "BKN")
				saida(" Muy nuboso (5 a 7 octas), con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "OVC")
				saida(" Cielo cubierto, con la altura de la base de las nubes a " +100*(parseInt(matriznubosidad[2],10))+ " pies");
			else if(matriznubosidad[1] == "///")
				saida(" No se puede observar la cantidad nubosa y la altura de la base de las nubes");
		
			if(matriznubosidad[3] == "CB")
				saida(", nubes del tipo cumulonimbos.");
			else if(matriznubosidad[3] == "TCU")
				saida( ", nubes del tipo cúmulos en forma de torre.");
			else if(matriznubosidad[3] == "///")
				saida(". No se puede observar el tipo de nube.");
		

		saida("\n");
		return;
		}





     //Visibilidad vertical 
		var visibvert = /^VV(\d{3}|\/{3})(=)?$/;
		if(visibvert.test(codigo))
		{
		var matrizvisibvert = visibvert.exec(codigo);
		if(matrizvisibvert[1] == "///")
			saida(" No se puede pronosticar la nubosidad ni la visilibidad vertical \n")
		else
			saida(" Visibilidad vertical es de " +100*(parseInt(matrizvisibvert[1],10))+ " pies \n");
			return;
		}


     //NSC
     if ((codigo == "NSC")|(codigo == "NSC="))
     {
   	  saida(" Sin nubes de importancia para las operaciones. \n");
   	  return;
     }
	 
	
    //NCD
    if ((codigo == "NCD")|(codigo == "NCD="))
    {
	saida("No se detecta ninguna nube. \n");
	return;
    }



    // CAVOK
    if((codigo == "CAVOK")|(codigo == "CAVOK="))
    {
        saida(" Visibilidad de 10 km o más, ausencia de nubes por debajo de la altura de referencia, ningún cumulonimbo ni cúmulo en forma de torre, y ningún fenómeno significativo de importancia. \n");
        return;
    }


    // NOSIG
    if((codigo == "NOSIG=")|(codigo == "NOSIG"))
    {
        saida("\nNingún cambio significativo en las 2 próximas horas. \n");
        return;
    }


    //Temperatura
    var temperatura = /^(M?\d{2})\/(M?\d{2})?(=)?$/;
    if (temperatura.test(codigo))
	{
		var matriztemp = temperatura.exec(codigo);
		
		if(matriztemp[1].charAt(0)=='M')
			saida(" Temperatura del aire: -" + matriztemp[1].substr(1,2) + "ºC \n");
       	        else
                	saida(" Temperatura del aire: " + matriztemp[1].substr(0,2) + "ºC \n");

                if(matriztemp[2]!="")
                {
               		if(matriztemp[2].charAt(0)=='M')
                		saida(" Punto de rocío: -" + matriztemp[2].substr(1,2) + "ºC \n");
               		else
                	saida(" Punto de rocío: " + matriztemp[2].substr(0,2) + "ºC \n");
                }
                return;

	}



    //AUTO
     if ((codigo == "AUTO")|(codigo == "AUTO="))
     {
     saida(" Es un METAR AUTO.\n");
	 return;
     }
		



    //QNH
    var pressao = /^(Q\d{4})(=)?$/;
    if (pressao.test(codigo))
    {
		var matrizqnh = pressao.exec(codigo);
		
	saida(" QNH: " +parseInt(matrizqnh[1].substr(1,4),10)+ " hPa \n");   //parseInt(), funcion que recibe string e converte en valor entero. 
	return;                                                              
    }                                                                    
   


    //Informacao suplementaria
// Se utilizara apenas para indicar fenomenos meteorologicos recentes de importancia

	var infsup = /^RE(UP|FZ|DZ|RA|SG|SN|SH|BL|SS|DS|TS|FC|VA|PL)(DZ|RA|SN|GR|GS|UP)?(=)?$/;           //abreviaturas posibles están en el documento de las claves
	if (infsup.test(codigo))
	{
		var matrizinfsup = infsup.exec(codigo);
		saida(" Tiempo reciente:");
		
		if(matrizinfsup[1]== "FZ"){
			if (matrizinfsup[2]== "UP") saida(" No se puede identificar el tipo de precipitación.\n");
			else if (matrizinfsup[2]== "DZ") saida(" Llovizna engelante.");
			else if (matrizinfsup[2]== "RA") saida(" Lluvia engelante.");
		}
		else if(matrizinfsup[1]=="DZ"){
			saida(" Llovizna.");
		}
		else if(matrizinfsup[1]=="RA"){
			if (matrizinfsup[2]== "SN") saida(" Lluvia y nieve.");
			else saida("  Lluvia.");
		}
		else if(matrizinfsup[1]== "SG") saida(" Cinarra.");
		else if(matrizinfsup[1]== "SN") saida(" Nieve.");
		else if(matrizinfsup[1]=="SH"){
			if (matrizinfsup[2]== "RA") saida(" Chubascos de lluvia.");
			else if (matrizinfsup[2]== "SN") saida(" Chubascos de nieve.");
			else if (matrizinfsup[2]== "GR") saida(" Chubascos de granizo.");
			else if (matrizinfsup[2]== "GS") saida(" Chubascos de granizo pequeño.");
			else if (matrizinfsup[2]== "UP") saida(" No se puede identificar el tipo de precipitación.\n");
		}
		else if((matrizinfsup[1]=="BL") && (matrizinfsup[2]== "SN")) saida(" Nieve levantada por el viento.");
		else if(matrizinfsup[1]== "SS") saida(" Tempestad de arena.");
		else if(matrizinfsup[1]== "DS") saida(" Tempestad de polvo.");
		else if(matrizinfsup[1]=="TS"){
			if (matrizinfsup[2]== "RA") saida(" Tormenta con lluvia.");
			else if (matrizinfsup[2]== "SN") saida(" Tormenta de nieve.");
			else if (matrizinfsup[2]== "GR") saida(" Tormenta con granizo.");
			else if (matrizinfsup[2]== "GS") saida(" Tormenta con granizo pequeño.");
			else if (matrizinfsup[2]== "UP") saida(" No se puede identificar el tipo de precipitación.\n");
			else saida("Tormenta");
		}
		else if(matrizinfsup[1]== "FC") saida(" Nube en forma de embudo.");
		else if(matrizinfsup[1]== "VA") saida(" Ceniza volcánica.");
		else if(matrizinfsup[1]== "PL") saida(" Hielo granulado.");
		
		saida("\n");
		return;
	}
			

        //Cizalladura del viento en las capas inferiores 
//cizalladura del viento a lo largo del trayecto de despegue o de aproximacion entre el nivel de la pista y 500 metros. Afecta o pistas o todas (all)

	if(codigo == "WS")
	{
		saida(" Existe cizalladura del viento, afectando");
	}

	var cizpistas = /^R(WY)?(\d{2})?(R|C|L)?(=)?$/;
	if(cizpistas.test(codigo)){
		var matrizcizpistas = cizpistas.exec(codigo);
			if(typeof matrizcizpistas[1] != "undefined"){
				saida(" todas las pistas del aeródromo.");
			}
			else{
				if(typeof matrizcizpistas[3] != "undefined"){
					if (matrizcizpistas[3] == "R") saida(" a la pista " +matrizcizpistas[2]+ "R ");
					else if (matrizcizpistas[3] == "C") saida(" a la pista " +matrizcizpistas[2]+ "C ");
					else if (matrizcizpistas[3] == "L") saida(" a la pista " +matrizcizpistas[2]+ "L ");
				}
				else{
					saida(" a la pista " +matrizcizpistas[2]+ " ");
				} 	
			}
	saida("\n");
	return;
	}


//Tempertura de la superficie del mar y estado del mar 
	var estadomar = /^W(M)?(\d{2})\/S(\d)(=)?$/;
	if (estadomar.test(codigo)){
		var matrizestadomar = estadomar.exec(codigo);
		if(typeof matrizestadomar[1] != "undefined"){
			saida(" Temperatura de la superficie del mar: -" +matrizestadomar[2]+ " ºC.\n");
		}
		else{
			saida(" Temperatura de la superficie del mar: " +matrizestadomar[2]+ " ºC.\n");
		}
		
		if(matrizestadomar[3] == "0") saida(" Estado del mar: Calmo.");
		else if(matrizestadomar[3] == "1") saida(" Estado del mar: Rizado(0-0.1 m) ");
		else if(matrizestadomar[3] == "2") saida(" Estado del mar: Marejadilla(0,1 -0,5 m) ");
		else if(matrizestadomar[3] == "3") saida(" Estado del mar: Marejada(0,5 - 1,25  m) ");
		else if(matrizestadomar[3] == "4") saida(" Estado del mar: Fuerte Marejada(1,25 - 2,5 m) ");
		else if(matrizestadomar[3] == "5") saida(" Estado del mar: Gruesa(2,5 - 4 m) ");
		else if(matrizestadomar[3] == "6") saida(" Estado del mar: Muy gruesa(4 - 6 m)");
		else if(matrizestadomar[3] == "7") saida(" Estado del mar: Arbolada(6 - 9 m) ");
		else if(matrizestadomar[3] == "8") saida(" Estado del mar: Montañosa(9 - 14 m) ");
		else if(matrizestadomar[3] == "9") saida(" Estado del mar: Enorme(más de 14 m) ");

		saida("\n");
		return;
	}
		


// Temperatura de superficie del mar y la altura de ola significativa

	var olasig = /^W(M)?(\d{2})\/H(\d{3})(=)?$/;
	if (olasig.test(codigo)){
		var matrizolasig = olasig.exec(codigo);
		if(typeof matrizolasig[1] != "undefined"){
			saida(" Temperatura de la superficie del mar: -" +matrizolasig[2]+ " ºC.");
		}
		else{
			saida(" Temperatura de la superficie del mar : " +matrizolasig[2]+ " ºC.");
		}
		
		saida(" Y la altura de ola significativa es de " +matrizolasig[3]+ " decímetros.");
		saida("\n");
		return;
	}



//Estado de la pista
	var estadopista = /^R(\d{2})?(R|C|L)?\/(\d{1}|\/)?(\d{1}|\/)?(\d{2}|\/\/)?(\d{2}|\/\/)?(CLRD\/\/|SNOCLO)?(=)?$/;
	if(estadopista.test(codigo)){
		var matrizestadopista = estadopista.exec(codigo);
		if ((typeof matrizestadopista[7] != "undefined")&&(matrizestadopista[7]=="SNOCLO")){
			
			saida(" Aeródromo cerrado debido a la nieve.");
		}
		else{
			if(typeof matrizestadopista[2] != "undefined"){
				if(matrizestadopista[2] == "R") saida(" Pista " +matrizestadopista[1]+ "R:");
				else if(matrizestadopista[2] == "C") saida(" Pista " +matrizestadopista[1]+ "C:");
				else if(matrizestadopista[2] == "L") saida(" Pista " +matrizestadopista[1]+ "L:");
				
				if(typeof matrizestadopista[3] != "undefined"){

					var deposito = matrizestadopista[3];	
					if(deposito == "0") saida(" Pista clara y seca.");
					else if(deposito == "1") saida (" Pista húmeda.");
					else if(deposito == "2") saida (" Pista mojada con charcos.");
					else if(deposito == "3") saida (" Pista cubierta de cencellada blanca y escarcha.");
					else if(deposito == "4") saida (" Pista con nieve seca.");
					else if(deposito == "5") saida (" Pista con nieve mojada.");
					else if(deposito == "6") saida (" Pista con nieve fundente.");
					else if(deposito == "7") saida (" Pista con hielo.");
					else if(deposito == "8") saida (" Pista con nieve compactada o amontonada.");
					else if(deposito == "9") saida (" Pista con surcos o bancos de hielo.");
					else if(deposito == "/") saida ("");
					
					
					var contaminacion = matrizestadopista[4];
					if(contaminacion == 1) saida (" Pista cubierta con menos de 10%.");
					else if(contaminacion == 2) saida (" Pista cubierta del 11% al 25%.");
					else if(contaminacion == 3) saida ("");
					else if(contaminacion == 4) saida ("");
					else if(contaminacion == 5) saida (" Pista cubierta del 26% al 50%.");
					else if(contaminacion == 6) saida ("");
					else if(contaminacion == 7) saida ("");
					else if(contaminacion == 8) saida ("");
					else if(contaminacion == 9) saida (" Pista cubierta del 51% al 100%.");
					else if(contaminacion == "/") saida ("");
		
					var espessor = matrizestadopista[5];
					if(espessor == 00) saida (" Espesor del depósito menor que 1 mm.");
					else if((espessor >0 && espessor <92)) saida (" Espesor del depósito de "+espessor+ " mm.");
					else if(espessor == 92) saida (" Espesor del depósito de 10 mm.");
					else if(espessor == 93) saida (" Espesor del depósito de 15 mm.");
					else if(espessor == 94) saida (" Espesor del depósito de 20 mm.");
					else if(espessor == 95) saida (" Espesor del depósito de 25 mm.");
					else if(espessor == 96) saida (" Espesor del depósito de 30 mm.");
					else if(espessor == 97) saida (" Espesor del depósito de 35 mm.");
					else if(espessor == 98) saida (" Espesor del depósito de 40 mm o más.");
					else if(espessor == 99) saida (" Espesor no notificado, pista no está operativa.");
					else if(espessor == "//") saida ("");

					var friccion = matrizestadopista[6];
					if(friccion == 00) saida (" Coeficiente de fricción de 0,00.");
					else if((friccion >00 && friccion <91)) saida(" Coeficiente de fricción de " +friccion+ ".");
					else if(friccion == 91) saida (" Eficacia de frenado pobre.");
					else if(friccion == 92) saida (" Eficacia de frenado mediana/pobre.");
					else if(friccion == 93) saida (" Eficacia de frenado mediana.");
					else if(friccion == 94) saida (" Eficacia de frenado mediana/buena.");
					else if(friccion == 95) saida (" Eficacia de frenado buena.");
					else if(friccion == 96) saida ("");
					else if(friccion == 97) saida ("");
					else if(friccion == 98) saida ("");
					else if(friccion == 99) saida (" Poco seguro");
					else if(friccion == "//") saida ("");
						 
				}
				if ((typeof matrizestadopista[3] == "undefined")&&(matrizestadopista[7]=="CLRD//"))
						saida (" Los contaminantes han desaparecido.");
				
			}
			
			else if (matrizestadopista[1] == 88){
				saida(" Todas las pistas del aeródromo:");
				
				if(typeof matrizestadopista[3] != "undefined"){

					var deposito = matrizestadopista[3];	
					if(deposito == "0") saida(" Pistas claras y secas.");
					else if(deposito == "1") saida (" Pistas húmedas.");
					else if(deposito == "2") saida (" Pistas mojadas con charcos.");
					else if(deposito == "3") saida (" Pistas cubiertas de cencellada blanca y escarcha.");
					else if(deposito == "4") saida (" Pistas con nieve seca.");
					else if(deposito == "5") saida (" Pistas con nieve mojada.");
					else if(deposito == "6") saida (" Pistas con nieve fundente.");
					else if(deposito == "7") saida (" Pistas con hielo.");
					else if(deposito == "8") saida (" Pistas con nieve compactada o amontonada.");
					else if(deposito == "9") saida (" Pistas con surcos o bancos de hielo.");
					else if(deposito == "/") saida ("");
					
					var contaminacion = matrizestadopista[4];
					if(contaminacion == 1) saida (" Pistas cubiertas con menos de 10%.");
					else if(contaminacion == 2) saida (" Pistas cubiertas del 11% al 25%.");
					else if(contaminacion == 3) saida ("");
					else if(contaminacion == 4) saida ("");
					else if(contaminacion == 5) saida (" Pistas cubierta del 26% al 50%.");
					else if(contaminacion == 6) saida ("");
					else if(contaminacion == 7) saida ("");
					else if(contaminacion == 8) saida ("");
					else if(contaminacion == 9) saida (" Pistas cubiertas del 51% al 100%.");
					else if(contaminacion == "/") saida ("");
		
					var espessor = matrizestadopista[5];
					if(espessor == 00) saida (" Espesor del depósito menor que 1 mm.");
					else if((espessor >0 && espessor <92)) saida (" Espesor del depósito de "+espessor+ " mm.");
					else if(espessor == 92) saida (" Espesor del depósito de 10 mm.");
					else if(espessor == 93) saida (" Espesor del depósito de 15 mm.");
					else if(espessor == 94) saida (" Espesor del depósito de 20 mm.");
					else if(espessor == 95) saida (" Espesor del depósito de 25 mm.");
					else if(espessor == 96) saida (" Espesor del depósito de 30 mm.");
					else if(espessor == 97) saida (" Espesor del depósito de 35 mm.");
					else if(espessor == 98) saida (" Espesor del depósito de 40 mm o más.");
					else if(espessor == 99) saida (" Espesor no notificado, pista no esta operativa.");
					else if(espessor == "//") saida ("");

					var friccion = matrizestadopista[6];
					if(friccion == 00) saida (" Coeficiente de fricción de 0,00.");
					else if((friccion >00 && friccion <91)) saida(" Coeficiente de fricción de " +friccion+ ".");
					else if(friccion == 91) saida (" Eficacia de frenado pobre.");
					else if(friccion == 92) saida (" Eficacia de frenado mediana/pobre.");
					else if(friccion == 93) saida (" Eficacia de frenado mediana.");
					else if(friccion == 94) saida (" Eficacia de frenado mediana/buena.");
					else if(friccion == 95) saida (" Eficacia de frenado buena.");
					else if(friccion == 96) saida ("");
					else if(friccion == 97) saida ("");
					else if(friccion == 98) saida ("");
					else if(friccion == 99) saida (" Poco seguro");
					else if(friccion == "//") saida ("");					
					
					

					
				}
					if ((typeof matrizestadopista[3] == "undefined")&&(matrizestadopista[7]=="CLRD//"))
						saida (" Los contaminantes han desaparecido.");
			}
			
			
			else if (matrizestadopista[1] == 99){
				saida(" Se repite el mensaje anterior por no tener disponibles datos actualizados:");
				
				
				if(typeof matrizestadopista[3] != "undefined"){

					var deposito = matrizestadopista[3];	
					if(deposito == "0") saida(" Pistas claras y secas.");
					else if(deposito == "1") saida (" Pistas húmedas.");
					else if(deposito == "2") saida (" Pistas mojadas con charcos.");
					else if(deposito == "3") saida (" Pistas cubiertas de centellada blanca y escarcha.");
					else if(deposito == "4") saida (" Pistas con nieve seca");
					else if(deposito == "5") saida (" Pistas con nieve mojada.");
					else if(deposito == "6") saida (" Pistas con nieve fundente.");
					else if(deposito == "7") saida (" Pistas con hielo.");
					else if(deposito == "8") saida (" Pistas con nieve compactada o amontoada.");
					else if(deposito == "9") saida (" Pistas con surcos o bancos helados.");
					else if(deposito == "/") saida ("");
					
					
					var contaminacion = matrizestadopista[4];
					if(contaminacion == 1) saida (" Pistas cubiertas con menos de 10%.");
					else if(contaminacion == 2) saida (" Pistas cubiertas del 11% al 25%.");
					else if(contaminacion == 3) saida ("");
					else if(contaminacion == 4) saida ("");
					else if(contaminacion == 5) saida (" Pistas cubierta del 26% al 50%.");
					else if(contaminacion == 6) saida ("");
					else if(contaminacion == 7) saida ("");
					else if(contaminacion == 8) saida ("");
					else if(contaminacion == 9) saida (" Pistas cubiertas del 51% al 100%.");
					else if(contaminacion == "/") saida ("");
		
					var espessor = matrizestadopista[5];
					if(espessor == 00) saida (" Espesor del depósito menor que 1 mm.");
					else if((espessor >0 && espessor <92)) saida (" Espesor del depósito de "+espessor+ " mm.");
					else if(espessor == 92) saida (" Espesor del depósito de 10 mm.");
					else if(espessor == 93) saida (" Espesor del depósito de 15 mm.");
					else if(espessor == 94) saida (" Espesor del depósito de 20 mm.");
					else if(espessor == 95) saida (" Espesor del depósito de 25 mm.");
					else if(espessor == 96) saida (" Espesor del depósito de 30 mm.");
					else if(espessor == 97) saida (" Espesor del depósito de 35 mm.");
					else if(espessor == 98) saida (" Espesor del depósito de 40 mm o mas.");
					else if(espessor == 99) saida (" Espesor no notificado, pista no esta operativa.");
					else if(espessor == "//") saida ("");

					var friccion = matrizestadopista[6];
					if(friccion == 00) saida (" Coeficiente de fricción de 0,00.");
					else if((friccion >00 && friccion <91)) saida(" Coeficiente de fricción de " +friccion+ ".");
					else if(friccion == 91) saida (" Eficacia de frenado pobre.");
					else if(friccion == 92) saida (" Eficacia de frenado mediana/pobre.");
					else if(friccion == 93) saida (" Eficacia de frenado mediana.");
					else if(friccion == 94) saida (" Eficacia de frenado mediana/buena.");
					else if(friccion == 95) saida (" Eficacia de frenado buena.");
					else if(friccion == 96) saida ("");
					else if(friccion == 97) saida ("");
					else if(friccion == 98) saida ("");
					else if(friccion == 99) saida (" Poco seguro");
					else if(friccion == "//") saida ("");					
					
					

					
				}
					if ((typeof matrizestadopista[3] == "undefined")&&(matrizestadopista[7]=="CLRD//"))
						saida (" Los contaminantes han desaparecido.");
			}
			
			else{
				saida(" Pista " +matrizestadopista[1]+ ":");
			

					if(typeof matrizestadopista[3] != "undefined"){

					var deposito = matrizestadopista[3];	
					if(deposito == "0") saida(" Pista clara y seca.");
					else if(deposito == "1") saida (" Pista húmeda.");
					else if(deposito == "2") saida (" Pista mojada con charcos.");
					else if(deposito == "3") saida (" Pista cubierta de centellada blanca y escarcha.");
					else if(deposito == "4") saida (" Pista con nieve seca.");
					else if(deposito == "5") saida (" Pista con nieve mojada.");
					else if(deposito == "6") saida (" Pista con nieve fundente.");
					else if(deposito == "7") saida (" Pista con hielo.");
					else if(deposito == "8") saida (" Pista con nieve compactada o amontoada.");
					else if(deposito == "9") saida (" Pista con surcos o bancos helados.");
					else if(deposito == "/") saida ("");
			
					var contaminacion = matrizestadopista[4];
					if(contaminacion == 1) saida (" Pista cubierta con menos de 10%.");
					else if(contaminacion == 2) saida (" Pista cubierta del 11% al 25%.");
					else if(contaminacion == 3) saida ("");
					else if(contaminacion == 4) saida ("");
					else if(contaminacion == 5) saida (" Pista cubierta del 26% al 50%.");
					else if(contaminacion == 6) saida ("");
					else if(contaminacion == 7) saida ("");
					else if(contaminacion == 8) saida ("");
					else if(contaminacion == 9) saida (" Pista cubierta del 51% al 100%.");
					else if(contaminacion == "/") saida ("");
		
					var espessor = matrizestadopista[5];
					if(espessor == 00) saida (" Espesor del depósito menor que 1 mm.");
					else if((espessor >0 && espessor <92)) saida (" Espesor del depósito de "+espessor+ " mm.");
					else if(espessor == 92) saida (" Espesor del depósito de 10 mm.");
					else if(espessor == 93) saida (" Espesor del depósito de 15 mm.");
					else if(espessor == 94) saida (" Espesor del depósito de 20 mm.");
					else if(espessor == 95) saida (" Espesor del depósito de 25 mm.");
					else if(espessor == 96) saida (" Espesor del depósito de 30 mm.");
					else if(espessor == 97) saida (" Espesor del depósito de 35 mm.");
					else if(espessor == 98) saida (" Espesor del depósito de 40 mm o más.");
					else if(espessor == 99) saida (" Espesor no notificado, pista no esta operativa.");
					else if(espessor == "//") saida ("");

					var friccion = matrizestadopista[6];
					if(friccion == 00) saida (" Coeficiente de fricción de 0,00.");
					else if((friccion >00 && friccion <91)) saida(" Coeficiente de fricción de " +friccion+ ".");
					else if(friccion == 91) saida (" Eficacia de frenado pobre.");
					else if(friccion == 92) saida (" Eficacia de frenado mediana/pobre.");
					else if(friccion == 93) saida (" Eficacia de frenado mediana.");
					else if(friccion == 94) saida (" Eficacia de frenado mediana/buena.");
					else if(friccion == 95) saida (" Eficacia de frenado buena.");
					else if(friccion == 96) saida ("");
					else if(friccion == 97) saida ("");
					else if(friccion == 98) saida ("");
					else if(friccion == 99) saida (" Poco seguro");
					else if(friccion == "//") saida ("");			
			

				}
					if ((typeof matrizestadopista[3] == "undefined")&&(matrizestadopista[7]=="CLRD//"))
						saida (" Los contaminantes han desaparecido.");
			}
		}

		saida("\n");
		return;

	}	
			
	
	//TEMPO Y BECMG

	if((codigo == "TEMPO")|(codigo == "TEMPO="))
	{
		saida("\nPronóstico de tendencia en las 2 horas siguientes:\nTemporalmente:\n");
		return;
	}
	
	if((codigo == "BECMG")|(codigo == "BECMG="))
	{
		saida("\nSe espera que predominen las siguientes condiciones durante el periodo de la observación:");
		return;
	}
	
	


	var tendencia = /^(FM|TL|AT)(\d{2})(\d{2})(=)?$/;
	if (tendencia.test(codigo)){		
		var matriztendencia = tendencia.exec(codigo);
		if(matriztendencia[1] == "FM"){
			saida("El período de cambio se iniciará ");
		}
		else if(matriztendencia[1] == "TL"){
			saida("El período de cambio terminará ");
		}
		else if(matriztendencia[1] == "AT"){
			saida("El período de cambio va a ser ");
		}

		saida("a las "+matriztendencia[2]+":"+matriztendencia[3]+ " horas.");
		saida("\n");
		return;
	}

	

		//NIL
	if((codigo == "NIL")|(codigo == "NIL="))
	{
		saida("Ausencia de METAR");
		return;

	}
		
		
		//RMK
	if ((codigo == "RMK")|(codigo == "RMK="))
	{
		saida("\n Información añadida para este aeródromo. ");
	}
		

}


function codigo(text)                                              
{
  textoSalida = "";

 

    var juntarlineas = text.replace(/(\x0d\x0a)|\x0D|\x0A/g, " ");
    var matrizCodigo;
    matrizCodigo = juntarlineas.split(" "); 
	var numeroCodigo = 0;

//La función split() permite dividir una cadena de caracteres (string)
//en varios bloques y crear un array con estos, en función de un elemento 
//indicador del split. 
    


    // VERIFICA EL TIPO DE MENSAGEM                             
    if((matrizCodigo[numeroCodigo] == "METAR")||(matrizCodigo[numeroCodigo]== "metar"))
    {
	 numeroCodigo++; 
    }
    else if(matrizCodigo[numeroCodigo] == "SPECI")
    {
        saida("Informe especial de aeródromo \n\n");
        numeroCodigo++;
    }
	


	//Tipos de Predicciones                                     
	if (matrizCodigo[numeroCodigo] == "AMD")
	{
		saida("Observación enmendada \n\n");
		numeroCodigo++;
	}
	else if(matrizCodigo[numeroCodigo] == "CNL")
	{
		saida("Observación cancelada \n\n");
		numeroCodigo++;
	}
	else if(matrizCodigo[numeroCodigo] == "COR")
	{
		saida("Observación corregida \n\n");
		numeroCodigo++;
	}
	else if(matrizCodigo[numeroCodigo] == "NIL")
	{
		saida("Observación ausente \n\n");
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
		saida("Aeropuerto de Melilla - España \n\n");
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
        saida("Día: " + matrizCodigo[numeroCodigo].substr(0,2) + "\n");    //.substr empieza a analizar del 0 y retorna valor hasta el caracter 2
        saida("Hora: " + matrizCodigo[numeroCodigo].substr(2,2) +":" +     // empieza del caracter 2 y retorna el valor hasta el caracter 4    
               matrizCodigo[numeroCodigo].substr(4,2) + " UTC");           // empieza del caracter 4 y retorna el valor hasta el caracter 6

        saida("\n\n")
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