<?php

	require_once('conexion.php');

	function getPartidas(){
		$partidas = [];
		$db = new conexion();
		$q="SELECT * FROM partidas";
		$data = $db->leeTabla($q);
		// var_dump($data);

		for ($i=0; $i < count($data) ; $i++) { 
			// Falta retornar la ciudad en el array
			// print($data[$i]->ciudad);
			array_push($partidas, ['id'=>$data[$i]->id, 'idUser'=>$data[$i]->idUser, 'nombre'=>$data[$i]->nombre, 'apellido'=>$data[$i]->apellido, 'pais'=>$data[$i]->pais, 'color'=>$data[$i]->color, 'animal'=>$data[$i]->animal, 'fruto'=>$data[$i]->fruto, 'idSala'=>$data[$i]->idSala, 'stop'=>$data[$i]->stop]);
		}
		return json_encode($partidas);
	}

	// , 'ciudad'=>$data[$i]->ciudad]


	function intoPartidas($idUsuario,$nombre,$apellido,$ciudad,$pais,$color,$animal,$fruto,$idSala,$stop){
		$db = new conexion();
		$q = "INSERT INTO `partidas` (`id`, `idUser`, `nombre`, `apellido`, `ciudad`, `pais`, `color`, `animal`, `fruto`, `idSala`, `stop`) VALUES (NULL, '$idUsuario', '$nombre', '$apellido', '$ciudad', '$pais', '$color', '$animal', '$fruto', '$idSala', '$stop')";
		if($db->abc($q)){
			return true;

		}else{
			return false;
		}
	}






// Probando las funciones
// print(json_encode(getPartidas()));
print(getPartidas());

// print(intoPartidas(NULL, '124424', 'nombre', 'apellido', 'ciudad', 'pais', 'color', 'animal', 'fruto', '1212', '7'));

 ?>