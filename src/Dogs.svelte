<script>
  import Crud from './Crud.svelte';
  import {deleteResource, getJson, postJson, putJson} from './fetch-util';
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

  async function createItem(dog) {
    dog.id = ++lastId;
    try {
      await postJson('', dog);
    } catch (e) {
      handleError('Dogs createItem', e);
    }
  }

  async function deleteItems(ids) {
    try {
      const promises = ids.map(id => deleteResource(id));
      await Promise.all(promises);
    } catch (e) {
      handleError('Dogs deleteItem', e);
    }
  }

  const itemToString = dog =>
    dog.name + ' is a ' + dog.size + ' ' + dog.breed;

  async function retrieveItems() {
    try {
      return await getJson('');
    } catch (e) {
      handleError('Dogs retrieveItems', e);
    }
  }

  async function updateItem(dog) {
    try {
      await putJson(dog.id, dog);
    } catch (e) {
      handleError('Dogs updateItem', e);
    }
  }
</script>

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
