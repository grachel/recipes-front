import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  url: "http://localhost:8080/",
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // *** Begin Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** End Auth API ***


  // *** Begin User API ***

  user = uid => this.get("users", uid); 

  createUser = (uid, username, email) => this.post("users", {uid, username, email})
  
  // *** End User API ***

  async get(url, id) {
    try {
      const token = await this.auth.currentUser.getIdToken();
      const resp = await fetch(config.url + url + "/" + id, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "x-firebase-auth": token
        },
        redirect: "follow",
        referrer: "no-referrer",
      })

      const json = await resp.json();      
      return json
    } catch (err) {
      console.log(err)
    }
  }

  async post(url, data) {
    try {
      const token = await this.auth.currentUser.getIdToken();
      const resp = await fetch(config.url + url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "x-firebase-auth": token,
          'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data)
      })

      const json = await resp.json();      
      return json
    } catch (err) {
      console.log(err)
    }
  }

}

export default Firebase;