<template>
  <div class="">
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8 subscription-cnt">
      <div class="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
      <div class="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Velit numquam eligendi quos.
      </div>
      <div class="grid">
        <SinglePlan v-for="plan in availablePlans"
                    :key="plan.tittle"
                    :detail="plan"
                    :contract-address="CONTRACT_ADDRESS"
                    :signer="signer"
                    :provider="provider"
                    :accounts="accounts"
                    ref="singlePlan"
                    @buy-plan="startTransaction"
                    @operation-succeed="finishTransaction"/>
      </div>
    </div>
    <div v-if="transactionInProgress" class="loading-status">
      <div>
        <h3>{{ transactionText }}</h3>
        <ProgressSpinner
            style="width: 5vw; height: 50px; opacity: 1 !important;"
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
        />
      </div>

    </div>
    <Toast/>
  </div>
</template>

<script setup>
import {ethers} from "ethers";
import {onMounted, ref} from "vue";
import CONTRACT_JSON from '../../../web3/src/artifacts/contracts/Subscription.sol/CSubscription.json';
import SinglePlan from "../components/single-plan.component.vue";


const {ethereum} = window;
const currentAccount = ref();
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_JSON.abi, signer);
const transactionInProgress = ref(false);
const transactionText = ref('IN PROGRESS');
const accounts = await ethereum.request({method: "eth_accounts"});


const checkIfWalletIsConnected = () => {
  if (!ethereum) {
    console.log('ERROR IN CONNECTING TO WALLET');
  } else {
    console.log('isConnected')
  }
}

const startTransaction = async () => {
  transactionInProgress.value = true;
}
const finishTransaction = () => {
  transactionInProgress.value = false;
}

onMounted(() => {
  checkIfWalletIsConnected();
});


const availablePlans = [{
  tittle: 'Monthly',
  description: 'Plan description',
  price: 0.0004,
  monthDuration: 1,
  benefits: [{benefitDetail: 'Acceso a todas las funcionalidades'}, {benefitDetail: 'Compartir la publicacion por diversos medios'}]
},
  {
    tittle: 'Annually',
    description: 'Plan description',
    price: 0.00037,
    monthDuration: 12,
    benefits: [{benefitDetail: 'Acceso a todas las funcionalidades'}, {benefitDetail: 'Compartir la publicacion por diversos medios'}, {benefitDetail: 'Congelamiento de cuenta'}, {benefitDetail: 'Sin pago extra pr cancelación'}]
  },
  {
    tittle: 'Enterprise',
    description: 'Plan description',
    price: 0.950,
    monthDuration: 12,
    benefits: [{benefitDetail: 'Acceso a todas las funcionalidades'}, {benefitDetail: 'Compartir la publicacion por diversos medios'}, {benefitDetail: 'Congelamiento de cuenta'}, {benefitDetail: 'Sin pago extra pr cancelación'},
      {benefitDetail: 'Maximo de 20 cuentas'},
      {benefitDetail: 'Contenido Offline'}
    ]
  }
];
</script>

<style scoped>
.subscription-cnt {
  height: 100vh;
}

.loading-status {
  position: absolute;
  z-index: 9;
  color: #0E0B16;
  height: 100vh;
  width: 100vw;
  top: 0;
  background: rgba(17, 18, 17, 0.27);
  justify-content: center;
  align-items: center;
  display: grid;
  cursor: wait;
  font-size: larger;
  font-style: oblique;
  animation: typing 2s steps(38) 1s 1 normal both, blink 1s steps(1) infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 75%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
