
var loading = true;
var camera = document.querySelector('[camera]')
var sceneEl = document.querySelector('a-scene');
var entity = sceneEl.querySelector('#charizardentity');
var initialText = document.createElement('a-entity');
initialText.id = "initialText"
initialText.setAttribute("text", "value:Hello there!\n Sadly , the professor lost some pokemon in this forest !\n Can you help him by push them back in his hut right in front of you ??;color:black");
document.querySelector('[camera]').appendChild(initialText);
initialText.setAttribute('position', {x: 0, y: 0, z: -1});

setTimeout(function(){
  document.querySelector("#initialText").parentNode.removeChild(document.querySelector("#initialText"));
   loading=false
}, 7000);

var pokemon = {
  charizardentity:{
    name:"Charizard",
    catch:false,
    x:80,
    y:0.5,
    z:-35,
  },
  blastoiseentity:{
    name:"Blastoise",
    catch:false,
    x:50,
    y:0.5,
    z:-3,
  },
  mewentity:{
    name:"Mew",
    catch:false,
    x:-40,
    y:0,
    z:-40,
  },
  golbatentity:{
    name:"Golbat",
    catch:false,
    x:-50,
    y:0,
    z:30,
  },
  magnemiteentity:{
    name:"Magnemite",
    catch:false,
    x:-80,
    y:1,
    z:70,
  },
};

var hut = document.querySelector('#cabanentity');
hut.addEventListener('collide', function (e) {
  console.log(e.detail.target.el);
if(e.detail.target.el){
  id=(e.detail.body.el.getAttribute('id'))
  console.log(id)
  pokemonName = pokemon[id].name
  pokemon[id].catch=true;
  if(document.querySelector(`#${id}`) !== null){
  document.querySelector(`#${id}`).parentNode.removeChild(document.querySelector(`#${id}`));
  document.getElementById('catch').play();
  loading =true

  if(printMessage(pokemonName)==1){
    loadEndGame()
  }
     setTimeout(function(){
       if(document.querySelector("#message")!= null){
           document.querySelector("#message").parentNode.removeChild(document.querySelector("#message"));
    console.log(pokemon)
    loading=false
       }
 }, 7000);
  
  
 
}
}
});

function loadEndGame() {
  setTimeout(function(){
    var arceus = document.querySelector('#arceusentity')
   arceus.setAttribute('visible', true);
   var palkia = document.querySelector('#palkiaentity')
   palkia.setAttribute('visible', true);
  if(document.querySelector("#message")!= null){
    document.querySelector("#message").parentNode.removeChild(document.querySelector("#message"));
console.log(pokemon)
loading=false
}
}, 7000);
   
}

function printMessage($lastCapture) {
  var find = [];
  var notFind = [];
  console.log(pokemon)
  for (const property in pokemon) {
    if(pokemon[property].catch == false){
      notFind.push(pokemon[property].name)
    }
    if(pokemon[property].catch == true){
      find.push(pokemon[property].name)
    }
  }
  if(find.length==5){
    message = `
    Message from the professor : \n
    Well done you retrieve all my pokemon thanks for the help , as a reward i will show you my greatest pokemon , a fabulous pokemon .
    `
  }else{
    message = `
    Message from the professor : \n
    Well done you retrieve my ${$lastCapture} you actually found ${find.length} pokemon ,just ${notFind.length} more to finish. \n
    Pokemon retrieved : ${find.join()} .
    Pokemon still in forest : ${notFind.join()}
    `
  }
    var text = document.createElement('a-entity');
text.id = "message"
text.setAttribute("text", `value:${message}`);
document.querySelector('[camera]').appendChild(text);
text.setAttribute('position', {x: 0, y: 0, z: -1});
return find.length;
}

AFRAME.registerComponent("listener", {
  schema : 
  {
    stepFactor : {
      type : "number",
      default : 1
    },
  },
  test : function()
  {         
    if(document.querySelector("#charizardentity")!==null){
      document.querySelector("#charizardentity").parentNode.removeChild(document.querySelector("#charizardentity"));
    }
  },
  init: function()
  {
    this.sec = document.querySelector("#charizardentity").parentNode
    this.charizard = document.querySelector("#charizardentity")
  },
  tick : function()
  {
    var posCam  = this.el.components.camera.camera.getWorldDirection()
    var posPlayer = this.el.components.camera.camera.parent.position
    posCam.y = 0 
    if(loading===false){
      console.log(posCam)
      console.log(posPlayer)
    if(verifPos(posCam,posPlayer)){
      console.log("kkk")
        let newP = this.el.components.camera.camera.parent.position.add(posCam.multiplyScalar(this.data.stepFactor));
        this.el.setAttribute('position', newP)
      }
  }
}
});

function verifPos(posCam,posPlayer) {
  if(posPlayer.x > 100){
    if(posCam.x > 0){
      return false;
    }
  }
  if(posPlayer.x < -100){
    if(posCam.x < 0){
      return false;
    }
  }

  if(posPlayer.z > 100){
    if(posCam.z > 0){
      return false;
    }
  }
  if(posPlayer.z < -100){
    if(posCam.z < 0){
      return false;
    }
  }
  return true;
}

function verifPokemonPos(position){
  if(position.x > 100){
      return false;
  }
  if(position.x < -100){
      return false;
  }

  if(position.z > 100){
      return false;
  }
  if(position.z < -100){
      return false;
  }
  return true
};

function checkIfCabane(posCam,posPlayer){
  // y entre -8 et 0
  if(posPlayer.z < -14 ) {
    if(posCam.z < 0) {
      return false
    }
  }
  if(posPlayer.z > 5) {
    if(posCam.z > 0) {
      return false
    }
  }


  if(posPlayer.x > 12){
    if(posCam.x > 0){
      return false;
    }
  }
  if(posPlayer.x < -1){
    if(posCam.x < 0){
      return false;
    }
  }
  
//   if(posPlayer.z > -14 && posPlayer.z < 5 ){
//     if(posPlayer.x > -1 && posPlayer.x < 12 ){
//       return false;
//   }
// }
  return true
};


AFRAME.registerComponent("pokemon", {
  schema : 
  {
    index : {
      type : "string",
      default : "string"
    },
  },
  init: function() {
    this.el.addEventListener('collide', function (e) {
      // console.log(e);
    });
  },
  tick : function()
  {
    var pos = (this.el.getAttribute('position'))
    if(pos !== undefined || pos !== null){
      if(!verifPokemonPos(pos)){
        var sceneEl = document.querySelector('a-scene');
        var entity = this.el
        var pos = entity.getAttribute('position')
        var id = this.data.index
        console.log(id)
        mypokemon = pokemon[id]
        console.log(mypokemon)
       var {x,y,z}=mypokemon
        entity.body.position.set(x,y,z)
      }
    }
  },
})