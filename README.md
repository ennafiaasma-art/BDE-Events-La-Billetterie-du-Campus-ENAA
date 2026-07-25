<<<<<<< HEAD
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
=======
# BDE-Events-La-Billetterie-du-Campus-ENAA
>>>>>>> 975711ed57797ce768f1757cdfb9e9dc2e56c53c
  





  # 🎫 BDE-Events - La Billetterie du Campus ENAA

## 📌 Description

**BDE-Events** est une plateforme web développée avec **Laravel 12** permettant au Bureau des Étudiants (BDE) de gérer les événements du campus ENAA.

La plateforme offre un espace d'administration permettant de créer et gérer les événements ainsi qu'un espace étudiant où les utilisateurs peuvent réserver leur place, consulter leurs billets numériques et obtenir un pass unique pour chaque réservation.

---

# 🎯 Objectifs du projet

- Digitaliser la gestion des événements du campus.
- Simplifier le processus de réservation des étudiants.
- Générer automatiquement un billet numérique unique.
- Fournir un tableau de bord pour le suivi des réservations.

---

# 🚀 Fonctionnalités

## 👨‍💼 Administration (BDE)

- Authentification administrateur
- Création d'événements
- Modification d'événements
- Suppression d'événements
- Gestion de la capacité maximale
- Visualisation du nombre de réservations
- Suivi des places restantes

---

## 👨‍🎓 Espace Étudiant

- Inscription
- Connexion
- Consultation des événements disponibles
- Réservation d'un événement gratuit
- Empêcher la double réservation
- Consultation de l'historique des réservations

---

## 🎟️ Gestion des Tickets

Après une réservation, le système génère automatiquement :

- Un numéro de réservation unique
- Un billet numérique (Pass Étudiant)

Le ticket contient :

- Nom de l'étudiant
- Titre de l'événement
- Date
- Heure
- Lieu
- Code de réservation

Exemple :

```
BDE-2026-8F4A92
```

---

# 📚 User Stories

## Épic 1 : Gestion des événements

### US 1.1

Créer un événement avec :

- Titre
- Description
- Date
- Heure
- Lieu
- Prix
- Capacité maximale

### US 1.2

Consulter en temps réel :

- Nombre de réservations
- Places restantes

---

## Épic 2 : Réservation

### US 2.1

Un étudiant peut :

- réserver un événement gratuit
- uniquement si celui-ci n'est pas complet
- une seule réservation par événement

---

## Épic 3 : Génération du Pass

### US 3.1

Chaque étudiant peut consulter son espace **Mes Billets** contenant son ticket numérique.

---

# 🏗️ Architecture

```
Laravel
│
├── Models
│   ├── User
│   ├── Evenement
│   ├── Reservation
│   └── Ticket
│
├── Controllers
│   ├── AuthController
│   ├── EvenementController
│   ├── ReservationController
│   └── TicketController
│
├── Migrations
├── Seeders
├── Blade Views
└── Routes
```

---

# 🛠️ Technologies utilisées

- Laravel 12
- PHP 8.4
- MySQL
- Blade
- Bootstrap / Tailwind CSS
- Laravel Eloquent ORM
- Git & GitHub
- Docker
- Swagger (Documentation API)

---

# 📂 Base de données

Les principales tables sont :

- users
- evenements
- reservations
- tickets

Relations :

```
User
  │
  ├── possède plusieurs Reservations
  │
Reservation
  │
  ├── appartient à un User
  ├── appartient à un Evenement
  └── possède un Ticket

Evenement
  │
  └── possède plusieurs Reservations
```

---

# 🔐 Rôles

## Administrateur (BDE)

- Gestion des événements
- Consultation des réservations
- Suivi des capacités

## Étudiant

- Réserver un événement
- Consulter ses billets
- Télécharger son pass

---

# ⚙️ Installation

## Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/BDE-Events.git
```

Entrer dans le dossier

```bash
cd BDE-Events
```

Installer les dépendances

```bash
composer install
```

Copier le fichier d'environnement

```bash
cp .env.example .env
```

Générer la clé de l'application

```bash
php artisan key:generate
```

Configurer la base de données dans `.env`

Puis exécuter :

```bash
php artisan migrate
```

Lancer le serveur

```bash
php artisan serve
```

---

# 📖 Documentation API

La documentation Swagger est disponible à l'adresse :

```
http://localhost:8000/api/documentation
```

---

# 📁 Structure du projet

```
app/
database/
routes/
resources/views/
public/
storage/
```

---

# 📸 Captures d'écran

À ajouter :

- Tableau de bord administrateur
- Liste des événements
- Réservation
- Mes billets
- Ticket numérique

---

# 👨‍💻 Auteur

**Asma Ennafia**

Étudiante en Développement Web 

École Numérique Ahmed El Hansali (ENAA)

---

# 📄 Licence

Projet réalisé dans le cadre de la formation **Développeur Web **.

---

# ✅ Améliorations futures

- Paiement en ligne
- QR Code sur les tickets
- Notifications par email
- Tableau de bord analytique
- Export PDF des billets
- Recherche et filtres des événements
- Application mobile
