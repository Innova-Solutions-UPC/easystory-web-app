<template>
  <div class="card">
    <div class="card-container yellow-container">
      <div class="block font-bold text-center p-4 mb-3 top-color">
          <Card class="z-5 relative flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 personal-information">
            <template #header>
              <img style="clip-path: circle(); max-width: 200px" alt="user header" src="https://media.istockphoto.com/photos/portrait-of-successful-black-male-modern-day-student-holding-picture-id1311634222?k=20&m=1311634222&s=612x612&w=0&h=1a0XDWnZNPjk_5n7maZdzowaDfBcBohwoiZZF69qS9A=">
            </template>
            <template #title>
              <h4 style="color: #181818">Ruperto Mena</h4>
            </template>
            <template #content>
              <div class="chips-container">
                <Chip label="rupertitogmail.com" icon="pi pi-google" />
                <Chip label="Lima, Peru" icon="pi pi-map-marker" />
                <Chip label="+51 998 554 525" icon="pi pi-phone" />
              </div>

            </template>
          </Card>
      </div>
      <div class="block font-bold text-center p-4  mb-3 bottom-color">2</div>
    </div>
  </div>
</template>

<script lang="ts" setup>


</script>

<style scoped>
.card {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f7f8fa;
}

.top-color {
  min-width: 100vw;
  background-color: #193f6c;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
  max-height: fit-content;
  min-height: 30vh;
}

.bottom-color {
  background-color: #f7f8fa;
  min-height: 70vh;
  margin-top: -15px;
}
.chips-container{
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.personal-information {
  background-color: #ffffff;
  margin-left: 5%;
  margin-top: 5%;
  max-height: fit-content;
  color: #181818;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
}
</style>
