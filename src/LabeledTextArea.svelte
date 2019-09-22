<script>
  import LabeledChildren from './LabeledChildren.svelte';

  export let label = '';
  export let value = '';
</script>

<style>
  textarea {
    border: solid gray 1px;
    border-radius: 4px;
    padding: 4px;
  }
</style>

<LabeledChildren {label}>
  <textarea bind:value />
</LabeledChildren>
