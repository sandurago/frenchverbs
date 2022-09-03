<template>
  <div>
    <table>
      <thead>
        <tr>
          <h2>Verb: Rendre</h2>
        </tr>
      </thead>
      <tbody>
        <VerbTable :pronouns="pronouns" />
      </tbody>
    </table>
  </div>
</template>

<script>
import VerbTable from '@/components/VerbTable.vue'

export default {
  components: {
    VerbTable,
  },

  data: () => ({
    chosenVerb: "",
    pronouns: [],
    verbsObject: {},
  }),

  computed: {
    getVerbsInfinitives () {
      return Object.keys(this.verbsObject);
    },

    /**
     * 
     * @returns {Array}
     */
    displayPronouns () {
      this.pronouns = Object.keys(this.verbsObject[this.getRandomVerb()]);
      console.log(this.pronouns);
    }
  },

  methods: {
    async getData () {
      const fetchFile = await fetch('/verbs.json');
      const getJson = await fetchFile.json();
      this.verbsObject = getJson;
      console.log(this.verbsObject);
    },

    /**
     * Gets the length of all the keys of the object with verbs.
     * @returns {String} between 0 and max length.
     */
    getRandomVerb () {
      const objectsLength = this.getVerbsInfinitives.length;
      const verbs = Object.keys(this.verbsObject);
      return verbs[Math.floor(Math.random() * objectsLength)];
    },
  },

  async created () {
    await this.getData();
    this.displayPronouns;
  }
}
</script>
