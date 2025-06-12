//>>>>>>>IMPORTATION ET CONSTANTES<<<<<//

import { Levels } from "./levels.js";

/*INITIALISATION DES CONSTANTES DE LA GRILLE, DU RAFRAISSEMENT DES ANIMATIONS ET DES TOUCHES DU CLAVIER*/
const GRID_WIDTH = 50; /* 50 colonnes sur 25 lignes correspondent à un choix de 1250 cellules*/
const GRID_HEIGHT = 25; 

const FPS = 10; /*l'animation sera mise à jour 10 fois par seconde*/

const KEYS = { /*valeur des touches du clavier*/
    37: 'left', /*correspond au code ASCII de la flèche de gauche (←)*/
    39: 'right', /*correspond à la flèche de droite (→)*/
    38: 'up', /*correspond à la flèche du haut (↑)*/
    40: 'down' /*correspond à la flèche du bas (↓)*/
};

/*INITIALISATION DU TYPE DE CELLULE*/
const EMPTY = 0; //case vide (sol)
const TREE = 1; //arbres obstacles (mur)
const FRIEND = 2; //les amis de frodon (Sam, Merry, Pippin, Gandalf)
const FRODO = 3; //le hero (frodon)
const TARGET = 4; //les tables du banquet (cible)


//>>>>>>VAIABLES DE CONTENEUR, DE DIRECTION, DE SPRITESHEET ET D'ANIMATION<<<<<<//

/*ETAT INITIAL DU JEU*/
let currentLevel = 0; //niveau initial du jeu
let gameGrid = []; //tableau 2D vide qui contiendra les cellules du jeu
let gameColumn = 0; //largeur du jeu (adapter selon le niveau)
let gameRow = 0; //hauteur du jeu (adapter selon le niveau)

let frodoX = 0; //position horizontale de frodon (colonne)
let frodoY = 0; //position verticale de frodon (ligne)

let friends = []; //tableau vide qui contiendra les amis de frodon
let targets = []; //tableau vide qui contiendra les cibles
let steps = 0; //compteur de pas effectués par frodon

/*VARRIABLES D'ANIMATION*/
let animationInterval; 
let timeStamp = 0; //mise à jour du dernier mouvement
let animationPaused = false; //animation en pause ou en cours

/*VARIABLE D'AFFICHAGE POPUP GESTION SELON LE TIMER OU L'AFFICHAGE D'UN NOUVEAU MESSAGE*/
let popupTimeOut = null;

/*VARIABLE D'ÉTAT DU NIVEAU*/
let levelCompleted = false; //pour savoir si le niveau est terminé ou non

//>>>>>>CREATION DE LA GRILLE DU JEU<<<<<<<//

/*INITIALISATION D'UN NIVEAU*/
function initLevel(levelIndex){
    //vérification du nombre de niveau
    if (!Levels || !Levels[levelIndex]){
        console.error(`Niveau ${levelIndex} introuvable`); //affichage d'un message d'erreur si le niveau n'existe pas
        console.log("niveaux disponibles:", Levels.length); //affichage du nombre de niveaux disponibles
        showMessage(`Level ${levelIndex + 1} not found... Only ${Levels.length} available levels are shown`); //affichage d'un message sur les niveaux disponibles
        return false; //on quitte la fonction si le niveau n'existe pas
    }

    //récupération des données du niveau
    const levelData = Levels[levelIndex];

    currentLevel = levelIndex; //mise à jour du niveau actuel
    levelCompleted = false; //on réinitialise l'état du niveau à non terminé
    
    //calcul des dimensions du niveau
    gameRow = levelData.length; //nombre de lignes du niveau
    gameColumn = levelData[0].length; //mise à jour de la largeur du jeu

    //réinitialisation des variables du jeu
    gameGrid = []; //on vide la grille
    friends = []; //on vide les amis
    targets = []; //on vide les cibles
    steps = 0; //on remet le compteur de pas à 0

    //analyse de chaque cellule du niveau
    for (let y = 0; y < gameRow; y++){ //on parcours chaque ligne
        let row = []; //création d'une ligne vide
        for (let x = 0; x < gameColumn; x++){ //on parcours chaque cellule de la ligne
            const cellValue = levelData[y][x]; //on récupère la valeur de la cellule

            //identifier le type de cellule
            if (cellValue === FRODO){
                frodoX = x; //on met à jour la position verticale de frodon
                frodoY = y; //on met à jour la position horizontale de frodon
                row.push(EMPTY); //si frodon n'est pas dans la grille, on met le sol
                //affichage console pour vérifié que frodon est bien positionné
                console.log(`Frodon positionné en (${x}, ${y})`);
            }else if (cellValue === FRIEND){
                friends.push({x: x, y: y}); //on ajoute un ami de frodon à la liste des amis
                row.push(FRIEND); //on ajoute l'ami de frodon à la ligne
                //affichage console pour vérifié que l'ami est bien positionné
                console.log(`Ami positionné en (${x}, ${y})`)
            }else if (cellValue === TARGET){
                targets.push({x: x, y: y}) //on ajoute une cible à la liste des cibles
                row.push(TARGET); //on ajoute une cible à la ligne
                //affichage console pour vérifié que la cible est bien positionnée
                console.log(`Table de banquet positionné en (${x}, ${y})`);
            }else{
                row.push(cellValue); //pour les autres cellules (arbre ou vide), on ajoute la valeur de la cellule
            }
        }
        gameGrid.push(row); //on ajoute la ligne au tableau 2D
    }
    //affichage console le niveau chargé avec succès
    console.log(`Niveau ${levelIndex} chargé avec succès`);
    showMessage(`Level ${levelIndex + 1} loaded successfully!`);

    createGrid(); //on crée la grille du jeu
    draw(); //on dessine le jeu
    return true; //on retourne vrai en cas de chargement réussi du niveau
}


