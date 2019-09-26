<script>
  export let field; // required object
  export let item = {}; // object
  export let setItem; // required function

  const { autofocus, max, min, placeholder, propertyName, type } = field;

  const value = item[propertyName] || '';

  const inputProps = {
    autofocus,
    //onChange: e => onChange(e, propertyName),
    placeholder,
    type,
    value
  };

  if (type === 'range') {
    if (max !== undefined) inputProps.max = max;
    if (min !== undefined) inputProps.min = min;
    if (!value) inputProps.value = 0;
  }

  if (type === 'checkbox') inputProps.checked = value;

  function onChange(event) {
    const { checked, type, value } = event.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setItem({ ...item, [propertyName]: valueToUse });
  }

  function takeFocus(element) {
    if (autofocus) element.focus();
  }
</script>

<style>
  input, select {
    border: solid lightgray 1px;
    border-radius: 4px;
    font-size: 18px;
    padding: 4px;
  }

  input[type=checkbox],
  input[type=radio] {
    height: 16px;
    margin-bottom: 0;
  }

  .row {
    margin-bottom: 10px;
  }

  .form-control {
    display: inline-flex;
    align-items: center;
  }

  .radio {
    display: inline-block;
  }
      
  label {
    display: inline-block;
    font-weight: normal;
    margin-left: 5px;
    margin-right: 15px;
    width: auto;
  }

  .range {
    display: flex;
    align-items: center;
  }

  .range > input {
    margin-right: 10px;
  }

  select {
    font-size: 14px;
    font-weight: normal;
    outline: none;
    padding: 10px;
  }
</style>

<div class="form-control">
  {#if type === 'radio'}
    {#each field.options as option}
      <input
        checked={value === option}
        name={propertyName}
        on:change={e => onChange(e, propertyName)}
        type="radio"
        use:takeFocus 
        value={option} />
      <label>{option}</label>
    {/each}
  {:else if type === 'select'}
    <select on:change={e => onChange(e, propertyName)} use:takeFocus {value}>
      {#each field.options as option (propertyName + '-' + option)}
        <option value={option}>{option}</option>
      {/each}
    </select>
  {:else if type === 'range'}
    <div class="range">
      <input on:input={onChange} use:takeFocus {...inputProps} />
      {inputProps.value}
    </div>
  {:else}
    <input on:input={onChange} use:takeFocus {...inputProps} />
  {/if}
</div>
