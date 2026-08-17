<script lang="ts">
  import Icon from "../Icon.svelte";
  import InputError from "./InputError.svelte";
  import { enhance } from "$app/forms";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";

  type FieldName =
    | "name"
    | "email"
    | "companyName"
    | "phone"
    | "message"
    | "privacy"
    | "captchaToken";

  let values = {
    name: "",
    email: "",
    companyName: "",
    phone: "",
    message: "",
    privacy: false,
  };

  let captchaToken: string | null = null;
  let errors: Partial<Record<FieldName, string>> = {};
  let formError: string | null = null;
  let loading = false;
  let finished = false;

  $: valid =
    values.name.trim() &&
    values.email.trim() &&
    values.message.trim() &&
    values.privacy;

  const handleFailure = (data: any, status: number) => {
    // The captcha token is single-use — a rejected submission needs a fresh one.
    if (status === 406 || status === 500) {
      captchaToken = null;
      if (browser && window.turnstile) {
        window.turnstile.reset("#captchaWidget");
      }
    }

    if (!data?.errors?.length) {
      formError =
        "Deine Nachricht konnte nicht gesendet werden. Bitte versuch es noch einmal.";
      return;
    }

    const issues: { path: string[]; message: string }[] = data.errors;

    // Delivery failures come back under a "form" path — those belong at the top
    // of the form rather than next to a field.
    formError =
      issues.find((issue) => issue.path[0] === "form")?.message ?? null;

    errors = Object.fromEntries(
      issues
        .filter((issue) => issue.path[0] !== "form")
        .map((issue) => [issue.path[0], issue.message])
    );
  };

  let captchaWidget: HTMLDivElement;
  let captchaRendered = false;

  const renderCaptcha = () => {
    if (captchaRendered || !window.turnstile) return;
    captchaRendered = true;
    window.turnstile.render("#captchaWidget", {
      sitekey: PUBLIC_TURNSTILE_SITE_KEY,
      callback: (token: string) => (captchaToken = token),
    });
  };

  onMount(() => {
    // The form can start collapsed (mobile hero), and Turnstile renders badly
    // into a display:none container — so wait until the widget is on screen.
    // offsetParent is null while any ancestor is display:none.
    const visible = () => !!captchaWidget?.offsetParent;

    // The Turnstile script loads async; poll briefly until its API is there.
    let tries = 0;
    const interval = setInterval(() => {
      if (window.turnstile && visible()) {
        clearInterval(interval);
        renderCaptcha();
      } else if (++tries >= 50) {
        clearInterval(interval);
      }
    }, 100);

    // Covers the case where the form is revealed after that window closes.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) renderCaptcha();
      },
      { rootMargin: "200px" }
    );
    if (captchaWidget) observer.observe(captchaWidget);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  });

  onDestroy(() => {
    if (browser && window.turnstile) {
      window.turnstile.remove();
    }
  });

  const field =
    "mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-subtle " +
    "transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
</script>

<svelte:head>
  <script
    src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    async
  ></script>
</svelte:head>

<div
  class="overflow-hidden rounded-2xl border border-line bg-surface shadow-panel"
