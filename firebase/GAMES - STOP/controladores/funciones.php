<?php

	require_once('conexion.php');
// Función para obtener las partidas
	function getPartidas(){
		$partidas = [];
		$db = new conexion();
		$q="SELECT * FROM partidas";
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
	function intoPartidas($idUsuario,$nombre,$apellido,$ciudad,$pais,$color,$animal,$fruto,$idSala,$stop){
		$db = new conexion();
		$q = "INSERT INTO `partidas` (`id`, `idUser`, `nombre`, `apellido`, `ciudad`, `pais`, `color`, `animal`, `fruto`, `idSala`, `stop`) VALUES (NULL, '$idUsuario', '$nombre', '$apellido', '$ciudad', '$pais', '$color', '$animal', '$fruto', '$idSala', '$stop')";
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






// Probando las funciones

// print(getPartidas());

// print(intoPartidas(NULL, '124424', 'nombre', 'apellido', 'ciudad', 'pais', 'color', 'animal', 'fruto', '1212', '7'));

	print(getUsuarios());

 ?>