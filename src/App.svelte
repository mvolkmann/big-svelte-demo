<script>
  import {onMount} from 'svelte';
  import {i18n} from 'web-translate';

  import Dialog from './Dialog.svelte';
  import LabeledCheckbox from './LabeledCheckbox.svelte';
  import LabeledCheckboxes from './LabeledCheckboxes.svelte';
  import LabeledChildren from './LabeledChildren.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledRadioButtons from './LabeledRadioButtons.svelte';
  import LabeledSelect from './LabeledSelect.svelte';
  import LabeledTextArea from './LabeledTextArea.svelte';
  import LanguageSelect from './LanguageSelect.svelte';
  import Spinner from './Spinner.svelte';
  import {taskEnd, taskStart} from './spinner';
  import {languageStore} from './stores';

  function trans(languageCode, key) {
    console.log('App trans: languageCode =', languageCode);
    const value = i18n(key);
    console.log('App trans: value =', value);
    return value;
  }

  const colorList = [
    {label: i18n('red')},
    {label: i18n('orange')},
    {label: i18n('yellow')},
    {label: i18n('green')},
    {label: i18n('blue')},
    {label: i18n('purple')}
  ];

  const flavorList = [
    {label: i18n('Vanilla')},
    {label: i18n('Chocolate')},
    {label: i18n('Strawberry')}
  ];

  const seasonList = [
    {label: i18n('Spring')},
    {label: i18n('Summer')},
    {label: i18n('Fall')},
    {label: i18n('Winter')}
  ];

  let favoriteColor = '';
  let favoriteFlavors = [];
  let favoriteSeason = '';
  let happy = true;
  let name = '';
  let openDialog = false;
  let story = '';

  onMount(() => {
    // This demonstrates use of Spinner.
    taskStart();
    setTimeout(taskEnd, 2000);
  });

  function toggleDialog() {
    openDialog = !openDialog;
  }
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

<div class="container">
  <!--Spinner /-->

  <LanguageSelect />

  <LabeledChildren label="languageCode">{$languageStore}</LabeledChildren>

  <LabeledInput label={trans($languageStore, 'Name')} bind:value={name} />

  <LabeledCheckbox label={i18n('Happy?')} bind:checked={happy} />

  <LabeledCheckboxes
    label={i18n('Favorite Flavors')}
    list={flavorList}
    bind:selected={favoriteFlavors} />

  <LabeledRadioButtons
    className="lrb"
    label={i18n('Favorite Season')}
    list={seasonList}
    bind:value={favoriteSeason} />

  <LabeledSelect
    label={i18n('Favorite Color')}
    list={colorList}
    bind:value={favoriteColor} />

  <LabeledTextArea label={i18n('Life Story')} bind:value={story} />

  {#if name}
    <div>
      {name} likes {favoriteColor}, {favoriteSeason}, and is {happy ? 'happy' : 'unhappy'}.
    </div>
    <div>{name}'s favorite flavors are {favoriteFlavors.join(' and ')}.</div>
    <div>Story: {story}</div>
  {/if}

  <button on:click={toggleDialog}>Toggle Dialog</button>

  <Dialog title="Test Dialog" open={openDialog}>
    <div>Can you see this?</div>
  </Dialog>
</div>
