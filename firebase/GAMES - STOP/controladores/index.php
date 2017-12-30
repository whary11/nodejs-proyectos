<?php 
	require_once('funciones.php');
	if(isset($_POST['imagen']) AND Isset($_POST['nombre'])){
		$idFirebase = $_POST['id'];
		$nombre = $_POST['nombre'];
		$correo = $_POST['correo'];
		$imagen = $_POST['imagen'];
		$online = $_POST['online'];
		$db = new conexion();
		if($db::buscaUsuario($idFirebase)){
			print(json_encode(["resp" => 'El usuario ya existe..']));
		}else{
			if(intoUsuario($idFirebase, $correo, $imagen, $nombre, $online)){
				print(json_encode(["resp" => true]));
			}else{
				print(json_encode(["resp" => false]));
			}
		}

	}else if(isset($_POST['idSala'])){
		// Sólo está insertando el dato una vez
		// print($_POST['idSala']);
		if(intoInvitaciones($_POST['idSala'], $_POST['idUsuario'], $_POST['confirmacion'], $_POST['idCreador'], $_POST['letra'])){
			print(json_encode(['resp' => true]));
		}else{
			print(json_encode(['resp' => false]));
		}
	}
	



 ?>