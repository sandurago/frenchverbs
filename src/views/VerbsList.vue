<template>
  <div>
    <label
      for="input"
      class="font-bold text-deep-purple"
    >Find a verb to practice:</label>
    <input
      type="text"
      id="input"
      v-model="query"
      class="ml-2 mr-4 w-36 border-2 border-solid border-gray rounded-md outline-none focus:border-dark-turqoise"
    >
    <span class="px-4 text-dark-gray">or</span>
    <button
      @click="clickedRandom"
      type="button"
      class="px-3 bg-forest-green border-2 border-solid rounded-md text-white"
    >Get random verb</button>
    <InitializeVerb v-if="isRandom" />
    <span class="px-4 text-dark-gray">or</span>
    <label
      for="select"
      class="pl-4 pr-2 font-bold text-deep-purple"
    >Choose verb:</label>
    <select
      name="select"
      id="select"
      v-model="selectedVerb"
      class="ml-2 mr-4 w-20 border-2 border-solid border-gray rounded-md outline-none focus:border-dark-turqoise"
    >
      <option
        v-for="(verb, index) in verbsStore.getVerbsInfinitives"
        :key="index"
        :value="verb"
        placeholder="Choose verb"
      >{{ verb }}</option>
    </select>
    <button
      @click="onClick"
      class="px-3 bg-forest-green border-2 border-solid rounded-md text-white"
      :disabled="!selectedVerb"
    >Practice it!</button>
    <div class="flex flex-col">
      <span class="pt-4 text-light-orange font-bold text-lg">List of verbs:</span>
      <select v-model="sorting">
        <option value="">No sorting</option>
        <option value="asc">Alphabetical order</option>
        <option value="desc">Alphabetical reverse</option>
      </select>
      <span
        v-if="displayNotFound"
        class="font-bold text-grafite"
      >No verb found.</span>
      <table
        v-for="(verbObject, infinitive, j) in displaySortedVerbs"
        :key="j"
        class="w-1/3 mt-4"
      >
        <thead>
          <tr class="bg-light-gray text-grafite uppercase">
            <th>
              {{ infinitive }}
            </th>
          </tr>
          <tr class="text-grafite">
            <th>
              {{ verbObject.translation }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(conjugation, pronoun, k) in verbObject.conjugation"
            :key="k"
            class="flex justify-center"
          >
            <td>{{ pronoun }} {{ conjugation }}</td>
          </tr>
          <tr class="pt-2 flex justify-center">
            <router-link
              :to="{ name: 'verb-display', params: { verb: infinitive } }"
              class="px-2 bg-light-orange text-white text-bold rounded-md hover:bg-juicy-orange"
            >Practice!</router-link>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { RouterLink } from 'vue-router';
import { mapStores } from 'pinia';
import InitializeVerb from '@/components/InitializeVerb.vue';

export default {
  components: {
    InitializeVerb,
    RouterLink,
  },

  data: () => ({
    selectedVerb: null,
    query: "",
    sorting: "",
    isRandom: false,
  }),

  computed: {
    ...mapStores(useVerbsStore),

    displaySearchedVerb () {
      /** @type {String[]} */
      const infinitives = this.verbsStore.getVerbsInfinitives;

      const matchingVerbs = {};

      infinitives.forEach(infinitive => {
        const inf = infinitive.toLowerCase();
        if (inf.indexOf(this.query.toLowerCase()) !== -1) {
          matchingVerbs[inf] = this.verbsStore.verbsObject[inf];
        }
      });
      return matchingVerbs;
    },

    displaySortedVerbs() {
      const verbs = this.displaySearchedVerb;

      // This gives us something like:
      // [
      //   ["être", {...}]  : left
      //   ["avoir", {...}] : right
      // ]
      const entries = Object.entries(verbs);
      if (this.sorting === 'asc') {
        const sorted = entries.sort((left, right) => {
          // left[0] because of the shape of entries:
          // 0 is the index of the key
          /*
            For example, here is left:
            ["etre", {
              "conjugation": ...,
              "translation": ...,
              "example": ...,
            }]

            so we see that it's an array.
            At index 0, we have the name of the verb,
            which we are going to sort.

            And it's the same thing for right. Left and right are just names
            for the arrays.
          */
          const infLeft = left[0];
          const infRight = right[0];

          // If infinitive on the left "is bigger", it comes after
          if (infLeft > infRight) {
            return 1;
          } else {
            return -1;
          }
        });
        // Object.fromEntries allows us to "reverse" the Object.entries operation:
        // It transforms the [["être", {...}], ["avoir", {...}]] back into
        // {"être": {...}, "avoir": {...}}
        return Object.fromEntries(sorted);
      } else if (this.sorting === 'desc') {
        // We do the same as previously, except this time we reverse the value in sort
        const sorted = entries.sort((left, right) => {
          const infLeft = left[0];
          const infRight = right[0];

          if (infLeft > infRight) {
            return -1;
          } else {
            return 1;
          }
        });

        return Object.fromEntries(sorted);
      }

      // We reach here if we didn’t specify a sorting option
      return verbs;
    },

    displayNotFound () {
      /** @type {Array} */
      const infinitives = this.verbsStore.getVerbsInfinitives;

      return infinitives.every(infinitive => {
        return infinitive !== this.query && infinitive.indexOf(this.query) === -1 && this.query.length !== 0;
      })
    }
  },

  methods: {
    onClick () {
      const param = this.selectedVerb;
      this.$router.push({
        name: 'verb-display',
        params: {
          verb: param,
        }
      });
    },

    goToPractice (infinitive) {
      this.$router.push({
        name: "verb-display",
        params: {
          verb: infinitive,
        }
      });
    },

    clickedRandom () {
      this.isRandom = true;
    }
  },
}
</script>
