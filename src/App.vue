<template>
  <nav class="my-2">
    <router-link
      to="/"
      class="font-bold text-grafite"
    >List of verbs</router-link>
  </nav>
  <router-view />
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';

export default {
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
