<script>
  /* Example usage:
  <LabeledInput label="Name" bind:value={name} />
  */
  import LabeledChildren from './LabeledChildren.svelte';

  export let label;
  export let type = 'text';
  export let value = '';

  const onChange = event => (value = event.target.value);
</script>

<style>
  input {
    --padding: 4px;
    border: solid gray 1px;
    border-radius: var(--padding);
    padding: var(--padding);
  }
</style>

<LabeledChildren {label}>
  <!-- The type attribute must be hard-coded (not dynamic)
       in order to use two-way binding.
       This is why this component does not use bind:value={value}. -->
  <input {type} {value} on:input={onChange} />
</LabeledChildren>
