<?php
include('conexion.php');
$response = array();
$result = 0;
if(isset($_POST["numero"]) && !empty($_POST["numero"])){	
$numero = $_POST["numero"];
$query = 'SELECT * FROM Users WHERE numero="'. $numero .'"';
$result = mysqli_query($link, $query);
}
$cont = 0;
if ($result){
	while ($line = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        		$response['id'] =  $line['id'];
        		$response['Nombre'] = $line['nombre'];
        		$response['Numero'] = $line['numero'];
        		$response['Estado'] = $line['estado'];
				$cont ++;
	}
}

if($cont>0){
	$response['Validacion'] = 'OK';
	}else{
	$response['Validacion'] = 'NOT';
	}
header('Content-type: application/json; charset=utf-8');
echo json_encode($response);
exit();
?>
