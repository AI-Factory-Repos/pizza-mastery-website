/**
 * print-recipe.js
 * Sets up the QR code for the print section of recipe.html.
 * The QR code links back to the current page's URL so printed copies
 * can be scanned to reach the interactive digital version.
 *
 * Uses the free, no-tracking Google Charts QR code API.
 */
(function () {
  function initPrintQR() {
    const qrSection = document.getElementById('print-qr-section');
    const qrImg = document.getElementById('qr-img');
    const qrUrlEl = document.getElementById('qr-url');

    if (!qrSection || !qrImg || !qrUrlEl) return;

    // Build the canonical URL for this recipe page
    const pageUrl = window.location.href;

    // Use Google Charts API to generate a QR code image
    // chs = size (pixels), cht = chart type, chl = data to encode
    const encodedUrl = encodeURIComponent(pageUrl);
    const qrSrc = `https://chart.googleapis.com/chart?chs=160x160&cht=qr&chl=${encodedUrl}&choe=UTF-8`;

    qrImg.src = qrSrc;
    qrImg.alt = 'QR code: ' + pageUrl;
    qrUrlEl.textContent = pageUrl;
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrintQR);
  } else {
    initPrintQR();
  }
})();
