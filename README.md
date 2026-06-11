# IXTHUS Web

Primera versión funcional de la página web para el grupo juvenil católico IXTHUS.

## Desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Verificación

```bash
npm run lint
npm run build
```

## Contenido editable

Los pilares, eventos, testimonios, enlaces de navegación e imágenes viven en:

```txt
src/data/site.ts
```

El formulario de "Primer paso" está preparado como placeholder para conectarse después a un backend, Google Forms o WhatsApp.

## Fotografías reales

Coloca tus imágenes reales respetando estos nombres para no modificar código:

```txt
public/images/hero/hero-main.jpg
public/images/what-is/what-is-ixthus.jpg
public/images/history/retiros.jpg
public/images/history/comunidad.jpg
public/images/history/mision.jpg
public/images/community/encuentro-juvenil.jpg
public/images/community/mision-y-camino.jpg
public/images/community/amistad-en-comunidad.jpg
public/images/community/oracion-compartida.jpg
public/images/parishes/san-pio-decimo.jpg
public/images/parishes/divina-providencia.jpg
public/images/parishes/asuncion-de-nuestra-senora.jpg
```

La carpeta `public/images/events/` queda preparada para futuras fotografías de eventos.

Las fotografías de `public/images/parishes/` deben mostrar fachada, templo,
altar o elementos arquitectónicos representativos de cada parroquia. Evita usar
fotografías de grupos juveniles o actividades para esas tres imágenes.
