# LoadBot — site de présentation

Vitrine statique en français, réalisée à partir des visuels, du flyer et du PowerPoint LoadBot fournis.

## Ouvrir le site

Double-cliquez sur **`index.html`** pour l’ouvrir dans votre navigateur. Le site fonctionne hors ligne : aucune installation, police distante ou bibliothèque externe n’est nécessaire.

Pour le consulter avec un serveur local, depuis ce dossier :

```sh
python3 -m http.server 8000
```

Puis ouvrez **http://localhost:8000**. Arrêtez le serveur avec `Ctrl+C`.

## Pendant la présentation

- Les boutons **ColBot / ScoutBot / AéroBot** changent le robot affiché à l’accueil.
- **Découvrir…** ouvre une fiche détaillée pour chaque robot.
- **Voir la démo** lance une livraison fictive sur une carte. La simulation peut être mise en pause, reprise et rejouée.
- **Imaginer ma flotte**, dans une fiche robot, présélectionne le modèle dans le formulaire.
- Le formulaire affiche une confirmation fictive. Il n’envoie aucun message et ne conserve aucune donnée.
- La présentation PowerPoint et le flyer sont téléchargeables depuis le pied de page.
- Les fenêtres se ferment avec leur bouton, un clic à l’extérieur ou la touche `Échap`.

Le site est adapté aux mobiles, navigable au clavier et respecte la préférence de réduction des animations.

## Fichiers

- `index.html` : contenu et structure.
- `styles.css` : identité visuelle et mise en page responsive.
- `script.js` : menu mobile, fiches robots, simulation et formulaire.
- `favicon.svg` : icône de l’onglet.

Conservez les images, le flyer et `LoadBot.pptx` dans le même dossier que `index.html` pour que les visuels et téléchargements restent accessibles.
