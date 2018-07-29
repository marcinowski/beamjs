<template>
  <v-container fluid>
    <!-- <canvas
      id="canvas"
      ref="canvas"
      width="1"
      height="1"
      style="border: 2px solid black;"
    ></canvas> -->
    <svg
      id="svg"
      ref="svg"
      width="600"
      height="600"
      style="border: 2px solid black;"
    ></svg>
  </v-container>
</template>

<script>
import Vue from "vue";
import methodsMixin from "./methods.mixin";

export default Vue.component("Draw", {
  props: ["method"],
  mounted() {
    // this.canvas = this.$refs.canvas;
    // this.context = this.canvas.getContext("2d");
    this.svg = this.$refs.svg;
    this.events = [];
  },
  mixins: [methodsMixin],
  watch: {
    method: {
      handler: function(newVal) {
        this.handleMethod(newVal);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
