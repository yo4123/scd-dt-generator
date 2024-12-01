
class DynamicApiCrudGenerator {
    constructor(tableName, primaryKey, columns, dbcrud, data_techDB) {
      this.tableName = tableName;
      this.primaryKey = primaryKey.trim();
      this.columns = columns.split(',');
      this.dbcrud = dbcrud;
      this.data_techDB = data_techDB;
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
  
  switch ($method) {
      case 'GET':`;
    }
  
    generateGetAllEndpointWithoutID() {
      switch (this.data_techDB) {
        case 'MySQL':
        case 'PostgreSQL':
          return `
          $stmt = $pdo->query("SELECT * FROM  ${this.tableName}");
          $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $response = $data;
          break;`;
        default:
          return `return "Unsupported database technology";`;
      }
    }
  
    generateGetSingleEndpoint() {
      switch (this.data_techDB) {
        case 'MySQL':
          return `
              case 'GET':
              if (!empty($_GET['${this.primaryKey}'])) {
                  $id = $_GET['${this.primaryKey}'];
                  $stmt = $pdo->prepare("SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :${this.primaryKey}");
                  $stmt->bindParam(':${this.primaryKey}', $${this.primaryKey});
                  $stmt->execute();
                  $data = $stmt->fetch(PDO::FETCH_ASSOC);
                  $response = $data;
              } else {
                  $stmt = $pdo->query("SELECT * FROM ${this.tableName}");
                  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                  $response = $data;
              }
              break;`;
        case 'PostgreSQL':
          return `
              case 'GET':
              if (!empty($_GET['${this.primaryKey}'])) {
                  $id = $_GET['${this.primaryKey}'];
                  $stmt = $pdo->prepare("SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :${this.primaryKey}");
                  $stmt->bindParam(':${this.primaryKey}', $${this.primaryKey}, PDO::PARAM_INT);
                  $stmt->execute();
                  $data = $stmt->fetch(PDO::FETCH_ASSOC);
                  if ($data) {
                    $response = $data;
                  } else {
                    $response = ['success' => false, 'message' => 'Record not found'];
                  }
              } else {
                  $stmt = $pdo->query("SELECT * FROM ${this.tableName}");
                  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                  $response = $data;
              }
              break;`;
        default:
          return `return "Unsupported database technology";`;
      }
    }
  
    generateInsertEndpoint() {
      const tcolum = `'${this.columns.join("','")}'`;
      switch (this.data_techDB) {
        case 'MySQL':
          return `
      case 'POST':
          $name = $_GET['${this.primaryKey}'];
          $stmt = $pdo->prepare("SELECT COUNT(*) FROM ${this.tableName} WHERE ${this.primaryKey} = :${this.primaryKey}");
          $stmt->bindParam(':${this.primaryKey}', $${this.primaryKey});
          $stmt->execute();
          $rowCount = $stmt->fetchColumn();
  
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
              echo 'A record with the given name already exists. The insertion was not performed.';
          }
          break;`;
        case 'PostgreSQL':
          return `
      case 'POST':
          $name = $_GET['${this.primaryKey}'];
          $stmt = $pdo->prepare("SELECT COUNT(*) FROM ${this.tableName} WHERE ${this.primaryKey} = :${this.primaryKey}");
          $stmt->bindParam(':${this.primaryKey}', $${this.primaryKey});
          $stmt->execute();
          $rowCount = $stmt->fetchColumn();
  
          if ($rowCount == 0) {
              $stmt = $pdo->prepare("INSERT INTO ${this.tableName} (${this.getColumnsString()}) VALUES (${this.getBindParamsString()})");
              $datacol = array(${tcolum});
              foreach ($datacol as $column) {
                  $stmt->bindParam(':'.$column.'', $input[''.$column.''], PDO::PARAM_STR);
              }
              if ($stmt->execute()) {
                  $response = ['success' => true, 'message' => 'Record inserted successfully'];
              } else {
                  $response = ['success' => false, 'message' => 'Failed to insert record'];
                  throw new Exception('Failed to insert record');
              }
          } else {
              echo 'A record with the given name already exists. The insertion was not performed.';
          }
          break;`;
        default:
          return `return "Unsupported database technology";`;
      }
    }
  
    generateUpdateEndpoint() {
      const tcolum = `'${this.columns.join("','")}'`;
      let lineas = [];
      let tvalcol = this.columns;
  
      tvalcol.forEach(function(tvalue, index, array) {
        let upd = `$stmt->bindParam(':${tvalue}', $input['${tvalue}']);`;
        lineas.push(upd);
      });
  
      if (this.primaryKey !== null) {
        lineas.unshift(`$stmt->bindParam(':${this.primaryKey}', $input['${this.primaryKey}']);`);
      }
  
      switch (this.data_techDB) {
        case 'MySQL':
        case 'PostgreSQL':
          return `
      case 'PUT':
          if (!empty($_GET['${this.primaryKey}'])) {
              $id = $_GET['${this.primaryKey}'];
  
              $stmt = $pdo->prepare("UPDATE ${this.tableName} SET ${this.getSetColumnParams()} WHERE ${this.primaryKey} = :${this.primaryKey}");
              ${lineas.join('')}
              if ($stmt->execute()) {
                  $response = ['success' => true, 'message' => 'Record updated successfully'];
              } else {
                  throw new Exception('Failed to update record');
              }
          }
          break;`;
        default:
          return `return "Unsupported database technology";`;
      }
    }
  
    generateDeleteEndpoint() {
      switch (this.data_techDB) {
        case 'MySQL':
        case 'PostgreSQL':
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
        default:
          return `return "Unsupported database technology";`;
      }
    }
  
    generateFooter() {
      return `
  }
  
  // Return the response as JSON
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
  
    getSetColumnParams() {
      let setString = '';
      this.columns.forEach(column => {
        setString += `${column} = :${column}, `;
      });
      return setString.slice(0, -2);
    }
  }
  
  export { DynamicApiCrudGenerator };
//API CRUD GENERATOR MYSQL END