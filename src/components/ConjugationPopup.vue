<template>
  <div class="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-deep-purple bg-opacity-50">
    <div class="w-80 h-96 p-5 bg-light-orange bg-opacity-70 rounded-lg flex flex-col justify-center items-center">
      <button
        @click="close"
        type="button"
        class="ml-auto mr-2 pt-0.5 w-6 h-6 border-2 border-solid border-deep-purple rounded-full flex justify-center items-center"
      >&#10006</button>
      <p class="text-lg font-bold uppercase text-deep-purple">Verb: {{ verbsStore.chosenVerb }}</p>
      <p class="py-2 text-deep-purple font-bold">Translation: <span class="text-grafite">{{
          verbsStore.getVerbObject.translation
      }}</span></p>
      <p class="font-bold text-deep-purple">Conjugation:</p>
      <p
        v-for="(conjugation, pronoun, i) in verbsStore.getVerbObject.conjugation"
        :key="i"
        class="py-1 text-grafite"
      >
        {{ pronoun }} <span class="font-bold">{{ conjugation }}</span></p>
      <p class="font-bold text-deep-purple text-center">Example: <span class="font-normal italic text-grafite">{{
          verbsStore.getVerbObject.example
      }}</span></p>
    </div>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';

export default {
  emits: ['close'],

  computed: {
    ...mapStores(useVerbsStore),
  },

  methods: {
    close () {
      this.$emit('close');
    }
  }
}
</script>
