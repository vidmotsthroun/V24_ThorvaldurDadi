//#region 3D zone
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//#region Main setup
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
var container = document.getElementById( 'canvas' );
// a scene

var scene = new THREE.Scene();
    scene.background = new THREE.Color( 'black' );

// camera that uses the container's size

var camera = new THREE.PerspectiveCamera( 30, container.clientWidth/ container.clientHeight );
    camera.position.set( 0, 5, 12 );
    camera.lookAt( scene.position );

// renderer that uses the container's size and is inserted in it
var renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( container.clientWidth-16, container.clientHeight-16 );
    renderer.setAnimationLoop( update_scene );
    container.appendChild( renderer.domElement );

//#endregion Main setup
//#region Game values
var active_continue = true;
var player_Count = 0;
var bot_Count = 0;
var player_act = 1;
var bot_act = 3;
//#endregion Game values

//#region assets
const player_model = new OBJLoader();
const bot_model = new OBJLoader();
var moving = -2.5;
refreshPlayerModel();
function refreshPlayerModel(){
    delete_3DOBJ('P_Model');
    player_model.load(
        // resource URL
        modelLink(player_act),
        function ( object ) {
            
            object.name = "P_Model";
            scene.add( object);
            object.position.set(-1, 0, 0); // THREE.Group
            object.animations; // Array<THREE.AnimationClip>
            object.material = yellowMaterial;
            if(player_act == 1) { // Loading Rocks
                object.scale.set(0.1, 0.1, 0.1); // Array<THREE.Group>
                object.rotateX(setRad(90));
                object.rotateY(setRad(-140));

            }
            else if(player_act == 2) { // Loading Paper
		        object.scale.set(0.3, 0.3, 0.3); // Array<THREE.Group>
                object.rotateY(setRad(-270));
            }
            else{
                object.scale.set(0.1, 0.1, 0.1); // Array<THREE.Group>
                object.rotateY(setRad(-90));
                object.rotateZ(setRad(90))
            }
        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
        
    );
}
refreshBotModel();
function refreshBotModel(){
    delete_3DOBJ('B_Model');
    bot_model.load(
        // resource URL
        modelLink(bot_act),
        function ( object ) {
            
            object.name = "B_Model";
            
            object.position.set(1, 0, 0); // THREE.Group
            object.animations; // Array<THREE.AnimationClip>
            object.material = redMaterial;
            object.material.color.setHex(0xff0000);
            if(bot_act == 1) { // Loading Rocks
                object.scale.set(0.1, 0.1, 0.1); // Array<THREE.Group>
                object.rotateX(setRad(90));
                object.rotateY(setRad(-140));

            }
            else if(bot_act == 2) { // Loading Paper
		        object.scale.set(0.3, 0.3, 0.3); // Array<THREE.Group>
                object.rotateY(setRad(-270));
            }
            else{
                object.scale.set(0.1, 0.1, 0.1); // Array<THREE.Group>
                object.rotateY(setRad(90));
                object.rotateZ(setRad(90))
            }
            scene.add( object);
        },
        // called while loading is progressing
        function ( xhr ) {
            
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
        
    );
}

const grassTexture = new THREE.TextureLoader().load('./Assets/Images/Textures/Grass.jpg');
const concreteTexture = new THREE.TextureLoader().load('./Assets/Images/Textures/Concrete.jpg');

const defaultGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const plateGeometry = new THREE.BoxGeometry(5, 0.15, 5);

const boardGeometry = new THREE.BoxGeometry(1.25, 0.75, 0.1);

const limeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const redMaterial = new THREE.MeshBasicMaterial({color: 0xff0000 });
const yellowMaterial = new THREE.MeshStandardMaterial({color: 0xeae013})
const blueMaterial = new THREE.MeshStandardMaterial({color: 0x2031df});
const concreteMaterial = new THREE.MeshStandardMaterial({map:concreteTexture});



const a_light = new THREE.AmbientLight( 0xb6b6b6, 1.8 ); // soft blue light
const light = new THREE.PointLight(0xffffff, 100);

var cube = new THREE.Mesh(defaultGeometry, redMaterial);	
var floor = new THREE.Mesh(plateGeometry, concreteMaterial);
var players_board = new THREE.Mesh(boardGeometry, blueMaterial);
var bots_board = new THREE.Mesh(boardGeometry, blueMaterial);
//#endregion

//#region scene
scene.add( a_light );
scene.add(light);
scene.add(cube);
scene.add(players_board);
scene.add(bots_board);

scene.add(floor);
floor.position.set(0, -1, 0);
cube.position.set(1, 1.5, -5);
players_board.position.set(-1, 0.5, -2);
bots_board.position.set(1, 0.5, -2);
cube.material = yellowMaterial;
a_light.position.y = 1;
light.position.set( 0, 1, 5 );
light.lookAt( floor.position );
cube.rotation.set(0, 10, 100);
//#endregion
function update_scene( t )
{
    document.getElementById("playerScore").textContent = "Player: " + player_Count;
    document.getElementById("computerScore").textContent = bot_Count + ": Computer";
    renderer.render( scene, camera );
}


//#endregion 3D zone

/*
    1. Rock
    2. Paper
    3. Scissor
*/

//#region Animated border
setInterval(function() {
    const colorVariant = getColor();
    
    document.getElementById("label_r").style.color = colorVariant[0]; 
    document.getElementById("label_p").style.color = colorVariant[1]; 
    document.getElementById("label_s").style.color = colorVariant[2]; 
}, 1200);
var getColor = function getRandomColor(){
    const list_of_color = [
    "#ffb900", "#f0ff00", "#46ff00", 
    "#00ffe4", "#ae00ff", "#96c8ff",
    "#f700ff", "#b6b6b6", "#ff0049", "#ffffff"];
    var picked = list_of_color[(Math.floor(Math.random() * list_of_color.length))];
    var picked2 = "";
    
    do {picked2 = list_of_color[(Math.floor(Math.random() * list_of_color.length))]}
    while (picked2 == picked);
    var picked3 = "";
    do {picked3 = list_of_color[(Math.floor(Math.random() * list_of_color.length))]}
    while (picked3 == picked || picked3 == picked2);
    return [picked, picked2, picked3];
}
//#endregion Animated border

document.getElementById("Rock").onclick = function(){handMoves("rock")};
document.getElementById("Paper").onclick = function(){handMoves("paper")};
document.getElementById("Scissor").onclick = function(){handMoves("scissor")};
document.getElementById("confirm").onclick = function(){beginRound()};
function handMoves(move){
    if(move == "rock"){
        player_act = 1;
        console.log("Picked rock");
        refreshPlayerModel();
    }
    else if(move == "paper"){
        player_act = 2;
        console.log("Picked paper");
        refreshPlayerModel();
        
    }
    else{
        player_act = 3;
        console.log("Picked scissor");
        refreshPlayerModel();
    }
    
}
function deactivate(){
    active_continue = false;
    document.getElementById("confirm").textContent = "In progress...";
    document.getElementById("confirm").style.backgroundColor = "#464646";
    document.getElementById("confirm").style.color = "#ffffff";
}
function activate(){
    active_continue = true;
    document.getElementById("confirm").textContent = "Continue";
    document.getElementById("confirm").style.backgroundColor = "#898989";
    document.getElementById("confirm").style.color = "#000000";
}
async function beginRound(){
    if(active_continue == true){
        deactivate();
        var rolls = getRandomArbitrary(10, 25);
        console.log("Rolls total: " + rolls);
        while (rolls > 0){
            bot_act += 1;
            if (bot_act > 3){
                bot_act = 1;
            }
            refreshBotModel();
            await wait(250);
            
            if(rolls <= 3){await wait(100);}
            if(rolls <= 2){await wait(100);}
            if(rolls <= 1){await wait(75);}
            
            rolls -= 1;

        }
        await wait(1000);
        if (player_act == 1 && bot_act == 3){
            outcome(1)
        }
        else if(player_act == 2 && bot_act == 3) {
            outcome(2)
        }
        else if(player_act == 3 && bot_act == 3) {
            outcome(3)
        }
        else if(player_act == 1 && bot_act == 2) {
            outcome(2)
        }
        else if(player_act == 2 && bot_act == 2) {
            outcome(3)
        }
        else if(player_act == 3 && bot_act == 2) {
            outcome(1)
        }
        else if(player_act == 1 && bot_act == 1) {
            outcome(3)
        }
        else if(player_act == 2 && bot_act == 1) {
            outcome(1)
        }
        else if(player_act == 3 && bot_act == 1) {
            outcome(2)
        }
        console.log("Wait for 2 sec");
        await wait(2000);
        cleanUp();
    }
}
function outcome(status)
{
    /*
        1 player won
        2 bot won
        3 tie
    */
    if (status == 1){
        player_Count += 1;
        players_board.material = limeMaterial;
        bots_board.material = redMaterial;
    }
    else if (status == 2){
        bot_Count += 1;
        players_board.material = redMaterial;
        bots_board.material = limeMaterial;
    }
    else{
        players_board.material = yellowMaterial;
        bots_board.material = yellowMaterial;
    }
}
function cleanUp(){
    players_board.material = blueMaterial;
    bots_board.material = blueMaterial;
    activate();
}
function setRad(num){
    return Math.PI / 180 * num;
}
function delete_3DOBJ(name){
    const selectedObject = scene.getObjectByName(name);
    scene.remove(selectedObject);
}
function change_3DOBJ_Color(name){
    const selectedObject = scene.getObjectByName(name);
    scene.object(selectedObject).material.color.setHex(0xff0000);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
//change_3DOBJ_Color('B_Model');
function modelLink(option){
    if(option == 1){
        return './Assets/Models/Rock/untitled.obj';
    }
    else if (option == 2){
        return './Assets/Models/Paper/Paper.obj';
    }
    else{
        return './Assets/Models/Scissor/Forbici.obj';
    }
}
