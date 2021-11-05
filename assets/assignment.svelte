<script>
  import Page from "/Page.svelte";
  import config from "/exampack.config.js";

  export let variant;

  const content = Object.fromEntries(
    Object.entries(import.meta.globEager("/content/**/*.svx")).map(([path, module]) => [
      path.slice("/content/".length, path.length - ".svx".length),
      module.default
    ])
  );

  function questionToRenderable(q) {
    if (Array.isArray(q)) {
      return [content[q[0]], q[1]];
    }

    return [content[q], null];
  }

  const renderableQuestions = config.assignments[variant].map(questionToRenderable)
</script>

<Page {variant}>
  {#each renderableQuestions as [Question, params]}
    <Question {params} {variant} />
  {/each}
</Page>