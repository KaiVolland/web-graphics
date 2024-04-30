// Funktion zur Konvertierung von Hex zu RGB
export function hexToRGB(hex: string, normalize = false) {
  // Entferne das '#' am Anfang, falls vorhanden
  hex = hex.replace(/^#/, '');

  // Teile den Hex-String in RGB-Komponenten auf
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  if (normalize) {
    return [ r / 256, g / 256, b / 256 ];
  }

  return [ r, g, b ];
}
