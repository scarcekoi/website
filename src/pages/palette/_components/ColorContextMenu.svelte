<script module lang="ts">
  import { writable } from "svelte/store";
  const openMenuId = writable<string | null>(null);

  if (typeof window !== "undefined") {
    window.addEventListener("click", () => openMenuId.set(null));
  }
</script>

<script lang="ts">
  import { type Snippet } from "svelte";
  import CopyToClipboardIcon from "./CopyToClipboardButton.svelte";

  let { name, hex, rgb, hsl, oklch, children }: {
    name: string;
    hex: string;
    rgb: string;
    hsl: string;
    oklch: string;
    children: Snippet;
  } = $props();

  const id = hex;
  let visible = $derived($openMenuId === id);
  let x = $state(0);
  let y = $state(0);

  const onContextMenu = (e: MouseEvent) => {
    e.stopPropagation();
    const menuWidth = 240;
    const menuHeight = 160;
    const cx = e.clientX + window.scrollX;
    const cy = e.clientY + window.scrollY;

    x = e.clientX + menuWidth > window.innerWidth ? Math.max(0, cx - menuWidth) : cx;
    y = e.clientY + menuHeight > window.innerHeight ? cy - menuHeight : cy;

    openMenuId.set(id);
  };
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && openMenuId.set(null)} />

<div class="wrapper" onclick={onContextMenu}>
  {@render children()}
</div>

{#if visible}
  <div class="context-menu" style={`left: ${x}px; top: ${y}px`} onclick={(e) => e.stopPropagation()}>
    <div class="menu-header">
      <div class="menu-title">{name}</div>
      <button class="close-btn" onclick={() => openMenuId.set(null)}>✕</button>
    </div>
    <div class="menu-items">
      {#each [["HEX", hex], ["RGB", rgb], ["HSL", hsl], ["OKLCH", oklch]] as [label, value]}
        <CopyToClipboardIcon value={value}>
          <span class="menu-label">{label}:</span>
          <span class="menu-value">{value}</span>
        </CopyToClipboardIcon>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .wrapper {
    display: contents;
  }

  .context-menu {
    position: absolute;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    max-width: calc(100vw - 1rem);
    min-width: 200px;
    padding: 0.5rem;
    border-radius: var(--border-radius-normal);
    background: var(--base);
    border: 1px solid var(--surface0);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    text-align: left;
  }

  .menu-title {
    text-transform: capitalize;
    font-weight: bold;
    padding: 0.25rem 0.5rem 0.5rem;
    color: var(--text);
    font-family: monospace;
  }

  .menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--surface0);
    margin-bottom: 0.25rem;
  }

  .close-btn {
    background: none;
    border: none;
    border-radius: var(--border-radius-normal);
    color: var(--subtext0);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 2rem;
    line-height: 1;

    &:hover {
      color: var(--text);
      background: var(--surface0);
    }
  }

  .menu-items {
    display: flex;
    flex-direction: column;
  }

  .menu-items :global(button) {
    background: var(--base);
    text-align: left;

    &:hover {
      background: var(--surface0);
    }
  }

  .menu-label {
    color: var(--subtext0);
    min-width: 3.5rem;
    display: inline-block;
  }

  .menu-items :global(button.success .menu-label) {
    color: var(--green);
  }

  .menu-items :global(button.failed .menu-label) {
    color: var(--red);
  }

    .menu-items :global(button.success) {
      background: var(--surface0);
    }

    .menu-items :global(button.failed) {
      background: var(--surface0);
    }

  .menu-value {
    color: inherit;
  }
</style>
