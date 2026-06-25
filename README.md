# Document Viewer

A fast, dependency-free document viewer. Three document types — **Prelim**, **Final**,
and **FWP** — each with a list of templates. Click any template and its PDF opens
side-by-side in the viewer, with a button to download the original Word (.docx) file.

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

## Run locally

Because browsers block `file://` PDF loading, serve the folder over HTTP:

```bash
cd bofa-viewer
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

