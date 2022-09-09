<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-light-gray bg-opacity-50">
    <div
      class="w-80 h-60 bg-grass-green bg-opacity-80 shadow-md shadow-deep-purple rounded-xl flex justify-center items-center"
    >
      <span
        v-if="!isVerbChosen"
        class="font-bold text-white text-xl"
      >Getting a verb…
      </span>
      <span
        v-else
        class="font-bold text-white text-xl"
      >Chosen verb:
      </span>
      <span
        v-if="isVerbChosen"
        class="px-2 font-bold text-grafite text-xl"
      >{{ chosenRandomVerb }}</span>
    </div>
  </div>
</template>

<script>
import { useVerbsStore } from '@/store/verbs';
import { mapStores } from 'pinia';

export default {
  data: () => ({
    isVerbChosen: false,
    chosenRandomVerb: null,
  }),

  computed: {
    ...mapStores(useVerbsStore),
  },

  methods: {
    displayRandomAfterDelay () {
      setTimeout(() => {
        this.isVerbChosen = true;
        const random = this.verbsStore.getRandomVerb();
        this.chosenRandomVerb = random;
        this.goToVerb();
      }, 1000);
    },

    goToVerb () {
      setTimeout(() => {
        this.$router.push({
          name: 'verb-display',
          params: {
            name: this.chosenRandomVerb,
          }
        })
      }, 500);
    }
  },

  mounted () {
    this.displayRandomAfterDelay();
  }
}
</script>
