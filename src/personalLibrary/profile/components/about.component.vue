<template>
  <Card
      class="z-5  flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 about-information">
    <template #title>
      <h4 style="color: #181818">Ruperto Mena</h4>
    </template>
    <template #content>
      <div class="content-container">
        <div class="flex gap-1">
          <h4 style="color: #181818; margin-right: 20px"><code>Categorias favoritas</code></h4>
          <Tag v-for="category in favoriteTags" rounded :value="category.name" :icon="category.icon"/>
        </div>

        <div class="flex gap-1">
          <h4 style="color: #181818; margin-right: 20px"><code>Descipcion</code></h4>
          <h4 style="color: #181818; margin-right: 20px"><p>An addictively sweet romance with a touch of danger.</p></h4>
        </div>

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
<script lang="ts">
export default {
  name: "About"
}
</script>
<style scoped>


.content-container {
  display: flex;
  flex-shrink: initial;
  gap: 5px;
  flex-direction: column;
}
@media screen and (min-width: 800px) {
  .about-information {
    position: absolute;
    left: 35%;
    top: 40vh;
    width: 700px;
  }
}

@media screen and (max-width: 799px) {
  .about-information {
    position: absolute;
    margin-top: 30%;
    margin-left: 10vw;
    width: 80vw;
    margin-right: 10vw;
  }
}
</style>
