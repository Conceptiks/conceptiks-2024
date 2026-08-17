<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Container from "$lib/components/Container.svelte";

  $: status = $page.status;
  $: message =
    status === 404
      ? "Diese Seite gibt es nicht (mehr)."
      : "Hier ist etwas schiefgelaufen.";
</script>

<svelte:head>
  <title>{status} | Maxim Tan</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<Container>
  <div
    class="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center"
  >
    <p class="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
      Fehler {status}
    </p>
    <h1 class="mt-4 text-ink">{message}</h1>
    <p class="mt-6 max-w-md text-lg">
      Vielleicht hilft dir einer dieser Wege weiter – oder schreib mir kurz,
      wonach du gesucht hast.
    </p>
    <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
      <Button href="/">Zur Startseite</Button>
      <Button href="/projekte" style="outline">Projekte ansehen</Button>
      <Button href="/kontakt" style="ghost">Kontakt</Button>
    </div>
  </div>
</Container>
