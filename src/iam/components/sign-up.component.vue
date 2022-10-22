<template>
  <div class="form-demo">
  <div class="flex justify-content-center">
    <div class="card">
      <h5 style="font-weight: bold; font-size: larger; margin-bottom: 15px"  class="text-center">Register</h5>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <div class="field">
          <div class="p-float-label">
            <InputText id="name" v-model="v$.firstName.$model" :class="{'p-invalid':v$.firstName.$invalid && submitted}" />
            <label for="firstName" :class="{'p-error':v$.firstName.$invalid && submitted}">First name*</label>
          </div>
          <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response" class="p-error">{{v$.firstName.required.$message.replace('Value', 'Name')}}</small>
        </div>

        <div class="field">
          <div class="p-float-label">
            <InputText id="name" v-model="v$.lastName.$model" :class="{'p-invalid':v$.lastName.$invalid && submitted}" />
            <label for="lastName" :class="{'p-error':v$.lastName.$invalid && submitted}">Last name*</label>
          </div>
          <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response" class="p-error">{{v$.lastName.required.$message.replace('Value', 'Last name')}}</small>
        </div>

        <div class="field">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
          </div>
          <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
          <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
        </div>
        <div class="field">
          <div class="p-float-label">
            <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
              <template #header>
                <h6>Pick a password</h6>
              </template>
              <template #footer="sp">
                {{sp.level}}
                <Divider />
                <p class="mt-2">Suggestions</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>At least one lowercase</li>
                  <li>At least one uppercase</li>
                  <li>At least one numeric</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </template>
            </Password>
            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
          </div>
          <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
        </div>
        <div class="field-checkbox">
          <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
          <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">I agree to the terms and conditions*</label>
        </div>
        <Button @click="handleSubmit" type="submit" label="Submit" class="mt-2" />
      </form>
    </div>
  </div>
  </div>
  <Dialog v-model:visible="showCreatedAccountDialog" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
    <AccountCreated/>
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="OK" @click="showCreatedAccountDialog = false" class="p-button-text" />
      </div>
    </template>
  </Dialog>
  <Toast />
</template>

<script lang="ts" setup>

import {computed, reactive, ref} from "vue";
import AccountCreated from "@/iam/components/account-created.component.vue";
import type {ReactiveVariable} from "vue/macros";
import type {RegisterUserInterface} from "@/iam/models/register-user.interface";
import AuthService from "@/iam/services/auth-api.services";
import {useToast} from "primevue/usetoast";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import router from "@/shared/router";


const showCreatedAccountDialog = ref(false);
const createAccountDialog = ref(false);
const authService : AuthService = new AuthService();

const state: ReactiveVariable<RegisterUserInterface> | any = reactive({
  firstName: '',
  email: '',
  password: '',
  lastName:'',
  username: '',
  bio: '',
  accept: null
});

const submitted = ref(false);

const rules = {
  firstName: { required },
  lastName: {required},
  email: { required, email },
  password: { required },
  accept: { required }
};

const v$ = useVuelidate(rules, state);
const toast = useToast();


const handleSubmit = async (isFormValid: any) => {
  if (!isFormValid) {
    return;
  }
  submitted.value = true;
  state.username = state.firstName + state.lastName + (Math.random() + 1).toString(36).substring(7);
  let createUser: RegisterUserInterface = reactive({
    username: state.username,
    email: state.email,
    password: state.password,
    firstName: state.firstName,
    lastName: state.lastName,
    bio: state.bio
  });
  const responseStatus = await authService.createAccount(createUser);
  console.log(responseStatus.status)
  if (responseStatus.status.toString().startsWith('2')){
    toast.add({severity:'success', summary: 'Welcome  ' + responseStatus.data.username, detail:'Message Content', life: 3200});
    window.location.reload();
  }
  else {
    toast.add({severity:'error', summary: 'Error while creating account', detail:'Your account was created successfully', life: 3200});
  }
}

defineExpose({
  createAccountDialog
})
const inputInformationVisibility = computed(() => !showCreatedAccountDialog.value ? 'inline' : 'none');

</script>
<script lang="ts">
export default {
  name: "Sign-up"
}
</script>

<style scoped>
.form-demo{
  display: v-bind(inputInformationVisibility) !important;
}
</style>