import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  projectId: '',
  appId: '',
  storageBucket: '',
  apiKey: '',
  authDomain: '',
  messagingSenderId: '',
  measurementId: '',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

navigator.serviceWorker
  .getRegistration('./ngsw-worker.js')
  .then((registration) => {
    console.log(registration);

    getToken(messaging, {
      vapidKey: '<YOUR_WEB_APP_PUSH_CERTIFICATE>',
      serviceWorkerRegistration: registration,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('currentToken', currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  });
