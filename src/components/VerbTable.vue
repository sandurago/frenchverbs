<template>
  <tr
    v-for="(pronoun, index) in pronouns"
    :key="index"
  >
    <td>{{ pronoun }}</td>
  </tr>
</template>

<script>
export default {
  props: ["pronouns"],
}
</script>
