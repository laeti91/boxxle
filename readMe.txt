🇬🇧 ENGLISH TRANSLATION

Browsers prevent web pages from accessing local files to prevent malicious websites from reading your personal files. This is a standard security protection.
To bypass the security protocol, follow the steps below and create a simple server for a permanent solution:

#Create a start-server.bat file (Windows) or start-server.sh (Mac/Linux) in your BOXXLE folder
#Copy the script content corresponding to your OS
#Double-click it to start the server
#Go to http://localhost:8000 → ✅ Your spritesheets will work!

# ==========================================
# WINDOWS - Create a start-server.bat file
# ==========================================
@echo off
echo Starting server for Frodo's Birthday Banquet...
echo Open your browser at: http://localhost:8000
echo Press Ctrl+C to stop the server
python -m http.server 8000
pause

# ==========================================
# MAC/LINUX - Create a start-server.sh file
# ==========================================
#!/bin/bash
echo "Starting server for Frodo's Birthday Banquet..."
echo "Open your browser at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
python3 -m http.server 8000

# ==========================================
# ALTERNATIVE WITH NODE.JS
# ==========================================
# First install: npm install -g http-server
# Then create start-server-node.bat (Windows):
@echo off
echo Starting Node.js server...
http-server -p 8000 -c-1
pause

# ==========================================
# USAGE:
# ==========================================
# 1. Copy the script corresponding to your OS
# 2. Place it in your BOXXLE folder on shell
# 3. Double-click it to start
# 4. Go to http://localhost:8000





-------------------------------------------------------------------------------------------------------------------------------------------------------

🇫🇷 FRENCH TRANSLATION:

Les navigateurs empêchent les pages web d'accéder aux fichiers locaux pour éviter que des sites malveillants lisent vos fichiers personnels. 
C'est une protection de sécurité standard.

Afin de contourner le protocole de sécurité, suivez les étapes si dessous et créez un serveur simple afin d'avoir une solution permanente:

#Créez un fichier start-server.bat (Windows) ou start-server.sh (Mac/Linux) dans votre dossier BOXXLE
#Copiez le contenu du script correspondant à votre OS
#Double-cliquez dessus pour démarrer le serveur
#Allez sur http://localhost:8000 → ✅ Vos spritesheets fonctionneront !

# ==========================================
# WINDOWS - Créez un fichier start-server.bat
# ==========================================
@echo off
echo Demarrage du serveur pour Frodo's Birthday Banquet...
echo Ouvrez votre navigateur sur: http://localhost:8000
echo Appuyez sur Ctrl+C pour arreter le serveur
python -m http.server 8000
pause

# ==========================================
# MAC/LINUX - Créez un fichier start-server.sh
# ==========================================
#!/bin/bash
echo "Démarrage du serveur pour Frodo's Birthday Banquet..."
echo "Ouvrez votre navigateur sur: http://localhost:8000"
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
python3 -m http.server 8000

# ==========================================
# ALTERNATIVE AVEC NODE.JS
# ==========================================
# Installez d'abord : npm install -g http-server
# Puis créez start-server-node.bat (Windows) :
@echo off
echo Demarrage du serveur Node.js...
http-server -p 8000 -c-1
pause

# ==========================================
# UTILISATION :
# ==========================================
# 1. Copiez le script correspondant à votre OS
# 2. Placez-le dans votre dossier BOXXLE sur le shell
# 3. Double-cliquez dessus pour démarrer
# 4. Allez sur http://localhost:8000

