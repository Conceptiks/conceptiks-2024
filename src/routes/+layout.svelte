<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "../styles/app.css";
  import "iconify-icon";
  import Container from "$lib/components/Container.svelte";
  import Wordmark from "$lib/components/Wordmark.svelte";

  const navigation = [
    { href: "/", label: "Home" },
    { href: "/projekte", label: "Projekte" },
    { href: "/ueber", label: "Über mich" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const services = [
    { href: "/leistungen#development", label: "Webentwicklung" },
    { href: "/leistungen#ui-ux", label: "User-Experience & Interface Design" },
    { href: "/leistungen#branding", label: "Branding & Corporate Design" },
  ];

  const year = new Date().getFullYear();
</script>

<div class="flex min-h-screen flex-col">
  <Nav />

  <main class="flex-1">
    <slot />
  </main>

  <!--
    Light footer: built on surface tokens rather than fixed white, so it stays
    light in the light theme and follows the page into dark mode.
  -->
  <footer class="mt-32 border-t border-line bg-surface-2">
    <Container>
      <div class="grid grid-cols-1 gap-12 pt-20 sm:grid-cols-2 md:grid-cols-4">
        <div class="md:col-span-2">
          <Wordmark asLink="{false}" />
          <address class="mt-5 space-y-1 not-italic">
            <p>Am Heidenhübel 6</p>
            <p>66424 Homburg</p>
          </address>
          <a
            href="mailto:hallo@maximtan.de"
            class="underline-grow mt-5 inline-block font-medium text-ink transition-colors hover:text-primary"
          >
            hallo@maximtan.de
          </a>
        </div>

        <nav aria-label="Footer-Navigation">
          <h2 class="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Navigation
          </h2>
          <ul class="mt-5 space-y-3">
            {#each navigation as { href, label }}
              <li>
                <a
                  {href}
                  class="text-ink-muted transition-colors hover:text-ink"
                >
                  {label}
                </a>
              </li>
            {/each}
          </ul>
        </nav>

        <nav aria-label="Leistungen">
          <h2 class="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
            Leistungen
          </h2>
          <ul class="mt-5 space-y-3">
            {#each services as { href, label }}
              <li>
                <a
                  {href}
                  class="text-ink-muted transition-colors hover:text-ink"
                >
                  {label}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>

      <hr class="mt-16 border-line" />

      <div
        class="flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="!text-ink-subtle">© {year} Maxim Tan</p>
        <ul class="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a
              href="/impressum"
              class="text-ink-subtle transition-colors hover:text-ink"
            >
              Impressum
            </a>
          </li>
          <li>
            <a
              href="/datenschutz"
              class="text-ink-subtle transition-colors hover:text-ink"
            >
              Datenschutz
            </a>
          </li>
        </ul>
      </div>
    </Container>
  </footer>
</div>
