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
	}else if(isset($_POST['confirmacion']) AND isset($_POST['idUsuario'])){
		if(intoInvitaciones($_POST['idSala'], $_POST['idUsuario'], $_POST['confirmacion'], $_POST['idCreador'], $_POST['letra'])){
			print(json_encode(['resp' => true]));
		}else{
			print(json_encode(['resp' => false]));
		}
	}else if(isset($_POST['req'])){
		$idSala = $_POST['idSala'];

		$q="SELECT * FROM partidas WHERE idSala='$idSala'";
		print(getPartidas($q));
	}else if(isset($_POST['letra']) AND isset($_POST['fruto'])){
			$letra = $_POST['letra'];
			$id = $_POST['id'];
			$nombre = $_POST['nombre'];
			$apellido = $_POST['apellido'];
			$ciudad = $_POST['ciudad'];
			$pais = $_POST['pais'];
			$color = $_POST['color'];
			$animal = $_POST['animal'];
			$fruto = $_POST['fruto'];
			$idSala = $_POST['idSala'];
			$stop = $_POST['stop'];
			if (intoPartidas($id,$nombre,$apellido,$ciudad,$pais,$color,$animal,$fruto,$idSala,$stop,$letra)) {
				print(json_encode(['resp' => true]));
			}else{
				print(json_encode(['resp' => false]));
			}



	}
	



 ?>