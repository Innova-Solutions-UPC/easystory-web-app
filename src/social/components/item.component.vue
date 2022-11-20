<template>
   <!--  <div class="card-cnt" ref="target" :style="{
    transform: cardTransform,
    transition: 'transform 0.25s ease-out'
  }" @click="selectPost"> -->
    <!--  <div class="image-cnt">
      <section class="flex" style="margin-bottom: 15px">
        <img   :src="props.post.image" class="w-8 h-8 mr-4 rounded image-book post-image" />
        <h2 class="username-post"> @{{ props.post.author.username?.substring(0,7) +'...'}}</h2>
      </section>
    </div>
    <div class="visible-cnt">
      <h1 class="mb-2 text-2xl font-bold">{{ props.post.title }}</h1>
      <code>{{ props.post.slug }}</code>
      <QuillEditor class="quill-preview" theme="bubble" read-only content-type="html" :content="props.post.content" />

    </div>-->
    <div class="card" @click="selectPost()">
        <div class="ovelay"> </div>
        <header class="user">
            <img :src="props.post.author?.image" alt="">
            <div class="user-info">
                <h2 class="user-info-name">{{props.post.author?.firstName}}</h2>
                <p class="user-info-time">{{timeAgo}}</p>
            </div>
        </header>
        <main>
            <p>{{ props.post.description}}</p>
        </main>
        <section>
            <div class="users-avatars">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="">
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="">
            </div>
            <p>{{getRanNum()}} Likes</p>
            <p class="comment">{{comments }} comment</p>
            <p>{{getRanNum()}} shared</p>
        </section>
    </div>   
  <!--  </div>--> 
</template>


<script lang="ts" setup>
import type { Item } from "@/shared/models/entities/item.interface";
import { useMouseInElement, useShare, useTimeAgo } from "@vueuse/core";
import { computed, ref } from "vue";
import socialFacade from "@/social/model/social.facade";
import router from "@/shared/plugins/router";
import { QuillEditor } from "@vueup/vue-quill";

function getRanNum (){
  return (Math.floor(Math.random() *8))
}

const props = defineProps<{
  post: Item;
}>();

const timeAgo = useTimeAgo(new Date(props.post.createdAt!));
const selectPost = () => {
  socialFacade.selectedPost = props.post;
  router.push('/post-detail')
}

const comments = await socialFacade.getCommentsNumberBySlug(props.post.slug!) ?? 5;


//LINK: https://vueuse.org/core/useShare/
const { share, isSupported } = useShare()

function startShare() {
  share({
    title: 'Hello',
    text: 'Hello my friend!',
    url: location.href,
  })
}

//LINK: https://www.youtube.com/watch?v=AVMNjbKdU1M
const target = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
  useMouseInElement(target)
const cardTransform = computed(() => {
  const MAX_ROTATION = 75
  const rX = (
    MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2) // handles x-axis
  const rY = (
    (elementX.value / elementWidth.value) * MAX_ROTATION -
    MAX_ROTATION / 2
  ).toFixed(2) // handles y-axis
  return isOutside.value
    ? ''
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`
})
</script>


<script lang="ts">

export default {
  name: "HomeItem"
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.item-cnt {
  height: 5vh !important;
}
.visible-cnt{
  background-color: #193f6c;
  height: 70%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
}
.image-book {
  max-width: 90px;
  max-height: 50px;
}
.image-cnt{
  background-color: transparent;
  height: 30%;
  display: flex
}

.card-cnt {
  background-color: transparent;
  cursor: pointer;
}
.username-post{
  position: absolute;
  bottom: 10px;
  left: 2px;
  max-height: 26px;
  top: 2px
}

.card-cnt:hover {
  box-shadow: 0px 10px 20px 2px rgba(0, 255, 255, 0.7);
  cursor: pointer;
}

.p-editor-toolbar {
  display: none;
}

.p-editor-container {
  background-color: transparent !important;
  border-style: none;
}

.quill-preview {
  border-radius: 30px;
  background-color: rgba(12, 12, 12, 0.39);
  border-color: rgb(7, 7, 7);
  margin-top: 5px;
  height: 120px;

}
.card {
  width: 320px;
  border-radius: 20px;
  background: #191A1D;
  overflow: hidden;
  padding: 14px;
  cursor: pointer;
  position: relative;
}
.card header.user {
  display: flex;
  gap: 12px;
}
.card header.user img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.card header .user-info-name {
  letter-spacing: 0.4px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}
.card header .user-info-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.588);
}
.card main p {
  font-size: 14px;
  color: #fff;
  margin-top: 16px;
  line-height: 1.7;
}
.card section {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.card section .users-avatars {
  margin-right: 21px;
  display: flex;
  align-items: center;
}
.card section .users-avatars img {
  height: 32px;
  width: 32px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #191A1D;
  margin-right: -15px;
}
.card section p {
  color: rgba(255, 255, 255, 0.508);
  font-size: 12px;
  margin-left: 10px;
}
.card section p.comment {
  margin-left: auto;
}
</style>

