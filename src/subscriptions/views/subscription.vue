<template>
<div>
  <Plans />
</div>
</template>

<script  setup>
import {ethers} from "ethers";
import {onMounted, ref} from "vue";
import CONTRACT_JSON from '../../../web3/src/artifacts/contracts/Subscription.sol/CSubscription.json';
import Plans from "../components/plans.component.vue";

const {ethereum} = window;
const currentAccount = ref();
const CONTRACT_ADDRESS= '0x7e4F785faf5296d1f1e9e4Ca62EF5CCb7Ed703D8';
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_JSON.abi, signer);

const checkIfWalletIsConnected = () => {
  if (!ethereum) {
    console.log('ERROR IN CONNECTING TO WALLET');
  } else {
    console.log('isConected')
  }
}

onMounted(()=>{
  checkIfWalletIsConnected();
});

const accounts = await ethereum.request({ method: "eth_accounts" });
console.log(accounts)
if (accounts.length !== 0) {
  currentAccount.value = accounts[0];
} else {
  console.log('No hay cuentas authorizadas');
  console.log('Autorizando....');
  accounts.value = await ethereum.request({method: 'eth_requestAccounts'});
}

</script>

<style scoped>

</style>
