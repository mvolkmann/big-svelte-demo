<script>
  import {isBoolean, isString, propTypes} from './prop-types';

  export let className = '';
  export let label = '';
  export let checked = false;

  propTypes(
    'LabeledCheckbox',
    {className, label, checked},
    [isString, isString, isBoolean]
  );
</script>

<label class={className}>
  <input type="checkbox" bind:checked />
  {label}
</label>
