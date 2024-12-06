<template>
  <form class="needs-validation" novalidate @submit.prevent="procesartabla">
    <div class="row">
      <div class="form-group col-sm-4">
        <label class="form-label" for="data_bd">Database Name</label>
        <input type="text" class="form-control" name="data_bd" id="data_bd" width="100%" required="true" />
      </div>
      <div class="form-group col-sm-4">
        <label class="form-label">Table Name</label>
        <input type="text" class="form-control" name="data_tablename" id="data_tablename" width="100%"
          required="true" />
      </div>
      <div class="form-group col-sm-4">
        <label class="form-label">Connection Type</label>
        <select v-model="selectedbTech" name="data_techDB" id="data_techDB" class="form-select">
          <option value="MySQL">MySQL / MariaDB Pdo</option>
          <option value="PostgreSQL">PostgreSQL</option>
        </select>



      </div>
    </div>

    <div class="row">
      <div class="form-group col-sm-4">
        <label class="form-label">DB username</label>
        <input type="text" class="form-control" name="data_dbusername" id="data_dbusername" required />
      </div>
      <div class="form-group col-sm-4">
        <label class="form-label">DB password</label>
        <input type="text" name="data_dbpassword" id="data_dbpassword" class="form-control" placeholder="" value=""
          required />
      </div>
      <div class="form-group col-sm-4">
        <label class="form-label"> HOSTNAME:PORT</label>
        <input type="text" class="form-control" v-model="HostportValue" name="hostnameport" id="hostnameport"
          required />
      </div>
    </div>



    <div class="row">

      <div class="form-group col-sm-4">
        <div id="div_pkey" v-show="selectedOption === 'YES'">
          <strong><label class="form-label" for="data_primaryKey">primary key</label></strong>
          <input type="text" placeholder="Primary Key" class="form-control" name="data_primaryKey" id="data_primaryKey"
            width="100%" required="true" v-model="primaryKeyValue" />
        </div>
      </div>


      <div class="form-group col-sm-4">
        <label class="form-label"> </label>
        <input type="text" class="form-control" name=" " id=" " required />
      </div>




      <div class="form-group col-sm-4">
        <label class="form-label">Add Crud Buttons</label>
        <select v-model="selectedOption" name="data_dbcrud" id="data_dbcrud" class="form-select">
          <option>YES</option>
          <option selected>NO</option>
        </select>
      </div>
    </div>
    <div class="row">



      <div class="form-group col-sm-4">
        <label class="form-label" for="load-file">logo</label>

        <div class="input-group">
          <input type="text" v-model="blobValue" class="form-control" placeholder="upload logo file" readonly>
          <button type="button" class="btn btn-secondary" @click="openBlobModal">Select file</button>
        </div>




        <BlobModal @blob-created="handleBlobCreated" />
      </div>



      <div class="form-group col-sm-4">
        <label class="form-label" for="data_addtitle">Page title</label>
        <input type="text" class="form-control" name="data_addtitle" id="data_addtitle" width="100%" required="true" />
      </div>
      <div class="form-group col-sm-4">
        <label class="form-label">Choose color palette</label>


        <ColorPicker @color-selected="handleColorSelected" />

      </div>
    </div>
    <div class="col-12">

      <div>

        <TableControls />

      </div>
    </div>
    <hr class="my-4" />
    <button class="w-100 btn btn-primary btn-lg" type="submit">process and download</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { generateFiles } from './fileGenerator';
import TableControls from './TableControls.vue';
import BlobModal from './BlobModal.vue';
import ColorPicker from './ColorPicker.vue';



const blobValue = ref('');
const blobData = ref(null);

const openBlobModal = () => {
  const modal = new bootstrap.Modal(document.getElementById('blobModal'));
  modal.show();
};

const handleBlobCreated = (blob) => {
  blobData.value = blob;
  blobValue.value = URL.createObjectURL(blob);
};




const selectedbTech = ref('');
const HostportValue = ref('');

const dbPortMapping = {
  MySQL: '127.0.0.1:3306',
  PostgreSQL: '127.0.0.1:5432',
};

watch(selectedbTech, (newValue) => {
  HostportValue.value = dbPortMapping[newValue] || '';
});

const selectedOption = ref('NO');
const primaryKeyValue = ref('');


watch(selectedOption, (newValue) => {
  if (newValue === 'NO') {
    primaryKeyValue.value = '';
  }
});


const selectedColorId = ref('#000000');
const handleColorSelected = (colorId) => {
  selectedColorId.value = colorId;
};

const columnas = ref([]);



const procesartabla = () => {
  let upd = [];
  const datosbd = {
    data_bdhost: document.getElementById("hostnameport").value,
    data_bd: document.getElementById("data_bd").value,
    data_tablename: document.getElementById("data_tablename").value,
    data_techDB: document.getElementById("data_techDB").value,
    data_dbusername: document.getElementById("data_dbusername").value,
    data_dbpassword: document.getElementById("data_dbpassword").value,
    data_dbcrud: document.getElementById("data_dbcrud").value,
    data_addtitle: document.getElementById("data_addtitle").value,
    data_primaryKey: document.getElementById("data_primaryKey").value,
    data_cols: [],
    data_dataedit: [],
    data_datacrud: [],
    data_options: [],
    data_colorheaderhex: selectedColorId.value, //  
    data_logoblop: blobData.value,

  };



  upd.push(datosbd);
  console.group(datosbd);

  const table = document.getElementById("POITable");
  let datostbl = [];

  for (let r = 0, n = table.rows.length; r < n; r++) {
    if (r > 0) {
      datostbl.push(document.getElementById("columname" + r).value);
      datosbd.data_cols.push(document.getElementById("columname" + r).value);

      datosbd.data_dataedit.push(document.getElementById("editcolum" + r).value);
      datosbd.data_datacrud.push(document.getElementById("controlcrud" + r).value);
      datosbd.data_options.push(document.getElementById("controldata" + r).value);
    }
  }
  upd.push(datostbl);
  columnas.value = upd;

  generateFiles(columnas.value[0], columnas.value[1]);

  console.log(columnas.value[0]);


};


</script>
<style>
.form-group .form-label {
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>