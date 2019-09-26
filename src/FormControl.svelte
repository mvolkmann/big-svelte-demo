<script>
  export let field; // object
  export let first = false; // boolean
  export let item = {}; // object
  export let setItem; // function

  const { max, min, placeholder, propertyName, type } = field;

  const value = item[propertyName] || '';

  const inputProps = {
    autofocus: first,
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
</script>

<style>
  input, select {
    border: solid lightgray 1px;
    border-radius: 4px;
    font-size: 18px;
    padding: 4px;
  }

  input[type=checkbox] {
    margin-left: 0;
  }

  .row {
    margin-bottom: 10px;
  }

  .input {
    display: inline-block;
  }

  .radio {
    display: inline-block;
  }
      
  .radio > input {
    margin-left: 0;
  }

  .radio > label {
    font-weight: normal;
    margin-left: 3px;
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

<div class="input">
  {#if type === 'radio'}
    {#each field.options as option}
      <div class="radio" key={`${propertyName}-${option}`}>
        <input
          checked={value === option}
          name={propertyName}
          on:change={e => onChange(e, propertyName)}
          type="radio"
          value={option} />
        <label>{option}</label>
      </div>
    {/each}
  {:else if type === 'select'}
    <select on:change={e => onChange(e, propertyName)} {value}>
      {#each field.options as option (propertyName + '-' + option)}
        <option value={option}>{option}</option>
      {/each}
    </select>
  {:else if type === 'range'}
    <div class="range">
      <input on:input={onChange} {...inputProps} />
      {inputProps.value}
    </div>
  {:else}
    <input on:input={onChange} {...inputProps} />
  {/if}
</div>
