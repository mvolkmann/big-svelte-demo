<script>
  /* Example usage:
  <LabeledCheckbox label="Happy?" bind:checked={happy} />
  */
  import PropTypes from 'prop-types/prop-types';
  const { bool, checkPropTypes, string } = PropTypes;

  export let className = '';
  export let label;
  export let checked;

  const propTypes = {
    className: string,
    label: string.isRequired,
    checked: bool.isRequired
  };
  // checkPropTypes is a no-op when NODE_ENV = "production".
  checkPropTypes(propTypes, $$props, 'prop', 'LabeledCheckboxes');
</script>

<label class={className}>
  <input type="checkbox" bind:checked />
  {label}
</label>
