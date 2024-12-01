<template>


  <div id="POItablediv" class="table-responsive">
    <input type="button" id="addmorePOIbutton" value="add rows+" @click="insRow" class="btn btn-primary" />
    <table id="POITable" class="table table-striped" border="1">
      <thead>
        <tr>
          <th>#</th>
          <th>colum name</th>
          <th>Delete</th>
          <!--<th>Editable</th>-->
          <th>Crud Dialog Controls</th>
          <th>Control Options </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of items" :key="item">
          <td>{{ item }}</td>
          <td>
            <input size="25" type="text" :name="'columname' + item" :id="'columname' + item" class="form-control" />
          </td>
          <td>
            <input type="button" value="Delete" @click="delRow" class="btn btn-secondary btn-sm" />
          </td>
          <td>
            <input type="checkbox" value="" class="btn btn-secondary btn-sm" :id="'editcolum' + item" />
          </td>
          <td>

            <select :id="'controlcrud' + item" onchange="" class="form-select">
              <option value="<input>">&lt;input&gt;</option>
              <!-- <option value="<input type=&quot;checkbox&quot;>">&lt;input type="checkbox"&gt;</option>-->
              <option value="<input type=&quot;radio&quot;>">&lt;input type="radio"&gt;</option>

              <option value="<select>">&lt;select&gt;</option>
              <option value="<textarea>">&lt;textarea&gt;</option>

            </select>
          </td>

          <td>

            <input size="30" type="text" :name="'controldata' + item" :id="'controldata' + item" class="form-control" />



          </td>




        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>


<script setup>

//import FormComponent from './components/FormComponent.vue';

import { ref } from 'vue';




const items = ref(0);


const insRow = () => {
  items.value++;
};

const delRow = () => {
  if (items.value > 0) items.value--;
};


</script>