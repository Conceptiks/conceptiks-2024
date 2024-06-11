<script context="module">
  export const consentStore = writable({});
</script>

<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let hasReloaded = false;

  interface MonitorChangeOptionProps {
    reload?: boolean;
    onRevokation?: () => void;
    onConsent?: () => void;
  }
  class DPS {
    internalConsentState: boolean;
    name: any;
    constructor(name: string) {
      this.name = name;
      this.internalConsentState = false;
    }

    monitorChange(
      acceptedEmbeddings: { id: string; name: string }[],
      options: MonitorChangeOptionProps = { reload: true }
    ) {
      const newConsentValue = acceptedEmbeddings.find(
        (embedding) => embedding.name === this.name
      )
        ? true
        : false;
      const consentRevoked =
        this.internalConsentState === true && !newConsentValue;
      const consentGranted =
        this.internalConsentState === false && newConsentValue;
      this.internalConsentState = newConsentValue;

      consentStore.update((store) => ({
        ...store,
        [this.name]: newConsentValue,
      }));

      if (consentRevoked && options.reload) {
        this._reloadOnRevokation();
      }

      if (consentRevoked && options.onRevokation) {
        options.onRevokation();
      }

      if (consentGranted && options.onConsent) {
        options.onConsent();
      }
    }

    _reloadOnRevokation() {
      if (!hasReloaded) {
        hasReloaded = true;
        window.location.reload();
      }
    }
  }

  // Register your DPS's here
  const googleAds = new DPS("Google Ads Conversion Tracking");
  const googleAnalytics = new DPS("Google Analytics 4");
  const hotJar = new DPS("Hotjar");
  const linkedIn = new DPS("LinkedIn Ads");

  onMount(() => {
    if (browser && document) {
      // Run once on mount to set correct initial state of registered DPS's
      _handleConsentChange();
    }
  });

  const _handleConsentChange = () => {
    let interval = 100;

    const intervalId = setInterval(() => {
      if (typeof window.CCM !== "undefined") {
        const acceptedEmbeddings = window.CCM.acceptedEmbeddings;
        clearInterval(intervalId);

        googleAds.monitorChange(acceptedEmbeddings, {
          onConsent: () => {
            window.gtag("consent", "update", {
              ad_storage: "granted",
            });
          },
        });
        googleAnalytics.monitorChange(acceptedEmbeddings, {
          onConsent: () => {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
            });
          },
        });
        hotJar.monitorChange(acceptedEmbeddings);
        linkedIn.monitorChange(acceptedEmbeddings);
      } else {
        interval *= 2;
      }
    }, interval);
  };
</script>

<svelte:window on:ccm19WidgetClosed="{_handleConsentChange}" />
