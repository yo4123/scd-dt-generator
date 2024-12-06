// databaseConnector.js
export const getDatabaseConnectionCode = (dbData) => {
 
  const [host, port] = dbData.data_bdhost.split(':'); // Separar host y puerto
  switch (dbData.data_techDB) {
      case 'MySQL':
        return `
  <?php
  \$dsn = "mysql:host=${host}:${port};dbname=${dbData.data_bd};charset=UTF8";
  try {
    \$pdo = new PDO(\$dsn, "${dbData.data_dbusername}", "${dbData.data_dbpassword}");
  } catch (PDOException \$e) {
    echo \$e->getMessage();
  }
  ?>
  `;
  case 'PostgreSQL':
    return `<?php
    /* ------------------- Connect to Postgres ini ------------------- */
    \$dsn = "pgsql:host=${host};port=${port};dbname=${dbData.data_bd}";
    try {
        \$pdo = new PDO(\$dsn, "${dbData.data_dbusername}", "${dbData.data_dbpassword}");
    } catch (PDOException \$e) {
        echo \$e->getMessage();
    }
    /* ------------------- Connect to Postgres end ------------------- */
    ?>
    `;
      case 'SQL Server':
        return '/* SQL Server connection code */';
      case 'Odbc':
        return '/* ODBC connection code */';
      case 'Oracle':
        return '/* Oracle connection code */';
      default:
        return 'Unsupported database technology';
    }
  };
  
export class DatabaseConnector {
    constructor(data_bd, data_bdhost, data_bdport, data_tablename, data_techDB, data_dbusername, data_dbpassword, data_dbcrud, data_cols, data_primaryKey) {
      const [host, port] = data_bdhost.split(':');
      this.data_bd = data_bd;
      this.data_bdhost = data_bdhost;
      this.data_bdport = data_bdport;
      this.data_tablename = data_tablename;
      this.data_techDB = data_techDB;
      this.data_dbusername = data_dbusername;
      this.data_dbpassword = data_dbpassword;
      this.data_dbcrud = data_dbcrud;
      this.data_cols = data_cols;
      this.data_primaryKey = data_primaryKey;
    }
  



    
    getConnectionCode() {
      switch (this.data_techDB) {
        case 'MySQL':
          return this.getMySQLConnectionCode();
       case 'PostgreSQL':
            return this.getPostgresConnectionCode();
        case 'SQL Server':
          return this.getSQLServerConnectionCode();
        case 'Odbc':
          return this.getOdbcConnectionCode();
        case 'Oracle':
          return this.getOracleConnectionCode();
        default:
          return "Unsupported database technology";
      }
    }
  
    getMySQLConnectionCode() {
      return `<?php
  /* ------------------- Connect to MySQL ini ------------------- */
  \$dsn = "mysql:host=${this.data_bdhost};dbname=${this.data_bd};charset=UTF8";
  try {
      \$pdo = new PDO(\$dsn, "${this.data_dbusername}", "${this.data_dbpassword}");
  } catch (PDOException \$e) {
      echo \$e->getMessage();
  }
  /* ------------------- Connect to MySQL end ------------------- */
  ?>
  `;
    }
    getPostgresConnectionCode(){
      return `<?php
  /* ------------------- Connect to Postgres ini ------------------- */
  \$dsn = "pgsql:host=${this.data_bdhost};port=5433;dbname=${this.data_bd}";
  try {
      \$pdo = new PDO(\$dsn, "${this.data_dbusername}", "${this.data_dbpassword}");
  } catch (PDOException \$e) {
      echo \$e->getMessage();
  }
  /* ------------------- Connect to Postgres end ------------------- */
  ?>
  `;
    }

  
    getSQLServerConnectionCode() {
      return "/* ------------------- Connect to SQL Server ini ------------------- */";
    }
  
    getOdbcConnectionCode() {
      return "/* ------------------- Connect to Odbc ini ------------------- */";
    }
  
    getOracleConnectionCode() {
      return "/* ------------------- Connect to Oracle ini ------------------- */";
    }
  }
  