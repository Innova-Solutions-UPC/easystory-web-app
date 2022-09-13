<template>
  <Card
      class="z-5  flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 personal-information">
    <template #header>
      <img style="clip-path: circle(); max-width: 200px" alt="user header"
           src="https://media.istockphoto.com/photos/portrait-of-successful-black-male-modern-day-student-holding-picture-id1311634222?k=20&m=1311634222&s=612x612&w=0&h=1a0XDWnZNPjk_5n7maZdzowaDfBcBohwoiZZF69qS9A=">
    </template>
    <template #title>
      <h4 style="color: #181818">Ruperto Mena</h4>
    </template>
    <template #content>
      <div class="chips-container ">
        <Chip label="rupertitogmail.com" icon="pi pi-google"/>
        <Chip label="Lima, Peru" icon="pi pi-map-marker"/>
        <Chip label="+51 998 554 525" icon="pi pi-phone"/>
      </div>

    </template>
  </Card>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.chips-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.personal-information {
  position: absolute;
  background-color: #ffffff;
  max-height: fit-content;
  color: #181818;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: -12px 10px 32px 4px rgb(32, 91, 165);
  -moz-box-shadow: -12px 10px 32px 4px rgb(14, 79, 160);
  box-shadow: -12px 10px 32px 4px rgb(32, 106, 199);
}

@media screen and (min-width: 800px) {
  .personal-information {
    margin-left: 5%;
    margin-top: 5%;
    max-width: fit-content;
  }
}

@media screen and (max-width: 799px) {
  .personal-information {
    width: 80vw;
    margin-left: 10vw;
    margin-right: 10vw;
  }
}
</style>
