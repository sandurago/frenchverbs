<template>
  <div>
    <table>
      <thead>
        <tr>
          <h2>Verb: {{ verbsStore.chosenVerb }}</h2>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pronoun, index) in verbsStore.displayPronouns"
          :key="index"
        >
          <td>{{ pronoun }}</td>
          <td><input
              v-model="verbConjugInput[index]"
              type="text"
              class="border-b border-b-solid border-slate-700 outline-none"
            ></td>
          <template v-if="arrayOfBooleans.length">
            <td
              v-if="arrayOfBooleans[index]"
              class="text-emerald-400"
            >Correct</td>
            <td
              v-else
              class="text-rose-400"
            >Not correct</td>
          </template>
        </tr>
      </tbody>
    </table>
    <button
      @click="checkIfEqual"
      class="w-28 bg-sky-200"
      type="button"
    >Check</button>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';

export default {

  data: () => ({
    verbConjugInput: [],
    isEqual: null,
    arrayOfBooleans: [],
  }),

  computed: {
    ...mapStores(useVerbsStore),
  },

  methods: {
    checkIfEqual () {
      const verb = this.verbsStore.chosenVerb.toLowerCase();
      const verbConjugationFromData = Object.values(this.verbsStore.verbsObject[verb]);

      const booleans = verbConjugationFromData.map((element) => {
        return this.verbConjugInput.includes(element);
      })
      this.arrayOfBooleans = booleans;
    }
  },
}
</script>
