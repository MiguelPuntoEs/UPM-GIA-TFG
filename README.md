# Trabajo Fin de Grado
Miguel González Calvo, **Grado en Ingeniería Aeroespacial**, Universidad Politécnica de Madrid.

Desarrollo de una herramienta para la descodificación de mensajes SIGMET, AIRMET y presentación gráfica junto a METAR, TAF y Avisos de Aeródromo.

## Contexto

Los mensajes de meteorología aeronáutica elaborados en las oficinas de AEMet presentan valores de importancia para la navegación aérea, como magnitudes de viento y su dirección, presencia de lluvias, cantidad y altura de las nubes, visibilidad, fenómenos significativos, etc.

Estos mensajes se presentan en un formato codificado, de acuerdo con el manual de claves de la OMM y las normas establecidas por OACI. Mediante la utilización de esta aplicación se pueden obtener en lenguaje claro los SIGMET, AIRMET, METAR, TAF y Avisos de aeródromo.

## Alcance

Descodificación y presentación gráfica de:
- SIGMET, excl. ciclones tropicales y cenizas volcánicas
- AIRMET
- METAR
- TAF
- Avisos de Aeródromo

## Arquitectura

SIGMETS:
- Archivos HTML: `sigmet_beta.html`
- Archivos PHP: `getMessage.php`, `getSigmets.php`
- Archivos .txt: `[sigmet_header].txt`
  
METAR:
- Archivos HTML: `metar.html`
- Archivos PHP: `getMessage.php`
- Archivos .txt: `[aerodrome_id].txt`

TAF:
- Archivos HTML: `taf.html`
- Archivos PHP: `getMessage.php`
- Archivos .txt: `[aerodrome_id].txt`

Avisos de aeródromo:
- Archivos HTML: `avisos.html`
- Archivos PHP: `getMessage.php`
- Archivos .txt: `[aerodrome_warning_header].txt`

## Trabajo futuro
- Interfaz para móvil y tablet
- Fuente de información diferente a AEMet
- Países que no siguen directrices OACI
- Presentación de SIGMET en ruta

# Acrónimos

METAR Meteorological Aerodrome Report
OMM Organización Meteorológica Mundial
OACI Organización de Aviación Civil Internacional
SIGMET Significant Meteorological Information
TAF Terminal Area Forecast
