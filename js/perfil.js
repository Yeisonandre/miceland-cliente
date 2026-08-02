/* =========================================================
   LÓGICA DEL PERFIL
      Datos de envío del usuario (nombre, teléfono, dirección,
         ciudad, referencia) y su historial de pedidos.
         ========================================================= */

         /* ---------------------------------------------------------
            IR A LA PANTALLA DE PERFIL
            --------------------------------------------------------- */
            function irAPerfil(){
              mostrarPantalla("pantalla-perfil");
                marcarNavActivo("perfil");

                  if(esInvitado || !auth.currentUser){
                      // Invitado: mostramos solo la invitación a loguearse
                          document.getElementById("perfil-nombre").textContent = "Invitado";
                              document.getElementById("perfil-email").textContent = "Explorando sin cuenta";
                                  document.getElementById("perfil-inicial").textContent = "?";
                                      document.getElementById("perfil-acciones-invitado").style.display = "block";
                                          document.getElementById("perfil-datos-usuario").style.display = "none";
                                              return;
                                                }

                                                  // Usuario logueado: mostramos sus datos reales
                                                    document.getElementById("perfil-acciones-invitado").style.display = "none";
                                                      document.getElementById("perfil-datos-usuario").style.display = "block";

                                                        cargarDatosPerfil();
                                                          cargarPedidosUsuario();
                                                          }

                                                          /* ---------------------------------------------------------
                                                             CARGAR LOS DATOS DEL USUARIO EN EL FORMULARIO
                                                             --------------------------------------------------------- */
                                                             function cargarDatosPerfil(){
                                                               const usuario = auth.currentUser;
                                                                 if(!usuario) return;

                                                                   db.ref("usuarios/" + usuario.uid).once("value").then(snap => {
                                                                       const datos = snap.val() || {};

                                                                           document.getElementById("perfil-nombre").textContent = datos.nombre || usuario.email;
                                                                               document.getElementById("perfil-email").textContent = usuario.email;
                                                                                   document.getElementById("perfil-inicial").textContent = (datos.nombre || usuario.email).charAt(0).toUpperCase();

                                                                                       document.getElementById("perfil-input-nombre").value = datos.nombre || "";
                                                                                           document.getElementById("perfil-input-telefono").value = datos.telefono || "";
                                                                                               document.getElementById("perfil-input-direccion").value = datos.direccion || "";
                                                                                                   document.getElementById("perfil-input-ciudad").value = datos.ciudad || "";
                                                                                                       document.getElementById("perfil-input-referencia").value = datos.referencia || "";
                                                                                                         });
                                                                                                         }

                                                                                                         /* ---------------------------------------------------------
                                                                                                            GUARDAR CAMBIOS EN EL PERFIL
                                                                                                            --------------------------------------------------------- */
                                                                                                            function guardarPerfil(){
                                                                                                              const usuario = auth.currentUser;
                                                                                                                if(!usuario) return;

                                                                                                                  const nombre = document.getElementById("perfil-input-nombre").value.trim();
                                                                                                                    const telefono = document.getElementById("perfil-input-telefono").value.trim();
                                                                                                                      const direccion = document.getElementById("perfil-input-direccion").value.trim();
                                                                                                                        const ciudad = document.getElementById("perfil-input-ciudad").value.trim();
                                                                                                                          const referencia = document.getElementById("perfil-input-referencia").value.trim();

                                                                                                                            const errorEl = document.getElementById("mensaje-error-perfil");
                                                                                                                              errorEl.classList.remove("visible");

                                                                                                                                if(!nombre || !telefono){
                                                                                                                                    errorEl.textContent = "El nombre y el teléfono son obligatorios.";
                                                                                                                                        errorEl.classList.add("visible");
                                                                                                                                            return;
                                                                                                                                              }

                                                                                                                                                const boton = document.getElementById("boton-guardar-perfil");
                                                                                                                                                  boton.disabled = true;
                                                                                                                                                    boton.textContent = "Guardando...";

                                                                                                                                                      db.ref("usuarios/" + usuario.uid).update({
                                                                                                                                                          nombre: nombre,
                                                                                                                                                              telefono: telefono,
                                                                                                                                                                  direccion: direccion,
                                                                                                                                                                      ciudad: ciudad,
                                                                                                                                                                          referencia: referencia
                                                                                                                                                                            }).then(() => {
                                                                                                                                                                                document.getElementById("perfil-nombre").textContent = nombre;
                                                                                                                                                                                    document.getElementById("perfil-inicial").textContent = nombre.charAt(0).toUpperCase();
                                                                                                                                                                                      }).catch(() => {
                                                                                                                                                                                          errorEl.textContent = "No pudimos guardar los cambios. Intentá de nuevo.";
                                                                                                                                                                                              errorEl.classList.add("visible");
                                                                                                                                                                                                }).finally(() => {
                                                                                                                                                                                                    boton.disabled = false;
                                                                                                                                                                                                        boton.textContent = "Guardar cambios";
                                                                                                                                                                                                          });
                                                                                                                                                                                                          }

                                                                                                                                                                                                          /* ---------------------------------------------------------
                                                                                                                                                                                                             MIS PEDIDOS
                                                                                                                                                                                                                Por ahora esta lista va a aparecer vacía la mayoría de
                                                                                                                                                                                                                   las veces: la vamos a completar cuando armemos la
                                                                                                                                                                                                                      pantalla de confirmar pedido (checkout).
                                                                                                                                                                                                                      --------------------------------------------------------- */
                                                                                                                                                                                                                      function cargarPedidosUsuario(){
                                                                                                                                                                                                                        const usuario = auth.currentUser;
                                                                                                                                                                                                                          if(!usuario) return;

                                                                                                                                                                                                                            const contenedor = document.getElementById("lista-pedidos");
                                                                                                                                                                                                                              contenedor.innerHTML = `<p style="font-size:12.5px; color:var(--texto-suave);">Cargando pedidos...</p>`;

                                                                                                                                                                                                                                db.ref("pedidos").orderByChild("clienteId").equalTo(usuario.uid).once("value").then(snap => {
                                                                                                                                                                                                                                    const datos = snap.val() || {};
                                                                                                                                                                                                                                        const lista = Object.values(datos).sort((a, b) => (b.fecha || 0) - (a.fecha || 0));

                                                                                                                                                                                                                                            if(lista.length === 0){
                                                                                                                                                                                                                                                  contenedor.innerHTML = `<p style="font-size:12.5px; color:var(--texto-suave);">Todavía no hiciste ningún pedido.</p>`;
                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                contenedor.innerHTML = lista.map(pedido => {
                                                                                                                                                                                                                                                                      const fecha = pedido.fecha ? new Date(pedido.fecha).toLocaleDateString("es-CO", {day:"numeric", month:"short", year:"numeric"}) : "";
                                                                                                                                                                                                                                                                            const cantidadItems = pedido.items ? pedido.items.length : 0;
                                                                                                                                                                                                                                                                                  return `
                                                                                                                                                                                                                                                                                          <div style="background:#fff; border-radius:12px; box-shadow:0 2px 8px rgba(75,46,131,0.08); padding:12px 14px; margin-bottom:10px;">
                                                                                                                                                                                                                                                                                                    <div style="font-size:12px; color:var(--texto-suave); margin-bottom:4px;">${fecha} · ${pedido.estado || "pendiente"}</div>
                                                                                                                                                                                                                                                                                                              <div style="font-size:13.5px; font-weight:700;">${cantidadItems} producto(s) · ${formatearPrecio(pedido.total)}</div>
                                                                                                                                                                                                                                                                                                                      </div>`;
                                                                                                                                                                                                                                                                                                                          }).join("");
                                                                                                                                                                                                                                                                                                                            }).catch(() => {
                                                                                                                                                                                                                                                                                                                                contenedor.innerHTML = `<p style="font-size:12.5px; color:var(--texto-suave);">No pudimos cargar tus pedidos.</p>`;
                                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                  