<template>
  <FindVerbToPractice
    @changed-query="changeQuery"
  />
  <div class="flex flex-col">
      <span class="pt-4 text-light-orange font-bold text-lg">List of verbs:</span>
      <span
        v-if="displayNotFound"
        class="font-bold text-grafite"
      >No verb found.</span>
    </div>
      <table
        v-for="(verbObject, infinitive, j) in displaySearchedVerb"
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
