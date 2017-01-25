Entity = function(scene, name, pos, dim, controls) {
  this.name = name;
  this.scene = scene;
  this.dim = dim;
  this.dir = true;
  this.velocity = 0.1;
  this.material = new BABYLON.StandardMaterial("player", scene);
  this.controls = controls;

  this.attack = null;
  this.JUMPS = 20;
  this.jumplast= this.JUMPS;

  this.jumpforce = new BABYLON.Vector3(0, 0.6, 0);

  var faceUV = new Array(6);
  faceUV[0] = new BABYLON.Vector4(0, 0, 1, -1);
  faceUV[2] = new BABYLON.Vector4(0, 0, 0, 0);
  faceUV[3] = new BABYLON.Vector4(0, 0, 0, 0);
  faceUV[4] = new BABYLON.Vector4(0, 0, 0, 0);
  faceUV[5] = new BABYLON.Vector4(0, 0, 0, 0);

  var options = {
    width: 1,
    height: 1,
    depth: 1,
    faceUV: faceUV,
  };

  this.box = BABYLON.MeshBuilder.CreateBox(this.name, options, scene);
  this.box.position = pos;

  // this.material.diffuseTexture = new BABYLON.Texture("images/pato.png", scene);
  // this.material.diffuseTexture.hasAlpha = true;
  // this.box.material = this.material;

  this.box.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:true, mass:1, friction:0.5, restitution:0.1});

}

Entity.prototype.shoot = function() {
  if(this.attack == null){
     this.attack = new Attack(this.scene, this.box.position, this.dir);
  }
  this.attack.increaseSize();
}

Entity.prototype.jump = function() {
  this.jumplast--;
  if(this.jumplast>0){
    this.box.applyImpulse(this.jumpforce,this.box.position);
  }
}

Entity.prototype.moveLeft = function() {
  this.box.moveWithCollisions(new BABYLON.Vector3(-this.velocity,0,0));
  this.dir = false;

};

Entity.prototype.moveRight = function() {
  this.box.moveWithCollisions(new BABYLON.Vector3(this.velocity,0,0));
  this.dir = true;
};

Entity.prototype.moveUp = function() {
  this.box.moveWithCollisions(new BABYLON.Vector3(0,0,this.velocity));
};

Entity.prototype.moveDown = function() {
  this.box.moveWithCollisions(new BABYLON.Vector3(0,0,-this.velocity));
};

Entity.prototype.trigger = function() {

}

Entity.prototype.update = function() {
  //Bon sang javascript...
  this.controls(this);

  for (var i = 0; i < blockMeshes.length; i++) {
    if(this.box.intersectsMesh(blockMeshes[i],true)){
      this.jumplast = this.JUMPS;
    }
  }

  if(this.attack != null){
    this.attack.update(this.box);
    if(this.attack.last===0){
      this.attack.mesh.dispose();
      this.attack =null;
    }
  }

};
