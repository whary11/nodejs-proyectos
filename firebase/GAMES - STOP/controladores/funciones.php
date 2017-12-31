<?php
	require_once('conexion.php');
// Función para obtener las partidas
	function getPartidas($q){
		$partidas = [];
		$db = new conexion();
		
		$data = $db->leeTabla($q);
		for ($i=0; $i < count($data) ; $i++) { 
			// Falta retornar la ciudad en el array
			// print($data[$i]->ciudad);
			array_push($partidas, ['id'=>$data[$i]->id, 'idUser'=>$data[$i]->idUser, 'nombre'=>$data[$i]->nombre, 'apellido'=>$data[$i]->apellido, 'pais'=>$data[$i]->pais, 'color'=>$data[$i]->color, 'animal'=>$data[$i]->animal, 'fruto'=>$data[$i]->fruto, 'idSala'=>$data[$i]->idSala, 'stop'=>$data[$i]->stop]);
		}
		return json_encode($partidas);
	}
	// , 'ciudad'=>$data[$i]->ciudad]

// Función para fuardar las partidas
	function intoPartidas($idUsuario,$nombre,$apellido,$ciudad,$pais,$color,$animal,$fruto,$idSala,$stop,$letra){
		$db = new conexion();
		$q = "INSERT INTO `partidas` (`id`, `idUser`, `nombre`, `apellido`, `ciudad`, `pais`, `color`, `animal`, `fruto`, `idSala`, `stop`, `letra`) VALUES (NULL, '$idUsuario', '$nombre', '$apellido', '$ciudad', '$pais', '$color', '$animal', '$fruto', '$idSala', '$stop', '$letra')";
		if($db->abc($q)){
			return true;

		}else{
			return false;
		}
	}

// Función para guardar los usuarios en la base de datos
	function intoUsuario($idfirebase, $correo, $imagen, $nombre, $online){
		$db = new conexion();
		$q = "INSERT INTO `usuarios` (`id`, `idfirebase`, `correo`, `imagen`, `nombre`, `online`) VALUES (NULL, '$idfirebase', '$correo', '$imagen', '$nombre', '$online')";
		if($db->abc($q)){
			return true;

		}else{
			return false;
		}
	}
// Función para obtener los usuarios almacenados en la bd
	function getUsuarios(){
		$usuarios = [];
		$db = new conexion();
		$q="SELECT * FROM usuarios";
		$data = $db->leeTabla($q);
//  Textos completos 	id 	idfirebase 	correo 	imagen 	nombre 	online
		for ($i=0; $i < count($data) ; $i++) { 
			array_push($usuarios, ['id'=>$data[$i]->id, 'idfirebase'=>$data[$i]->idfirebase, 'correo'=>$data[$i]->correo, 'imagen'=>$data[$i]->imagen, 'nombre'=>$data[$i]->nombre, 'online'=>$data[$i]->online]);
		}
		return json_encode($usuarios);
	}

// Función para guardar las invitaciones en MySQL
	function intoInvitaciones($idSala, $idUsuario, $confirmacion, $idCreador, $letra){
		$db = new conexion();
		$q = "INSERT INTO `invitaciones` (`id`, `idSala`, `idUsuario`, `confirmacion`, `idCreador`, `letra`) VALUES (NULL, '$idSala', '$idUsuario', '$confirmacion', '$idCreador', '$letra')";
		$data = $db->abc($q);
		if($data){
			return true;

		}else{
			return false;
		}
	}
// Función para obtener las invitaciones
	function getInvitaciones(){
			$invitaciones = [];
			$db = new conexion();
			$q="SELECT * FROM invitaciones";
			$data = $db->leeTabla($q);
			for ($i=0; $i < count($data) ; $i++) { 
				array_push($invitaciones, ['id'=>$data[$i]->id, 'idSala'=>$data[$i]->idSala, 'idUsuario'=>$data[$i]->idUsuario, 'confirmacion'=>$data[$i]->confirmacion, 'idCreador'=>$data[$i]->idCreador, 'letra'=>$data[$i]->letra]);
			}
			return json_encode($invitaciones);
		}






// Probando las funciones
// $q="SELECT * FROM partidas";
// print(getPartidas($q));

// print(intoPartidas(NULL, '124424', 'nombre', 'apellido', 'ciudad', 'pais', 'color', 'animal', 'fruto', '1212', '7'));

	// print(getUsuarios());

	// intoInvitaciones('24524524', 'lraga', '2452', '245');

		// print(getInvitaciones());

 ?>