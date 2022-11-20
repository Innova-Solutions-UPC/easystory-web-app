<template>
  <div class="">
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8 subscription-cnt">
      <div class="text-900 font-bold text-6xl mb-4 text-center">{{ translate('bc-subscriptions-pricing') }}</div>
      <div class="text-700 text-xl mb-6 text-center line-height-3">{{ translate('bc-subscription-plans-description') }}
      </div>
      <div class="grid">
        <SinglePlan v-for="plan in availablePlans" :key="plan.tittle" :detail="plan"
          :contract-address="CONTRACT_ADDRESS" :signer="signer" :provider="provider" :accounts="accounts"
          ref="singlePlan" @buy-plan="startTransaction" @operation-succeed="finishTransaction" />
      </div>
    </div>
    <div v-if="transactionInProgress" class="loading-status">
      <div>
        <h3>{{ transactionText }}</h3>
        <a :href="mumbaiStringHash" />
        <ProgressSpinner style="width: 5vw; height: 50px; opacity: 1 !important;" strokeWidth="8"
          fill="var(--surface-ground)" animationDuration=".5s" />
      </div>

    </div>
    <Toast />
  </div>
</template>

<script setup >
import { ethers } from "ethers";
import { onMounted, ref } from "vue";
import CONTRACT_JSON from '../models/CSubscription.json';
import SinglePlan from "../components/single-plan.component.vue";
import router from "../../shared/plugins/router";
import { Controller } from "../../shared/models/Controller";
import { injectStrict } from "../../shared/utils/Injections";
import { translate } from '../../shared/plugins/i18n/i18n';


const { ethereum } = window;
const currentAccount = ref();
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_JSON.abi, signer);
const transactionInProgress = ref(false);
const transactionText = ref(translate('bc-subscription-transaction-in-progress'));
const accounts = await ethereum.request({ method: "eth_accounts" });
const app = injectStrict("appController");

const mumbaiStringHash = ref('');
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
const finishTransaction = async (mumbaiString) => {
  console.log("🚀 ~ file: subscription.vue ~ line 61 ~ finishTransaction ~ mumbaiString", mumbaiString)
  mumbaiStringHash.value = mumbaiString;
  const _email = localStorage.getItem('easy_story_email');
  const _password = localStorage.getItem('easy_story_password');
  localStorage.removeItem('easy_story_email');
  localStorage.removeItem('easy_story_password');
  await app.user.doLogin({ email: _email, password: _password });
  
  if (app.user.getIsAuthenticated()) {
    setTimeout(() => {
      transactionInProgress.value = false;
      window.location.reload();
    }, 3000);
    
  }
}

onMounted(() => {
  checkIfWalletIsConnected();
  //await getExistingSubscriptions();
});

// const getExistingSubscriptions = async () => {
//   try {
//     let tx = await contract.;
//     const receipt = await tx.wait();
//     console.log({receipt})
//     console.log({tx});
//   } catch (e) {
//     console.log({e})
//   }
//
// }


const availablePlans = [{
  tittle: translate('bc-subscription-plan-0-monthly'),
  description: translate('bc-subscription-plan-description'),
  price: 0.0004,
  monthDuration: 1,
  benefits: [{ benefitDetail:translate('bc-subscription-plan-0-full-access')}, { benefitDetail:  translate('bc-subscription-plan-0-share-posts') }]
},
{
  tittle: translate('bc-subscription-plan-0-yearly'),
  description: translate('bc-subscription-plan-description'),
  price: 0.00037,
  monthDuration: 12,
  benefits: [{ benefitDetail: translate('bc-subscription-plan-0-full-access') }, { benefitDetail:  translate('bc-subscription-plan-0-share-posts') }, { benefitDetail:  translate('bc-subscription-plan-0-freeze-account') }, { benefitDetail:  translate('bc-subscription-plan-0-no-pay-for-cancel') }]
},
{
  tittle: translate('bc-subscriptions-plan-0-enterprise'),
  description: translate('bc-subscription-plan-description'),
  price: 0.950,
  monthDuration: 12,
  benefits: [{ benefitDetail: translate('bc-subscription-plan-0-full-access') },
  { benefitDetail: translate('bc-subscription-plan-0-share-posts') },
  { benefitDetail: translate('bc-subscription-plan-0-freeze-account') }, 
  { benefitDetail: translate('bc-subscription-plan-0-no-pay-for-cancel')},
  { benefitDetail: translate('bc-subscription-plan-0-24-7-support') },
  { benefitDetail: translate('bc-subscription-20-account')},
  { benefitDetail: translate('bc-subscription-offline-content')}
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
