import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';

@Injectable()
export class AutorizacionService {
    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.isLogged();
    }

    public facebookLogin(){
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => {
            console.log(result);
            alert('Usuario loggueado con Facebook');
            this.router.navigate(['lugares']);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    public login (email, password) {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                alert('Usuario Logueado');
                console.log(response);
                this.router.navigate(['lugares']);
            })
            .catch((error) => {
                alert('Error');
                console.log(error);
            })
    }

    public logout(){
        this.angularFireAuth.auth.signOut();
        alert('Usuario Deslogueado');
        this.router.navigate(['lugares']);
    }

    public registro(email, password) {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                alert('Usuario Registrado');
                console.log(response);
            })
            .catch((error) => {
                alert('Error');
                console.log(error);
            })
    }

    public isLogged() {
        return this.angularFireAuth.authState;
    }

    public getEmail() {
        this.angularFireAuth.auth.currentUser.email;
    }
    
}