<script>
  import Crud from './Crud.svelte';

  let lastId = 0;
  const dogs = {};

  const formFields = [
    {
      label: 'Breed',
      placeholder: 'breed',
      propertyName: 'breed',
      required: true,
      type: 'string'
    },
    {
      label: 'Name',
      placeholder: 'name',
      propertyName: 'name',
      required: true,
      type: 'string'
    }
  ];

  // Sort by name, then breed.
  function compareItems(dog1, dog2) {
    return dog1.name === dog2.name
      ? dog1.breed.localeCompare(dog2.breed)
      : dog1.name.localeCompare(dog2.name);
  }

  function createItem(dog) {
    console.log('Dogs.svelte createItem: dog =', dog);
    dog.id = ++lastId;
    dogs[dog.id] = dog;
  }

  function deleteItems(ids) {
    for (const id of ids) {
      delete dogs[id];
    }
  }

  function itemToString(dog) {
    console.log('Dogs.svelte itemToString: dog =', dog);
    return dog.name + ' is a ' + dog.breed;
  }

  function retrieveItems() {
    return dogs;
  }

  function updateItem(dog) {
    dogs[dog.id] = dog;
  }
</script>

<style>

</style>

<div class="container">
  <Crud
    {compareItems}
    {createItem}
    {deleteItems}
    {formFields}
    {itemToString}
    {retrieveItems}
    {updateItem} />
</div>
