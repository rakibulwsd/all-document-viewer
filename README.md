# Bank of America — Document Viewer

A fast, dependency-free document viewer. Three document types — **Prelim**, **Final**,
and **FWP** — each with a list of templates. Click any template and its PDF opens
side-by-side in the viewer, with a button to download the original Word (.docx) file.

Built with plain HTML, CSS, and JavaScript. No frameworks, no build step.

## Why PDF for display + .docx for download?

Browsers render PDF instantly and faithfully, but cannot render .docx directly.
JS-based .docx renderers are heavier and lose Word formatting; online viewers
(Microsoft/Google) require your files to be publicly reachable by a third party.
So the viewer shows a **PDF** (fast, exact), and the **Download Word** button hands
over the editable **.docx**. Keep both files per template — same name, different folder.

## Structure

```
bofa-viewer/
├── index.html        # markup
├── styles.css        # styling (BofA navy + red)
├── app.js            # nav + file paths (edit pdf/docx paths here)
├── assets/
│   └── logo.svg      # Bank of America logo
├── pdfs/             # shown in the viewer
│   ├── prelim/   bac-main-template, morgan-stanley, wells-fargo, goldman-sachs, ubs, toc
│   ├── final/    (same 6)
│   └── fwp/       bac-main-template, morgan-stanley, wells-fargo
└── docx/             # offered via the Download Word button (mirrors pdfs/)
    ├── prelim/  ...
    ├── final/   ...
    └── fwp/     ...
```

## Adding your own files

The files in `pdfs/` and `docx/` are **placeholders** so the site works out of the box.
Replace them with your real files, keeping the same names — no code change needed.
Put the Word file in `docx/<type>/` and its PDF version in `pdfs/<type>/`.

To rename a file or add/remove a template, edit the `pdf:` / `docx:` paths in **`app.js`**.

## Converting your .docx files to PDF (one command)

You already have everything in .docx; generate the matching PDFs in bulk with
LibreOffice (free, scriptable):

```bash
# from the docx/ folder; outputs PDFs alongside, then move them into pdfs/
soffice --headless --convert-to pdf --outdir ../pdfs/prelim prelim/*.docx
soffice --headless --convert-to pdf --outdir ../pdfs/final  final/*.docx
soffice --headless --convert-to pdf --outdir ../pdfs/fwp    fwp/*.docx
```

(On Windows, `soffice` lives in `C:\Program Files\LibreOffice\program\`.)
Re-run this whenever a Word file changes so the displayed PDF stays in sync.

## Run locally

Because browsers block `file://` PDF loading, serve the folder over HTTP:

```bash
cd bofa-viewer
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a repo and push these files (the contents of this folder at the repo root).
   ```bash
   git init
   git add .
   git commit -m "Document viewer"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   **Branch** to `main` and folder to `/ (root)`. Save.
4. Wait ~1 minute. Your site is at `https://<you>.github.io/<repo>/`.

The included `.nojekyll` file ensures every file is served as-is.

## Notes

- PDFs render with the browser's built-in viewer (fast, zero libraries).
- The "Download" and "Open in new tab" buttons act on the open document.
- Responsive: on phones the list collapses into a slide-in menu.
