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
    <label
      for="select"
      class="font-bold text-deep-purple"
    >See all verbs:</label>
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
    >Select</button>
    <div class="flex flex-col">
      <span class="pt-4 text-light-orange font-bold text-lg">List of verbs:</span>
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
    isRandom: false,
  }),

  computed: {
    ...mapStores(useVerbsStore),

    displaySearchedVerb () {
      /** @type {String[]} */
      const infinitives = this.verbsStore.getVerbsInfinitives;

      const matchingVerbs = {};

      // console.log(
      //   infinitives.filter(infinitive => {
      //     const inf = infinitive.toLowerCase();
      //     return inf.indexOf(this.query.toLowerCase()) !== -1;
      //   })
      // );

      infinitives.forEach(infinitive => {
        const inf = infinitive.toLowerCase();
        if (inf.indexOf(this.query.toLowerCase()) !== -1) {
          matchingVerbs[inf] = this.verbsStore.verbsObject[inf];
        }
      });
      return matchingVerbs;
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
