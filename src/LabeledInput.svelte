<script>
  import LabeledChildren from './LabeledChildren.svelte';

  export let label = '';
  export let type = 'text';
  export let value = '';

  const onChange = event => (value = event.target.value);
</script>

<style>
  input {
    border: solid gray 1px;
    border-radius: 4px;
    padding: 4px;
  }
</style>

<LabeledChildren label={label}>
  <input {type} {value} on:input={onChange} />
</LabeledChildren>
