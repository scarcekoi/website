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
    x = e.clientX + window.scrollX;
    y = e.clientY + window.scrollY;
    openMenuId.set(id);
  };
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && openMenuId.set(null)} />

<div class="wrapper" onclick={onContextMenu}>
  {@render children()}
</div>

{#if visible}
  <div class="context-menu" style={`left: ${x}px; top: ${y}px`}>
    <div class="menu-title">{name}</div>
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
    min-width: 240px;
    padding: 0.5rem;
    border-radius: var(--border-radius-normal);
    background: var(--base);
    border: 1px solid var(--surface0);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .menu-title {
    text-transform: capitalize;
    font-weight: bold;
    padding: 0.25rem 0.5rem 0.5rem;
    color: var(--text);
    border-bottom: 1px solid var(--surface0);
    margin-bottom: 0.25rem;
    font-family: monospace;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
  }

  .menu-label {
    color: var(--subtext0);
    min-width: 3.5rem;
    display: inline-block;
  }

  .menu-value {
    color: inherit;
  }
</style>
