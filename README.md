# 🎫 BDE-Events — La Billetterie du Campus ENAA

## 📌 Description

**BDE-Events** est une plateforme web développée avec **Laravel 12** et **React** permettant au Bureau des Étudiants (BDE) de gérer les événements du campus ENAA.

La plateforme offre :

- un espace d'administration pour gérer les événements ;
- un espace étudiant pour consulter les événements ;
- un système de réservation ;
- une gestion de la capacité maximale ;
- la génération automatique d'un ticket numérique pour chaque réservation.

---

# 🎯 Objectifs du projet

- Digitaliser la gestion des événements du campus.
- Simplifier le processus de réservation des étudiants.
- Éviter les doubles réservations.
- Gérer automatiquement les places disponibles.
- Générer automatiquement un ticket numérique unique.
- Fournir un espace d'administration pour gérer les événements.
- Centraliser les réservations des étudiants.

---

# 🚀 Fonctionnalités

## 👨‍💼 Administration — BDE

L'administrateur peut :

- Se connecter à son espace.
- Créer un événement.
- Modifier un événement.
- Supprimer un événement.
- Consulter la liste des événements.
- Définir une capacité maximale.
- Suivre les réservations.
- Suivre les places disponibles.

---

## 👨‍🎓 Espace Étudiant

L'étudiant peut :

- Créer un compte.
- Se connecter.
- Consulter les événements disponibles.
- Réserver un événement.
- Consulter ses réservations.
- Consulter ses tickets.

Le système empêche :

- une double réservation pour le même événement ;
- une réservation lorsque la capacité maximale est atteinte.

Lorsque toutes les places sont réservées, le système affiche :

> **Les places sont épuisées pour cet événement.**

---

# 🎟️ Gestion des Tickets

Après une réservation réussie, un ticket est généré automatiquement.

Le ticket contient notamment :

- le numéro du ticket ;
- le code du ticket ;
- le code de réservation ;
- les informations liées à la réservation.

Exemple :

```text
BDE-2026-8F4A92


📚 User Stories
Épic 1 — Gestion des événements
US 1.1 — Créer un événement

L'administrateur peut créer un événement avec :

Titre
Description
Date
Lieu
Prix
Capacité maximale



US 1.2 — Modifier un événement

L'administrateur peut modifier les informations d'un événement existant.

US 1.3 — Supprimer un événement

L'administrateur peut supprimer un événement.

US 1.4 — Suivre la capacité

L'administrateur peut suivre :

le nombre de réservations ;
la capacité maximale ;
les places restantes.



Épic 2 — Réservation
US 2.1 — Réserver un événement

Un étudiant peut réserver un événement disponible.

Le système vérifie :

que l'utilisateur est connecté ;
que l'événement existe ;
que l'étudiant n'a pas déjà réservé ;
que la capacité maximale n'est pas atteinte
US 2.2 — Consulter mes réservations

L'étudiant peut consulter la liste de ses réservations.



Épic 3 — Génération du Pass
US 3.1 — Générer un ticket

Après une réservation réussie, un ticket numérique est généré automatiquement.

US 3.2 — Consulter mes billets

L'étudiant peut consulter ses tickets depuis son espace personnel


🏗️ Architecture du projet

BDE-Events
│
├── Backend Laravel
│   │
│   ├── app/
│   │   ├── Models/
│   │   │   ├── User
│   │   │   ├── Evenement
│   │   │   ├── Reservation
│   │   │   └── Ticket
│   │   │
│   │   └── Http/
│   │       └── Controllers/
│   │
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   └── routes/
│
├── Frontend React
│   │
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   └── package.json
│
└── Docker




🛠️ Technologies utilisées

Backend
Laravel 12
PHP 8.4
Laravel Eloquent ORM
MySQL
API REST

Frontend
React
Vite
Axios
React Router
Tailwind CSS


Outils
Git
GitHub
Jira
Docker
Docker Hub
Postman
📂 Base de données

Les principales tables utilisées sont :
users
evenements
reservations
tickets

Relations principales :  


User
 │
 └── possède plusieurs Reservations
                  │
                  ├── appartient à un User
                  ├── appartient à un Evenement
                  └── possède un Ticket

Evenement
 │
 └── possède plusieurs Reservations



🔐 Rôles

Administrateur — BDE
Gestion des événements
Modification des événements
Suppression des événements
Suivi des réservations
Suivi de la capacité


Étudiant
Inscription
Connexion
Consultation des événements
Réservation
Consultation des réservations
Consultation des tickets


🔌 API REST

Les principales routes API comprennent :



POST   /api/login
POST   /api/logout

GET    /api/evenements
POST   /api/evenements
PUT    /api/evenements/{id}
DELETE /api/evenements/{id}

POST   /api/reservations
GET    /api/mes-reservations

🐳 Docker

Le projet est conteneurisé avec Docker afin de faciliter le déploiement du Back-end Laravel et du Front-end React.

🔹 Image Docker — API Back-end

Image Docker du Back-end Laravel :

tasmatasomacom/bde-events-api:latest
Docker Hub :
###
Pour récupérer l'image :
docker pull tasmatasomacom/bde-events-api:latest


🔹 Image Docker — Front-end React
Image Docker du Front-end React :

tasmatasomacom/bde-events-frontend:latest

Docker Hub :
##
Pour récupérer l'image :

docker pull tasmatasomacom/bde-events-frontend:latest

📦 Images Docker disponibles


| Composant      | Image Docker                                |
| -------------- | ------------------------------------------- |
| Backend API    | `tasmatasomacom/bde-events-api:latest`      |
| Frontend React | `tasmatasomacom/bde-events-frontend:latest` |


⚙️ Installation en local

1. Cloner le projet


git clone https://github.com/VOTRE-UTILISATEUR/BDE-Events-La-Billetterie-du-Campus-ENAA.git



Puis :
cd BDE-Events-La-Billetterie-du-Campus-ENAA

2. Backend Laravel


Installer les dépendances :

composer install

Créer le fichier .env :
cp .env.example .env


Générer la clé Laravel :

php artisan key:generate

Configurer les informations de connexion MySQL dans .env.

Puis lancer les migrations :
php artisan migrate
Lancer le serveur Laravel :
php artisan serve



3. Frontend React
Entrer dans le dossier :
cd frontend
Installer les dépendances :

npm install
Lancer le serveur de développement :
npm run dev


📖 Documentation API

La documentation de l'API peut être consultée via :
http://localhost:8000/api/documentation


👨‍💻 Auteur

Asma Ennafia

Étudiante en Développement Web

École Numérique Ahmed El Hansali — ENAA


📄 Licence

Projet réalisé dans le cadre de la formation Développeur Web.



🚀 Améliorations futures
Paiement en ligne
QR Code sur les tickets
Notifications par email
Tableau de bord analytique
Export PDF des billets
Recherche et filtres des événements
Application mobile
