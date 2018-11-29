<style lang='less'>
.mainContainer {
    display: block;
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
}

.urlInput {
    display: block;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8px;
    margin-bottom: 8px;
}

.centeredVideo {
    display: block;
    width: 100%;
    height: 576px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: auto;
}

.controls {
    display: block;
    width: 100%;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    >button{
        border-color:#fb151e; 
        color:#fb151e;
        background: #fff;
        padding:5px 8px;
    }
}
</style>
<template>
  <div>
    <div class="mainContainer">
      <video id="videoElement" class="centeredVideo" controls autoplay width="1024" height="576">Your browser is too old which doesn't support HTML5 video.</video>
    </div>
    <br />
    <div class="controls">
      <Button @click="flv_load()">加载</Button>
      <Button @click="flv_start">开始</Button>
      <Button @click="flv_pause">暂停</Button>
      <Button @click="flv_destroy">停止</Button>
      <input style="width:100px" type="text" name="seekpoint" />
      <Button @click="flv_seekto">跳转</Button>
    </div>
  </div>
</template>
<script>
import flvjs from 'flv.js';
export default {
  data() {
    return {
      player: document.getElementById('videoElement'),
    }
  },
  mounted() {
    this.flv_load();
  },
  methods: {   
    flv_load(){
        if (flvjs.isSupported()) {
        this.player = flvjs.createPlayer({
            type: 'mp4',
            url: '/src/file/4.mp4'
        });
        this.player.attachMediaElement(videoElement);
        this.player.load(); //加载
        }
    },
    flv_start(){
      this.player.play();
    },
    flv_pause(){
       this.player.pause();
    },
    flv_destroy(){
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player= null;
    },
    flv_seekto(){
      this.player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
    }
  },
  computed: {
    
  }
}
</script>