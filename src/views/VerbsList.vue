<template>
  <FindVerbToPractice
    @changed-query="changeQuery"
  />
  <div class="flex flex-col">
      <span class="pt-4 text-light-orange font-bold text-lg">List of verbs:</span>
      <div class="flex items-center">
        <span class="pr-2 text-deep-purple font-bold">Sort: </span>
        <div class="my-2 w-fit border-2 border-solid border-forest-green rounded-md">
          <select v-model="sorting" class="outline-none">
            <option value="">No sorting</option>
            <option value="asc">Alphabetical order</option>
            <option value="desc">Alphabetical reverse</option>
          </select>
        </div>
      </div>
      <span
        v-if="displayNotFound"
        class="font-bold text-grafite"
      >No verb found.</span>
      <div class="grid grid-cols-4 gap-3">
        <table
          v-for="(verbObject, infinitive, j) in displaySortedVerbs"
          :key="j"
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
import FindVerbToPractice from '../views/FindVerbToPractice.vue';
import InitializeVerb from '@/components/InitializeVerb.vue';
import 'animate.css';

export default {
  components: {
    InitializeVerb,
    RouterLink,
    FindVerbToPractice,
  },

  data: () => ({
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
    },
  },

  methods: {
    changeQuery(newQuery) {
      this.query = newQuery;
    }
  }
}
</script>
