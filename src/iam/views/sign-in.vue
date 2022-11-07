<template>
  <div>
  <div class="row">
    <ProgressSpinner v-if="doingLogin" style="width:150px;height:150px; margin-left: 40%; margin-top: 20% ; opacity: 1" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
    <div class="first-column">
      <div class="child-first-column">

        <div class="input-box">
          <div class="col-12 mb-2 lg:col-12 lg:mb-0">
            <span class="p-input-icon-left">
              <i class="pi pi-user"/>
              <InputText type="text" :placeholder="translate('bc-iam-username')" v-model="login.email"/>
            </span>
          </div>
          <div class="col-12 mb-2 lg:col-12 lg:mb-0">
            <span class="p-input-icon-left">
              <i class="pi pi-user"/>
              <InputText type="password" :placeholder="translate('bc-iam-password')" v-model="login.password" />
            </span>
          </div>
          <Button style="background-color: #193f6c" :label="translate('bc-iam-sign-in')" @click="doLogin" />
          <code> {{translate('bc-iam-no-account')}} <code @click="createAccountDialog = true" style="color: #7eaadc; cursor: pointer;  font-weight: bold;">{{translate('bc-iam-sign-up')}}</code> </code>


        </div>
      </div>
    </div>
    <div class="second-column">
      <div class="child-second-column">
        <Card class="card-login">
          <template #title >
            <h4 class="tittle-login">
              EasyStory
            </h4>
          </template>
          <template #content>
            <p>{{translate('app-slogan')}}</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="createAccountDialog" :breakpoints="{ '960px': '80vw' }" :style="{ width: '45vw', marginTop: '30vh' }" position="top">
    <CreateAccount />
  </Dialog>
</div>
</template>

<script setup lang="ts">

import {Login} from "@/iam/models/login";
import {computed, onMounted, reactive, ref, watch} from "vue";
import type {Ref} from "vue"
import type {Controller} from "@/shared/models/Controller";
import {injectStrict} from "@/shared/utils/Injections";
import CreateAccount from "@/iam/components/sign-up.component.vue";
import appController from "@/shared/models/Controller";
import router from "@/shared/router";
import { translate } from '../../shared/plugins/i18n/i18n';

const login: Login = reactive(new Login());
const wrongCredentials: Ref<boolean> = ref(false);
const loginForm: Ref<any> = ref(null);
const app: Controller = injectStrict("appController");
const createAccountDialog = ref(false);
const doingLogin=ref(false);
const doingLoginOpacity=ref(1);

onMounted(() => {
  if (app.user.getIsAuthenticated()){
    console.log('is autenticated')
  }
})

const doLogin = async function () {
  doingLogin.value = true;
  doingLoginOpacity.value = 0.2;
  let successfulLogin: Array<boolean> = [false];
  if (login.email !== null && login.password !== null) {
    successfulLogin = await handle(
        app.user.doLogin({
          email: login.email,
          password: login.password,
        })
    );
    if (app.user.getIsAuthenticated()){
      console.log('is authenticated')
      router.push('/profile');
    }
    wrongCredentials.value = !successfulLogin;
  }
  doingLogin.value = false;
  doingLoginOpacity.value = 1;
}

const handle = (promise: any) => {
  return promise
      .then((data: any) => [data, undefined])
      .catch((error: any) => {
        Promise.resolve([undefined, error]);
        wrongCredentials.value = true
      });
};

const opacityCss = computed(()=>  !createAccountDialog.value ? 1 : 0.1);


</script>

<style scoped>
.row {
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  opacity: v-bind(doingLoginOpacity);
}

.first-column {
  flex-grow: 1;
  background-color: #f4f6f9;
  opacity: v-bind(opacityCss);
}

.second-column {
  flex-grow: 1;
  background-color: #193f6c;
  opacity: v-bind(opacityCss);
}



.tittle-login{
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 2rem;
  margin: 0 auto;
  font-family: "Courier New",serif;
  border-right: 0.15em solid #18bdec;
  animation: typing 2s steps(38) 1s 1 normal both, blink 1s steps(1) infinite;
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 65%;
  }
}
@keyframes blink {
  50% {
    border-color: transparent;
  }
}

@media (min-width: 1600px) {

  .input-box {
    color: #181818;
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: fit-content;
  }
  .card-login{
    background-color: #16345a;
    width: fit-content;
    margin: 30px;
  }

  .child-first-column {
    background-color: #f4f6f9;
    position: absolute;
    height: 35vh;
    width: 20vw;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    top: 30%;
    left: 30vw;
    display: flex;

    -webkit-box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
    -moz-box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
    box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
  }

  .child-second-column {
    background-color: #193f6c;
    position: absolute;
    height: 35vh;
    width: 20vw;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top: 30%;
    right: 30vw;
    display: flex;

    -webkit-box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
    -moz-box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
    box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
  }
}


@media (min-width: 700px) and  (max-width: 1599px) {

  .input-box {
    color: #181818;
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: fit-content;
  }
  .card-login{
    background-color: #16345a;
    width: fit-content;
    margin: 30px;
  }

  .child-first-column {
    background-color: #f4f6f9;
    position: absolute;
    height: 35vh;
    width: 40vw;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    top: 30%;
    left: 10vw;
    display: flex;

    -webkit-box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
    -moz-box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
    box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
  }

  .child-second-column {
    background-color: #193f6c;
    position: absolute;
    height: 35vh;
    width: 40vw;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top: 30%;
    right: 10vw;
    display: flex;

    -webkit-box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
    -moz-box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
    box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
  }
}


@media (max-width: 699px)  {

  .input-box {
    color: #181818;
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: fit-content;
  }
  .card-login{
    background-color: #16345a;
    width: fit-content;
    margin: 30px;
  }

  .child-first-column {
    background-color: #f4f6f9;
    position: absolute;
    height: 35vh;
    width: 70vw;
    border-radius: 20px;
    top: 30%;
    left: 10vw;
    display: flex;
    z-index: 9999999999999;

    -webkit-box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
    -moz-box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
    box-shadow: -12px 10px 32px 4px rgba(25, 62, 108, 1);
  }

  .child-second-column {
    visibility: hidden;
    background-color: #193f6c;
    position: absolute;
    height: 35vh;
    width: 40vw;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    top: 30%;
    right: 30vw;
    display: flex;

    -webkit-box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
    -moz-box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
    box-shadow: 25px 10px 32px 4px rgba(244, 246, 249, 0.77);
  }
}

</style>
