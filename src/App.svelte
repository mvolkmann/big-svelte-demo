<script>
  import {i18n} from 'web-translate';
  import LabeledChildren from './LabeledChildren.svelte';
  import LabeledInput from './LabeledInput.svelte';
  import LabeledRadioButtons from './LabeledRadioButtons.svelte';
  import LanguageSelect from './LanguageSelect.svelte';

  let languageCode = 'es';
  let name = 'World';
  //$: console.log('name =', name);

  const iceCreamRadioList = [
    {label: i18n('Vanilla')},
    {label: i18n('Chocolate')},
    {label: i18n('Strawberry')}
  ];
  let iceCreamFlavor = iceCreamRadioList[0].label;
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  :global(.lrb) {
    outline: solid red 1px;
  }
</style>

<div class="container">
  <!-- Calls to i18n are not executed again after languageCode changes!  How can you force that? -->
  <LanguageSelect bind:languageCode={languageCode} />

  <LabeledChildren label="languageCode">
    {languageCode}
  </LabeledChildren>

  <LabeledInput label={i18n('Name')} bind:value={name} />

  <LabeledRadioButtons
    className="lrb"
    label={i18n('Ice Cream Flavor')}
    list={iceCreamRadioList}
    bind:value={iceCreamFlavor} />

  <div>Hello {name}!</div>
  <div>I see you like {iceCreamFlavor} ice cream.</div>
</div>