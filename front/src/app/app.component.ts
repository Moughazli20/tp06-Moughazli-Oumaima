import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, fromEvent, of } from 'rxjs';
import { Produit } from './models/produit';
import { startWith, map, distinctUntilChanged, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PanierService } from './panier.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  afficherPanier: boolean = false;
  afficherCatalogue: boolean = false;
  totalPanier: number | null = null;
  model!: Observable<Produit[]>;
  name = 'Angular';
  searchField$!: Observable<string>;
  @ViewChild('input', { static: true }) input!: ElementRef;
  login: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  codePostal: string = '';
  ville: string = '';
  sexe: string = '';
  telephone: string = '';
  email: string = '';
  cnx: boolean = false;
  errorMessage: string = '';
  InscrerrorMessage: string = '';
  produits$: Observable<Array<Produit>>;
  searchControl = new FormControl();
  searchFailed: boolean = false;
  articleAjoute: boolean = false;
  ajoutConfirmation: Map<Produit, boolean> = new Map();
  
  afficherInscription: boolean = false;

  constructor(private apiService: ApiService, private panierService: PanierService) {
    this.produits$ = this.apiService.getCatalogue();
  }

  basculerPanier() {
    this.afficherPanier = !this.afficherPanier;
  }

  basculerInscription() {
    this.afficherInscription = !this.afficherInscription;
  }

  obtenirArticles() {
    return this.panierService.obtenirArticles();
  }

  supprimerDuPanier(index: number) {
    this.panierService.supprimerDuPanier(index);
  }

  viderPanier() {
    this.panierService.viderPanier();
  }

  ajouterAuPanier(produit: Produit) {
    this.panierService.ajouterAuPanier(produit);
    this.ajoutConfirmation.set(produit, true);
    setTimeout(() => this.ajoutConfirmation.set(produit, false), 3000);
  }

  ngOnInit() {
    this.produits$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => value ? this.apiService.getSearchCatalogue(value) : this.apiService.getCatalogue()),
      catchError(() => of([]))
    );
  }

  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe(
      (client) => {
        this.nom = client.nom;
        this.prenom = client.prenom;
        this.cnx = true;
      },
      (error) => {
        console.error('Erreur de connexion:', error);
        this.cnx = false;
        this.errorMessage = "Login ou Mot de passe incorrect !!";
      }
    );
  }

  inscription() {
    // Check if required fields are filled
  if (!this.nom || !this.prenom || !this.login || !this.password) {
    this.InscrerrorMessage = "Veuillez remplir tous les champs obligatoires";
    return;
  }

  // Call the API service for inscription
  this.apiService.inscrireClient(this.nom, this.prenom, this.email, this.password, this.adresse, this.codePostal, this.ville, this.sexe, this.login, this.telephone).subscribe({
    next: (response) => {
      console.log('Inscription réussie:', response);
      this.afficherInscription = false;
      this.cnx = true;
      this.nom = response.nom;
      this.prenom = response.prenom;
      this.adresse = response.adresse;
      this.codePostal = response.codePostal;
      this.ville = response.ville;
      this.sexe = response.sexe;
      this.login = response.login;
      this.telephone = response.telephone;
    },
    error: (err) => {
      console.error('Erreur d’inscription:', err);
      this.errorMessage = "Erreur lors de l'inscription. Veuillez réessayer.";
    }
  });
  }

  calculerEtAfficherTotalPanier() {
    let totalTemporaire = 0;
    const articles = this.obtenirArticles();
    articles.forEach(article => {
      totalTemporaire += article.prix;
    });
    this.totalPanier = totalTemporaire;
  }

  searchProducts(searchTerm: string) {
    if (!searchTerm) {
      this.produits$ = this.apiService.getCatalogue();
    } else {
      this.produits$ = this.apiService.getSearchCatalogue(searchTerm);
    }
  }

  ngAfterViewInit() {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
    );

    this.model = this.searchField$.pipe(
      switchMap(term => this.apiService.getSearchCatalogue(term).pipe(
        catchError(() => of([]))
      ))
    );
  }
}



