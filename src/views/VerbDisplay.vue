<template>
  <div class="w-80">
    <table>
      <thead>
        <tr>
          <th>
            <h2 class="px-4 font-bold text-juicy-orange bg-light-gray">Verb: <span
                class="capitalize text-deep-purple px-3"
              >{{
                  verbsStore.chosenVerb
              }}</span></h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="m-4">
          <td
            v-for="(pronoun, index) in verbsStore.displayPronouns"
            :key="index"
            class="flex my-2"
          >
            <span class="w-16 text-juicy-orange">{{ pronoun }}</span>
            <input
              v-model="conjugationFromInput[index]"
              type="text"
              class="border-b border-b-solid border-deep-purple outline-none text-grafite"
            >
            <template v-if="arrayOfBooleans.length">
              <span
                v-if="arrayOfBooleans[index]"
                class="text-emerald-400 mx-4"
              >
                Correct
              </span>

              <span
                v-else
                class="text-rose-400 mx-4"
              >Not correct</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between">
      <button
        v-if="!allowNext"
        @click="checkIfEqual"
        class="my-3 w-28 bg-sky-200 cursor-pointer disabled:bg-slate-300 disabled:text-white disabled:bg-opacity-50 disabled:cursor-default rounded-md"
        :disabled="conjugationFromInput.length < 6"
        type="button"
      >Check</button>

      <button
        v-else
        @click="getNext"
        class="my-3 w-28 bg-sky-200 cursor-pointer disabled:bg-slate-300 disabled:text-white disabled:bg-opacity-50 disabled:cursor-default rounded-md"
      >Next verb</button>

      <button
        @click="help"
        class="my-3 w-28 bg-turqoise rounded-md"
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
