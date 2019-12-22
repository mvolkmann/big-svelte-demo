<script>
  import Crud from './Crud.svelte';
  //import { deleteResource, getJson, postJson, putJson } from './fetch-util';
  import {createDog, deleteDog, getDogs, updateDog} from './dogs';
  import {handleError} from './utilities';

  let lastId = 0;

  const formFields = [
    {
      autofocus: true,
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
    },
    {
      label: 'Size',
      propertyName: 'size',
      type: 'radio',
      options: ['Small', 'Medium', 'Large']
    }
  ];

  // Sort by name, then breed.
  function compareItems(dog1, dog2) {
    return dog1.name === dog2.name
      ? dog1.breed.localeCompare(dog2.breed)
      : dog1.name.localeCompare(dog2.name);
  }

  async function deleteDogs(ids) {
    console.log('Dogs.svelte deleteDogs: ids =', ids);
    try {
      const promises = ids.map(id => deleteDog(id));
      await Promise.all(promises);
    } catch (e) {
      handleError('Dogs deleteItem', e);
    }
  }

  const itemToString = dog => dog.name + ' is a ' + dog.size + ' ' + dog.breed;
</script>

<div class="container">
  <Crud
    {compareItems}
    createItem={createDog}
    deleteItems={deleteDogs}
    {formFields}
    {itemToString}
    retrieveItems={getDogs}
    updateItem={updateDog} />
</div>
