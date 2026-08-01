/* =========================================================
   LÓGICA DE LA FASE 1: LOGIN Y REGISTRO
   ========================================================= */

   let modoFormulario = "login";

   function mostrarPantalla(idPantalla){
     document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("visible"));
       document.getElementById(idPantalla).classList.add("visible");
       }

       function mostrarFormulario(modo){
         modoFormulario = modo;
           actualizarTextosFormulario();
             limpiarFormulario();
               mostrarPantalla("pantalla-formulario");
               }

               function volverABienvenida(){
                 mostrarPantalla("pantalla-bienvenida");
                 }

                 function cambiarModo(){
                   modoFormulario = (modoFormulario === "login") ? "registro" : "login";
                     actualizarTextosFormulario();
                       limpiarFormulario();
                       }

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

                                                                                                                                                                                                                                                                                                                   function cerrarSesionUsuario(){
                                                                                                                                                                                                                                                                                                                     auth.signOut();
                                                                                                                                                                                                                                                                                                                     }

                                                                                                                                                                                                                                                                                                                     auth.onAuthStateChanged(usuario => {
                                                                                                                                                                                                                                                                                                                       if(usuario){
                                                                                                                                                                                                                                                                                                                           db.ref("usuarios/" + usuario.uid).once("value").then(snap => {
                                                                                                                                                                                                                                                                                                                                 const datos = snap.val() || {};
                                                                                                                                                                                                                                                                                                                                       const nombre = datos.nombre || usuario.email;
                                                                                                                                                                                                                                                                                                                                             document.getElementById("texto-usuario-logueado").textContent = "¡Hola, " + nombre + "!";
                                                                                                                                                                                                                                                                                                                                                   mostrarPantalla("pantalla-bienvenido-usuario");
                                                                                                                                                                                                                                                                                                                                                       });
                                                                                                                                                                                                                                                                                                                                                         } else {
                                                                                                                                                                                                                                                                                                                                                             mostrarPantalla("pantalla-bienvenida");
                                                                                                                                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                                                                                                                                               });