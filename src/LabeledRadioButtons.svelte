<script>
  import LabeledChildren from './LabeledChildren.svelte';

  export let className = '';
  export let label = '';
  export let list = [];
  export let value = '';
</script>

<style>
  .radio-label {
    display: inline-block;
    margin-left: 0;
  }

  .radio-label:not(:first-of-type) {
    margin-left: 10px;
  }
</style>

<LabeledChildren className={className} label={label}>
  {#each list as item}
    <label class="radio-label">
      <input type="radio" value={item.value || item.label} bind:group={value} />
      {item.label}
    </label>
  {/each}
</LabeledChildren>
