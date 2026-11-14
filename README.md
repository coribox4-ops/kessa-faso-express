# Site web — Kessa Faso Express

Site vitrine de Kessa Faso Express (nettoyage et entretien, Ouaga 2000, Ouagadougou).
Site statique, sans dépendance : HTML, CSS et JavaScript simples. Il fonctionne sur tout hébergement de fichiers (Netlify, GitHub Pages, hébergeur classique).

## Structure
- `index.html` : toutes les sections (accueil, services, à propos, réalisations, publics, appel à l'action, contact, pied de page) et les données Google (LocalBusiness).
- `assets/css/style.css` : mise en page, pensée d'abord pour le téléphone.
- `assets/js/main.js` : menu mobile, liens WhatsApp préremplis, formulaire de devis vers WhatsApp, galerie agrandie, carte chargée à la demande.
- `assets/img/` : images WebP en 3 tailles (480, 800, 1200 px).
- `assets/fonts/` : polices Cormorant Garamond (titres) et Jost (textes), licence libre SIL OFL, fichiers joints.

## Voir le site en local
```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000

## À compléter avant la mise en ligne
- [ ] Logo officiel (un logo en lettres provisoire est utilisé).
- [ ] Vraies photos de l'entreprise (galerie et emplacement avant/après).
- [ ] Liens Facebook et LinkedIn officiels (pied de page, et `sameAs` dans les données Google).
- [ ] Horaires complets (seule la fermeture à 18h est connue).
- [ ] Confirmer la prestation « Nettoyage après travaux » (sinon supprimer la carte marquée `data-a-confirmer`).
- [ ] Nom de domaine : ajouter la balise `canonical`, des adresses complètes pour `og:image` et `image`, puis un `sitemap.xml`.

## Crédits des images de démonstration
Photos Pexels (licence Pexels : utilisation gratuite, y compris commerciale, sans attribution obligatoire).
Personnes représentées : uniquement des femmes noires (choix de l'entreprise). Couleurs harmonisées à l'export.
Numéros Pexels : 6195198, 6196694, 6195954, 6197124, 6195196, 4353615, 6195957, 6197042, 6197041,
6197115, 4867360, 6195195, 8580755, 6195951, 3894376, 40045492, 36217325, 20143786, 32477672,
30165025, 33857126 (page : https://www.pexels.com/photo/<numéro>/).
