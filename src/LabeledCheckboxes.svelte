<script>
  import {isArray, isString, propTypes} from './prop-types';
  import LabeledChildren from './LabeledChildren.svelte';

  export let className = '';
  export let label = '';
  export let list = [];
  export let selected = [];

  propTypes(
    'LabeledCheckboxes',
    {className, label, list, selected},
    [isString, isString, isArray, isArray]
  );
</script>

<style>
  .checkbox-label {
    display: inline-block;
    margin-left: 0;
  }

  .checkbox-label:not(:first-of-type) {
    margin-left: 10px;
  }

  .row {
    display: flex;
  }
</style>

<LabeledChildren {className} {label}>
  <div class="row">
    {#each list as item}
      <label class="checkbox-label">
        <input
          type="checkbox"
          value={item.value || item.label}
          bind:group={selected} />
        {item.label}
      </label>
    {/each}
  </div>
</LabeledChildren>
