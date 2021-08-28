import { getGameHeight } from "game/helpers";
import { BORDER } from "game/assets";
import { Scene } from "phaser";

export class Border extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, BORDER, 0)

        this.displayHeight = getGameHeight(scene)
        this.displayWidth = getGameHeight(scene) *3.1
    }

    public activate = (x: number, y: number, velocityX: number) => {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(velocityX)

        this.setPosition(x, y)
    }
    public update = () => {
        if(this.x < -1 * (this.displayHeight * 3.1)) {
            this.destroy()
        }
    }
}