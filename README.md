# ximka-portfolio

Sitio público de XIMKA (Next.js 16, App Router, Tailwind 4). Todas las rutas son
estáticas: `/`, `/historia-clinica-demo`, `/casos` y `/tecnologia`.

## Desarrollo

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Variables de entorno

| Variable | Para qué | Si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, sin barra final (p. ej. `https://ximka.ejemplo`). Con ella se construyen el canonical, el sitemap, `robots.txt` y la imagen de vista previa al compartir el enlace. | En Vercel se usa la URL de producción del proyecto; en local, `http://localhost:3000`. |

Definirla en el entorno de producción antes de publicar: sin ella, los enlaces
compartidos por WhatsApp o LinkedIn apuntarían la vista previa al dominio de
Vercel y no al propio.

## Qué hay dónde

- `src/config/sitio.ts`: nombre, descripción y URL del sitio (una sola fuente para los metadatos).
- `src/config/contacto.ts`: correo de contacto y enlaces `mailto:`.
- `src/data/casos.ts`: los casos de `/casos`, con sus reglas en la cabecera del archivo.
- `src/app/opengraph-image.tsx`: la imagen de vista previa, generada en el build a partir del logo.
- `src/components/TestimoniosSection.tsx`: solo se muestra con contenido; en producción queda oculta mientras esté vacía.
