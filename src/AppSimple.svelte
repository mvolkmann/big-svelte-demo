<script>
  import { onMount } from 'svelte';

  import LabeledCheckbox from './LabeledCheckbox.svelte';
  import LabeledCheckboxes from './LabeledCheckboxes.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledRadioButtons from './LabeledRadioButtons.svelte';
  import LabeledSelect from './LabeledSelect.svelte';
  import LabeledTextArea from './LabeledTextArea.svelte';
  import LanguageSelect from './LanguageSelect.svelte';

  let colorList = [];
  let flavorList = [];
  let seasonList = [];

  colorList = [
    { label: 'red' },
    { label: 'orange' },
    { label: 'yellow' },
    { label: 'green' },
    { label: 'blue' },
    { label: 'purple' }
  ];

  flavorList = [
    { label: 'Vanilla' },
    { label: 'Chocolate' },
    { label: 'Strawberry' }
  ];

  seasonList = [
    { label: 'Spring' },
    { label: 'Summer' },
    { label: 'Fall' },
    { label: 'Winter' }
  ];

  let favoriteColor = '';
  let favoriteFlavors = [];
  let favoriteSeason = '';
  let happy = true;
  let name = '';
  let story = '';
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>

<form class="container" on:submit|preventDefault>
  <LabeledInput label="Name" bind:value={name} />

  <LabeledCheckbox label="Happy?" bind:checked={happy} />

  <LabeledCheckboxes
    label="Favorite Flavors"
    list={flavorList}
    bind:selected={favoriteFlavors} />

  <LabeledRadioButtons
    label="Favorite Season"
    list={seasonList}
    bind:value={favoriteSeason} />

  <LabeledSelect
    label="Favorite Color"
    list={colorList}
    bind:value={favoriteColor} />

  <LabeledTextArea label="Life Story" bind:value={story} />

  {#if name}
    <div>
      {name} likes {favoriteColor}, {favoriteSeason}, and is {happy ? 'happy' : 'unhappy'}.
    </div>
    <div>{name}'s favorite flavors are {favoriteFlavors.join(' and ')}.</div>
    <div>Story: {story}</div>
  {/if}
</form>
