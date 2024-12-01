<template>
  <div id="color-picker" style="width:100%">
 
    <div class="wrapper-dropdown  form-control" style="width:100%">
      <span @click="toggleDropdown()" v-html="selector"></span>
      <ul class="dropdown" v-show="active">
        <li v-for="color in colors" @click="selectColor(color.id)">
          <span :style="{background: color.hex}"></span> {{color.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['color-selected']);

const colors = [
  { id: '#00759A', hex: '#00759A', name: 'Blue' },
  { id: '#F7941D', hex: '#F7941D', name: 'Orange' },
  { id: '#A71930', hex: '#A71930', name: 'Red' },
  { id: '#679146', hex: '#679146', name: 'Green' },
  { id: '#00377B', hex: '#00377B', name: 'Blue Dark Celurian' },
  { id: '#860038', hex: '#860038', name: 'Burgundy' },
  { id: '#51007E', hex: '#51007E', name: 'Violet Indigo' },
  { id: '#000000', hex: '#000000', name: 'Black' },
];

const active = ref(false);
const selectedColor = ref('');
const selectedColorName = ref('');

const selector = computed(() => {
  if (!selectedColor.value) {
    return 'Color';
  } else {
    return `<span style="background: ${selectedColor.value}"></span> ${selectedColorName.value}`;
  }
});

function selectColor(colorId) {
  const color = colors.find(c => c.id === colorId);
  selectedColor.value = color.hex;
  selectedColorName.value = color.name;
  active.value = false;
  emit('color-selected', colorId); // Emitir solo el ID del color seleccionado
}

function toggleDropdown() {
  active.value = !active.value;
}
</script>

<style>
* {
	box-sizing: border-box;
	font-family: "Arial";
}
.wrapper-dropdown {
    position: relative;
    width: 200px;
    background: #FFF;
    color: #2e2e2e;
    outline: none;
    cursor: pointer;
}
.wrapper-dropdown > span {
	width: 100%;
	display: block;
	border: 1px solid #ababab;
	padding: 5px;
}
.wrapper-dropdown > span > span {
  padding: 0 12px;
  margin-right: 5px;
}
.wrapper-dropdown > span:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    right: 16px;
    top: calc(50% + 4px);
    margin-top: -6px;
	  border-width: 6px 6px 0 6px;
    border-style: solid;
	  border-color: #2e2e2e transparent;
}

.wrapper-dropdown .dropdown {
    position: absolute;
	  z-index: 10;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    font-weight: normal;
	  list-style-type: none;
	  padding-left: 0;
	  margin: 0;
	  border: 1px solid #ababab;
	  border-top: 0;
}

.wrapper-dropdown .dropdown li {
    display: block;
    text-decoration: none;
    color: #2e2e2e;
	  padding: 5px;
	  cursor: pointer;
}

.wrapper-dropdown .dropdown li > span {
  padding: 0 12px;
  margin-right: 5px;
}

.wrapper-dropdown .dropdown li:hover {
    background: #eee;
	  cursor: pointer;
}
</style>
