<template>
  <div>
    <table>
      <thead>
        <tr>
          <h2>Verb: {{ chosenVerb }}</h2>
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
    /**
     * Maps verbs to start with upper case.
     * @returns {Array} List of verbs from JSON file.
     */
    getVerbsInfinitives () {
      const getVerbs = Object.keys(this.verbsObject);
      return getVerbs.map((verb) => {
        return verb[0].toUpperCase() + verb.substring(1);
      })
    },
  },

  methods: {
    /**
     * Gets the verbs.json file.
     * Converts the file to JSON format.
     * Assigns it to data variable.
     *  @type {Object}
     */
    async getData () {
      const fetchFile = await fetch('/verbs.json');
      const getJson = await fetchFile.json();
      this.verbsObject = getJson;
    },

    /**
     * Gets the total number of verbs (from the array).
     * @returns {String} Ranomly chosen verb.
     */
    getRandomVerb () {
      const objectsLength = this.getVerbsInfinitives.length;
      return this.getVerbsInfinitives[Math.floor(Math.random() * objectsLength)];
    },

    /**
    * Gets the keys (pronouns) of randomly chosen verb.
    * @type {String}
    */
    displayPronouns () {
      const pronouns = Object.keys(this.verbsObject[this.chosenVerb.toLowerCase()]);
      this.pronouns = pronouns.map((pronoun) => {
        return pronoun[0].toUpperCase() + pronoun.substring(1);
      })
    }
  },

  async created () {
    await this.getData();
    this.chosenVerb = this.getRandomVerb();
    this.displayPronouns();
  }
}
</script>
