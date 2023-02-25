<template>
  <div class="justify-center my-16 flex flex-row bg-opacity-50 rounded-md">
    <table class="w-lg">
      <thead class="h-10 align-top">
        <tr>
          <th class="pr-4">
            <h2 class="font-bold text-juicy-orange bg-light-gray">Verb: <span
                class="capitalize text-deep-purple px-3"
              >{{
                  verbsStore.chosenVerb
              }}</span></h2>
          </th>
          <th class="w-md pl-4">
            <h2 class="px-2 font-bold bg-light-gray">
              Your answers:
            </h2>
          </th>
        </tr>
      </thead>
      <tbody class="py-4">
        <tr
          v-for="(pronoun, index) in verbsStore.displayPronouns"
          :key="index"
        >
          <td
            class="flex my-2 pr-4"
          >
            <span class="w-16 text-deep-purple">{{ pronoun }}</span>
            <input
              v-model="conjugationFromInput[index]"
              type="text"
              class="px-2 border-2 border-solid border-deep-purple rounded-sm outline-none text-grafite"
            >
          </td>
          <td class="pl-4">
            <template v-if="arrayOfBooleans.length">
              <span v-if="arrayOfBooleans[index]"
                class="pl-3 mx-4 text-emerald-600 font-bold"
              >
                Correct
              </span>
              <span
              v-else
                class="pl-3 mx-4 text-rose-600 font-bold"
              >Not correct</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ml-4 flex flex-col">
      <button
        v-if="!allowNext"
        @click="checkIfEqual"
        class="m-4 h-14 w-28 bg-sky-200 cursor-pointer disabled:bg-slate-300 disabled:text-white disabled:bg-opacity-50 disabled:cursor-default rounded-md"
        :disabled="conjugationFromInput.length < 6"
        type="button"
      >Check</button>

      <button
        v-else
        @click="getNext"
        class="m-4 h-14 w-28 bg-sky-200 cursor-pointer disabled:bg-slate-300 disabled:text-white disabled:bg-opacity-50 disabled:cursor-default rounded-md"
      >Next verb</button>

      <button
        @click="help"
        class="m-4 h-14 w-28 bg-light-orange rounded-md"
      >Stuck?</button>
      <ConjugationPopup
        v-if="getHelp"
        @close="closeHelp"
      />
    </div>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';
import ConjugationPopup from '@/components/ConjugationPopup.vue';

export default {
  components: {
    ConjugationPopup,
  },

  data: () => ({
    conjugationFromInput: [],
    arrayOfBooleans: [],
    allowNext: false,
    getHelp: false,
  }),

  computed: {
    ...mapStores(useVerbsStore),
  },

  watch: {
    "$route.params.verb": {
      handler (newParam, _oldParam) {
        this.verbsStore.setChosenVerb(newParam);
      },
      deep: true,
    }
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
      const verb = this.verbsStore.chosenVerb;
      const conjugationFromData = Object.values(this.verbsStore.verbsObject[verb].conjugation);

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
      const newVerb = this.verbsStore.getRandomVerb();
      this.verbsStore.setChosenVerb(newVerb);
      this.conjugationFromInput = [];
      this.arrayOfBooleans = [];
      this.allowNext = false;

      this.$router.push({
        name: 'verb-display',
        params: {
          verb: newVerb,
        }
      });
    },

    help () {
      this.getHelp = true;
    },

    closeHelp () {
      this.getHelp = false;
    }
  },

  created () {
    if (this.$route.params.verb) {
      this.verbsStore.setChosenVerb(this.$route.params.verb);
    }
  }
}
</script>
