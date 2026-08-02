/* =========================================================
   LÓGICA DEL CARRITO
      Se guarda en el propio celular (localStorage), así no se
         pierde aunque el usuario cierre la app.
         ========================================================= */

         let CARRITO = JSON.parse(localStorage.getItem("miceland_carrito") || "[]");

         function guardarCarrito(){
           localStorage.setItem("miceland_carrito", JSON.stringify(CARRITO));
             actualizarBadgeCarrito();
             }

             function actualizarBadgeCarrito(){
               const total = CARRITO.reduce((suma, item) => suma + item.cantidad, 0);
                 const badge = document.getElementById("badge-carrito");
                   if(total > 0){
                       badge.style.display = "flex";
                           badge.textContent = total;
                             } else {
                                 badge.style.display = "none";
                                   }
                                   }

                                   /* ---------------------------------------------------------
                                      AGREGAR AL CARRITO (desde la tarjeta, con el botón "+")
                                      --------------------------------------------------------- */
                                      function agregarAlCarrito(codigo, cantidad){
                                        const producto = TODOS_LOS_PRODUCTOS.find(p => p.codigo === codigo);
                                          if(!producto) return;

                                            const imagenes = obtenerImagenesProducto(producto);

                                              const existente = CARRITO.find(item => item.codigo === codigo);
                                                if(existente){
                                                    existente.cantidad += cantidad;
                                                      } else {
                                                          CARRITO.push({
                                                                codigo: producto.codigo,
                                                                      nombre: producto.nombre,
                                                                            precio: producto.precio,
                                                                                  imagen: imagenes[0] || "",
                                                                                        cantidad: cantidad
                                                                                            });
                                                                                              }
                                                                                                guardarCarrito();
                                                                                                }

                                                                                                /* ---------------------------------------------------------
                                                                                                   AGREGAR AL CARRITO (desde la pantalla de detalle)
                                                                                                   --------------------------------------------------------- */
                                                                                                   function agregarAlCarritoDesdeDetalle(){
                                                                                                     if(!PRODUCTO_DETALLE_ACTUAL) return;
                                                                                                       agregarAlCarrito(PRODUCTO_DETALLE_ACTUAL, 1);
                                                                                                         cerrarOverlay("overlay-detalle");
                                                                                                         }

                                                                                                         /* ---------------------------------------------------------
                                                                                                            CAMBIAR CANTIDAD / QUITAR PRODUCTOS
                                                                                                            --------------------------------------------------------- */
                                                                                                            function cambiarCantidadCarrito(codigo, delta){
                                                                                                              const item = CARRITO.find(i => i.codigo === codigo);
                                                                                                                if(!item) return;
                                                                                                                  item.cantidad += delta;
                                                                                                                    if(item.cantidad <= 0){
                                                                                                                        CARRITO = CARRITO.filter(i => i.codigo !== codigo);
                                                                                                                          }
                                                                                                                            guardarCarrito();
                                                                                                                              renderizarCarrito();
                                                                                                                              }

                                                                                                                              function quitarDelCarrito(codigo){
                                                                                                                                CARRITO = CARRITO.filter(i => i.codigo !== codigo);
                                                                                                                                  guardarCarrito();
                                                                                                                                    renderizarCarrito();
                                                                                                                                    }

                                                                                                                                    function calcularTotalCarrito(){
                                                                                                                                      return CARRITO.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
                                                                                                                                      }

                                                                                                                                      /* ---------------------------------------------------------
                                                                                                                                         ABRIR Y DIBUJAR EL CARRITO
                                                                                                                                         --------------------------------------------------------- */
                                                                                                                                         function abrirCarrito(){
                                                                                                                                           renderizarCarrito();
                                                                                                                                             document.getElementById("overlay-carrito").classList.add("visible");
                                                                                                                                             }

                                                                                                                                             function renderizarCarrito(){
                                                                                                                                               const contenedor = document.getElementById("contenido-carrito");

                                                                                                                                                 if(CARRITO.length === 0){
                                                                                                                                                     contenedor.innerHTML = `
                                                                                                                                                           <div class="carrito-vacio">
                                                                                                                                                                   <div class="emoji">🛒</div>
                                                                                                                                                                           Tu carrito está vacío<br>
                                                                                                                                                                                   <span style="font-size:12px;">Agregá productos desde el catálogo</span>
                                                                                                                                                                                         </div>`;
                                                                                                                                                                                             return;
                                                                                                                                                                                               }

                                                                                                                                                                                                 let html = CARRITO.map(item => `
                                                                                                                                                                                                     <div class="item-carrito">
                                                                                                                                                                                                           ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : `<div style="width:64px;height:64px;border-radius:10px;background:var(--linea);flex-shrink:0;"></div>`}
                                                                                                                                                                                                                 <div class="item-carrito-info">
                                                                                                                                                                                                                         <div class="item-carrito-nombre">${item.nombre}</div>
                                                                                                                                                                                                                                 <div class="item-carrito-fila">
                                                                                                                                                                                                                                           <span class="item-carrito-precio">${formatearPrecio(item.precio * item.cantidad)}</span>
                                                                                                                                                                                                                                                     <div class="mini-selector">
                                                                                                                                                                                                                                                                 <button onclick="cambiarCantidadCarrito('${item.codigo}', -1)">−</button>
                                                                                                                                                                                                                                                                             <span>${item.cantidad}</span>
                                                                                                                                                                                                                                                                                         <button onclick="cambiarCantidadCarrito('${item.codigo}', 1)">+</button>
                                                                                                                                                                                                                                                                                                   </div>
                                                                                                                                                                                                                                                                                                           </div>
                                                                                                                                                                                                                                                                                                                   <button class="quitar-item" onclick="quitarDelCarrito('${item.codigo}')">Quitar</button>
                                                                                                                                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                                                                                                                             </div>
                                                                                                                                                                                                                                                                                                                               `).join("");

                                                                                                                                                                                                                                                                                                                                 html += `
                                                                                                                                                                                                                                                                                                                                     <div class="resumen-carrito">
                                                                                                                                                                                                                                                                                                                                           <div class="resumen-fila"><span>Total</span><span>${formatearPrecio(calcularTotalCarrito())}</span></div>
                                                                                                                                                                                                                                                                                                                                               </div>
                                                                                                                                                                                                                                                                                                                                                 `;

                                                                                                                                                                                                                                                                                                                                                   contenedor.innerHTML = html;
                                                                                                                                                                                                                                                                                                                                                   }

                                                                                                                                                                                                                                                                                                                                                   /* Apenas carga la página, actualizamos el numerito del
                                                                                                                                                                                                                                                                                                                                                      carrito por si ya había productos guardados de antes */
                                                                                                                                                                                                                                                                                                                                                      actualizarBadgeCarrito();
                                                                                                                                                                                                                                                                                                                                                      