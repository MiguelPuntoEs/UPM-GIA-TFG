<html>
  <head>
    <meta charset="UTF-8">
    <title>Título</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=***REMOVED***&signed_in=true&callback=initMap&libraries=geometry"></script>
    <script src="script.js"></script> 
    <link href="css/bootstrap.min.css" rel="stylesheet">
    
    <style>
      .navbar {
        z-index: 3;
      }
      .navbar-brand {
        padding: 0;
        margin: 0;
      }
      #logo {
        padding: 7px;
        height: 50px;
      }
      .panel-default {
        z-index: 3;
        width: 500px;
        position: absolute;
        top: 60px;
        left: 150px;
      }
    </style>
    
    <style>
      body, html {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
      }
      #map {
        height: 94.6%;
        width: 100%;
        background-color: #006767;
        position: absolute;
        top: 50;
        left: 0;
        z-index: 1;
      }
      #container {
        position: absolute;
        top: 48;
        left: -2;
        z-index: 2;
        margin: 10px;
      }
      th, td {
        padding-left: 5;
        padding-right: 5;
        font-size: 10pt;
      }
      #tabletitle {
        text-align: center;
        font-family: sans-serif;
        padding-bottom: 4px;
      }
    </style>
    
  </head>
  <body>
    <?php include 'carga.php';?>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="http://www.aemet.es">
            <img alt="Brand" src="aemet.png" id="logo"/>
          </a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <button id='insert_sigmet' class="btn btn-default navbar-btn">Mostrar ventana</button>
            <button id='load_sigmet' class="btn btn-default navbar-btn">Cargar SIGMETs</button>
            <button id='clear_map' class="btn btn-default navbar-btn">Limpiar mapa</button>
          </ul>
          
          <ul class="nav navbar-nav navbar-right">
            <li><a href="mailto:miguel.gc@me.com"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Enlaces <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="http://www.aviationweather.gov/sigmet/intl?hazard=all&loc=eur&layout=off">Aviation Weather</a></li>
                <li><a href="http://ama.aemet.es/web/ama">Portal AMA</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="avweather.txt">Formato texto</a></li>
                <li><a href="fir.html">Mapa de FIR</a></li>
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    
    <div class="panel panel-default">
      <div class="panel-body">
        Basic panel example
      </div>
    </div>
    
    <div id="content">
      <div id="map"></div>
      <div id="container">
        <textarea id="input" placeholder="Introduzca el SIGMET/AIRMET" cols="80" rows="7"></textarea><br/>
        <button id="decodificar">Decodificar</button>
        <span id="coordinates">Coordenadas</span>
      </div>
    </div>
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script>
      $('document').ready(function(){
//        $('#container').hide();
        $('#insert_sigmet').text('Ocultar ventana');
        $('.panel').hide();
      });
      $('#insert_sigmet').click(function(){
//        $('#container').toggle();
        if($('#container').is(":visible")){
          $('#container').hide();
          $('#insert_sigmet').text('Introducir texto');
        }
        else {
          $('#container').show();
          $('#insert_sigmet').text('Ocultar ventana');
        }
      });
    </script>
    
  </body>
</html>