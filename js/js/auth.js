/* =========================================================
   LÓGICA DE LA FASE 1: LOGIN Y REGISTRO
      Todo lo que pasa cuando el usuario toca un botón en esta
         pantalla se maneja acá.
         ========================================================= */

         // Guardamos en qué "modo" está el formulario: "login" o "registro"
         let modoFormulario = "login";

         /* ---------------------------------------------------------
            CAMBIAR DE PANTALLA
               Le sacamos la clase "visible" a todas las pantallas y se
                  la ponemos solo a la que queremos mostrar.
                  --------------------------------------------------------- */
                  function mostrarPantalla(idPantalla){
                    document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("visible"));
                      document.getElementById(idPantalla).classList.add("visible");
                      }

                      /* ---------------------------------------------------------
                         ABRIR EL FORMULARIO (desde la pantalla de bienvenida)
                         --------------------------------------------------------- */
                         function mostrarFormulario(modo){
                           modoFormulario = modo;
                             actualizarTextosFormulario();
                               limpiarFormulario();
                                 mostrarPantalla("pantalla-formulario");
                                 }

                                 function volverABienvenida(){
                                   mostrarPantalla("pantalla-bienvenida");
                                   }

                                   /* Cuando el usuario toca "Registrate" / "Iniciar sesión"
                                      dentro del propio formulario, para cambiar de modo sin
                                         volver atrás */
                                         function cambiarModo(){
                                           modoFormulario = (modoFormulario === "login") ? "registro" : "login";
                                             actualizarTextosFormulario();
                                               limpiarFormulario();
                                               }

                                               /* Ajusta títulos, botones y qué campos se ven según el modo */
                                               function actualizarTextosFormulario(){
                                                 const esRegistro = modoFormulario === "registro";

                                                   document.getElementById("titulo-formulario").textContent = esRegistro ? "Crear cuenta" : "Iniciar sesión";
                                                     document.getElementById("boton-enviar").textContent = esRegistro ? "Registrarme" : "Iniciar sesión";

                                                       document.getElementById("campo-nombre").style.display = esRegistro ? "block" : "none";
                                                         document.getElementById("campo-telefono").style.display = esRegistro ? "block" : "none";

                                                           document.getElementById("texto-alterno").innerHTML = esRegistro
                                                               ? '¿Ya tenés cuenta? <b onclick="cambiarModo()">Iniciar sesión</b>'
                                                                   : '¿No tenés cuenta? <b onclick="cambiarModo()">Registrate</b>';
                                                                   }

                                                                   function limpiarFormulario(){
                                                                     document.getElementById("mensaje-error").classList.remove("visible");
                                                                       document.getElementById("input-nombre").value = "";
                                                                         document.getElementById("input-telefono").value = "";
                                                                           document.getElementById("input-email").value = "";
                                                                             document.getElementById("input-password").value = "";
                                                                             }

                                                                             function mostrarError(texto){
                                                                               const el = document.getElementById("mensaje-error");
                                                                                 el.textContent = texto;
                                                                                   el.classList.add("visible");
                                                                                   }

                                                                                   /* Traduce los códigos de error de Firebase a mensajes que
                                                                                      un usuario común entiende (en vez de "auth/wrong-password") */
                                                                                      function traducirError(codigo){
                                                                                        const mensajes = {
                                                                                            "auth/invalid-email": "El correo no es válido.",
                                                                                                "auth/user-not-found": "No existe una cuenta con ese correo.",
                                                                                                    "auth/wrong-password": "La contraseña es incorrecta.",
                                                                                                        "auth/invalid-credential": "Correo o contraseña incorrectos.",
                                                                                                            "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
                                                                                                                "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
                                                                                                                    "auth/missing-password": "Ingresá una contraseña."
                                                                                                                      };
                                                                                                                        return mensajes[codigo] || "Ocurrió un error. Intentá de nuevo.";
                                                                                                                        }

                                                                                                                        /* ---------------------------------------------------------
                                                                                                                           ENVIAR EL FORMULARIO (login o registro según el modo)
                                                                                                                           --------------------------------------------------------- */
                                                                                                                           function enviarFormulario(){
                                                                                                                             const email = document.getElementById("input-email").value.trim();
                                                                                                                               const password = document.getElementById("input-password").value;
                                                                                                                                 const boton = document.getElementById("boton-enviar");

                                                                                                                                   document.getElementById("mensaje-error").classList.remove("visible");

                                                                                                                                     if(!email || !password){
                                                                                                                                         mostrarError("Completá correo y contraseña.");
                                                                                                                                             return;
                                                                                                                                               }

                                                                                                                                                 if(modoFormulario === "login"){
                                                                                                                                                     boton.disabled = true;
                                                                                                                                                         boton.textContent = "Ingresando...";

                                                                                                                                                             auth.signInWithEmailAndPassword(email, password)
                                                                                                                                                                   .catch(error => mostrarError(traducirError(error.code)))
                                                                                                                                                                         .finally(() => {
                                                                                                                                                                                 boton.disabled = false;
                                                                                                                                                                                         boton.textContent = "Iniciar sesión";
                                                                                                                                                                                               });

                                                                                                                                                                                                 } else {
                                                                                                                                                                                                     const nombre = document.getElementById("input-nombre").value.trim();
                                                                                                                                                                                                         const telefono = document.getElementById("input-telefono").value.trim();

                                                                                                                                                                                                             if(!nombre){
                                                                                                                                                                                                                   mostrarError("Ingresá tu nombre completo.");
                                                                                                                                                                                                                         return;
                                                                                                                                                                                                                             }

                                                                                                                                                                                                                                 boton.disabled = true;
                                                                                                                                                                                                                                     boton.textContent = "Creando cuenta...";

                                                                                                                                                                                                                                         auth.createUserWithEmailAndPassword(email, password)
                                                                                                                                                                                                                                               .then(credencial => {
                                                                                                                                                                                                                                                       // Además de crear el login, guardamos sus datos
                                                                                                                                                                                                                                                               // en la base de datos, en usuarios/{su-id}
                                                                                                                                                                                                                                                                       return db.ref("usuarios/" + credencial.user.uid).set({
                                                                                                                                                                                                                                                                                 nombre: nombre,
                                                                                                                                                                                                                                                                                           telefono: telefono,
                                                                                                                                                                                                                                                                                                     email: email,
                                                                                                                                                                                                                                                                                                               creado: Date.now()
                                                                                                                                                                                                                                                                                                                       });
                                                                                                                                                                                                                                                                                                                             })
                                                                                                                                                                                                                                                                                                                                   .catch(error => mostrarError(traducirError(error.code)))
                                                                                                                                                                                                                                                                                                                                         .finally(() => {
                                                                                                                                                                                                                                                                                                                                                 boton.disabled = false;
                                                                                                                                                                                                                                                                                                                                                         boton.textContent = "Registrarme";
                                                                                                                                                                                                                                                                                                                                                               });
                                                                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                                                                 }

                                                                                                                                                                                                                                                                                                                                                                 /* ---------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                    CERRAR SESIÓN
                                                                                                                                                                                                                                                                                                                                                                    --------------------------------------------------------- */
                                                                                                                                                                                                                                                                                                                                                                    function cerrarSesionUsuario(){
                                                                                                                                                                                                                                                                                                                                                                      auth.signOut();
                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                      /* ---------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                         FIREBASE NOS AVISA SOLO cuando alguien inicia o cierra
                                                                                                                                                                                                                                                                                                                                                                            sesión. Esto se ejecuta automáticamente cada vez que
                                                                                                                                                                                                                                                                                                                                                                               cambia el estado de login — no hace falta llamarlo
                                                                                                                                                                                                                                                                                                                                                                                  nosotros.
                                                                                                                                                                                                                                                                                                                                                                                  --------------------------------------------------------- */
                                                                                                                                                                                                                                                                                                                                                                                  auth.onAuthStateChanged(usuario => {
                                                                                                                                                                                                                                                                                                                                                                                    if(usuario){
                                                                                                                                                                                                                                                                                                                                                                                        // Hay alguien logueado: buscamos su nombre guardado
                                                                                                                                                                                                                                                                                                                                                                                            // y mostramos la pantalla de "sesión iniciada" (temporal
                                                                                                                                                                                                                                                                                                                                                                                                // hasta que en la Fase 2 pongamos el catálogo acá).
                                                                                                                                                                                                                                                                                                                                                                                                    db.ref("usuarios/" + usuario.uid).once("value").then(snap => {
                                                                                                                                                                                                                                                                                                                                                                                                          const datos = snap.val() || {};
                                                                                                                                                                                                                                                                                                                                                                                                                const nombre = datos.nombre || usuario.email;
                                                                                                                                                                                                                                                                                                                                                                                                                      document.getElementById("texto-usuario-logueado").textContent = "¡Hola, " + nombre + "!";
                                                                                                                                                                                                                                                                                                                                                                                                                            mostrarPantalla("pantalla-bienvenido-usuario");
                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                      // Nadie logueado: mostramos la bienvenida inicial
                                                                                                                                                                                                                                                                                                                                                                                                                                          mostrarPantalla("pantalla-bienvenida");
                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                            });