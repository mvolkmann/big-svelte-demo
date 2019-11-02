<script>
  /* Example usage:
  <LabeledSelect
    label="Favorite Color"
    list={colorList}
    bind:value={favoriteColor} />
  */
  import LabeledChildren from './LabeledChildren.svelte';

  export let className = '';
  export let label;
  export let list;
  export let value;
</script>

<LabeledChildren {className} {label}>
  <select bind:value>
    <option />
    {#each list as item}
      <option value={item.value || item.label}>{item.label}</option>
    {/each}
  </select>
</LabeledChildren>
