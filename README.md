# Kwaku's Lounge

A modern browser arcade bringing classic console emulators and hosted web games into one responsive interface.

Choose an experience from the home page or game library, load your own game cartridges, and switch between light and dark themes. The interface is designed for desktops, tablets, and phones.
https://artifact.ardor.build/artifact-api/published/7ababaa7-5ac6c2a8/index.html
## Features

- Responsive home page with direct experience launchers.
- Wide, two-column desktop library that adapts to a single column on phones.
- Light and dark modes that initially follow your device settings and remember your selection.
- Game Boy emulator with keyboard controls, multitouch buttons, selectable screen palettes, audio, pause, and reset.
- Local Game Boy battery-save storage, with `.sav` import and export.
- NES and SNES players powered by EmulatorJS, with their own touch controllers and save tools.
- Embedded Retro Bowl, mcraft.fun, and Web Dashers players.
- Fullscreen controls with an iPhone/iPad viewport-filling fallback and an accessible exit button.
- Dedicated OpenHaloCE player route with cross-origin isolation headers.

## Available experiences

| Experience | How it works |
| --- | --- |
| Game Boy | Local, vendored TypeScript core. Load an uncompressed `.gb` ROM. |
| NES | EmulatorJS player. Load an uncompressed `.nes` ROM. |
| SNES | EmulatorJS player. Load an uncompressed `.sfc` or `.smc` ROM. |
| Retro Bowl | Embeds the hosted game supplied through Konggames, with Gamesflow attribution. |
| mcraft.fun | Embeds the original hosted site and uses its built-in touch controls. |
| Web Dashers | Embeds the hosted fan-made Geometry Dash Web Demo mod. |
| OpenHaloCE | Opens a dedicated, isolated player page in the same tab and embeds the original site. Requires your own game data. |

No commercial ROMs or Halo retail game data are included. Embedded games are not copied or rehosted by this project.

## Getting started

### Requirements

- Node.js 24 is recommended; the Docker build uses Node.js 24.
- npm.
- A modern browser. HTTPS is required for production, particularly for OpenHaloCE.

### Install and run

```sh
npm ci
npm run build
npm start
```

Open **http://localhost:1337**.

`npm start` serves the production build in `dist/`. Run `npm run build` again after changing source files.

For Vite development mode:

```sh
npx vite
```

Vite development mode does not currently supply the dedicated Halo route's isolation headers. Use the production server when testing that integration.

## Controls and saves

### Game Boy

| Action | Keyboard |
| --- | --- |
| Move | Arrow keys |
| A | X |
| B | Z |
| Start | Enter |
| Select | Shift |

On touchscreens, hold the on-screen buttons; simultaneous inputs are supported. Game Boy emulation pauses when the page is backgrounded.

Battery saves are stored locally using a hash of the ROM, so different cartridges do not share save data. Use **Export save** to keep a backup and **Import save** to restore it. This is cartridge battery-save support, not instant save states.

The Game Boy core supports ROM-only, MBC1, and MBC3 cartridges. Color-only games and unsupported mappers are rejected. Compatibility with every game is not guaranteed.

### NES, SNES, and hosted games

NES and SNES use EmulatorJS's controller and player menus for controls, save states, and save-file import/export.

Hosted games manage their own inputs, audio, accounts, storage, and progress. Save important work before switching games or reloading. Opening the library does not necessarily pause a hosted game.

## Deploying with Docker

```sh
docker build -t kwakus-lounge .
docker run --rm -p 1337:1337 kwakus-lounge
```

The container exposes port **1337** and provides a health endpoint at **`/health`**. Put it behind an HTTPS-capable reverse proxy or hosting platform.

For Git-backed hosting, deploy the repository containing the `Dockerfile`, `package-lock.json`, source files, and `public/` directory. The browser preview is not a substitute for this server deployment.

## OpenHaloCE and security headers

Halo is launched at **`/halo.html`**, rather than inside the main arcade page. The production server applies these headers to that route:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Permissions-Policy: cross-origin-isolated=(self "https://openhaloce.com")
```

The iframe also delegates `cross-origin-isolated` to the original OpenHaloCE site. Other arcade pages remain non-isolated to preserve compatibility with external game embeds.

If using a different web server, configure the equivalent headers on `/halo.html`. Verify `crossOriginIsolated` in both the player page and the remote iframe before assuming the runtime will work. External hosting behavior or browser policy may still prevent gameplay.

OpenHaloCE retains its ownership confirmation and local game-data importer. Users must supply their own supported, legally obtained game data. Kwaku's Lounge does not supply or upload those files.

The Ardor HTML preview cannot configure these response headers or serve the dedicated player route. Halo requires the server-hosted version.

## Project structure

```text
src/
  main.js          App composition, navigation, and Game Boy integration
  home.js          Home page and experience launchers
  library.js       Experience registry and library selector
  theme.js         Branding and persisted light/dark mode
  consoles.js      NES and SNES iframe players
  retro-bowl.js    Retro Bowl player
  eagler.js        Shared mcraft.fun and Web Dashers player
  *.css            Interface styles
vendor/            Game Boy emulation core and local adaptations
public/
  halo.html        Dedicated OpenHaloCE player
server.js          Production HTTP server and Halo headers
Dockerfile         Production container build
```

To add an experience, register it in `src/library.js` and connect its action in `src/main.js`. The home page uses the same registry. Hosted games should retain attribution, be compatible with framing, and have clear progress-loss warnings when switching.

## Testing and current limitations

The project includes Playwright scripts, but some existing tests still reference the removed Game Boy demo and the old library order. They need updating before `npm test` should be treated as a reliable regression suite.

Browser tooling can be installed with:

```sh
npx playwright install --with-deps chromium webkit
```

Recent interface checks covered theme persistence, mobile layout, navigation, and viewport fullscreen with mocked game frames. These checks do **not** verify the hosted games themselves.

Known limitations:

- Physical iPhone/iPad gameplay has not been verified.
- Full NES/SNES gameplay tests previously exceeded the test environment's memory limit.
- OpenHaloCE gameplay and iframe isolation are not yet verified in a live deployment.
- Safari can restrict or evict storage used by embedded games; keep backups where available.
- iPhone viewport fullscreen fills the visible browser area but cannot guarantee that Safari's browser bars disappear.
- EmulatorJS core downloads and hosted games require internet access and depend on third-party availability.
- Embedding does not bypass Wi-Fi, proxy, or network restrictions.
- Cross-origin games cannot be restyled, inspected, or controlled by the parent page unless the host explicitly provides an integration API.

## Credits and licensing

- Game Boy core: [Robert Louie's gameboy-emulator](https://github.com/roblouie/gameboy-emulator), version 1.1.2, ISC. See `LICENSE-CORE`. Local adaptations include Safari-compatible audio buffering and CB instruction timing.
- NES/SNES integration: [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS), GPLv3, with separately licensed emulator cores downloaded from its CDN.
- Retro Bowl: hosted through Konggames; Gamesflow attribution is retained in the player.
- [mcraft.fun](https://mcraft.fun/), [Web Dashers](https://web-dashers.github.io/), and [OpenHaloCE](https://openhaloce.com/) remain hosted by their respective providers.

This project is independent and is not affiliated with the original game publishers. Games, trademarks, and third-party components remain the property of their respective owners. The original interface code is licensed under the MIT License; see `LICENSE`. Vendored components retain their own licenses, and the MIT license does not grant rights to third-party games, trademarks, or assets.
