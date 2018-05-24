import firebase from 'firebase';


export function isSignedIn(){


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return true;
    } else {
      if (firebase.auth().currentUser) {
        
        return true;
      } else {
        return false
      }
    }
  })

}
