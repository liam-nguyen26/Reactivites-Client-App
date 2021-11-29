import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;

  //login ben userStore xong tra ve token
  //lay token do set qua day thi no se tu react lai va set vao localstorage
  //set xong thi goi token trong commonStore o interceptor roi goi api

  constructor() {
    makeAutoObservable(this);

    //only run when token change not run when initialize this store
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );

    //we do have auto run but do not need to use that here
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    this.token = token;
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
