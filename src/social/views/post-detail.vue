<template>
<div class="post-detail-cnt">
  <div style="justify-self: center">
    <h2 >{{post.title}}</h2>
    <code>{{post.description}}</code>
  </div>
  <div :style="{ position: 'relative' }">
    <SpeedDial  :model="speedDialItems" :radius="120" direction="down-right" type="quarter-circle" buttonClass="p-button-success" mask />
  </div>

  <div>
    <Image :src="post.image" alt="Image" width="450" style="max-height: 300px"  />
  </div>
  <div style="margin-top: 2%">
    <div style="display: flex">
      <div>
        <Avatar image="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" shape="circle" />
      </div>
      <div style="margin-right: 5%"><h3>{{app.user.m_profile.authenticatedUser.username}}</h3></div>
      <div style="margin-left: 5%"><h3>Time ago: {{timeAgo}}</h3></div>
    </div>
    <div style="margin-top: 2%" class="quill-cnt">
<!--      <Editor readonly v-model="post.content" editorStyle="height: 500px; width: 98%" >-->
<!--        <template v-slot:toolbar style="display: none">-->
<!--        </template>-->
<!--      </Editor>-->
      <QuillEditor theme="bubble" read-only content-type="text" :content="post.content" />
    </div>

  </div>

</div>
</template>

<script lang="ts" setup>
import socialFacade from "@/social/model/social.facade";
import {computed, ref} from "vue";
import type {Item} from "@/shared/models/entities/item.interface";
import router from "@/shared/router";
import {useShare, useTimeAgo} from "@vueuse/core";
import type {Controller} from "@/shared/models/Controller";
import {injectStrict} from "@/shared/utils/Injections";
import {useToast} from "primevue/usetoast";
import {QuillEditor} from "@vueup/vue-quill";
socialFacade.selectedPost == undefined ? router.push('/home') : console.log('');
const post: Item | any = computed(()=> socialFacade.selectedPost);
const created = post.createdAt;
const app: Controller = injectStrict('appController');
const { share, isSupported } = useShare()
const timeAgo = useTimeAgo(post.value.createdAt!);
const toast = useToast();

const speedDialItems = ref([
  {
    label: 'Bookmark',
    icon: 'pi pi-bookmark',
    command: async () => {
      const response = await socialFacade.bookmarkAPost(post.id);
      response.toString().startsWith('2') ? toast.add({severity: 'info', summary: 'Add', detail: 'Data Added'}) : toast.add({severity: 'error', summary: 'Error', detail: 'Please try again'});
    }
  },
  {
    label: 'Share',
    icon: 'pi pi-share-alt',
    command: () => {
      startShare(post.content)
    }
  },
  {
    label: 'Like',
    icon: 'pi pi-heart',
    command: () => {
      toast.add({ severity: 'info', summary: 'Liked', detail: 'Liked' });
    }
  }
]);
function startShare(text: string) {
  share({
    title: 'Hello',
    text: text,
    url: location.href,
  })
}
</script>

<style scoped>
.post-detail-cnt{
  margin: 1%;
  text-align: center;
}
.quill-cnt{
  background-color: rgba(21, 20, 20, 0.96);
  min-height: 35vh;
  border-radius: 20px;

}
</style>

<style lang="scss" scoped>
::v-deep(.speeddial-linear-demo) {
  .p-speeddial-direction-up {
    left: calc(50% - 2rem);
    bottom: 0;
  }

  .p-speeddial-direction-down {
    left: calc(50% - 2rem);
    top: 0;
  }

  .p-speeddial-direction-left {
    right: 0;
    top: calc(50% - 2rem);
  }

  .p-speeddial-direction-right {
    left: 0;
    top: calc(50% - 2rem);
  }
}

::v-deep(.speeddial-circle-demo) {
  .p-speeddial-circle {
    top: calc(50% - 2rem);
    left: calc(50% - 2rem);
  }

  .p-speeddial-semi-circle {
    &.p-speeddial-direction-up {
      left: calc(50% - 2rem);
      bottom: 0;
    }

    &.p-speeddial-direction-down {
      left: calc(50% - 2rem);
      top: 0;
    }

    &.p-speeddial-direction-left {
      right: 0;
      top: calc(50% - 2rem);
    }

    &.p-speeddial-direction-right {
      left: 0;
      top: calc(50% - 2rem);
    }
  }

  .p-speeddial-quarter-circle {
    &.p-speeddial-direction-up-left {
      right: 0;
      bottom: 0;
    }

    &.p-speeddial-direction-up-right {
      left: 0;
      bottom: 0;
    }

    &.p-speeddial-direction-down-left {
      right: 0;
      top: 0;
    }

    &.p-speeddial-direction-down-right {
      left: 0;
      top: 0;
    }
  }
}

::v-deep(.speeddial-tooltip-demo) {
  .p-speeddial-direction-up {
    &.speeddial-left {
      left: 0;
      bottom: 0;
    }

    &.speeddial-right {
      right: 0;
      bottom: 0;
    }
  }
}

::v-deep(.speeddial-delay-demo) {
  .p-speeddial-direction-up {
    left: calc(50% - 2rem);
    bottom: 0;
  }
}

::v-deep(.speeddial-mask-demo) {
  .p-speeddial-direction-up {
    right: 0;
    bottom: 0;
  }
}
</style>
