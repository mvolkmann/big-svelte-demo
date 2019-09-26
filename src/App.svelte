<script>
  import { onMount } from 'svelte';

  import Dialog from './Dialog.svelte';
  import Dogs from './Dogs.svelte';
  import LabeledCheckbox from './LabeledCheckbox.svelte';
  import LabeledCheckboxes from './LabeledCheckboxes.svelte';
  import LabeledChildren from './LabeledChildren.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledRadioButtons from './LabeledRadioButtons.svelte';
  import LabeledSelect from './LabeledSelect.svelte';
  import LabeledTextArea from './LabeledTextArea.svelte';
  import LanguageSelect from './LanguageSelect.svelte';
  import Spinner from './Spinner.svelte';
  import { taskEnd, taskStart } from './spinner';
  import { i18n } from './stores';

  let colorList = [];
  let flavorList = [];
  let seasonList = [];

  $: {
    colorList = [
      { label: $i18n('red') },
      { label: $i18n('orange') },
      { label: $i18n('yellow') },
      { label: $i18n('green') },
      { label: $i18n('blue') },
      { label: $i18n('purple') }
    ];

    flavorList = [
      { label: $i18n('Vanilla') },
      { label: $i18n('Chocolate') },
      { label: $i18n('Strawberry') }
    ];

    seasonList = [
      { label: $i18n('Spring') },
      { label: $i18n('Summer') },
      { label: $i18n('Fall') },
      { label: $i18n('Winter') }
    ];
  }

  let favoriteColor = '';
  let favoriteFlavors = [];
  let favoriteSeason = '';
  let happy = true;
  let name = '';
  let showDialog = false;
  let story = '';

  onMount(() => {
    // This demonstrates use of Spinner.
    taskStart();
    setTimeout(taskEnd, 2000);
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  /*
  :global(.lrb) {
    outline: solid red 1px;
  }
  */
</style>

<form class="container" on:submit|preventDefault>
  <!--Spinner /-->

  <LanguageSelect />

  <h2>Dogs</h2>
  <Dogs />

  <!-- <LabeledChildren label="languageCode">{$languageStore}</LabeledChildren> -->

  <LabeledInput label={$i18n('Name')} bind:value={name} />

  <LabeledCheckbox label={$i18n('Happy?')} bind:checked={happy} />

  <LabeledCheckboxes
    label={$i18n('Favorite Flavors')}
    list={flavorList}
    bind:selected={favoriteFlavors} />

  <LabeledRadioButtons
    className="lrb"
    label={$i18n('Favorite Season')}
    list={seasonList}
    bind:value={favoriteSeason} />

  <LabeledSelect
    label={$i18n('Favorite Color')}
    list={colorList}
    bind:value={favoriteColor} />

  <LabeledTextArea label={$i18n('Life Story')} bind:value={story} />

  {#if name}
    <div>
      {name} likes {favoriteColor}, {favoriteSeason}, and is {happy ? 'happy' : 'unhappy'}.
    </div>
    <div>{name}'s favorite flavors are {favoriteFlavors.join(' and ')}.</div>
    <div>Story: {story}</div>
  {/if}

  <div>
    <button on:click={() => (showDialog = true)}>Toggle Dialog</button>
  </div>

  <Dialog title="Test Dialog" bind:open={showDialog}>
    <div>This is my dialog content.</div>
  </Dialog>
</form>
