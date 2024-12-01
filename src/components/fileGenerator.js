import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { HtmlGenerator } from './htmlgenclass';
import { getDatabaseConnectionCode } from './databaseConnector.js';
import { getDataTableCode } from './getDataTableCode.js';
import { DynamicApiCrudGenerator } from './apiCrudGenerator.js';
import { CssGenerator } from './cssgenclass.js';



export const generateFiles = async (dbData, tableColumns) => {
  const databaseCode = getDatabaseConnectionCode(dbData);
  const datatableCode = getDataTableCode(dbData, tableColumns);

 
 

  const htmlCode = getHtmlCode(dbData, tableColumns);
  const cssCode = getCssCode(dbData, tableColumns);
  const apiCrudCode = getApiCrudCode(dbData, tableColumns);

  const files = {
    'database.php': databaseCode,
    'assets/js/script.js': datatableCode,
    'index.html': htmlCode,
    'crudclass.php': apiCrudCode,
    'assets/css/index.css': cssCode,
    'assets/images/logo.png': dbData.data_logoblop
  };

  await createZip(files);
};

const getHtmlCode = (dbData, tableColumns) => {
  const htmlGenerator = new HtmlGenerator(dbData.data_dbcrud, dbData.data_addtitle, tableColumns.join(',') );
  return htmlGenerator.generateHeader() + htmlGenerator.generateNavbar() + htmlGenerator.generateBody() + htmlGenerator.generateFooter();
};

 
const getCssCode = (dbData) => {
  const cssGenerator = new CssGenerator(dbData.data_colorheaderhex);
 return cssGenerator.generateCss();
};
 

const getApiCrudCode = (dbData, tableColumns) => {
  const tableName = dbData.data_tablename;
  const primaryKey = dbData.data_primaryKey;
  const columns = tableColumns.join(',');
  const dbcrud = dbData.data_dbcrud;
  const techdb = dbData.data_techDB;


  const apiGenerator = new DynamicApiCrudGenerator(tableName, primaryKey, columns,  dbcrud , techdb);
  return apiGenerator.generateApiCrud();
};

const fetchFileContent = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await response.arrayBuffer();
};

const createZip = async (files) => {
  const zip = new JSZip();

  // Add provided files to zip
  for (const [filename, content] of Object.entries(files)) {
    zip.file(filename, content);
  }

  // Add additional folders and files
  const assetPaths = {
    'assets/css/bootstrap.min.css': '/attach/assets/css/bootstrap.min.css'
    // 'assets/css/index.css': '/attach/assets/css/index.css',
    //'assets/images/logo.png': '/attach/assets/images/logo.png'
  };

  for (const [zipPath, url] of Object.entries(assetPaths)) {
    try {
      const fileContent = await fetchFileContent(url);
      zip.file(zipPath, fileContent);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }

  // Generate and save the zip
  zip.generateAsync({ type: "blob" })
    .then(content => {
      saveAs(content, "project.zip");
    });
};
