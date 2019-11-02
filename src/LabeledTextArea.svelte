<script>
  /* Example usage:
  <LabeledTextArea label="Life Story" bind:value={story} />
  */
  import LabeledChildren from './LabeledChildren.svelte';

  export let label;
  export let value = '';
</script>

<style>
  textarea {
    --padding: 4px;
    border: solid gray 1px;
    border-radius: var(--padding);
    padding: var(--padding);
  }
</style>

<LabeledChildren {label}>
  <textarea bind:value />
</LabeledChildren>
