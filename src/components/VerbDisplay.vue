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
              v-model="conjugationFromInput[index]"
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
    <template v-if="!allowNext">
      <button
        @click="checkIfEqual"
        class="w-28 bg-sky-200 cursor-pointer disabled:bg-slate-300 disabled:text-white disabled:bg-opacity-50 disabled:cursor-default"
        :disabled="conjugationFromInput.length < 6"
        type="button"
      >Check</button>
    </template>
    <template v-else>
      <button
        @click="getNext"
        class="w-28 bg-sky-200"
      >Next verb</button>
    </template>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';

export default {

  data: () => ({
    conjugationFromInput: [],
    arrayOfBooleans: [],
    allowNext: false,
  }),

  computed: {
    ...mapStores(useVerbsStore),
  },

  methods: {
    /**
     * Gets the chosen verb and sets it to lower case.
     * Gets the conjugation of the chosen verb.
     * Checks whether each conjugation from input matches the conjugation from data (creates "true-false" array).
     * Allows "Next verb" button only if every value in the array is true.
     * @type {Array}
     */
    checkIfEqual () {
      const verb = this.verbsStore.chosenVerb.toLowerCase();
      const conjugationFromData = Object.values(this.verbsStore.verbsObject[verb]);

      this.arrayOfBooleans = conjugationFromData.map((element) => {
        return this.conjugationFromInput.includes(element);
      })
      if (this.arrayOfBooleans.every((value) => (value === true))) {
        this.allowNext = true;
      }
    },

    /**
     * Fires methods that choose and set new random verb.
     * Resets previously stored data.
     */
    getNext () {
      this.verbsStore.setChosenVerb(this.verbsStore.getRandomVerb());
      this.conjugationFromInput = [];
      this.arrayOfBooleans = [];
      this.allowNext = false;
    }
  },
}
</script>
