<?php
include('conexion.php');
$response = array();
$result = 0;
if(isset($_GET["numero"]) && !empty($_GET["numero"])){
$numero = $_GET["numero"];
$query = 'SELECT * FROM mensajes WHERE para="'. $numero .'"';
$result = mysqli_query($link, $query);
}
$cont = 0;
if ($result){
	while ($line = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        		$msj = array();
        		$msj['id'] =  $line['id'];
        		$msj['de'] = $line['de'];
        		$msj['para'] = $line['para'];
        		$msj['mensaje'] = $line['mensaje'];
        		$msj['fecha'] = $line['fecha'];
        		$msj['hora'] = $line['hora'];
				array_push($response, $msj);
				$cont ++;
	}
}
mysqli_query($link,'DELETE FROM mensajes WHERE para="'. $numero .'"');
if($cont>0){
	$response['Validacion'] = 'OK';
	$response['len'] = $cont;
	}else{
	$response['Validacion'] = 'NOT';
	}
header('Content-type: application/json; charset=utf-8');
echo json_encode($response);
exit();
?>
