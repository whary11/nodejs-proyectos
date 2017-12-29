
<?php
	// Ejemplos de clases en PHP
	class conexion
	{
		private $valor1 = "Luis Fernando Raga Renteria";
		private $host = "localhost";
		private $usuario = "root";
		private $clave = "";
		private $db = "stop";
		private $conn;

		public function __construct(){
			$this->conn = mysqli_connect($this->host, $this->usuario, $this->clave, $this->db);
			if(mysqli_connect_error()){
				print("error");
				exit;
			}
		}
		// Consulta de base de datos, recibiendo una cadena con la consulta
		public function query($q){
			$data = array();
			if($q!=""){
				if($r=mysqli_query($this->conn, $q)){
					$data = mysqli_fetch_row($r);
					return $data;
				}else{
					return false;
				}
			}
			
		}
		// función para buscar cualquier usuario siguiendo los parámetros exigidos
		public static function buscaUsuario($tabla,$usuario, $clave){
			$db = new conexion();
			$data = $db->query("SELECT * FROM $tabla WHERE usuario='".$usuario."' AND clave='".$clave."'");
			if(isset($data[0])){
				return true;
			}else{
				return false;
			}
			$db->close();
			unset($db);
		}
		// Fúnción que permite leer tabla a partir de la cadena dada
		public function leeTabla($q){
			$data = array();
			if($q!=""){
				if($r=mysqli_query($this->conn, $q)){
					while($obj = mysqli_fetch_object($r)){
						array_push($data,$obj);
					}
					return $data;
				}else{
					return false;
				}
			}
		}
		//Método para insertar, actualizar y eliminar registros en una base de datos.
		public function abc($q){
			if($q!=""){
				if(mysqli_query($this->conn, $q)){
					
				return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
		// Método para modificar la propiedad $host
		public function modificaHost($valor)
		{
			$this->host = $valor;
		}
		// Método para modificar la propiedad $db
		public function modificaUsuario($valor)
		{
			$this->usuario = $valor;
		}
		// Metódo para modificar la propiedad $clave
		public function modificaClave($valor)
		{
			$this->clave = $valor;
		}
	}
	// $db = new conexion();




	/*
	$db = new conexion();

	//Ejemplo para eliminar registros
	$q = "DELETE FROM `usuarios` WHERE `usuarios`.`id` = 1";
	$db->abc($q);

	//Ejemplo para actualizar nuevos registros
	$q = "UPDATE `usuarios` SET `nombre` = 'Yan Carlo', `apellidos` = 'Lagarej', `correo` = 'Yraga@gmail.con', `usuario` = '@Yrag', `tipo` = '32', `clave` = '56784' WHERE `usuarios`.`id` = 7;";
	$db->abc($q);

	//Ejemplo para insertar nuevos registros
	$q = "INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `correo`, `usuario`, `tipo`, `clave`) VALUES (NULL, 'Yan Carlos', 'Lagarejo', 'Yraga@gmail.com', '@Yraga', '23', '5678')";
	$db->abc($q);

	//Ejemplo para la lectura de una tabla
	$q="SELECT * FROM usuarios WHERE id=1";
	$data = $db->leeTabla($q);
	// print count($data);
	for ($i=0; $i <count($data); $i++) {
		print("<p>".$data[$i]->correo."</p>");
	}


	//Ejemplo para buscar un usuario dentro de una base de datos
	if ($db::buscaUsuario("usuarios","@whary11","1234")) {
		print("Si existe en sistema");
	}else{
		print('No existe');
	}
	*/


 ?>


<?php

// <!-- Clase para notificaciones en tiempo real -->



// date_default_timezone_set('America/Bogota');
// echo date('h:i:s A');







 ?>