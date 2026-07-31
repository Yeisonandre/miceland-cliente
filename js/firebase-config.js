/* =========================================================
   CONFIGURACIÓN DE FIREBASE
      Este es el ÚNICO archivo que tenés que editar con tus
         datos reales antes de que la app funcione de verdad.

            ¿Dónde los conseguís?
               Firebase Console → ⚙️ Configuración del proyecto →
                  "Tus apps" → tu app web → "SDK setup and configuration"

                     Reemplazá cada "REEMPLAZAR..." por el valor real.
                     ========================================================= */
                     const firebaseConfig = {
                       apiKey: "REEMPLAZAR_API_KEY",
                         authDomain: "REEMPLAZAR.firebaseapp.com",
                           databaseURL: "https://REEMPLAZAR-default-rtdb.firebaseio.com",
                             projectId: "REEMPLAZAR",
                               storageBucket: "REEMPLAZAR.appspot.com",
                                 messagingSenderId: "REEMPLAZAR",
                                   appId: "REEMPLAZAR"
                                   };

                                   // Con esto arrancamos la conexión a Firebase.
                                   firebase.initializeApp(firebaseConfig);

                                   // Dejamos "auth" y "db" listos para que los use auth.js
                                   // (y más adelante catalogo.js, carrito.js, etc.)
                                   const auth = firebase.auth();
                                   const db = firebase.database();
                                   