<script lang="ts">
  interface Props {
    colorName: string;
    flavors: {
      latte: string;
      frappe: string;
      macchiato: string;
      mocha: string;
    };
  }

  let { colorName, flavors }: Props = $props();

  let copiedFlavor = $state<string | null>(null);
  let toastState = $state<"hidden" | "success" | "failed">("hidden");
  let toastTimer: ReturnType<typeof setTimeout>;

  const copyHex = async (flavor: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      copiedFlavor = flavor;
      toastState = "success";
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        copiedFlavor = null;
        toastState = "hidden";
      }, 1500);
    } catch {
      toastState = "failed";
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastState = "hidden";
      }, 1500);
    }
  };

  const flavorOrder = ["latte", "frappe", "macchiato", "mocha"] as const;
</script>

<div class="color-row">
  <div class="color-info">
    <div class="color-swatch-wrapper">
      <div 
        class="color-swatch" 
        style="--latte: {flavors.latte}; --frappe: {flavors.frappe}; --macchiato: {flavors.macchiato}; --mocha: {flavors.mocha};"
      ></div>
    </div>
    <span class="color-name">{colorName}</span>
  </div>
  
  {#each flavorOrder as flavor}
    <button 
      class="flavor-hex" 
      class:copied={copiedFlavor === flavor}
      onclick={() => copyHex(flavor, flavors[flavor])}
      title="Click to copy {flavors[flavor]}"
      data-flavor={flavor}
    >
      <span class="hex-preview" style="background-color: {flavors[flavor]}"></span>
      <span class="hex-value">{flavors[flavor]}</span>
      {#if copiedFlavor === flavor}
        <span class="copied-indicator">Copied!</span>
      {/if}
    </button>
  {/each}
</div>

<style lang="scss">
  .color-row {
    display: grid;
    grid-template-columns: 1fr repeat(4, 1fr);
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--surface0);
    transition: background-color 0.15s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: color-mix(in srgb, var(--surface0), transparent 50%);
    }
  }

  .color-info {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .color-swatch-wrapper {
    flex-shrink: 0;
  }

  .color-swatch {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: linear-gradient(
      135deg,
      var(--latte) 0%,
      var(--latte) 25%,
      var(--frappe) 25%,
      var(--frappe) 50%,
      var(--macchiato) 50%,
      var(--macchiato) 75%,
      var(--mocha) 75%,
      var(--mocha) 100%
    );
    border: 1px solid var(--surface1);
  }

  .color-name {
    font-family: monospace;
    font-size: 1.4rem;
    color: var(--text);
    text-transform: capitalize;
  }

  .flavor-hex {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    background: transparent;
    border: none;
    border-radius: var(--border-radius-normal);
    cursor: pointer;
    font-family: monospace;
    font-size: 1.3rem;
    color: var(--subtext1);
    transition: all 0.15s ease;

    &:hover {
      background: var(--surface0);
      color: var(--text);

      .hex-value {
        opacity: 1;
      }
    }

    &.copied {
      background: var(--green);
      color: var(--base);

      .hex-value {
        opacity: 0;
      }

      .hex-preview {
        opacity: 0;
      }
    }
  }

  .hex-preview {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
    border: 1px solid var(--surface1);
    transition: opacity 0.15s ease;
  }

  .hex-value {
    opacity: 0.8;
    transition: opacity 0.15s ease;
    text-transform: uppercase;
  }

  .copied-indicator {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    .color-row {
      grid-template-columns: 1fr repeat(4, minmax(60px, 1fr));
      padding: var(--space-xs) var(--space-sm);
    }

    .color-swatch {
      width: 20px;
      height: 20px;
    }

    .color-name {
      font-size: 1.2rem;
    }

    .flavor-hex {
      padding: var(--space-xxs);
      font-size: 1.1rem;
    }

    .hex-preview {
      display: none;
    }

    .hex-value {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .color-row {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: var(--space-sm);
    }

    .color-info {
      margin-bottom: var(--space-xs);
    }

    .flavor-hex {
      justify-content: flex-start;
      padding: var(--space-xs) var(--space-sm);
      background: var(--surface0);

      &::before {
        content: attr(data-flavor);
        font-size: 1rem;
        color: var(--subtext0);
        min-width: 70px;
        text-transform: capitalize;
      }
    }

    .hex-preview {
      display: block;
    }
  }
</style>