/*CREATION DE LA GRILLE*/
function createGrid(){
    const gameBoard = document.getElementById("gameBoard"); //on récupère l'ID HTML de la grille du jeu
    //on réinitialise le contenu de la grille
    gameBoard.innerHTML = "";
    //on configure la grille css
    gameBoard.style.gridTemplateColumns = `repeat(${gameColumn}, 1fr)`; //le nombre de colonnes est égal à la largeur du jeu
    gameBoard.style.gridTemplateRows = `repeat(${gameRow}, 1fr)`; //le nombre de lignes est égal à la hauteur du jeu
    
    let totalCell = gameColumn * gameRow; //on calcule le nombre total de cellules dans la grille
    for (let i=0; i < totalCell; i++){ //on parcours chaque cellule
        const cell = document.createElement("div"); //on crée un nouvel élément HTML div pour une cellule
        cell.className = "cell"; //on ajoute une classe css pour chaque cellule individuelle
        cell.id = `cell-${i}`; //on ajoute un ID a chaque cellule
        gameBoard.appendChild(cell); //on ajoute chaque cellule individuelle à la grille du jeu
    }
    //affichage console pour vérifié que toutes les cellules ont été créé
    console.log(`${totalCell} cellules créé dans la grille du jeu`);
}


//>>>>>>>>RENDU GRAPHIQUE DU JEU<<<<<<<<<//
/*FONCTION DE VÉRIFICATION DE LA POSITION DE LA CIBLE*/
function isTargetReached(x, y){
    return targets.some(target => target.x === x && target.y === y);
}
/*FONCTION DE VÉRIFICATION DE LA POSITION DE L'AMI*/
function isFriendOnTarget(friendX, friendY){
    return isTargetReached(friendX, friendY);
}

