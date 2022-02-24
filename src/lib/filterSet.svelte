<script>
import { theme } from "$lib/stores/theme.js";

/*
 *  Renders out a group of filters
 */

// filter name
export let name = "";

// optional search bar to search the filter options
export let searchBar = false;

// filter options
export let options = [];

// selected filter options
export let selected = [];

// function to call when user toggles an option
export let toggleOption = () => {};

// maintains a local filtered-down copy of the options used with searchBar
let filteredOptions = options;
let filteredOptionText = "";
const handleInput = () => {
	if (filteredOptionText === "") {
		filteredOptions = options;
	} else {
		// only options that start with user-entered text, case insensitive
		const regex = new RegExp(`^${filteredOptionText}`, 'i');
		filteredOptions = options.filter(opt => regex.test(opt));
	}
}
</script>

<div class="name-and-search-bar">
	<h4 class="filter-name">
		<i class="fas fa-circle"></i>
		{name}
	</h4>
	{#if searchBar}
		<input
		  class={$theme}
		  placeholder="Search..."
		  bind:value={filteredOptionText}
		  on:input={handleInput}
		/>
	{/if}
</div>
<div class={`filter-set ${name}`}>
	{#each filteredOptions as option}
		<span
		  class={`${$theme} filter-set-tag${selected.includes(option) ? " selected" : ""}`}
		  on:click={() => toggleOption({ name, option })}>
			{option}
		</span>
	{/each}
</div>

<style>
	.name-and-search-bar {
    display: flex;
		padding-top: 15px;
	}
	h4.filter-name {
    text-transform: capitalize;
		font-weight: bold;
		margin: 0;
		padding-right: 12px;
		display: flex;
		align-items: center;
	}
	h4.filter-name .fa-circle {
		font-size: 8px;
    padding-right: 12px;
	}
	input {
    height: fit-content;
		padding: 5px;
		border-radius: 4px;
	}
  .filter-set {
    display: flex;
		flex-wrap: wrap;
		max-height: 200px;
		overflow: scroll;
	}
	.filter-set-tag {
	  padding: 5px 10px;
		margin: 10px;
		cursor: pointer;
		border-radius: 4px;
		user-select: none;
	}
	.filter-set-tag.selected {
    background-color: var(--selected-item);
	}

	input.dark {
		color: var(--text-md-gray-dk);
		border: 1px solid var(--text-gray-dk);
		background-color: var(--background-md-gray-dk);
	}
	input.dark::placeholder {
		color: var(--text-md-gray-dk);
	}
	.filter-set-tag.selected.dark {
		color: var(--background-gray-dk);
	}
</style>
