<script>
  /*
  The `formFields` prop is an array of objects with the following properties:
  * className: optional CSS classname string
  * label: required string
  * placeholder: option string
  * propertyName: required string
  * required: optional boolean
  * type: required string (checkbox, radio, range, text)
  */

  import Form from './Form.svelte';

  export let compareItems; // function passed two item object
  export let createItem; // function passed an item object
  export let deleteItems; // function passed an array of ids
  export let formFields; // array of objects
  export let itemToString; // function passed an item object
  export let retrieveItems; // function
  export let updateItem; // function passed an item object

  let mode = 'retrieve'; // other values are 'create' and 'update'
  let selectedItems = [];
  let itemMap = {};

  getItems();

  $: items = Object.values(itemMap).sort(compareItems);
  $: isUpdate = mode === 'update';
  $: item = isUpdate ? selectedItems[0] || {} : {};

  const cancel = () => (mode = 'retrieve');

  async function deleteSelected() {
    const ids = selectedItems.map(item => item.id);
    await deleteItems(ids);
    for (const id of ids) {
      delete itemMap[id];
    }
    itemMap = itemMap;
    selectedItems = [];
  }

  async function getItems() {
    itemMap = await retrieveItems();
  }

  function onSelect(event) {
    const { selectedOptions } = event.target;
    const newSelectedItems = Array.from(selectedOptions).map(
      option => itemMap[option.value]
    );
    selectedItems = newSelectedItems;
  }

  async function save(item) {
    const fn = isUpdate ? updateItem : createItem;
    await fn(item);
    selectedItems = [];
    itemMap = await retrieveItems();
    mode = 'retrieve';
  }
</script>

<style>
  button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    margin-right: 10px;
    padding: 0;
  }

  button:disabled {
    opacity: 0.4;
  }
</style>

<div class="crud">
  {#if mode === 'retrieve'}
    {#if items.length}
    <select multiple on:change={onSelect}>
      {#each items as item (item.id)}
        <option key={item.id} value={item.id}>
          {itemToString(item)}
        </option>
        <div>no dogs</div>
      {/each}
    </select>
    {/if}
    <div class="buttons">
      {#if createItem}
        <button on:click={() => (mode = 'create')}>
          <span aria-label="plus" role="img">&#x2795;</span>
        </button>
      {/if}
      {#if updateItem}
        <button
          disabled={selectedItems.length === 0}
          on:click={() => (mode = 'update')}>
          <span aria-label="pencil" role="img">&#x270E;</span>
        </button>
      {/if}
      {#if deleteItems}
        <button disabled={selectedItems.length === 0} on:click={deleteSelected}>
          <span aria-label="trashcan" role="img">&#x1f5d1;</span>
        </button>
      {/if}
    </div>
  {:else}
    <Form fields={formFields} {item} {cancel} {save} />
  {/if}
</div>
