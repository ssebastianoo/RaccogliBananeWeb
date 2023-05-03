<script lang="ts">
  export let title = "Raccogli Banane";
  export let description =
    "Become a real banana collector and claim the leaderboard 🍌🍌🍌🍌🍌🍌🍌🍌🍌";
  export let image = "/banner.png";
  export let cardType: "summary" | "summary_large_image" =
    "summary_large_image";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="twitter:card" content={cardType} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={image} />
</svelte:head>
