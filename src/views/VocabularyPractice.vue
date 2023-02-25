<template>
  <div>
    <span>Choose the correct translation:</span>

  </div>
</template>

<script>
export default {
  data: () => ({
    vocabArray: [],
  }),

  methods: {
    /**
     * Gets array with vocabulary.
     */
    async getVocabulary () {
      const fetchFile = await fetch('/vocabulary.json');
      const getJson = await fetchFile.json();
      this.setVocabulary(getJson);
    },

    /**
     * Fills in data in the component with content from json.
     * @param {Array<Object>} newVocabArray 
     */
    setVocabulary(newVocabArray) {
      this.vocabArray = newVocabArray;
    }
  },

  created() {
    this.getVocabulary();
  }
}
</script>
