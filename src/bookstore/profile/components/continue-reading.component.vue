<template>
  <Card
    class="z-5  flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 reading-information">
    <template #title>
      <h4 style="color: #fff">{{translate('bc-profile-tags')}}</h4>
    </template>
    <template #content>
      <!--  <div class="content-container">
        <ScrollPanel style="width: 100%; height: 200px" class="p-scrollpanel-bar-y">
        <Card v-for="reading in continueReadingBooks" class="reading-cardd">
          <template #content>
            <div class="divider">
          <div>
            <img style="border-radius: 20px; max-width: 100px" alt="user header"
                 :src="reading.imageUrl">
          </div>
          <div class="reading-continue">
            <div><h3 style="color: #fff; font-size:small"><code>{{ reading.name}}</code></h3></div>
            <div><h4 style="color: #fff; font-size:x-small"><code>Pagina actual: {{ reading.pageAt}}</code></h4></div>
            <div></div>
          </div>
            </div>
          </template>
        </Card>
        </ScrollPanel>
      </div>-->
      <SpilineGraph :card-time-series="cardTimeSeries" />


    </template>
  </Card>
</template>

<script lang="ts" setup>
import SpilineGraph from '@/shared/components/graphs/SpilineGraph.component.vue';
import type { ICardTimeSeries } from '@/shared/models/Spineline.facade';
import { translate } from '../../../shared/plugins/i18n/i18n';

const cardTimeSeries: ICardTimeSeries = {

  series: [
    {
    data: [{
      name: 'Terror',
      value: 767.1,
      color: 'pink'
    }, {
      name: 'Suspenso',
      value: 20.7,
      color: 'green'
    },
    {
      name: "Drama",
      value: 97.2,
      color: 'yellow'
    },
    {
      name: "Aventura",
      value: 111.7,
      color: 'blue'
    },
    {
      name: "Romance",
      value: 158.1,
      color: 'white'
    }]
  },
  
]
}



const continueReadingBooks: Array<{ name: string, imageUrl: string, pageAt: number }> = [{
  name: 'Las fantasias de pedrito',
  imageUrl: 'https://www.fcbarcelonanoticias.com/uploads/s1/13/11/03/1/pedri-fc-barcelona.jpeg',
  pageAt: 85
}, { name: 'Besame una vez mas', imageUrl: 'https://www.republica.com/wp-content/uploads/2016/02/beso.jpg', pageAt: 21 },]
</script>

<script lang="ts">
export default {
  name: "ContinueReading"
}
</script>

<style scoped>
.reading-cardd {
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  margin-top: 5px;
}

.reading-information {
  position: absolute;
  left: 42%;
  top: -8vh;
  max-width: fit-content;
  max-height: fit-content;
  background: rgba(114, 117, 124, 0.37);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
}

.content-container {
  display: flex;
  gap: 10px;
}

.reading-continue {
  display: flex;
  flex-direction: column;

}

.divider {
  display: flex;
  gap: 1rem
}

@media screen and (max-width: 799px) {
  .reading-information {
    position: absolute;
    margin-top: 65vh;
    width: 80vw;
    margin-left: 10vw;
    margin-right: 10vw;
  }
}

@media screen and (min-width: 800px) {
  .reading-information {
    position: absolute;
    left: 42%;
    top: -8vh;
    max-width: fit-content;
    max-height: fit-content;
  }
}
</style>
