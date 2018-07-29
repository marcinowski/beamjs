<template>
  <v-list>
    <v-list-tile
      value="true"
      v-for="item in methods"
      :key="item.id"
      @click="$emit('method', item.id)"
    >
      <v-list-tile-action>
        <v-icon v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import Vue from "vue";
import methodsMixin from "@/components/methods.mixin";

export default Vue.component("SideOptions", {
  mixins: [methodsMixin],
  methods: {}
});
</script>
