<?php
include('conexion.php');
$response = array();
$result  = 0;
if(isset($_GET['nombre']) && isset($_GET["numero"]) && !empty($_GET['nombre']) && !empty($_GET["numero"])){
$nombre = $_GET["nombre"];
$numero = $_GET["numero"];
$query = 'INSERT INTO Users (nombre, numero) VALUES("'. $nombre.'","'. $numero.'")';
$result = mysqli_query($link,$query);
}
if ($result){
	$response['Validacion'] = 'OK';
}else{
	$response['Validacion'] = 'NOT';
	}
header('Content-type: application/json; charset=utf-8');
echo json_encode($response);
exit();
?>