/*ON DESSINE LE JEU*/
function draw(){
    //affichage console pour vérifié que la fonction de dessin du jeu est chargé
    console.log("Dessin du jeu en cours...");

    //on récupère toutes les cellules en parcourant la grille du jeu
    for (let y = 0; y < gameRow; y++){
        for (let x = 0; x < gameColumn; x++){
            //on calcule l'index de la cellule dans la grille
            const cellIndex = y * gameColumn + x;
            const cell = document.getElementById(`cell-${cellIndex}`); //on récupère la cellule par son ID

            if (!cell){
                console.error(`Cellule ${cellIndex} introuvable`);
                continue; //si la cellule n'existe pas, on passe à la suivante
            }

            //on réinitialise le contenu de chaque celllule
            cell.className = "cell"; //on reprend les styles de base de la cellule
            cell.textContent = ""; //on réinitialise le texte de la cellule

            //on vérifie si la cellule est une cible pour l'afficher en arrière plan
            const isTarget = isTargetReached(x, y); //on vérifie si la cellule est une cible
            if (isTarget){
                cell.classList.add("target");
                cell.textContent = "🪑"; //on ajoute un émoji cible
            }

            //on attribue une type de cellule
            const cellType = gameGrid[y][x]; 

            switch (cellType){
                case EMPTY: //si la cellule est vide
                    if (!isTarget){ //si la cellule n'est pas une cible on affiche comme même la cible plus les cellule du sol
                        cell.classList.add("empty"); //on ajoute la classe css empty
                        cell.textContent = "🌱"; //on ajoute une valeur emoji au texte
                    }
                    break;
                case TREE: //si c'est un arbre
                    cell.classList.add("tree"); 
                    cell.textContent = "🌳";
                    break;
                case FRIEND: //si c'est un ami de frodon
                    cell.classList.add("friend");
                    //on vérifie si l'ami est sur une cible
                    if (isTarget){
                        cell.classList.add("onTarget");
                        cell.textContent = "🎉"; 
                    }else{
                        cell.textContent = "👤";
                    }
                    break;
                case TARGET: //si c'est une des tables du banquet
                    cell.classList.add("target");
                    cell.textContent = "🪑";
                    break;
            }
            //si c'est frodon, on ajoute une classe css et un emoji
            if (x === frodoX && y === frodoY){
                cell.classList.add("frodo"); //on ajoute la classe css frodo
                cell.textContent = "🧑🏽‍🌾"; //on ajoute un émoji
            }
        }
    }
    //affichage console pour vérifié que le jeu est dessiné
    console.log("Jeu dessiné avec succès");
    updateDebugInfo(); //on met à jour les informations en console pour le débogage
}


//>>>>>>>>LOGIQUE DE DÉPLACEMENT<<<<<<<<//

/*DÉPLACEMENT DE FRODON*/
function moveFrodo(dx, dy){
    const newX = frodoX + dx; //on calcule une nouvelle position horizontale
    const newY = frodoY + dy; //on calcule une nouvelle position verticale

    //vérification des limites de la grille
    if (newX < 0 || newX >= gameColumn || newY < 0 || newY >= gameRow){
        console.warn("Déplacement hors des limites de la grille"); //message d'avertissement si le déplacement est hors des limites
        return false; //on quitte la fonction si le déplacement est hors des limites
    }

    const targetCell = gameGrid[newY][newX]; //on récupère la cellule cible

    //s'il sagit d'une cellule vide ou une cible, frodon peut se déplacer
    if (targetCell === EMPTY || targetCell === TARGET){
        frodoX = newX; //on met à jour la position horizontale de frodon
        frodoY = newY; //on met à jour la position verticale de frodon
        steps++; //on incrémente le compteur de pas
        return true; //on retourne vrai si le déplacement a réussi
    }
    //s'il sagit d'un arbre, frodon ne peut pas se déplacer
    if (targetCell === TREE){
        return false; //pour empecher le déplacement a travers les arbres
    }
    //s'il s'agit d'un ami, frodon peut essayer de le pousser
    if (targetCell === FRIEND){
        return pushFriend(newX, newY, dx, dy); //on appelle la fonction pour pousser l'ami
    }
    return false; //par défaut, si le déplacement n'est pas possible
}

/*POUSSER UN AMI*/
function pushFriend(friendX, friendY, dx, dy){
    //on calcule la position de l'ami
    const pushX = friendX + dx; //nouvelle position en ligne de l'ami
    const pushY = friendY + dy; //nouvelle position en colonne de l'ami

    //on vérifie les limites de la grille
    if (pushX < 0 || pushX >= gameColumn || pushY < 0 || pushY >= gameRow){
        console.warn("l'ami est hors limites du jeu"); //message d'avertissement en cas de sortie de la grille
        return false; //on sort de la fonction si c'est le cas
    }

    //on récupère la cellule de l'ami
    const pushCell = gameGrid[pushY][pushX]; 

    //on donne des conditions de types de cellules pour pousser l'ami (empty ou target)
    if (pushCell !== EMPTY && pushCell !== TARGET){
        console.warn("Impossible de déplacer l'ami"); //message d'avertissement si l'ami ne peut pas etre poussé
        return false;
    }

    //déplacement de l'ami
    gameGrid[friendY][friendX] = EMPTY; //on place une case vide du sol là où l'ami était
    gameGrid[pushY][pushX] = FRIEND; //l'ami est déplacé à la nouvelle position

    //on met à jour la position de l'ami
    const friendIndex = friends.findIndex(friend => friend.x === friendX && friend.y === friendY); //on cherche l'ami dans le tableau
    if (friendIndex !== -1){ //si l'ami est différent de non trouvé
        friends[friendIndex].x = pushX; //on met à jour la position en colonne
        friends[friendIndex].y = pushY; //on met à jour la position en ligne
        console.log(`Ami déplacé en (${pushX}, ${pushY})`) //on affiche la nouvelle position dans la console
    }

    //frodon prend la place de l'ami
    frodoX = friendX;
    frodoY = friendY;
    steps++; //on ajoute 1 au compteur de pas

    //on vérifie si les cibles sont atteintes
    checkVictory();

    return true; //on retourne vrai si l'ami a été déplacé avec
}

