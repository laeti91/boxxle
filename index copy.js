import {Levels} from "./levels.js";

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
const EMPTY = 0; //case vide
const TREE = 1; //arbres qui font office de mur
const FRIEND = 2; //les amis de frodon
const FRODO = 3; //le hero frodon
const TARGET = 4; //la cible, les tables du banquet

/*INITIALISATION DES DIRECTIONS POSSIBLES*/
const HERODIRECTION = {
    UP: 'up_dir',
    DOWN: 'down_dir',
    LEFT: 'left_dir',
    RIGHT: 'right_dir'
};

/*CONSTANTES POUR L'ATTEINTE DE LA CIBLE PAR LES AMIS DE FRODO*/
const FRIENDSONTARGET = 4; 

/*INITIALISATION D'UNE VARIABLE POUR L'IMAGE DES AMIS*/
let friendsSprite = new Image();
friendsSprite.src = "assets/friends.png"; /*chemin vers la spritesheet des amis*/

/*configuration du spritesheet des amis de frodon*/
const FRIENDS_SPRITE = {
    picture: null, /*initialisation de l'image de la spritesheet*/
    spriteWidth: 64,
    spriteHeight: 64,
    spriteCount: 4, /*nombre d'amis de frodon*/
    output: false, /*initialisation de l'affichage de l'image*/
}

/*INITIALISATION DES AMIS DE FRODO A DÉPLACER*/
const FRIENDS = {
    SAM: {
        name: "sam",
        description: "Sam Gamgee, the brave",
        characterIndex: 3
    },

    MERRY: {
        name: "merry",
        description: "Meriadoc Brandybuck",
        characterIndex: 2
    },


    PIPPIN: {
        name: "pippin",
        description: "Peregrin Took",
        characterIndex: 1
    },

    GANDALF: {
        name: "gandalf",
        description: "Gandalf, the Grey",
        characterIndex: 0
    }
};

/*FONCTION  DE CHARGEMENT DU SPRITESHEET ET DE SES SPRITES*/
function loadFriendsSprite() {
    FRIENDS_SPRITE.picture = friendsSprite; /*on charge la spritesheet dans la constante FRIENDS_SPRITE*/
    FRIENDS_SPRITE.picture.onload = () => { /*on vérifie le chargement de l'image*/
        FRIENDS_SPRITE.picture.output = true; /*on active l'affichage de l'image*/
        displayGame(); /*on affiche le jeu avec la spritesheet*/
    };
    FRIENDS_SPRITE.picture.onerror = () => { /*si le chargement à échoué*/
        console.error("spritesheet non trouvé"); /*on affiche un message d'erreur*/
        FRIENDS_SPRITE.picture.output = false; /*on désactive l'affichage de l'image*/
    };
    FRIENDS_SPRITE.picture.src = "assets/friends.png"; /*on récupère la source de la spritesheet*/
}

function drawSprite(ctx, characterIndex, x, y, width, height) {
    if (!FRIENDS_SPRITE.picture.output){
        //on affiche un carré coloré si l'image n'est pas chargée
        const colors = ["#A66333", "L#756F3B", "#D49B41", "#817867"];
        ctx.fillStyle = colors[spriteIndex] || 
    }
} 

/*ÉTAT INITIAL DU JEU*/
const gridModal = { /*stock l'état actuel du monde du jeu*/
    //tableau vide d'une prochaine structure 2D contenant le type de cellule
    grid: [],
    
    //initialisation du niveau
    currentLevel: 0,

    //proportions du monde
    width: 10,
    height: 10,

    //état initial de frodo
    frodo: {
        x: 1,
        y: 1,
        direction: HERODIRECTION.DOWN,
        type: CELLTYPE.FRODO
    },

    //état initial de l'emplacement du banquet
    target: {
        x: GRID_WIDTH - 2,
        y: GRID_HEIGHT - 2,
        type: CELLTYPE.TARGET
    },

    //état initial de l'emplacement des amis de frodo
    friend1: {
        x: 2,
        y: 2,
        type: CELLTYPE.FRIEND1
    },

    friend2: {
        x: 3,
        y: 3,
        type: CELLTYPE.FRIEND2
    },

    friend3: {
        x: 4,
        y: 4,
        type: CELLTYPE.FRIEND3
    },

    friend4: {
        x: 5,
        y: 5,
        type: CELLTYPE.FRIEND4
    },

    //initialisation des compteurs
    footTarget: 0, /*compteur de pas vers le banquet*/
    friendsOnTarget: 0, /*compteur d'amis sur une table du banquet*/

    //initialisation d'un temps de jeu
    gameTime: 0, 
    gameOver: false, /*initialisation du statut de completion du jeu*/

};

/*CREATION DES CELLULES DE LA GRILLE DU JEU*/
const gameGrid = document.getElementById("gameBoard"); /*création d'une constante pour récupérer la grille et la modifier en js*/



/*MISE À JOUR DE L'ÉTAT DES ÉLÉMENTS DE LA GRILLE*/
const draw = () => { /*fonction de mise à jour flèché qui est appelé à chaque animation*/
    //clear grid (pour effacer tout le contenu précedent de la grille)
    //draw grid (dessine un nouvel état en mouvement des éléments dans la grille)
    // recursion with request animation frame (pour créer une boucle fluide)
}


const currentLevel = Levels[0]; // tableau du premier niveau

//on parcours chaque ligne du niveau
for (let y = 0; y < currentLevel.length; y++){
    const row = currentLevel[y];
    //on parcours chaque cellule de chaque ligne
    for (let x = 0; x < row.length; x++){
        const rowCase = row[x];
        switch (rowCase){
            case 0: document.createElement = "";
                break;
            case 1: 
        }
    }
}


