<script>
  import Header from "./header.svelte";

  let inputField;
  let newFieldValue = "";
  var url;
  const seachArtis = (artist) => {
    url = `http://localhost:8888/${artist}`;
  };

  const onInput = (event) => {
    if (event.key !== "Enter") return;
    seachArtis(inputField.value);
    inputField.value = "";
  };

  const handleSubmit = (event) => {
    seachArtis(inputField.value);
    inputField.value = "";
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="search">Search Artist:</label>
  <input
    type="search"
    id="search"
    required
    bind:this={inputField}
    on:keydown={onInput}
    bind:value={newFieldValue}
  />
  <button type="submit">Search</button>

  {#if url}
  <Header  {url} let:data>
		<h1>lista de artistas</h1>
		<ul>
			{#each data as artist}
			  <li>
          <a href={`http://localhost:8888/recomend/${artist.id}`} target="_blank">{artist.name}</a>
          
        </li>
			{/each}
		  </ul>
	</Header>
  {/if}
  <!-- svelte-ignore a11y-missing-attribute -->
</form>
