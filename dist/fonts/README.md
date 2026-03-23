# Local fonts (Icebox + Carp VF trials)

Put your licensed **Icebox** and **Carp VF** trial files in this folder. They are served at `/fonts/...` (Vite copies `public/` to the site root).

The app is set up to use **only** these two typefaces (Icebox for display / headings, Carp for UI and body). Defaults live in `src/styles/theme.css`; `@font-face` rules are in `src/styles/fonts.css`.

## Icebox (headings)

| App family name | Filename (either works) |
|-----------------|-------------------------|
| `Icebox_Trial:Magnet` | `Icebox-Magnet-Trial.woff2` or `Icebox-Magnet-Trial.otf` |
| `Icebox_Trial:Bold` | `Icebox-Bold-Trial.woff2` or `Icebox-Bold-Trial.otf` |

## Carp VF (body text)

| App family name | Filename options |
|-----------------|------------------|
| `Carp_VF_Trial:Regular` | `CarpVF-Regular-Trial.woff2`, `.otf`, or variable `CarpVFTrial-VariableFont_opsz_wdth_wght.ttf` |
| `Carp_VF_Trial:Italic` | `CarpVF-Italic-Trial.woff2`, `.otf`, or `CarpVFTrial-Italic-VariableFont_opsz_wdth_wght.ttf` |

If your download uses different names, rename the files to match **or** edit the `url('/fonts/...')` entries in `src/styles/fonts.css`.

Restart `npm run dev` after adding files.
