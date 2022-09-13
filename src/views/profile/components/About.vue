<template>
  <Card
      class="z-5  flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 about-information">
    <template #title>
      <h4 style="color: #181818">Ruperto Mena</h4>
    </template>
    <template #content>
      <div class="content-container">
        <h4 style="color: #181818; margin-right: 20px"><code>Categorias favoritas</code></h4>
        <Tag v-for="category in favoriteTags" rounded :value="category.name" :icon="category.icon"/>
      </div>

    </template>
  </Card>
</template>

<script lang="ts" setup>
const favoriteTags: Array<{ name: string, icon: string }> = [{name: 'Fitness', icon: 'pi pi-apple'}, {
  name: 'Romance',
  icon: 'pi pi-heart'
}, {name: 'Terror', icon: 'pi pi-prime'}];
</script>

<style scoped>
.about-information {
  max-width: fit-content;
  position: absolute;
  left: 40%;
  top: -30px;
}

.content-container {
  display: flex;
  gap: 5px;
}
</style>
