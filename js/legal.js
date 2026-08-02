/* =========================================================
   LÓGICA DE LAS PÁGINAS LEGALES
      Términos y Condiciones, Política de Privacidad y
         Política de Seguridad se muestran en la misma pantalla,
            cambiando solo el título y el contenido.
            ========================================================= */

            const LEGAL_TEXTOS = {

              terminos: {
                  titulo: "Términos y Condiciones de Uso",
                      contenido: `Última actualización: 1 de agosto de 2026
                      Aplica a: Aplicación móvil y servicios de MICELAND, con operación en Bogotá, Colombia.

                      1. Aceptación de los términos
                      Al crear una cuenta, navegar el catálogo o realizar una compra en MICELAND, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguna parte, te pedimos no usar la aplicación.

                      2. ¿Quiénes somos?
                      MICELAND es una plataforma de comercio electrónico en crecimiento, con sede en Bogotá, Colombia, que busca ofrecer a sus clientes una amplia variedad de productos para el día a día —moda, hogar, tecnología, cuidado personal, ferretería y más— con la meta de convertirse en una alternativa confiable y cercana para las familias colombianas.

                      3. Registro y cuenta de usuario
                      - Para comprar debes crear una cuenta con un correo electrónico válido y una contraseña segura.
                      - Eres responsable de mantener la confidencialidad de tus credenciales y de toda actividad realizada desde tu cuenta.
                      - Debes proporcionar información veraz al registrarte. MICELAND se reserva el derecho de suspender cuentas con información falsa o fraudulenta.
                      - Puedes solicitar la eliminación de tu cuenta en cualquier momento contactándonos.

                      4. Productos, precios y disponibilidad
                      - Los precios se muestran en pesos colombianos (COP) e incluyen los impuestos aplicables, salvo que se indique lo contrario.
                      - Las imágenes son referenciales; pueden existir variaciones menores de color o presentación respecto al producto físico.
                      - Los precios y la disponibilidad de los productos pueden cambiar sin previo aviso debido a la naturaleza dinámica del inventario.
                      - En caso de un error evidente de precio (por ejemplo, un error tipográfico), MICELAND se reserva el derecho de cancelar el pedido y notificar al cliente, ofreciendo el reembolso correspondiente.

                      5. Proceso de compra y medios de pago
                      - La compra se confirma una vez recibido el pago a través de los medios habilitados en la plataforma.
                      - MICELAND podrá solicitar verificación adicional en caso de pedidos que presenten indicios de fraude.

                      6. Envíos y entregas
                      - Los tiempos de entrega son estimados y pueden variar según la zona de cobertura, la disponibilidad del producto y factores logísticos externos.
                      - El cliente debe proporcionar una dirección de entrega completa y correcta. MICELAND no se hace responsable por retrasos derivados de información incompleta o errónea.

                      7. Devoluciones, cambios y garantías
                      - El cliente tiene derecho a solicitar la devolución o cambio de un producto conforme a lo establecido en el Estatuto del Consumidor colombiano (Ley 1480 de 2011), incluyendo el derecho de retracto cuando aplique.
                      - Los productos deben devolverse en su empaque original y en las mismas condiciones en que fueron entregados, salvo defectos de fábrica.
                      - Las solicitudes de devolución deben realizarse dentro de los plazos legales vigentes, contactando a nuestro servicio al cliente.

                      8. Cancelaciones
                      MICELAND se reserva el derecho de cancelar pedidos en casos de error en el sistema, falta de disponibilidad del producto, o sospecha razonable de fraude, notificando siempre al cliente y realizando el reembolso correspondiente cuando aplique.

                      9. Conducta del usuario
                      Está prohibido:
                      - Usar la plataforma con fines fraudulentos o ilegales.
                      - Publicar, en caso de vendedores externos, productos falsificados o que infrinjan derechos de terceros.
                      - Intentar vulnerar la seguridad de la aplicación o acceder a cuentas de otros usuarios sin autorización.
                      - Usar bots o medios automatizados no autorizados para interactuar con la plataforma.

                      10. Propiedad intelectual
                      El nombre "MICELAND", su logotipo, diseño de la aplicación y contenido original son propiedad de MICELAND. Queda prohibida su reproducción total o parcial sin autorización previa por escrito.

                      11. Limitación de responsabilidad
                      MICELAND actúa con diligencia para ofrecer una plataforma segura y confiable, pero no garantiza que el servicio esté libre de interrupciones o errores técnicos. En la medida permitida por la ley, MICELAND no será responsable por daños indirectos derivados del uso de la aplicación.

                      12. Protección al consumidor
                      Como consumidor en Colombia, cuentas con los derechos establecidos en la Ley 1480 de 2011 (Estatuto del Consumidor) y puedes acudir a la Superintendencia de Industria y Comercio (SIC) en caso de controversias no resueltas directamente con MICELAND.

                      13. Modificaciones a estos términos
                      MICELAND podrá actualizar estos Términos y Condiciones en cualquier momento. Los cambios significativos serán notificados dentro de la aplicación. El uso continuado del servicio implica la aceptación de las modificaciones.

                      14. Ley aplicable y jurisdicción
                      Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a los jueces competentes de Bogotá D.C., sin perjuicio de los derechos del consumidor a acudir a otras instancias establecidas por la ley.

                      15. Contacto
                      Para preguntas, solicitudes o reclamos, puedes escribirnos a [correo de contacto] o a través de los canales de atención disponibles en la aplicación.`
                        },

                          privacidad: {
                              titulo: "Política de Privacidad",
                                  contenido: `Última actualización: 1 de agosto de 2026

                                  En MICELAND respetamos tu privacidad y nos comprometemos a proteger tus datos personales conforme a la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia) y demás normativa aplicable.

                                  1. Responsable del tratamiento de datos
                                  MICELAND, con operación en Bogotá, Colombia, es responsable del tratamiento de los datos personales que recopila a través de esta aplicación.

                                  2. Datos que recopilamos
                                  Podemos recopilar los siguientes datos, dependiendo de cómo uses la aplicación:
                                  - Datos de registro: correo electrónico y contraseña (esta última gestionada de forma segura por Firebase Authentication, sin acceso directo por parte de MICELAND).
                                  - Datos de perfil: nombre, número de teléfono, dirección de envío, si decides agregarlos.
                                  - Datos de pedidos: historial de compras, productos guardados o favoritos.
                                  - Datos técnicos: información básica del dispositivo y uso de la aplicación, con fines de mejora del servicio y prevención de fraude.

                                  No recopilamos datos sensibles (como información de salud, creencias religiosas o políticas) a menos que tú mismo los proporciones voluntariamente en alguna sección específica de la app.

                                  3. Finalidad del tratamiento de datos
                                  Usamos tu información para:
                                  - Crear y gestionar tu cuenta de usuario.
                                  - Procesar tus pedidos y coordinar envíos.
                                  - Brindarte soporte y atención al cliente.
                                  - Enviarte notificaciones relacionadas con tus compras (confirmaciones, estado de envío, etc.).
                                  - Mejorar la experiencia de la aplicación y prevenir fraudes o accesos no autorizados.
                                  - Con tu autorización, enviarte promociones u ofertas relevantes.

                                  4. No venta de datos a terceros
                                  MICELAND no vende, alquila ni comercializa tu información personal con terceros para fines publicitarios ajenos a la plataforma.

                                  5. Compartición de datos con terceros necesarios para el servicio
                                  Para operar correctamente, compartimos ciertos datos con proveedores estrictamente necesarios, tales como:
                                  - Firebase (Google): para la autenticación y almacenamiento seguro de la información de tu cuenta.
                                  - Pasarelas de pago: para procesar tus transacciones de forma segura.
                                  - Empresas de mensajería o logística: para gestionar la entrega de tus pedidos.

                                  Estos proveedores están obligados a proteger tu información conforme a estándares de seguridad reconocidos.

                                  6. Almacenamiento y seguridad de los datos
                                  Tus datos se almacenan en servidores seguros de Firebase (Google Cloud), con las protecciones estándar de la industria. Podés consultar más detalles sobre nuestras medidas de seguridad en nuestra Política de Seguridad.

                                  7. Tus derechos como titular de los datos
                                  De acuerdo con la Ley 1581 de 2012, tienes derecho a:
                                  - Conocer, actualizar y rectificar tus datos personales.
                                  - Solicitar prueba de la autorización otorgada para el tratamiento de tus datos.
                                  - Ser informado sobre el uso que se le ha dado a tu información.
                                  - Revocar la autorización y/o solicitar la eliminación de tus datos, cuando no exista un deber legal o contractual que impida su supresión.
                                  - Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la normativa de protección de datos.

                                  Para ejercer cualquiera de estos derechos, contáctanos a [correo de contacto].

                                  8. Conservación de los datos
                                  Conservamos tus datos personales mientras tu cuenta esté activa, o durante el tiempo necesario para cumplir con obligaciones legales, contables o fiscales, según lo exija la normativa colombiana.

                                  9. Menores de edad
                                  MICELAND no está dirigida a menores de edad sin la supervisión y autorización de un padre, madre o acudiente responsable, conforme a la legislación colombiana vigente.

                                  10. Cambios en esta política
                                  Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos los cambios significativos dentro de la aplicación antes de que entren en vigor.

                                  11. Contacto
                                  Para preguntas, solicitudes o reclamos relacionados con el tratamiento de tus datos personales, escríbenos a [correo de contacto].`
                                    },

                                      seguridad: {
                                          titulo: "Política de Seguridad",
                                              contenido: `Última actualización: 1 de agosto de 2026

                                              En MICELAND, la seguridad de tu cuenta y de tu información es una prioridad. Esta política describe las medidas que implementamos y las recomendaciones que te ayudarán a proteger tu cuenta.

                                              1. Autenticación y contraseñas
                                              - El acceso a tu cuenta se gestiona mediante Firebase Authentication, un servicio de seguridad respaldado por Google, ampliamente utilizado por aplicaciones de todo el mundo.
                                              - Tu contraseña nunca se almacena en texto plano: se procesa mediante métodos de cifrado que impiden que MICELAND, o cualquier tercero, pueda leerla directamente.
                                              - Ni el equipo de MICELAND ni ningún colaborador tendrá acceso a tu contraseña en ningún momento.

                                              2. Protección de datos de pago
                                              - MICELAND no almacena directamente los datos completos de tarjetas de crédito o débito en sus servidores. Las transacciones se procesan a través de pasarelas de pago certificadas, que cumplen con los estándares de seguridad de la industria (PCI DSS).
                                              - Nunca te pediremos el número completo de tu tarjeta, código de seguridad (CVV) o clave dinámica por correo, mensaje de texto o llamada telefónica.

                                              3. Recuperación de cuenta
                                              - Si olvidas tu contraseña, puedes restablecerla de forma segura desde la opción "¿No puedes ingresar?" en la pantalla de inicio de sesión. Recibirás un enlace de restablecimiento únicamente en el correo asociado a tu cuenta.
                                              - Por motivos de seguridad, no confirmamos si un correo específico está o no registrado en nuestra plataforma al procesar una solicitud de restablecimiento.

                                              4. Comunicaciones oficiales
                                              - MICELAND se comunicará contigo únicamente a través de los canales oficiales indicados en la aplicación.
                                              - Desconfía de correos, mensajes o llamadas que soliciten tu contraseña, códigos de verificación, o datos bancarios completos, incluso si aparentan venir de MICELAND. Este tipo de solicitudes son un intento de fraude (phishing) y nunca las haremos.

                                              5. Buenas prácticas recomendadas para tu cuenta
                                              - Usa una contraseña única para MICELAND, que no reutilices en otras plataformas.
                                              - Evita compartir tu contraseña con terceros, incluso con familiares o amigos.
                                              - Si accedes desde un dispositivo compartido o público, cierra sesión al terminar.
                                              - Mantén actualizada la aplicación para recibir las últimas mejoras de seguridad.

                                              6. Monitoreo y prevención de fraude
                                              MICELAND implementa mecanismos de monitoreo para identificar actividad inusual o sospechosa en las cuentas, con el objetivo de proteger tanto a los compradores como a la integridad de la plataforma.

                                              7. Reporte de incidentes de seguridad
                                              Si sospechas que:
                                              - Alguien accedió a tu cuenta sin tu autorización,
                                              - Recibiste una comunicación sospechosa haciéndose pasar por MICELAND,
                                              - O detectaste alguna vulnerabilidad en la aplicación,

                                              Por favor contáctanos de inmediato a [correo de contacto] para que podamos investigar y actuar oportunamente.

                                              8. Actualizaciones a esta política
                                              Esta Política de Seguridad podrá actualizarse conforme evolucionen nuestras prácticas y la tecnología disponible. Te notificaremos los cambios relevantes dentro de la aplicación.

                                              9. Contacto
                                              Para reportes de seguridad o dudas relacionadas, escríbenos a [correo de contacto].`
                                                }

                                                };

                                                // Guardamos desde qué pantalla se abrió lo legal, para
                                                // poder volver justo ahí (y no siempre a la bienvenida).
                                                let PANTALLA_ANTES_DE_LEGAL = "pantalla-bienvenida";

                                                function mostrarLegal(tipo){
                                                  const pantallaActual = document.querySelector(".pantalla.visible");
                                                    if(pantallaActual){
                                                        PANTALLA_ANTES_DE_LEGAL = pantallaActual.id;
                                                          }

                                                            const info = LEGAL_TEXTOS[tipo];
                                                              if(!info) return;

                                                                document.getElementById("titulo-legal").textContent = info.titulo;
                                                                  document.getElementById("contenido-legal").textContent = info.contenido;

                                                                    mostrarPantalla("pantalla-legal");
                                                                    }

                                                                    function volverDeLegal(){
                                                                      mostrarPantalla(PANTALLA_ANTES_DE_LEGAL);
                                                                      }
                                                                      