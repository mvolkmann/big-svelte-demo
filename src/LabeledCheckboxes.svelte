<script>
  /* Example usage:
  <LabeledCheckboxes
    label="Favorite Flavors"
    list={flavorList}
    bind:selected={favoriteFlavors} />
  */
  import PropTypes from 'prop-types/prop-types';
  const { arrayOf, checkPropTypes, shape, string } = PropTypes;

  import LabeledChildren from './LabeledChildren.svelte';

  export let className = '';
  export let label;
  export let list;
  export let selected;

  const propTypes = {
    className: string,
    label: string.isRequired,
    list: arrayOf(
      shape({
        label: string.isRequired,
        value: string
      })
    ).isRequired,
    selected: arrayOf(string).isRequired
  };
  checkPropTypes(propTypes, $$props, 'prop', 'LabeledCheckboxes');
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
