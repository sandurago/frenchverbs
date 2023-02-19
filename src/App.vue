<template>
  <NavBar />
  <router-view class="py-2 px-4"/>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';
import NavBar from '../src/views/NavBar.vue';

export default {
  components: {
    NavBar,
  },

  computed: {
    ...mapStores(useVerbsStore),
  },

  methods: {
    /**
   * Gets the verbs.json file.
   * Converts the file to JSON format.
   * Assigns it to data variable.
   *  @type {Object}
   */
    async getData () {
      const fetchFile = await fetch('/verbs.json');
      const getJson = await fetchFile.json();
      this.verbsStore.setVerbs(getJson);
    },
  },

  created () {
    this.getData();
  }
}
</script>
