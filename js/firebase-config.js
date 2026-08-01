/* =========================================================
   CONFIGURACIÓN DE FIREBASE
      Estos son los datos reales del proyecto MICELAND.
      ========================================================= */
      const firebaseConfig = {
        apiKey: "AIzaSyCbz2oHE-8eDTdLGza46Cs3eJ6cJDa38ko",
          authDomain: "miceland-d7bed.firebaseapp.com",
            databaseURL: "https://miceland-d7bed-default-rtdb.firebaseio.com",
              projectId: "miceland-d7bed",
                storageBucket: "miceland-d7bed.firebasestorage.app",
                  messagingSenderId: "544679131587",
                    appId: "1:544679131587:web:d3e3a682afd521cb9ce576"
                    };

                    // Con esto arrancamos la conexión a Firebase.
                    firebase.initializeApp(firebaseConfig);

                    // Dejamos "auth" y "db" listos para que los use auth.js
                    // (y más adelante catalogo.js, carrito.js, etc.)
                    const auth = firebase.auth();
                    const db = firebase.database();