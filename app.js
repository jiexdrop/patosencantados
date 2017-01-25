var players = [];
players.push(new Entity(scene, "player1", new BABYLON.Vector3(-10,2,0), 1, controls1));
players.push(new Entity(scene, "player2", new BABYLON.Vector3(10,2,0), 1, controls2));
for (var i = 0; i < players.length; i++) {
  elements.push(players[i].box);
}

engine.runRenderLoop(function () {
  for (var i = 0; i < players.length; i++) {
    players[i].update();
  }
  scene.render();
});
