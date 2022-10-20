<template>
  <div class="row">
    <div class="first-column">
      <div class="child-first-column">

        <div class="input-box">
          <div class="col-12 mb-2 lg:col-12 lg:mb-0">
            <span class="p-input-icon-left">
              <i class="pi pi-user"/>
              <InputText type="text" placeholder="Username" v-model="login.email"/>
            </span>
          </div>
          <div class="col-12 mb-2 lg:col-12 lg:mb-0">
            <span class="p-input-icon-left">
              <i class="pi pi-user"/>
              <InputText type="password" placeholder="Password" v-model="login.password" />
            </span>
          </div>
          <Button style="background-color: #193f6c" label="Login" @click="doLogin" />
          <code> Don't have an account  <code @click="createAccountDialog = true" style="color: #7eaadc; cursor: pointer;  font-weight: bold;">Sign Up</code> </code>


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
            <p>Plataforma web cuyo contenido es publicado por los usuarios de la misma. Con <code style="font-weight: 900;">EasyStory</code>  puedes publicar tus propias historias, relatos o cuentos.</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="createAccountDialog" :breakpoints="{ '960px': '80vw' }" :style="{ width: '45vw', marginTop: '30vh' }" position="top">
    <create-account />
  </Dialog>
</template>

<script setup lang="ts">

import {Login} from "@/iam/models/login";
import {computed, reactive, ref, watch} from "vue";
import type {Ref} from "vue"
import type {Controller} from "@/shared/models/Controller";
import {injectStrict} from "@/shared/utils/Injections";
import CreateAccount from "@/iam/components/createAccount.vue";

const login: Login = reactive(new Login());
const wrongCredentials: Ref<boolean> = ref(false);
const loginForm: Ref<any> = ref(null);
const app: Controller = injectStrict("appController");
const createAccountDialog = ref(false);

const doLogin = async function () {

  let successfulLogin: boolean = false;
  if (login.email !== null && login.password !== null) {
    successfulLogin = await handle(
        app.user.doLogin({
          email: login.email,
          password: login.password,
        })
    );
    wrongCredentials.value = !successfulLogin;
  }
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
