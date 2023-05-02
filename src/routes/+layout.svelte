<script>
  import "../style.scss";
</script>

<main>
  <slot />
</main>

<style lang="scss">
  @import "../variables";

  main {
    padding: $padding;
    height: calc(100vh - $padding * 2);
  }
</style>
