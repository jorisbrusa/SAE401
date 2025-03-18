import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mon-espace-connexion-admin',
  imports: [],
  templateUrl: './mon-espace-connexion-admin.component.html',
  styleUrl: './mon-espace-connexion-admin.component.css'
})
export class MonEspaceConnexionAdminComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(){}
  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl("test@test.fr"),
      mdp: new FormControl("test")
    });
  }
  login() {
    const login = this.loginForm.get('login')?.value
    const mdp = this.loginForm.get('mdp')?.value}
  
  clear() {
    this.loginForm.controls['login'].setValue('');
    this.loginForm.controls['mdp'].setValue('');
  }
}
