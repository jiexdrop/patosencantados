var canvas = document.querySelector("#renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var elements = [];

BABYLON.SceneLoader.ShowLoadingScreen = false;

var createScene = function () {
  var scene = new BABYLON.Scene(engine);
  scene.enablePhysics();

  scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
  scene.clearColor = new BABYLON.Color3(0, 0, 0);
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10 , -20), scene);

  camera.setTarget(new BABYLON.Vector3(0,5,0));

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 20, 0), scene);

  //light.intensity = 1;

  var box =  BABYLON.Mesh.CreateBox("box1", 1, scene);
  box.position.y = 0.5;
  box.position.x = 2;
  box.position.z = 2;
  elements.push(box);

  return scene;
};


var createSkyBox = function () {
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;

  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/sky/box", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
};

var scene = createScene();

createSkyBox();

var blockMeshes = [];

BABYLON.SceneLoader.ImportMesh("", "models/", "world.obj", scene, function (newMeshes) {
  var initPos = -15;

  for (var i = 0; i < newMeshes.length; i++) {
    blockMeshes.push(newMeshes[i]);
    blockMeshes[i].scaling = new BABYLON.Vector3(3,3,3);
    blockMeshes[i].position = new BABYLON.Vector3(initPos,-3,0);
    blockMeshes[i].setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:false})
  }

  for (var i = 0; i < 9 ; i++) {
    initPos+=6;
    newMeshes.forEach(function (m) {
      var clone = m.createInstance("a" +i);
      clone.position.x += initPos;
      clone.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:false})
      blockMeshes.push(clone);
    });
  }

});



window.addEventListener("resize", function () {
  engine.resize();
});
