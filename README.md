# En venta

Sitio estatico para vender cosas personales, listo para GitHub Pages.

## Editar productos

Los productos viven en `data/products.js`.

- Cambia `whatsappPhone` por tu numero con prefijo internacional, sin `+`.
- Para marcar algo vendido, cambia `status: "available"` por `status: "sold"`.
- Para quitar un producto, elimina su bloque completo dentro de `window.PRODUCTS`.
- Para agregar fotos, guarda imagenes en `assets/` y pon la ruta en `image.src`, por ejemplo `assets/vuku.jpg`, `assets/robot.jpg` o `assets/garten-set.jpg`.
- Puedes ajustar por producto si es recogida, entrega o ambas opciones en los textos de `details`.

## Publicar en GitHub Pages

1. Sube este repositorio a GitHub.
2. En `Settings > Pages`, elige la rama `main` y la carpeta `/root`.
3. Guarda y espera a que GitHub genere la URL.

No requiere build, dependencias ni servidor.
