<script lang="ts">
  import Button from "./Button.svelte";
  import Container from "./Container.svelte";

  export let title: string;
  export let description: string;
</script>

<header
  class="pb-32 pt-44 lg:pb-52 lg:pt-72 bg-gradient-to-b from-white to-neutral-100"
>
  <Container>
    <div class="grid grid-cols-12 gap-8 relative">
      <div class="col-span-12 md:col-span-6 text-black">
        {@html title}
        <p class="mt-4 text-lg text-neutral-500">
          {description}
        </p>
      </div>
      <div
        class="col-span-12 md:col-span-5 absolute right-0 -top-14 md:col-start-8"
      >
        <form
          class="relative max-h-[600px] flex flex-col bg-white border overflow-clip rounded-lg drop-shadow-xl"
        >
          <div
            class="relative h-auto p-8 border-b border-black/10 drop-shadow-sm bg-white"
          >
            <p
              class="font-semibold text-transparent bg-gradient-to-br inline-block from-purple-500 to-primary bg-clip-text"
            >
              Lösungsfinder
            </p>
            <span class="text-xl font-bold mt-2 block"
              >Welche Herausforderung willst du meistern?</span
            >
          </div>
          <!-- Radios in style of cards with orange selected styling border -->
          <div class="scroll-container grow overflow-auto py-8 pb-28 px-8">
            <div class="grid grid-cols-1 gap-4 relative h-full">
              <label class="">
                <input
                  type="radio"
                  name="challenge"
                  value=""
                  class="peer hidden"
                />
                <div
                  role="radio"
                  class="p-4 border-2 border-neutral-200 peer-checked:border-primary rounded-lg cursor-pointer"
                >
                  <span class="block font-semibold"
                    >Mein Unternehmen/Angebot wird nicht gefunden</span
                  >
                  <span class="text-neutral-500"
                    >Du kennst deine Zielgruppe, hast ein passendes Produkt,
                    findest aber nur wenige Kunden.</span
                  >
                </div>
              </label>
              <label class="">
                <input
                  type="radio"
                  name="challenge"
                  value=""
                  class="peer hidden"
                />
                <div
                  aria-role="radio"
                  class="p-4 border-2 border-neutral-200 peer-checked:border-primary rounded-lg cursor-pointer"
                >
                  <span class="block font-semibold"
                    >Repetitive, analoge Prozesse sorgen für Ineffizienz</span
                  >
                  <span class="text-neutral-500"
                    >Du oder deine Mitarbeiter beschäftigen sich häufig mit
                    repetitiven Aufgaben, die eigentlich automatisch ablaufen
                    könnten.</span
                  >
                </div>
              </label>
              <label class="">
                <input
                  type="radio"
                  name="challenge"
                  value="3"
                  class="peer hidden"
                />
                <div
                  aria-role="radio"
                  class="p-4 border-2 border-neutral-200 peer-checked:border-primary rounded-lg cursor-pointer"
                >
                  <span class="block font-semibold"
                    >Veraltete Inhalte und unpassende (digitale)
                    Selbstdarstellung</span
                  >
                  <span class="text-neutral-500"
                    >Du denkst und handelst modern, der (digitale) Auftritt
                    deines Unternehmens ist allerdings aus der Zeit gefallen.</span
                  >
                </div>
              </label>
              <label class="">
                <input
                  type="radio"
                  name="challenge"
                  value="4"
                  class="peer hidden group"
                />
                <div
                  aria-role="radio"
                  class="p-4 border-2 border-neutral-200 group peer-checked:border-primary rounded-lg cursor-pointer"
                >
                  <span class="block text-lg font-semibold">Challenge 4</span>
                  <span class="text-neutral-500">Beschreibung Challenge 4</span>
                </div>
              </label>
            </div>
          </div>
          <div class="px-8 fixed w-full bottom-8">
            <button
              type="submit"
              class="w-full bg-gradient-to-br from-purple-500 to-primary px-8 py-4 text-white font-bold drop-shadow-lg outline-2 outline outline-purple-200 hover:border-black/50 transition-all rounded-lg"
            >
              Lösung finden
            </button>
          </div>
        </form>
      </div>
    </div>
  </Container>
</header>
