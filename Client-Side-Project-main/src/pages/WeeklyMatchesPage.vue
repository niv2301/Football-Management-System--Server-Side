<template>
  <div class="container">
    <div>
        <WeeklyMatches></WeeklyMatches>
    </div>

  </div>
</template>

<script>

import WeeklyMatches from "../components/WeeklyMatches";
export default {
  components: {
    WeeklyMatches,
  },
  name: "weekly_matches",
};
</script>
<style lang="scss" scoped>
  .container {
    max-width: 80%;
  }
</style>