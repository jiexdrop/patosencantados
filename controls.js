function controls1(ent) {
  if (Key.isDown(Key.UP_1)) ent.moveUp();
  if (Key.isDown(Key.LEFT_1)) ent.moveLeft();
  if (Key.isDown(Key.DOWN_1)) ent.moveDown();
  if (Key.isDown(Key.RIGHT_1)) ent.moveRight();
  if (Key.isDown(Key.A_1)) ent.shoot();
  if (Key.isDown(Key.SPACE_1)) ent.jump();
}

function controls2(ent) {
  if (Key.isDown(Key.UP_2)) ent.moveUp();
  if (Key.isDown(Key.LEFT_2)) ent.moveLeft();
  if (Key.isDown(Key.DOWN_2)) ent.moveDown();
  if (Key.isDown(Key.RIGHT_2)) ent.moveRight();
  if (Key.isDown(Key.A_2)) ent.shoot();
  if (Key.isDown(Key.SPACE_2)) ent.jump();
}
