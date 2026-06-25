/* ============================================================
   Bank of America — Document Viewer
   Each item has a PDF (shown in the viewer) and a DOCX (download).
   To swap a file, edit its `pdf` / `docx` path below.
     PDFs  -> /pdfs/<type>/<name>.pdf
     Word  -> /docx/<type>/<name>.docx
   ============================================================ */

const DOCUMENTS = {
  prelim: {
    label: "Prelim",
    items: [
      { label: "BAC Main Template",   pdf: "pdfs/prelim/bac-main-template.pdf", docx: "docx/prelim/bac-main-template.docx" },
      { label: "Morgan Stanley (MS)", pdf: "pdfs/prelim/morgan-stanley.pdf",    docx: "docx/prelim/morgan-stanley.docx" },
      { label: "Wells Fargo (WF)",    pdf: "pdfs/prelim/wells-fargo.pdf",       docx: "docx/prelim/wells-fargo.docx" },
      { label: "Goldman Sachs (GS)",  pdf: "pdfs/prelim/goldman-sachs.pdf",     docx: "docx/prelim/goldman-sachs.docx" },
      { label: "UBS",                 pdf: "pdfs/prelim/ubs.pdf",               docx: "docx/prelim/ubs.docx" },
      { label: "TOC",                 pdf: "pdfs/prelim/toc.pdf",               docx: "docx/prelim/toc.docx" },
    ],
  },
  final: {
    label: "Final",
    items: [
      { label: "BAC Main Template",   pdf: "pdfs/final/bac-main-template.pdf",  docx: "docx/final/bac-main-template.docx" },
      { label: "Morgan Stanley (MS)", pdf: "pdfs/final/morgan-stanley.pdf",     docx: "docx/final/morgan-stanley.docx" },
      { label: "Wells Fargo (WF)",    pdf: "pdfs/final/wells-fargo.pdf",        docx: "docx/final/wells-fargo.docx" },
      { label: "Goldman Sachs (GS)",  pdf: "pdfs/final/goldman-sachs.pdf",      docx: "docx/final/goldman-sachs.docx" },
      { label: "UBS",                 pdf: "pdfs/final/ubs.pdf",                docx: "docx/final/ubs.docx" },
      { label: "TOC",                 pdf: "pdfs/final/toc.pdf",                docx: "docx/final/toc.docx" },
        { label: "Test Exhibit File",                 pdf: "pdfs/final/Test-Exhibit.pdf",                docx: "docx/final/Test-Exhibit.docx" },
    ],
  },
  fwp: {
    label: "FWP",
    items: [
      { label: "BAC Main Template",   pdf: "pdfs/fwp/bac-main-template.pdf",    docx: "docx/fwp/bac-main-template.docx" },
      { label: "Morgan Stanley (MS)", pdf: "pdfs/fwp/morgan-stanley.pdf",       docx: "docx/fwp/morgan-stanley.docx" },
      { label: "Wells Fargo (WF)",    pdf: "pdfs/fwp/wells-fargo.pdf",          docx: "docx/fwp/wells-fargo.docx" },
    ],
  },
};

/* ---------- Elements ---------- */
const tabs        = Array.from(document.querySelectorAll(".type-tab"));
const docList     = document.getElementById("docList");
const frame       = document.getElementById("pdfFrame");
const emptyState  = document.getElementById("emptyState");
const viewerType  = document.getElementById("viewerType");
const viewerTitle = document.getElementById("viewerTitle");
const openNewTab  = document.getElementById("openNewTab");
const downloadDocx= document.getElementById("downloadDocx");
const sidebar     = document.getElementById("sidebar");
const menuToggle  = document.getElementById("menuToggle");

let currentType = null;

/* ---------- Build the document list for a type ---------- */
function renderType(type) {
  currentType = type;

  tabs.forEach((t) => {
    const on = t.dataset.type === type;
    t.setAttribute("aria-selected", on ? "true" : "false");
  });

  docList.innerHTML = "";
  DOCUMENTS[type].items.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "doc-item";
    btn.type = "button";
    btn.innerHTML = `<span class="dot"></span><span>${item.label}</span>`;
    btn.addEventListener("click", () => openDoc(type, item, btn));
    docList.appendChild(btn);
  });
}

/* ---------- Open a PDF in the viewer ---------- */
function openDoc(type, item, btn) {
  docList.querySelectorAll(".doc-item").forEach((b) =>
    b.removeAttribute("aria-current")
  );
  if (btn) btn.setAttribute("aria-current", "true");

  // show the PDF with the browser's native renderer (fast)
  frame.src = item.pdf + "#view=FitH";
  frame.hidden = false;
  emptyState.style.display = "none";

  // header meta
  viewerType.textContent = DOCUMENTS[type].label;
  viewerTitle.textContent = item.label;

  // actions
  openNewTab.href = item.pdf;
  openNewTab.hidden = false;
  downloadDocx.href = item.docx;
  downloadDocx.hidden = false;

  closeSidebar();
}

/* ---------- Mobile sidebar drawer ---------- */
function openSidebar() {
  sidebar.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
}
function closeSidebar() {
  sidebar.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
});
document.querySelector(".viewer").addEventListener("click", () => {
  if (sidebar.classList.contains("open")) closeSidebar();
});

/* ---------- Tab wiring ---------- */
tabs.forEach((t) =>
  t.addEventListener("click", () => renderType(t.dataset.type))
);

/* ---------- Init ---------- */
renderType("prelim");
