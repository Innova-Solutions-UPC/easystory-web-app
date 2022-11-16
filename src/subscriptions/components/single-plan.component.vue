<template>
  <div  class="col-12 lg:col-4" style="color: #0E0B16" >
    <div class="p-3 h-full" >
      <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
        <div class="text-900 font-medium text-xl mb-2">{{ props.detail.tittle }}</div>
        <div class="text-600">{{ props.detail.description }}</div>
        <hr class="my-3 mx-0 border-top-1 border-none surface-border"/>
        <div class="flex align-items-center">
          <span class="font-bold text-2xl text-900">Ξ: {{ props.detail.price }}</span>
          <span class="ml-2 font-medium text-600">per month</span>
        </div>
        <hr class="my-3 mx-0 border-top-1 border-none surface-border"/>
        <ul class="list-none p-0 m-0 flex-grow-1">
          <li class="flex align-items-center mb-3" v-for="benefit in props.detail.benefits"
              :key="benefit.benefitDetail">
            <i class="pi pi-check-circle text-green-500 mr-2"></i>
            <span>{{ benefit.benefitDetail }}</span>
          </li>
        </ul>
        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto"/>
        <Button v-if="props.detail.tittle !== 'Enterprise'" label="Buy Now" class="p-3 w-full mt-auto" @click="buyPlan"></Button>
        <Button v-else disabled label="Coming soon " class="p-3 w-full mt-auto"></Button>
      </div>
    </div>

  </div>
</template>


<script lang="ts" setup >
import type Plan from "@/subscriptions/models/entities/plan.interface";
import {ethers} from "ethers";
import CONTRACT_JSON from '../../../web3/src/artifacts/contracts/Subscription.sol/CSubscription.json';
import type {ComputedVariable} from "vue/macros";
import {computed, ref, toRef, watch} from "vue";
import {useToast} from "primevue/usetoast";

const {ethereum}: any = window;
const props = defineProps<{
  detail: Plan,
  contractAddress: string,
  provider: any,
  signer: any,
  accounts: any
}>();

const contract = new ethers.Contract(props.contractAddress, CONTRACT_JSON.abi, props.signer);
const accountsRef = toRef(props, 'accounts');




const emits = defineEmits<{
  (e:'buyPlan'): void;
  (e:'operationSucceed'): void;
}>();
const toast = useToast();
const buyPlan = async () => {
  emits('buyPlan');
  if (accountsRef.value.length !== 0) {
    accountsRef.value = accountsRef.value[0];
  } else {
    console.log('No hay cuentas autorizadas');
    console.log('Autorizando....');
    accountsRef.value = await ethereum.request({method: 'eth_requestAccounts'});
  }
  let tx = await contract.subscript( new Date().toDateString(), props.detail.monthDuration, {value: ethers.utils.parseEther(props.detail.price.toString())});
  await tx.wait();
  console.log({tx});
  console.log('Operation finished successfully https://mumbai.polygonscan.com/tx/' + tx.hash);
  if(tx.hash == null){
    toast.add({severity:'error', summary: 'Operation error', detail:'Operation was carried out with an error', life: 5000});
    window.location.reload();
  }
  toast.add({severity:'success', summary: 'Operation succeed', detail:'Operation was carried out successfully', life: 5000});
  emits('operationSucceed');
};



</script>


<script lang="ts">
export default {
  name: "single-plan"
}
</script>

<style scoped>


</style>
