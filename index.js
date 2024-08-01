const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.webhook = functions.https.onRequest((request, response) => {
  try {
    // Estrai tutti i dati del modulo
    const formData = request.body;

    // Log dei dati del modulo per debug
    console.log("Form Data: ", formData);

    // Salva i dati nel database Realtime
    const db = admin.database();
    const ref = db.ref('/formSubmissions');
    ref.push(formData);

    // Rispondi con successo
    response.status(200).send('Success');
  } catch (error) {
    console.error("Error in webhook: ", error);
    response.status(500).send({ error: 'Error in webhook' });
  }
});


