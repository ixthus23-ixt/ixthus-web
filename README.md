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

## Kerigma 2026

El módulo de pre-registro vive en:

```txt
src/app/kerigma-2026/page.tsx
src/app/admin/kerigma-2026/page.tsx
src/lib/firebase.ts
src/lib/admin.ts
src/lib/kerigma.ts
```

Rutas:

```txt
/kerigma-2026
/admin/kerigma-2026
```

Los correos administradores del panel se editan en:

```txt
src/lib/admin.ts
```

## Firebase

Crea un proyecto en Firebase, habilita Authentication con email y contraseña, y crea una base de datos de Firestore.

Variables de entorno requeridas en local y en Vercel:

```txt
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

En local puedes colocarlas en `.env.local`.

Colección utilizada:

```txt
kerigma2026_pre_registros
kerigma2026_phone_index
```

Reglas de Firestore:

```txt
firestore.rules
```

Para que un administrador tenga acceso real en Firestore, crea un documento en
`admins/{uid}` usando el UID del usuario de Firebase Auth o un documento en
`admin_emails/{correo}` usando el correo exacto del administrador. La lista
`ADMIN_EMAILS` en `src/lib/admin.ts` controla el acceso visual al panel; las
reglas de `firestore.rules` protegen la lectura y edición real de los datos.

`kerigma2026_phone_index` reserva teléfonos normalizados para prevenir
duplicados desde el formulario público. El documento usa como ID el teléfono de
10 dígitos y guarda únicamente `registrationId` y fechas técnicas; no debe
guardar nombres ni otros datos personales.

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
