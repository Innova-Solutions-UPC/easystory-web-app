<template>
<div class="post-detail-cnt">
  <div style="justify-self: center">
    <h2 >{{post.title}}</h2>
    <code>{{post.description}}</code>
  </div>
  <div :style="{ position: 'relative' }">
    <SpeedDial style="margin-left: 1%;"  :model="speedDialItems" :radius="120" direction="down-right" type="quarter-circle" buttonClass="p-button-success" mask />
  </div>

  <div>
    <img :src="post.image" alt="Image" width="450" style="max-height: 300px !important;"  />
  </div>
  <div style="margin-top: 2%">
    <div style="display: flex">
      <div>
        <Avatar image="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" shape="circle" />
      </div>
      <div style="margin-right: 5%"><h3>@{{post.author.username}}</h3></div>
      <div style="margin-left: 5%"><h3>Time ago: {{timeAgo}}</h3></div>
    </div>
    <div style="margin-top: 2%" class="quill-cnt">
<!--      <Editor readonly v-model="post.content" editorStyle="height: 500px; width: 98%" >-->
<!--        <template v-slot:toolbar style="display: none">-->
<!--        </template>-->
<!--      </Editor>-->
      <QuillEditor theme="bubble" read-only content-type="text" :content="post.content" />
    </div>
    <Divider type="dashed" align="left">
      <div class="inline-flex align-items-center">
        <i class="pi pi-comments mr-2"></i>
        <b>Comments</b>
      </div>
    </Divider>

  </div>
<Toast />
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

const isBookmarked: boolean = socialFacade.bookmarks?.items.filter(e => e.id == post.value.id).length! > 0;
console.log(isBookmarked)
const bookmarkedIcon = isBookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark';
console.log(bookmarkedIcon)

const speedDialItems = ref([
  {
    label: 'Bookmark',
    icon: bookmarkedIcon,
    command: async () => {
      if(isBookmarked){
        const response = await socialFacade.deleteBookmark(socialFacade.bookmarks?.items.filter(e => e.id == post.value.id)[0].id!)
        if (response.toString().startsWith('2')){
          toast.add({severity: 'success', summary: 'Bookmarked', detail: 'Bookmark was deleted successful'});
        }
        else {
          toast.add({severity: 'error', summary: 'Error', detail: 'Please try again'});
        }
      }
      else {
        const response = await socialFacade.bookmarkAPost(post.value.id);
        if (response.toString().startsWith('2')){
          toast.add({severity: 'success', summary: 'Bookmarked', detail: 'Post was bookmarked successful'});
        }
        else {
          toast.add({severity: 'error', summary: 'Error', detail: 'Please try again'});
        }
      }
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
    title: post.title,
    text: post.content,
    url: location.href,
  })
}
</script>

<style scoped>
.post-detail-cnt{

  background: #bdc3c7;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2c3e50, #bdc3c7);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  text-align: center;
  height: calc(100vh - 52px);
  color: #fff;
}
.quill-cnt{
  margin-left: 1%;
  margin-right: 1%;
  min-height: 35vh;
  border-radius: 20px;
  background: rgba(13, 13, 14, 0.404);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.2px);
  -webkit-backdrop-filter: blur(8.2px);
  border: 1px solid rgba(47, 62, 108, 0.1);

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
