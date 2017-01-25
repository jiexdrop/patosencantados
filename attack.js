Attack = function(scene, pos, dir) {
  this.last = 100;
  this.dim = 1;
  this.dir = dir;
  this.name = "attack";
  this.speed = 0.2;

  this.mesh = BABYLON.Mesh.CreatePlane(this.name, this.dim, scene, false, BABYLON.Mesh.DEFAULTSIDE);
  if(this.dir){
    this.mesh.position = new BABYLON.Vector3(pos.x,pos.y,pos.z);
  }
  else {
    this.mesh.position = new BABYLON.Vector3(pos.x,pos.y,pos.z);
  }

  this.mesh.material = fireMaterial;
}

Attack.prototype.increaseSize = function () {
  if(this.speed > 0.01){
    this.speed -= 0.01;
    this.mesh.scaling.x += this.speed;
    this.mesh.scaling.y += this.speed;
  }
}

Attack.prototype.update = function(box) {
  if(this.last>0){
    for (var i = 0; i < elements.length; i++) {
      if(this.mesh.intersectsMesh(elements[i],false)){
        if(elements[i]!=box){
          this.last = 1;
          elements[i].dispose();
          elements.splice(i,1);
        }
      }
    }

    if(this.dir){
      this.mesh.position.x += this.speed;
    } else {
      this.mesh.position.x -= this.speed;
    }

    this.last--;
  }

};
