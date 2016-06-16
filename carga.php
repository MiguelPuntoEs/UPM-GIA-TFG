<?php
  $page = file_get_contents('http://www.aviationweather.gov/sigmet/intl?hazard=all&loc=eur&layout=off');

  $txt = $page;

  $texto = $txt;

  $patron = '/([A-Z]{4}) (AIRMET|SIGMET) (\w{1,3}) VALID (\d{6}\/\d{6}) ([A-Z]{4})(?s)(.*)(WKN|NC|INTSF)=/sU';

  preg_match_all($patron, $texto, $coincidencias);

  $fichero = 'avweather.txt';
  $myfile = fopen($fichero, "w") or die("Unable to open file!");
  $txt = "";
  foreach($coincidencias[0] as $x => $x_value) {
    $txt = $x_value."\n***\n";
    fwrite($myfile, $txt);
  }
  fclose($myfile);

?>