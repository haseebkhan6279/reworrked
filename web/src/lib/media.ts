/** Product stills — /public/media */
/** Model lifestyle — /public/latest (unique caps only in MODELS.unique) */

export const MEDIA = {
  heroStill:
    "/media/Baseball_caps_on_velvet_surface_202607301442.jpeg_202607301446.jpeg",
  heroVideo: "/media/Baseball_caps_on_velvet_surface_202607301451.mp4",
  caps: [
    "/media/WhatsApp_Image_2026-07-29_at_3.30.03_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.04_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.04_202607301426_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.04_202607301426_3.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426_3.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.05_202607301426_4.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.06_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.06_202607301426_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.06_202607301426_3.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426_3.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.07_202607301426_4.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.08_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.08_202607301426_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.09_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.09_202607301426_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.10_202607301426.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.10_202607301430.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.10_202607301430_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.11_202607301430.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.11_202607301430_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.11_202607301430_3.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.12_202607301430.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.12_202607301430_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.12_202607301430_3.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.13_202607301430.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.13_202607301430_2.jpeg",
    "/media/WhatsApp_Image_2026-07-29_at_3.30.14_202607301430.jpeg",
  ],
} as const;

/**
 * One lifestyle shot per unique embroidered cap.
 * Adventure Awaits appears in many files — only one kept for site use.
 */
export const MODELS = {
  video: "/latest/models.mp4",
  /** Dad's Club EST. 2023 */
  dadsClub: "/latest/model-1.jpeg",
  /** DNA intact (white) */
  dnaIntact: "/latest/model-2.jpeg",
  /** Adventure Awaits (green) — single pick from duplicates */
  adventureAwaits: "/latest/model-5.jpeg",
  /** wife of the party (light blue) */
  wifeOfTheParty: "/latest/model-7.jpeg",
  /** Deduped set for strips / galleries — never repeat same cap */
  unique: [
    "/latest/model-1.jpeg",
    "/latest/model-2.jpeg",
    "/latest/model-5.jpeg",
    "/latest/model-7.jpeg",
  ],
} as const;

export function savePercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
