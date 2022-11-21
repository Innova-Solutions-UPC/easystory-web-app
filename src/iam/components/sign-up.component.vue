<template>
  <div v-if="!showLoading" class="form-demo">
    <div class="flex justify-content-center">
      <div class="card">
        <h5 style="font-weight: bold; font-size: larger; margin-bottom: 15px" class="text-center">
          {{ translate('bc-iam-register') }}</h5>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label">
              <InputText id="name" v-model="v$.firstName.$model"
                :class="{ 'p-invalid': v$.firstName.$invalid && submitted }" />
              <label for="firstName"
                :class="{ 'p-error': v$.firstName.$invalid && submitted }">{{ translate('bc-iam-firstname') }}*</label>
            </div>
            <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response"
              class="p-error">{{ v$.firstName.required.$message.replace('Value', 'Name') }}</small>
          </div>

          <div class="field">
            <div class="p-float-label">
              <InputText id="name" v-model="v$.lastName.$model"
                :class="{ 'p-invalid': v$.lastName.$invalid && submitted }" />
              <label for="lastName"
                :class="{ 'p-error': v$.lastName.$invalid && submitted }">{{ translate('bc-iam-lastname') }}*</label>
            </div>
            <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response"
              class="p-error">{{ v$.lastName.required.$message.replace('Value', 'Last name') }}</small>
          </div>

          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText id="email" v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error" />
              <label for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }">{{ translate('bc-iam-email') }}*</label>
            </div>
            <span v-if="v$.email.$error && submitted">
              <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
              class="p-error">{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password id="password" v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }" toggleMask>
                <template #header>
                  <h6>{{ translate('bc-iam-pick-password') }}</h6>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <Divider />
                  <p class="mt-2">{{ translate('bc-iam-suggest-password') }}</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>{{ translate('bc-iam-one-lowcase') }}</li>
                    <li>{{ translate('bc-iam-one-uppercase') }}</li>
                    <li>{{ translate('bc-iam-one-number') }}</li>
                    <li>{{ translate('bc-iam-characters') }}</li>
                  </ul>
                </template>
              </Password>
              <label for="password"
                :class="{ 'p-error': v$.password.$invalid && submitted }">{{ translate('bc-iam-password') }}*</label>
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
              class="p-error">{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
          </div>
          <div class="field-checkbox">
            <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model"
              :class="{ 'p-invalid': v$.accept.$invalid && submitted }" />
            <label for="accept"
              :class="{ 'p-error': v$.accept.$invalid && submitted }">{{ translate('bc-iam-agree-terms') }}*</label>
          </div>
          <Button @click="handleSubmit" type="submit" :label="translate('bc-iam-sign-up')" class="mt-2" />
        </form>
      </div>
    </div>
  </div>
  <div>
    <div v-if="showLoading" class="loading-status">
      <ProgressSpinner style="width: 5vw; height: 50px; opacity: 1 !important;" strokeWidth="8"
        fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
  </div>
  <Dialog v-model:visible="showCreatedAccountDialog" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }"
    position="top">
    <AccountCreated />
    <template #footer>
      <div class="flex justify-content-center">
        <Button label="OK" @click="showCreatedAccountDialog = false" class="p-button-text" />
      </div>
    </template>
  </Dialog>
  <Toast />
</template>

<script lang="ts" setup>

import { computed, reactive, ref } from "vue";
import AccountCreated from "@/iam/components/account-created.component.vue";
import type { ReactiveVariable } from "vue/macros";
import type { RegisterUserInterface } from "@/iam/models/register-user.interface";
import AuthService from "@/iam/services/auth-api.services";
import { useToast } from "primevue/usetoast";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import router from "@/shared/plugins/router";
import { translate } from '../../shared/plugins/i18n/i18n';


const showCreatedAccountDialog = ref(false);
const createAccountDialog = ref(false);
const authService: AuthService = new AuthService();

const state: ReactiveVariable<RegisterUserInterface> | any = reactive({
  firstName: '',
  email: '',
  password: '',
  lastName: '',
  username: '',
  bio: '',
  accept: null
});

const submitted = ref(false);

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  password: { required },
  accept: { required }
};

const v$ = useVuelidate(rules, state);
const toast = useToast();
const disableBtn = ref(false);
const showLoading = ref(false);
const handleSubmit = async (isFormValid: any) => {
  showLoading.value = true;
  if (!isFormValid) {
    return;
  }
  submitted.value = true;
  state.username = state.firstName + state.lastName + (Math.random() + 1).toString(36).substring(2);
  let createUser: RegisterUserInterface = reactive({
    username: state.username,
    email: state.email,
    password: state.password,
    firstName: state.firstName,
    lastName: state.lastName,
    bio: state.bio,
    image: 'https://firebasestorage.googleapis.com/v0/b/easy-story-5040d.appspot.com/o/Profile%2Fdefault.jpg?alt=media&token=2b180ac9-ee6d-4a46-a4ae-1ebedd9449bf'
  });
  const responseStatus = await authService.createAccount(createUser);
  console.log(responseStatus.status)
  if (responseStatus.status.toString().startsWith('2')) {
    toast.add({ severity: 'success', summary: translate('toast-account-created') + responseStatus.data.username, detail: translate('toast-account-logged'), life: 3200 });
    //NOTE: soy consiente que el codigo de abajo esta muy cochino
    //NOTE: pero es momentaneo creo
    localStorage.setItem('easy_story_email', createUser.email);
    localStorage.setItem('easy_story_password', createUser.password);
    //NOTE: aca termina el codigo cochino
    await router.push('/subscription');
  }
  else {
    toast.add({ severity: 'error', summary: 'Error', detail: translate('toast-account-not-created'), life: 3200 });
  }
  showLoading.value = false;
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
.form-demo {
  display: v-bind(inputInformationVisibility) !important;
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
</style>
