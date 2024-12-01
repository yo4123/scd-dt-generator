<script setup>
import { ref } from 'vue';
import 'bootstrap';

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;



// Define the emit function
const emit = defineEmits(['blob-created']);

// Define references
const file = ref(null);
const modalRef = ref(null);
const fileType = ref('image/png');
const imageUrl = ref('');

const handleFileChange = (event) => {
    file.value = event.target.files[0];
};

const convertToBlob = () => {
    if (!file.value) return;

    const fileReader = new FileReader();
    fileReader.onloadend = async (e) => {
        const arrayBuffer = e.target.result;
        const blob = new Blob([arrayBuffer], { type: fileType.value });
        const imageUrl = URL.createObjectURL(blob);

        // Emit the blob value to the parent
        emit('blob-created', blob);

        // Close the modal after the blob is created
        closeModal();
    };
    fileReader.readAsArrayBuffer(file.value);
};

const closeModal = () => {
    // Ensure modalRef is defined before accessing it
    if (modalRef.value) {
        const modalInstance = bootstrap.Modal.getInstance(modalRef.value);
        if (modalInstance) {
            modalInstance.hide();
        }
    }
};
</script>

<template>
    <!-- Modal -->
    <div ref="modalRef" class="modal fade" id="blobModal" tabindex="-1" aria-labelledby="blobModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="blobModalLabel">Upload Image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="file" @change="handleFileChange">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="convertToBlob">Convert and Use</button>
                </div>
            </div>
        </div>
    </div>
</template>
