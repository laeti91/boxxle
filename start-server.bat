@echo off
echo Demarrage du serveur pour Frodo's Birthday Banquet...
echo Ouvrez votre navigateur sur: http://localhost:8000
echo Appuyez sur Ctrl+C pour arreter le serveur

::taper cette commande dans votre terminal, puis lancer le serveur local ci-dessus
python -m http.server 8000
pause