<script>
  import {onMount} from 'svelte';
  import {getSupportedLanguages, setLanguage} from 'web-translate';

  export let disabled = false;
  export let onChange = () => {};

  let languageCode;
  let languages = {};
  let languageNames = [];

  onMount(async () => {
    languages = await getSupportedLanguages();
    languageNames = Object.keys(languages);
    const lc = sessionStorage.getItem('language-code');
    console.log('LanguageSelect onMount: lc =', lc);
    languageCode = lc || 'en';
    setLanguage(languageCode);
  });

  async function changeLanguage(code) {
    console.log('LanguageSelect changeLanguage: code =', code);
    console.log('LanguageSelect changeLanguage: languageCode =', languageCode);
    if (code !== languageCode) {
      sessionStorage.setItem('language-code', code);
      window.location.reload();
    }
  }

  function handleChange(event) {
    changeLanguage(event.target.value);
    if (onChange) onChange(event);
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  select {
    background-color: white;
    /* Chrome doesn't honor border-radius on select elements. */
    border-radius: 4;
    font-size: 14px;
    height: 24px;
  }
</style>

{#if languageNames.length > 0}
  <div class="container">
    <select {disabled} on:change={handleChange} value={languageCode}>
      {#each languageNames as name}
        <option value={languages[name]}>{name}</option>
      {/each}
    </select>
  </div>
{/if}
