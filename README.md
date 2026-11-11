# Pediatrica

React and Material UI web app at [pediatrica.github.io](https://pediatrica.github.io/). Editable source lives in `src/` and `public/` on branch `main` of `carlgao/carlgao.github.io`. The separate, unfinished `pediatrica-native` project is not used.

## Development

Use Node.js 24 (recorded in `.nvmrc`) and npm. With [nvm](https://github.com/nvm-sh/nvm) installed:

```sh
git switch main
nvm install
nvm use
npm ci
npm start
```

Open [localhost:3000](http://localhost:3000) for the development preview. Changes reload automatically.

```sh
npm test -- --watchAll=false
npm run build
```

The build command creates production files in ignored `build/`; it does not publish. Do not edit generated bundles.

## Donations

Edit payment destinations in `src/donations.js`:

| Service | Destination |
| --- | --- |
| Venmo | <https://venmo.com/u/Carl-Gao> |
| PayPal | <https://paypal.me/venuslabs> |
| Zelle | `money94539@gmail.com` |

`src/DonationButtons.js` implements the header controls. Venmo and PayPal open new tabs; Zelle opens a panel with a selectable email, copy confirmation, and a manual-copy fallback. Official logos are stored locally; source URLs are documented in `src/assets/donations/README.md`.

The inactive AdSense placement and scripts were removed from `public/index.html`, so no ad space is reserved above the calculator.

## Publishing

Source stays on `main` in `carlgao/carlgao.github.io`. Generated files are published to the root of **`pediatrica/pediatrica.github.io:master`**, which serves the live GitHub Pages site. Its live HTML and asset manifest matched that branch when checked on 2026-11-10.

After review, a maintainer with SSH write access to the publishing repository can publish with:

```sh
npm run deploy
```

The configured sequence is:

```text
npm run deploy
  → predeploy: npm run build
  → react-scripts build generates minified files in build/
  → gh-pages -b master -d build -r git@github.com:pediatrica/pediatrica.github.io.git
  → GitHub Pages serves the published master branch
```

The explicit `-r` destination is introduced on this branch. [gh-pages normally uses `origin`](https://github.com/tschaub/gh-pages/tree/v3.1.0#optionsrepo) unless another repository or remote is configured. Keep `origin` pointing to `carlgao/carlgao.github.io`; the deployment command targets the publishing repository independently. `homepage` is now `https://pediatrica.github.io`; it controls build URLs, not the Git destination.

Pushing source to `main` does not run the deployment command.

## Recovery history

Commit [`b3ec9499329c931eb5b77948b874c860e7ac3d8f`](https://github.com/carlgao/carlgao.github.io/tree/b3ec9499329c931eb5b77948b874c860e7ac3d8f) contains the original web source and deployment configuration: `predeploy` ran `npm run build`, and `deploy` ran `gh-pages -b master -d build` without a repository override. Its `homepage` was `https://carlgao.github.io`.

The next commit, `9049221`, replaced the source tree with generated files. Publishing `build/` to the same `master` branch removed files absent from that directory, including `src/` and `package.json`, from the branch's latest tree. Earlier commits still retain them.

The old source alone is not the current app. This recovery uses the live [asset manifest](https://pediatrica.github.io/asset-manifest.json) and embedded source contents in `static/js/main.b9151959.js.map` and `static/css/main.a4a2ec6e.css.map`, retrieved on 2026-11-10, to retain later app changes.

The build configuration is newly reconstructed, not claimed to be the live site's original package file: React/React DOM 16.14.0 match the live source maps; Material UI 4.12.4 and `react-scripts` 5.0.1 support the restored app with Node 24. An npm `package-lock.json` replaces the historical `yarn.lock` for reproducible `npm ci` installs. The original build-before-publish pipeline is preserved.