>
  {#if finished}
    <div
      class="flex flex-col items-center justify-center px-8 py-20 text-center"
    >
      <Icon iconClass="carbon:email" color="#EB4511" customSize="64px" />
      <h2 class="mt-6 text-2xl font-semibold text-ink">
        Vielen Dank für deine Nachricht!
      </h2>
      <p class="mt-3 text-lg">Ich melde mich in Kürze bei dir.</p>
    </div>
  {:else}
    <form
      action="/"
      method="POST"
      use:enhance="{() => {
        loading = true;
        formError = null;
        errors = {};

        return async ({ result, update }) => {
          loading = false;

          if (result.type === 'success') {
            finished = true;
            await update({ reset: true });
            return;
          }

          if (result.type === 'failure') {
            handleFailure(result.data, result.status);
            return;
          }

          await update();
        };
      }}"
      class="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2"
    >
      <div class="sm:col-span-2">
        <h2 class="text-2xl font-semibold text-ink">Schreib mir</h2>
        <p class="mt-1">
          Erzähl mir kurz, worum es geht — ich melde mich zeitnah zurück.
        </p>
      </div>

      {#if formError}
        <div class="sm:col-span-2">
          <InputError>{formError}</InputError>
        </div>
      {/if}

      <label class="block">
        <span class="flex justify-between font-semibold text-ink">
          Name
          <span class="text-sm font-normal text-ink-subtle">Pflichtangabe</span>
        </span>
        <input
          name="name"
          bind:value="{values.name}"
          class="{field}"
          placeholder="Max Mustermann"
          autocomplete="name"
          required
        />
        {#if errors.name}
          <div class="mt-2"><InputError>{errors.name}</InputError></div>
        {/if}
      </label>

      <label class="block">
        <span class="flex justify-between font-semibold text-ink">
          E-Mail
          <span class="text-sm font-normal text-ink-subtle">Pflichtangabe</span>
        </span>
        <input
          type="email"
          name="email"
          bind:value="{values.email}"
          class="{field}"
          placeholder="mail@adresse.de"
          autocomplete="email"
          required
        />
        {#if errors.email}
          <div class="mt-2"><InputError>{errors.email}</InputError></div>
        {/if}
      </label>

      <label class="block">
        <span class="font-semibold text-ink">
          Unternehmen
          <span class="ml-1 text-sm font-normal text-ink-subtle">optional</span>
        </span>
        <input
          name="companyName"
          bind:value="{values.companyName}"
          class="{field}"
          placeholder="Musterfirma"
          autocomplete="organization"
        />
      </label>

      <label class="block">
        <span class="font-semibold text-ink">
          Telefon
          <span class="ml-1 text-sm font-normal text-ink-subtle">optional</span>
        </span>
        <input
          type="tel"
          name="phone"
          bind:value="{values.phone}"
          class="{field}"
          placeholder="+49 176 12345678"
          autocomplete="tel"
        />
      </label>

      <label class="block sm:col-span-2">
        <span class="flex justify-between font-semibold text-ink">
          Nachricht
          <span class="text-sm font-normal text-ink-subtle">Pflichtangabe</span>
        </span>
        <textarea
          name="message"
          bind:value="{values.message}"
          class="{field} h-40 resize-y"
          placeholder="Worum geht es? Je konkreter, desto besser kann ich dir antworten."
          required
        ></textarea>
        {#if errors.message}
          <div class="mt-2"><InputError>{errors.message}</InputError></div>
        {/if}
      </label>

      <div class="rounded-xl border border-line bg-surface-2 p-4 sm:col-span-2">
        <label class="flex items-start gap-2">
          <input
            type="checkbox"
            name="privacy"
            bind:checked="{values.privacy}"
            required
            class="mt-1 rounded border-line-strong bg-surface text-primary focus:ring-primary/30"
          />
          <span class="text-ink-muted">
            Ich habe die
            <a
              href="/datenschutz"
              class="text-primary underline-offset-2 hover:underline"
              target="_blank">Datenschutzerklärung</a
            >
            gelesen und erkläre mich mit der dort genannten Speicherung und Verarbeitung
            meiner Daten einverstanden.
          </span>
        </label>
        {#if errors.privacy}
          <div class="mt-2"><InputError>{errors.privacy}</InputError></div>
        {/if}
      </div>

      <div class="sm:col-span-2">
        <div id="captchaWidget" bind:this="{captchaWidget}"></div>
        <input type="hidden" name="captchaToken" value="{captchaToken ?? ''}" />
        {#if errors.captchaToken}
          <div class="mt-2"><InputError>{errors.captchaToken}</InputError></div>
        {/if}
      </div>

      <div class="sm:col-span-2">
        <button type="submit" disabled="{!valid || loading}">
          {#if loading}
            Wird gesendet…
            <Icon
              iconClass="carbon:circle-dash"
              color="currentColor"
              class="animate-spin"
            />
          {:else}
            Nachricht senden
            <Icon iconClass="carbon:arrow-right" color="currentColor" />
          {/if}
        </button>
      </div>
    </form>
  {/if}
</div>

<style lang="postcss">
  button {
    @apply flex w-full items-center justify-center gap-x-2;
    @apply rounded-xl bg-primary px-8 py-4 font-semibold text-white;
    @apply transition-colors duration-200 ease-out hover:bg-primary-600 active:bg-primary-700;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface;

    &:disabled {
      @apply cursor-not-allowed bg-surface-3 text-ink-subtle;
    }
  }
</style>
