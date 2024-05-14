import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// the DIV from the page

var container = document.getElementById( 'canvas' );
// a scene

var scene = new THREE.Scene();
    scene.background = new THREE.Color( 'black' );

// camera that uses the container's size

var camera = new THREE.PerspectiveCamera( 30, container.clientWidth/ container.clientHeight );
    camera.position.set( 2, 5, 10 );
    camera.lookAt( scene.position );

// renderer that uses the container's size and is inserted in it
var renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( container.clientWidth-16, container.clientHeight-16 );
    renderer.setAnimationLoop( update_scene );
    container.appendChild( renderer.domElement );
//#region Game values

var player_Count = 0;
var bot_Count = 0;
var player_act = 2;
var bot_act = 1;

//#endregion values

// assets
var Player;
const player_model = new GLTFLoader();

const defaultGeometry = new THREE.BoxGeometry( 1, 1, 1 );

const limeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const redMaterial = new THREE.MeshStandardMaterial({color: 0xff0000 });
const blueMaterial = new THREE.MeshStandardMaterial({color: 0xff0000 });

const a_light = new THREE.AmbientLight( 0xff0000, 0.3 ); // soft white light

var cube = new THREE.Mesh(defaultGeometry, redMaterial);	

scene.add( a_light );
scene.add(cube);

scene.add( new THREE.AxesHelper(2) );

function update_scene( t )
{
    //var player_action = Number(sessionStorage.getItem("p_action");
    renderer.render( scene, camera );
}

//waitForSeconds();
function waitForSeconds(){
    
    setTimeout(function(){
        getJSONFile().then(function(locale){
            console.log(locale.player)
        })
        
        //console.log("bot = " + bot_action + "| player + " + values.player.move)
        waitForSeconds();
    }, 3000);
    
    
}
async function getJSONFile(){
    const link = new Request('storage.json');
    const response = await fetch(link);
    const items = await response.json();
    return items;
}

//Main World
/*
    1. Rock
    2. Paper
    3. Scissor
*/


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

function handMoves(move){
    
    if(move == "rock"){
        player_act = 1;
        //sessionStorage.setItem("p_action", player_act);
        
        console.log("Picked rock");
    }
    else if(move == "paper"){
        player_act = 2;
        //sessionStorage.setItem("p_action", player_act);
        console.log("Picked paper");
    }
    else{
        player_act = 3;
        //sessionStorage.setItem("p_action", player_act);
        console.log("Picked scissor");
    }
    
    /*extractJSONFile().then(function(locale){
        changePlayerMove(player_act, locale);
    });*/
    
    
    
    
    
    
}

