import { defineStore } from 'pinia'

export const useVerbsStore = defineStore('verbs', {
  state: () => ({
    verbsObject: {},
    chosenVerb: "",
  }),
  getters: {
    /**
     * Gets verbs' infinitives and maps them to start with upper case.
     * @returns {Array<String>} List of verbs.
     */
    getVerbsInfinitives (state) {
      const getVerbs = Object.keys(state.verbsObject);
      return getVerbs.map((verb) => {
        return verb;
      })
    },

    /**
   * Gets the keys (pronouns) of randomly chosen verb.
   * @type {String}
   */
    displayPronouns (state) {
      if (!state.chosenVerb) {
        return [];
      }
      const pronouns = Object.keys(state.verbsObject[state.chosenVerb.toLowerCase()].conjugation);
      return pronouns.map((pronoun) => {
        return pronoun[0].toUpperCase() + pronoun.substring(1);
      })
    },

    getVerbObject (state) {
      return state.verbsObject[state.chosenVerb];
    }
  },

  actions: {
    setVerbs (newVerbsObject) {
      this.verbsObject = newVerbsObject;
    },

    setChosenVerb (newChosenVerb) {
      this.chosenVerb = newChosenVerb;
    },

    /**
     * Gets the total number of verbs (from the array).
     * @returns {String} Ranomly chosen verb.
     */
    getRandomVerb () {
      const objectsLength = this.getVerbsInfinitives.length;
      return this.getVerbsInfinitives[Math.floor(Math.random() * objectsLength)];
    },
  },
})
