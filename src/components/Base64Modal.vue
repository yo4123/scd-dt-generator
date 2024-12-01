<template>
  <div class="modal fade" id="base64Modal" tabindex="-1" aria-labelledby="base64ModalLabel" aria-hidden="true"
    ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="base64ModalLabel">Convert File to Base64</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <input type="file" @change="handleFileChange">
          <div v-if="base64Data">
            <p>Base64 Data:</p>
            <textarea readonly rows="10" cols="50">{{ base64Data }}</textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="convertToBase64">Convert and Use</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const base64Data = ref('');
const file = ref(null);
const modalRef = ref(null);

const emit = defineEmits();

let reader = null;

const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

const convertToBase64 = () => {
  if (!file.value) return;

  // Si ya hay un FileReader en uso, no hacer nada
  if (reader) {
    console.warn('FileReader is already busy');
    return;
  }

  reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result.split(',')[1]; // Obtén solo la parte base64
    const mimeType = file.value.type; // Obtén el tipo MIME del archivo
    base64Data.value = `data:${mimeType};base64,${base64String}`; // Añade el encabezado
    emit('base64-converted', base64Data.value); // Emitir el valor base64 convertido
    closeModal();
    reader = null; // Restablecer el FileReader después de completar la lectura
  };
  reader.readAsDataURL(file.value);

  console.log(reader.readAsDataURL(file.value));
};

const closeModal = () => {
  const modal = bootstrap.Modal.getInstance(modalRef.value);
  modal.hide();
};
</script>

<style scoped>
/* Agrega estilos específicos para el modal aquí */
</style>
