import type { MetadataRoute } from "next";
import { RUTAS_PUBLICAS, URL_SITIO } from "@/config/sitio";

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS_PUBLICAS.map((ruta) => ({
    url: `${URL_SITIO}${ruta === "/" ? "" : ruta}`,
    changeFrequency: "monthly",
    priority: ruta === "/" ? 1 : 0.8,
  }));
}