/*GESTION DES TOUCHES DU CLAVIER*/
function handleKeyPress(event){
    let moved = false; //initialisation de la variable moved pour connaitre le déplacement de frodon
    const keyCode = event.keyCode || event.which; //on stocke dans une constante le code de la touche pressée
    const direction = KEYS[keyCode]; //on récupère dans l'objet KEYS la touche pressée

    //on applique une direction avec le touches de l'objet KEYS
    switch (direction){
        case "left": //si la touche pressée est la flèche gauche
            moved = moveFrodo(-1, 0); //on déplace frodon d'une case vers la gauche
            break; //on sort du switch
        case "right": 
            moved = moveFrodo(1, 0);
            break;
        case "up":
            moved = moveFrodo(0, -1);
            break;
        case "down":
            moved = moveFrodo(0, 1);
            break;
    }

    //gestion de la touche de réinitialisation de niveau
    switch (event.key.toLowerCase()){
        case "r":
            resetLevel(); //on appelle la fonction de réinitialisation du niveau
            return; //on sort de la fonction
        case "escape":
            hideMessage(); //on appelle la fonction pour cacher le message manuellement
            return;
    }

    //si frodon a été déplacé, on redessine le jeu
    if (moved){
        draw(); //on redessine le jeu
        event.preventDefault(); //on empêche le scroll de la page
    }
}


//>>>>>>>>NIVEAUX ET JEU TERMINÉ<<<<<<<<//

function checkVictory(){
    //on vérifie que le niveau n'est pas déja terminé avant de faire la vérification de chaque élément
    if (levelCompleted) return;

    //on initialise une variable pour savoir combien d'amis sont sur la cible
    let friendsOnTarget = 0;
    friends.forEach(friend => { //on parcours chaque ami
        //on vérifie la position de l'ami par rapport aux cibles
        if (isFriendOnTarget(friend.x, friend.y)){
            friendsOnTarget++; //on ajoute 1 au compteur si un ami est sur une cible
        }
    });

    //on affiche un message console pour comparer le nombre de cibles atteintes par les amis et le nombre total d'amis
    console.log(`Vérification de la victoire: ${friendsOnTarget}/${friends.length} amis sur les cibles`);

    //on déclare la victoire si tous les amis ont atteint toutes les cibles
    if (friendsOnTarget === friends.length && friendsOnTarget === targets.length){ //on compare le nombre d'amis sur les cibles et le nombre total d'amis sur la cible et le nombres de cibles
        levelCompleted = true; //on met à jour l'état du niveau
        showMessage(`🎉 Congratulation, You have completed level ${currentLevel + 1} in ${steps} steps!`, true); //on affiche le message si on a terminer le niveau avec le nombre de pas effectué pour le challenge
        setTimeout(() => {
            nextLevel(); //on passe au niveau suivant après un délais
        }, 2000); //2 secondes de délais
    }
}


//>>>>>>>>GESTION DES NIVEAUX<<<<<<<<//

/*FONCTION POUR PASSER AU NIVEAU SUIVANT*/
function nextLevel(){
    if (currentLevel + 1 < Levels.length){ //on vérifie si le niveau suivant existe en comparant la longueur du tableau et le niveau actuel
        initLevel(currentLevel + 1); //on initialise le niveau suivant
    }else{
        showMessage("🎉 Congratulations! You have completed all levels!", true); //message de fin de jeu si tous les niveau ont été terminé avec succès
        setTimeout(() => {
            if (confirm("Do you want to restart the game?")){ //on demande si l'utilisateur veut recommencer le jeu
                initLevel(0); //on recommence le jeu au niveau 1
            }
        }, 2000); //2 secondes de délais avant que le jeu recommence
    }
}

/*FONCTION POUR AFFICHER LE NIVEAU PRÉCÉDENT*/
function previousLevel(){
    if (currentLevel > 0){ //on vérifie si l'utilisateur est au niveau 1
        initLevel(currentLevel - 1); //on redescend au niveau précédent
    }else{
        showMessage("You are already at the first level!") //on signale à l'utlisateur qu'il est au niveau 1
    }
}

