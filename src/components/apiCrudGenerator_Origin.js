//API CRUD GENERATOR MYSQL INI
class DynamicApiCrudGenerator {
  constructor(tableName, primaryKey, columns , dbcrud) {
    this.tableName = tableName;
    this.primaryKey = primaryKey.trim();
    this.columns = columns.split(',');
    this.dbcrud = dbcrud;
  }
 

  generateApiCrud() {
    let apiCode = this.generateHeader();

    if (this.dbcrud === 'YES') {
      
      apiCode += this.generateGetSingleEndpoint();
      apiCode += this.generateInsertEndpoint();
      apiCode += this.generateUpdateEndpoint();
      apiCode += this.generateDeleteEndpoint();
    } else {
      apiCode += this.generateGetAllEndpointWithoutID();
    }

    apiCode += this.generateFooter();

    return apiCode;
  }


 

  generateHeader() {
    return `<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once('database.php');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$response = ['success' => false, 'message' => 'Invalid request'];

//try {
    switch ($method) {
         case 'GET':`;
  }

  generateGetAllEndpointWithoutID() {
    return `
        $stmt = $pdo->query("SELECT * FROM  ${this.tableName}");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $response = $data;
        break; `;
  }


 /* generateGetAllEndpoint() {
   ;
  }*/


  generateGetSingleEndpoint() {
    return `
            case 'GET':
            if (!empty($_GET['${this.primaryKey}'])) {
                $id = $_GET['${this.primaryKey}'];
                $stmt = $pdo->prepare("SELECT * FROM ${this.tableName} WHERE '${this.primaryKey}' = :'${this.primaryKey}'");
                $stmt->bindParam(':${this.primaryKey}', $${this.primaryKey});
                $stmt->execute();
                $data = $stmt->fetch(PDO::FETCH_ASSOC);

                $response = $data;
                //if ($data) {
               // $response = ['success' => true, 'data' => $data];
                //} else {
               // $response = ['success' => false, 'message' => 'Record not found'];
                //}
                } else {
                $stmt = $pdo->query("SELECT * FROM ${this.tableName}");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $response = $data;
                //$response = ['success' => true, 'data' => $data];
            }
            break;`;
  }

  generateInsertEndpoint() {
    const tcolum = `'${this.columns.join("','")}'`;
    return `
    case 'POST':
    
        $name = $_GET['${this.primaryKey}'];
        // Verificar si el nombre ya existe en la tabla

        $stmt = $pdo->prepare("SELECT COUNT(*) FROM ${this.tableName} WHERE ${this.primaryKey} = :${this.primaryKey}");
        $stmt->bindParam(':${this.primaryKey}',  $${this.primaryKey} );
        $stmt->execute();
        $rowCount = $stmt->fetchColumn();

        // Si el nombre no existe, realizar la inserción
        if ($rowCount == 0) {
            $stmt = $pdo->prepare("INSERT INTO ${this.tableName} (${this.getColumnsString()}) VALUES (${this.getBindParamsString()})");

            $datacol = array(${tcolum});
            foreach ($datacol as $column) {
                $stmt->bindParam(':'.$column.'', $input[''.$column.'']);
            }

            if ($stmt->execute()) {
                $response = ['success' => true, 'message' => 'Record inserted successfully'];
            } else {
                $response = ['success' => false, 'message' => 'Failed to insert record'];
                throw new Exception('Failed to insert record');
                }
        } else {
            echo 'Ya existe un registro con el nombre proporcionado. No se realizó la inserción.';
        }

        break;`;
  }

  generateUpdateEndpoint() {
    const tcolum = `'${this.columns.join("','")}'`;
 
     
    let lineas = [];
    let tvalcol = this.columns;
    
    tvalcol.forEach(function(tvalue, index, array) {
      let upd = `$stmt->bindParam(':${tvalue}', $input['${tvalue}']);`;
      lineas.push(upd);
    });
     
    if (this.primaryKey !== null ) {
      lineas.unshift(`$stmt->bindParam(':${this.primaryKey}', $input['${this.primaryKey}']);`) 
    }
    
   


    return `
    case 'PUT':
        if (!empty($_GET['${this.primaryKey}'])) {
            $id = $_GET['${this.primaryKey}'];

            $stmt = $pdo->prepare("UPDATE ${this.tableName} SET ${this.getSetColumnParams()} WHERE ${this.primaryKey} = :${this.primaryKey}");

            ${lineas.join('')}

/*
            $datacol = array(${tcolum});
            foreach ($datacol as $column) {
                $stmt->bindParam(':'.$column.'', $input[''.$column.'']);
            }*/

            if ($stmt->execute()) {
                $response = ['success' => true, 'message' => 'Record updated successfully'];
            } else {
                //$response = ['success' => false, 'message' => 'Failed to update record'];
                throw new Exception('Failed to update record');

                }
        }
        break;`;
  }

  generateDeleteEndpoint() {
    return `
    case 'DELETE':
        if (!empty($_GET['${this.primaryKey}'])) {
            $id = $_GET['${this.primaryKey}'];
            $stmt = $pdo->prepare("DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = :${this.primaryKey}");
            $stmt->bindParam(':${this.primaryKey}', $id);

            if ($stmt->execute()) {
                $response = ['success' => true, 'message' => 'Record deleted successfully'];
            } else {
                $response = ['success' => false, 'message' => 'Failed to delete record'];
            }
        }
        break;`;
  }

  generateFooter() {
    return `
}

// Return the response as JSON
//header('Content-Type: application/json');
//echo json_encode($response);

ob_clean();
echo json_encode($response, JSON_PRETTY_PRINT);
?>`;
  }

  getColumnsString() {
    return this.columns.join(',');
  }

  getBindParamsString() {
    return ':' + this.columns.join(',:');
  }

  getUpdateSetString() {
    let setString = '';
    this.columns.forEach(column => {
      setString += `${column} = :${column}, `;
    });
    return setString.slice(0, -2); // Elimina la coma final
  }

  getSetColumnParams() {
    let setString = '';
    this.columns.forEach(column => {
      setString += `${column} = :${column}, `;
    });
    return setString.slice(0, -2); // Elimina la coma final
  }
}

export { DynamicApiCrudGenerator };
//API CRUD GENERATOR MYSQL END