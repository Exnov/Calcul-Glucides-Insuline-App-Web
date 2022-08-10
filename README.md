# Calcul Glucides Insuline - Application Web (en local)
![Logo](./img/logo.png  "Calcul Glucides Insuline")

## C'est quoi ?
Calcul Glucides Insuline (CGI pour les pressés) est la version application web de l'application Android du même nom ; un programme développé pour aider les diabétiques de type 1 à calculer leur dose d'insuline rapide. Plus d'infos [ici](https://github.com/Exnov/Calcul-Glucides-Insuline-App-Android/blob/main/README.md).

## Pour qui ?
Avec cette version, même les adorateurs de la pomme peuvent faire des calculs de rapide, ou juste connaître le pourcentage de glucides d'un aliment. Suffit de passer par son navigateur préféré ; une fois l'application téléchargée sur sa machine bien sûr. 

## Mais encore...
L'autre intérêt concerne les utilisateurs qui bidouillent un peu de code. Les développeurs pourront personnaliser l'application comme bon leur semble, sans taper dans du Java (ou du Kotlin pour ceux qui sont dans le coup). Ici on fait avec React et ça se passe très bien.

## Environnement de travail pour personnaliser l'application :
La partie qui suit est pour les développeurs.

Après avoir téléchargé l'appli sur votre ordi, vous aurez besoin d'avoir le gestionnaire de paquets Javascript npm, et d'installer Babel. Babel transformera en Javascript le code JSX (code Javascript à la sauce React) que vous écrirez dans les fichiers du dossier « src ». 

Pour ça, vous devrez taper la commande npm run build à chaque modification de ces fichiers ; depuis la racine de l'application (là où se trouve index.html). Le « convertisseur » traduira alors votre code en Javascript classique dans les fichiers du dossier « lib » ; c'est dans ce dossier que sont contenus les fichiers Javascript qui sont appelés dans index.html (cf les balises script en bas du fichier).

Pour installer npm, il faut installer l'interpréteur de code Javascript Node.js ; direction cette [jolie page](https://nodejs.org/en/download/). Pour installer Babel, RDV avec votre invite de commandes chéri à la racine de l'application web, et lancez la commande suivante (cf [la doc de Babel](https://babeljs.io/setup#installation)) :
```
npm install --save-dev @babel/core @babel/cli 
```

Vous pouvez maintenant utiliser Babel et bidouiller tranquillement l'appli avec React !
