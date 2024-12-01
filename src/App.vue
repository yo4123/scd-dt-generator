<template>

 

    <div class="main">
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="./assets/scd-logo.png" alt="" width="72" height="57" />
        <h2>Simple Codeless Datatable Generator</h2>
        <p class="lead"> .</p>
      </div>
      <FormComponent />
      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; 2024 Autor: Yovani Martinez</p>
        <ul class="list-inline">
          <li class="list-inline-item"><a href="#">Privacy</a></li>
          <li class="list-inline-item"><a href="#">Terms</a></li>
          <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
      </footer>
    </div>
  </template>
  
<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
 
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.main {
  width: 100%;

  max-width: 1280px;
  margin: 0 auto;
}

tr td select,
tr td input,
tr td,
tr {
  height: 1.7rem;
  font-size: 14px;
  padding: 0;
}

</style>


  <script setup>
  import FormComponent from './components/FormComponent.vue';

 



  
  </script>
  

 