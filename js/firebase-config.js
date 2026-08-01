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
                    appId: "1:544679131587:web:50fd1eb3644fa5ec9ce576"
                    };

                    firebase.initializeApp(firebaseConfig);
                    const auth = firebase.auth();
                    const db = firebase.database();