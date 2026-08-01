/* =========================================================
   LÓGICA DE LA FASE 2: CATÁLOGO
      Todo lo relacionado a mostrar, buscar y filtrar productos.
      ========================================================= */

      let TODOS_LOS_PRODUCTOS = [];
      let CATEGORIA_ACTIVA = "Todos";

      // Estas son las categorías que ya definimos para el negocio.
      // Solo se muestran las que realmente tienen productos cargados.
      const CATEGORIAS_BASE = ["Todos","Hombre","Mujer","Niños","Bebé","Hogar","Ferretería","Electrónico","Salud","Papelería","Mascotas","Belleza","Alimentos","Calzados","Bolsos","Juguetes","Tecnología"];

      function formatearPrecio(n){
        n = Number(n) || 0;
          return "$" + n.toLocaleString("es-UY", {minimumFractionDigits:0, maximumFractionDigits:0});
          }

          /* ---------------------------------------------------------
             CARGAR PRODUCTOS DESDE FIREBASE
             --------------------------------------------------------- */
             function cargarProductos(){
               document.getElementById("grid-productos").innerHTML = '<div class="cargando"><div class="spinner"></div>Cargando productos...</div>';

                 db.ref("productos").once("value").then(snap => {
                     const datos = snap.val() || {};
                         TODOS_LOS_PRODUCTOS = Object.keys(datos).map(codigo => {
                               const p = datos[codigo];
                                     return {
                                             codigo: codigo,
                                                     nombre: p.nombre || p.Nombre || "Producto",
                                                             precio: Number(p.precio || p.Precio || 0),
                                                                     categoria: p.categoria || p.Categoria || "Otros",
                                                                             imagen: p.imagen || p.imagenUrl || p.Imagen || "",
                                                                                     descripcion: p.descripcion || p.Descripcion || ""
                                                                                           };
                                                                                               });
                                                                                                   construirCategorias();
                                                                                                       renderizarProductos();
                                                                                                         }).catch(() => {
                                                                                                             document.getElementById("grid-productos").innerHTML = "";
                                                                                                                 const vacio = document.getElementById("mensaje-vacio");
                                                                                                                     vacio.style.display = "block";
                                                                                                                         vacio.textContent = "No pudimos cargar el catálogo. Revisá tu conexión.";
                                                                                                                           });
                                                                                                                           }

                                                                                                                           /* ---------------------------------------------------------
                                                                                                                              CATEGORÍAS (solo las que tienen productos)
                                                                                                                              --------------------------------------------------------- */
                                                                                                                              function construirCategorias(){
                                                                                                                                const presentes = new Set(TODOS_LOS_PRODUCTOS.map(p => p.categoria));
                                                                                                                                  const categorias = CATEGORIAS_BASE.filter(c => c === "Todos" || presentes.has(c));

                                                                                                                                    const contenedor = document.getElementById("lista-categorias");
                                                                                                                                      contenedor.innerHTML = categorias.map(c =>
                                                                                                                                          `<button class="chip-cat ${c===CATEGORIA_ACTIVA?'activo':''}" onclick="seleccionarCategoria('${c.replace(/'/g,"\\'")}')">${c}</button>`
                                                                                                                                            ).join("");
                                                                                                                                            }

                                                                                                                                            function seleccionarCategoria(categoria){
                                                                                                                                              CATEGORIA_ACTIVA = categoria;
                                                                                                                                                document.querySelectorAll(".chip-cat").forEach(chip => {
                                                                                                                                                    chip.classList.toggle("activo", chip.textContent === categoria);
                                                                                                                                                      });
                                                                                                                                                        document.getElementById("titulo-seccion").textContent = categoria === "Todos" ? "Todos los productos" : categoria;
                                                                                                                                                          filtrarProductos();
                                                                                                                                                          }

                                                                                                                                                          /* ---------------------------------------------------------
                                                                                                                                                             BÚSQUEDA Y FILTRADO
                                                                                                                                                             --------------------------------------------------------- */
                                                                                                                                                             function filtrarProductos(){
                                                                                                                                                               const texto = document.getElementById("input-buscar").value.trim().toLowerCase();
                                                                                                                                                                 let lista = TODOS_LOS_PRODUCTOS;

                                                                                                                                                                   if(CATEGORIA_ACTIVA !== "Todos"){
                                                                                                                                                                       lista = lista.filter(p => p.categoria === CATEGORIA_ACTIVA);
                                                                                                                                                                         }
                                                                                                                                                                           if(texto){
                                                                                                                                                                               lista = lista.filter(p => p.nombre.toLowerCase().includes(texto));
                                                                                                                                                                                 }
                                                                                                                                                                                   renderizarProductos(lista);
                                                                                                                                                                                   }

                                                                                                                                                                                   /* ---------------------------------------------------------
                                                                                                                                                                                      DIBUJAR LAS TARJETAS DE PRODUCTOS
                                                                                                                                                                                      --------------------------------------------------------- */
                                                                                                                                                                                      function renderizarProductos(lista){
                                                                                                                                                                                        lista = lista || TODOS_LOS_PRODUCTOS;
                                                                                                                                                                                          const grid = document.getElementById("grid-productos");
                                                                                                                                                                                            const vacio = document.getElementById("mensaje-vacio");

                                                                                                                                                                                              if(lista.length === 0){
                                                                                                                                                                                                  grid.innerHTML = "";
                                                                                                                                                                                                      vacio.style.display = "block";
                                                                                                                                                                                                          vacio.textContent = "No encontramos productos con esa búsqueda 🔍";
                                                                                                                                                                                                              return;
                                                                                                                                                                                                                }
                                                                                                                                                                                                                  vacio.style.display = "none";

                                                                                                                                                                                                                    grid.innerHTML = lista.map(p => `
                                                                                                                                                                                                                        <div class="tarjeta-producto" onclick="abrirDetalle('${p.codigo}')">
                                                                                                                                                                                                                              <div class="imagen-wrap">
                                                                                                                                                                                                                                      ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy">` : ''}
                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                  <div class="info-producto">
                                                                                                                                                                                                                                                          <div class="nombre-producto">${p.nombre}</div>
                                                                                                                                                                                                                                                                  <div class="precio-producto">${formatearPrecio(p.precio)}</div>
                                                                                                                                                                                                                                                                          <div class="categoria-producto">${p.categoria}</div>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                      `).join("");
                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                      /* ---------------------------------------------------------
                                                                                                                                                                                                                                                                                         DETALLE DE PRODUCTO
                                                                                                                                                                                                                                                                                         --------------------------------------------------------- */
                                                                                                                                                                                                                                                                                         function abrirDetalle(codigo){
                                                                                                                                                                                                                                                                                           const producto = TODOS_LOS_PRODUCTOS.find(p => p.codigo === codigo);
                                                                                                                                                                                                                                                                                             if(!producto) return;

                                                                                                                                                                                                                                                                                               document.getElementById("detalle-img").src = producto.imagen || "";
                                                                                                                                                                                                                                                                                                 document.getElementById("detalle-precio").textContent = formatearPrecio(producto.precio);
                                                                                                                                                                                                                                                                                                   document.getElementById("detalle-nombre").textContent = producto.nombre;
                                                                                                                                                                                                                                                                                                     document.getElementById("detalle-categoria").textContent = producto.categoria;
                                                                                                                                                                                                                                                                                                       document.getElementById("detalle-descripcion").textContent = producto.descripcion || "Sin descripción disponible.";

                                                                                                                                                                                                                                                                                                         document.getElementById("overlay-detalle").classList.add("visible");
                                                                                                                                                                                                                                                                                                         }

                                                                                                                                                                                                                                                                                                         function cerrarOverlay(id){
                                                                                                                                                                                                                                                                                                           document.getElementById(id).classList.remove("visible");
                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                           