/*FONCTION POUR RÉINITIALISER LE NIVEAU ACTUEL*/
function resetLevel(){
    showMessage("Resetting current level...");
    initLevel(currentLevel);
}


//>>>>>>>>LES MESSAGES AFFICHÉS À L'ÉCRAN<<<<<<<<<//

/*GESTION DES MESSAGES POPUP*/
function showMessage(text, isPermanent = false){
    const popUp = document.getElementById("messagePopup"); //on récupère l'élément HTML du message pop-up
    const popUpText = document.getElementById("popUpText"); //on récupère l'élément HTML du texte dans le message pop-up

    if (popUp && popUpText){
        popUpText.textContent = text; //on met à jour le texte du message
        popUp.classList.add("show"); 
        popUp.style.display = "block"; //on affiche le message
        //si le temps restant est terminé, on efface le message précédent
        if (popupTimeOut){
            clearTimeout(popupTimeOut);
        }
        //si le message n'est pas permanent, on le masque après 3 secondes
        if (!isPermanent){
            popupTimeOut = setTimeout(() => { //si le temps restant est égale au temps maximum
                hideMessage(); //on appelle la fonction qui masque le message
            }, 3000);
        }
    }
    console.log(`Message: ${text}`); 
}

/*FONCTION POUR CACHER LES MESSAGES POPUP*/
function hideMessage(){
    const popUp = document.getElementById("messagePopup"); //on récupère l'élément HTML du message pop-up
    if (popUp){
        popUp.classList.remove("show"); //on efface le style de la classe show
        popUp.style.display = "none"; //on masque le message
    }
    if (popupTimeOut){
        clearTimeout(popupTimeOut); //on efface le temps restant du message
        popupTimeOut = null; //on réinitialise le temps restant
    }
}


//>>>>>>>>GESTION DES ÉVÉNEMENTS<<<<<<<<//

/*MISE A JOUR DES INFORMATIONS DE DEBUG*/
function updateDebugInfo(){
    //on compte les amis sur les cibles
    let friendsOnTarget = 0;
    friends.forEach(friend => { //pour chaque ami
        if (isFriendOnTarget(friend.x, friend.y)){ //on vérifie si l'ami est sur une cible
            friendsOnTarget++; //on ajoute 1 au compteur d'amis sur les cibles
        }
    });

    //on affiche les informations de débogage dans la console
    console.log(`Niveau: ${currentLevel + 1}, Parcours: ${steps}, Ami(s) au banquet: ${friendsOnTarget}/${targets.length}`);

    //on met à jour l'interface de débogage
    const levelsDisplay = document.getElementById("levelDisplay");
    const stepsDisplay = document.getElementById("stepDisplay");
    const friendsDisplay = document.getElementById("friendDisplay");

    if (levelsDisplay) {
        levelsDisplay.textContent = currentLevel + 1; //on ajoute 1 pour afficher le niveau car le compteur commence à 0
    }
    if (stepsDisplay) {
        stepsDisplay.textContent = steps; //on affiche le nombre de pas éffectué
    }
    if (friendsDisplay){
        friendsDisplay.textContent = `${friendsOnTarget}/${targets.length}`; //on affiche le nombre d'amis par rapport au nombre total de cible
    }
}

/*FONCTION DE DÉMARRAGE DU JEU*/
function startGame(){
    //affichage console pour vérifié que le jeu démarre
    console.log("Démarrage du jeu Frodo's Birthday Banquet...");
        
    try{
        //on ajoute un écouteur d'évènement pour les touches du clavier
        document.addEventListener("keydown", handleKeyPress);

        initLevel(0); //on initialise le niveau à 0
        //affichage console pour vérifié le chargement du niveau
        console.log("le jeu a démarré avec succès");

        //on rend les fonctions de débogage visibles
        window.initLevel = initLevel;
        window.nextLevel = nextLevel;
        window.previousLevel = previousLevel;
        window.resetLevel = resetLevel;
        window.hideMessage = hideMessage;
        window.gameState = {
            currentLevel,
            gameGrid,
            gameColumn,
            gameRow,
            frodoX,
            frodoY,
            friends,
            targets,
            steps,
        };

    }catch (error){
        console.error("Erreur lors du démarrage du jeu:", error); //on affiche un message d'erreur avec l'erreur
    }
}

/*APPEL DE LA FONCTION DE DÉMARRAGE DU JEU*/
startGame();