<?php
include('conexion.php');
date_default_timezone_set('America/Caracas');
$fecha = date("n-j-Y");
$hora = date("H:i");
$result = 0;
$response = array();
if(isset($_POST['De']) && isset($_POST["Para"]) && isset($_POST["MSJ"]) && !empty($_GET['De']) && !empty($_POST['Para']) && !empty($_POST['MSJ'])){
$de = $_POST["De"];
$para = $_POST["Para"];
$msj = $_POST["MSJ"];
$query = 'INSERT INTO mensajes (de, para, mensaje, fecha, hora, estatus) VALUES("'. $de.'","'. $para.'", "' . $msj . '", "'.$fecha.'", "'.$hora.'", "")';
$result = mysqli_query($link, $query);
}
if ($result){
	$response['fecha'] = $fecha;
	$response['hora'] = $hora;
	$response['estatus'] = "";
	$response['Validacion'] = 'SEND';
}else{
	$response['Validacion'] = 'NOT';
	}
header('Content-type: application/json; charset=utf-8');
echo json_encode($response);
exit();
?>
