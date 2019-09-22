<script>
  export let className = '';
  export let label = '';
  export let checked = false;
</script>

<label class={className}>
  <input type="checkbox" bind:checked />
  {label}
</label>
