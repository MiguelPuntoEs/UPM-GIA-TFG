<?php
	$tipo = $_GET['tipo'];
	$icao = $_GET['icao'];
	switch ($tipo) {
		case 'metar':
			$path = './aero/MetarTaf/'.$icao.'.M';
			break;
		case 'taf':
			$path = './aero/MetarTaf/'.$icao.'.T';
			break;
		case 'aviso':
			$path = './aero/AvisosAero/WWSP60'.$icao.'.txt';
			break;
		default:
			# code...
			break;
	}
	if (file_exists($path)) {
	    echo file_get_contents($path);
	} else {
	    echo false;
	}
?>
