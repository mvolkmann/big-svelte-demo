<script>
  export let className = '';
  export let label = '';
  export let checked = false;
</script>

<style>

</style>

<label class={className}>
  <input type="checkbox" bind:checked />
  {label}
</label>
