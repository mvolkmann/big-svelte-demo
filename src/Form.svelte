<script>
  import FormControl from './FormControl.svelte';

  export let cancel; // a function
  export let fields; // array of objects
  export let item; // object
  export let save; // a function

  $: haveAllRequired = fields.every(
    field => !field.required || Boolean(item[field.propertyName])
  );

  function onCancel(event) {
    event.preventDefault();
    cancel();
  }

  function onSave(event) {
    event.preventDefault();
    save(item);
  }

  const setItem = newItem => (item = newItem);
</script>

<style>
  button {
    border: solid lightgray 1px;
    border-radius: 4px;
    font-size: 18px;
    margin-right: 5px;
    padding: 4px;
  }

  button:disabled {
    opacity: 0.3;
  }

  .buttons {
    margin-top: 10px;
    text-align: center;
  }

  form {
    display: inline-block;
  }

  label {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-right: 10px;
    text-align: right;
    width: 100px;
  }
</style>

<form>
  {#each fields as field, index (field.propertyName)}
    <div class="row">
      <label>{field.label}</label>
      <FormControl {field} {item} {setItem} />
    </div>
  {/each}
  <div class="buttons">
    <button disabled={!haveAllRequired} on:click={onSave}>
      {item ? 'Save' : 'Add'}
    </button>
    <button on:click={onCancel}>Cancel</button>
  </div>
</form>
