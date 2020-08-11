import { auth } from "./firebase.utils";

export const signup = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

export const signin = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
};

export const signInWithGithub = () => {
  const provider = auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
};
