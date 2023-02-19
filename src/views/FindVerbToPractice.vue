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
      :class="addShake"
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
    >Practice it!</button>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';
import { RouterLink } from 'vue-router';
import InitializeVerb from '@/components/InitializeVerb.vue';
import 'animate.css';

export default {
  emits: ['changedQuery'],

  components: {
    InitializeVerb,
    RouterLink,
  },

  data: () => ({
    shake: false,
    selectedVerb: null,
    isRandom: false,
    query: "",
  }),

  computed: {
    ...mapStores(useVerbsStore),


    addShake () {
      return {
        "animate__animated animate__headShake": this.shake,
      };
    }
  },

  watch: {
    /**
     * Emits new query value to VerbsList component.
     * @param {string} newParam new query value from search input
     * @param {string} _oldParam old query value
     */
    query(newParam, _oldParam) {
      this.$emit('changedQuery', newParam);
    }
  },

  methods: {
    onClick () {
      if (this.selectedVerb === null) {
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 500);
        return;
      };

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
