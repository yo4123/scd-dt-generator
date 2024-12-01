<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once('database.php');
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

 
$input = json_decode(file_get_contents('php://input'), true);
$response = ['success' => false, 'message' => 'Invalid request'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM precios");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response =   $data;
        break;
    //case 'GET':
        //if (!empty($_GET[''])) {
          //  $id = $_GET[''];
          //  $stmt = $pdo->prepare("SELECT * FROM precios WHERE  = :");
          //  $stmt->bindParam(':', $);
           // $stmt->execute();
          //  $data = $stmt->fetch(PDO::FETCH_ASSOC);

           // if ($data) {
           //     $response = ['success' => true, 'data' => $data];
           // } else {
           //     $response = ['success' => false, 'message' => 'Record not found'];
            //}
       // }
       // break;
    case 'POST':
        $name = $_GET[''];
        // Verificar si el nombre ya existe en la tabla
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM precios WHERE  = :");
        $stmt->bindParam(':', $);
        $stmt->execute();
        $rowCount = $stmt->fetchColumn();
 
     // Si el nombre no existe, realizar la inserción
        if ($rowCount == 0) {

        $stmt = $pdo->prepare("INSERT INTO precios (name,crypto,precio) VALUES (:name,:crypto,:precio)");

       // $this->bindValues($stmt, $input);

  
        $datacol = array(  'name','crypto','precio'   );
         
        foreach ( $datacol  as $column) {
            
            $stmt->bindParam(':'.$column.'', $input[''.$column.'']);
        }  
 

        if ($stmt->execute()) {
            $response = ['success' => true, 'message' => 'Record inserted successfully'];
        } else {
            $response = ['success' => false, 'message' => 'Failed to insert record'];
        }

        } else {
        echo 'Ya existe un registro con el nombre proporcionado. No se realizó la inserción.';
        }

        break;
    case 'PUT':
        if (!empty($_GET[''])) {
            $id = $_GET[''];
          
            $stmt = $pdo->prepare("UPDATE precios SET name = :name, crypto = :crypto, precio = :precio WHERE  = :");
            
            $datacol = array(  'name','crypto','precio'   );
         
            foreach ( $datacol  as $column) {
                
                $stmt->bindParam(':'.$column.'', $input[''.$column.'']);
            }  
     
    
            if ($stmt->execute()) {
                $response = ['success' => true, 'message' => 'Record updated successfully'];
            } else {
                $response = ['success' => false, 'message' => 'Failed to update record'];
            }
        }
        break;
    case 'DELETE':
        if (!empty($_GET[''])) {
            $id = $_GET[''];
            $stmt = $pdo->prepare("DELETE FROM precios WHERE  = :");
            $stmt->bindParam(':', $id);

            if ($stmt->execute()) {
                $response = ['success' => true, 'message' => 'Record deleted successfully'];
            } else {
                $response = ['success' => false, 'message' => 'Failed to delete record'];
            }
        }
        break;
}

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>