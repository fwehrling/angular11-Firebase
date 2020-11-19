## Mybooks

- Projet créé avec [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1

- mettre à jour @angular/cli => npm i -g @angular/cli

## Création du projet angular

ng new books --skip-tests

## Lancer l'application

ng serve -o

## Ajout d'une règle prettier pour afficher les single quote dans .prettierrc.js

```
module.exports = {
    singleQuote: true
};
```

## Installations complémentaires

- ng add @angular/material
- npm i bootstrap@3.3.7
- npm i firebase @angular/fire

## CSS : Angular.json

```
"styles": [
    "src/styles.scss",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
]
```

## Modules Material

- Créer le fichier material.module.ts
- L'importer dans app.module.ts

## Firebase

- Créer un compte
- Créer un projet
- Copier la configuration

## Environnement

Coller la configuration Firebase dans environment.ts

```
export const environment = {
  production: false,
  firebase: {
    apiKey: 'xxxx',
    authDomain: 'xxxx',
    databaseURL: 'xxxx',
    projectId: 'xxxx',
    storageBucket: 'xxx'x,
    messagingSenderId: 'xxxx',
    appId: 'xxxx',
  },
};
```

## Header

Créer le header

## Router Outlet

Préparer le fichier app.component.html pour permettre le routing

## Signin

Créer le componsant signin

## Signup

Créer le composant signup

## Auth

Créer le service auth

## Guard

Créer le service auth-guard

## Interface

Créer l'interface book

## Module

Créer le module book

## Composants

Créer les composants book-list, book-detail, book-form

## Routing

Créer le fichier routing de book

## Service

- Créer le service book
- Créer toutes les méthodes

## Register

Préparer le formulaire d'inscription

## Login

Préparer le formulaire de login

## Logout

Implémenter la fonctionnalié du logout

## Formulaire de création d'un book

Préparer le formulaire d'ajout d'un book

## Liste des books

Afficher la liste des books

## Supprimer un book

Supprimer un book de la liste

## Afficher le détail d'un book

Afficher la vue du détail d'un book

## Modifier un book

Implémenter la modification d'un book avec le même formulaire que celui qui permet de créer un book

## Upload image d'un book

Implémenter l'upload d'une image dans le formulaire de création d'un book
