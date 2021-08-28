import {
  LEFT_CHEVRON, BG, CLICK, PORTAL_LAYER, SPACE_BG, BORDER
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight, getRelative } from '../helpers';
import { Player, Border } from 'game/objects';
import { setOriginalNode } from 'typescript';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

/**
 * Scene where gameplay takes place
 */
export class GameScene extends Phaser.Scene {
  private player?: Player;
  private selectedGotchi?: AavegotchiGameObject;
  private border?: Phaser.GameObjects.Group

  // Sounds
  private back?: Phaser.Sound.BaseSound;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {
    // Add layout
    this.add.image(getGameHeight(this) / 1.55, getGameHeight(this) / 2, SPACE_BG).setDisplaySize(getGameHeight(this) * 3.1, getGameHeight(this))
    this.back = this.sound.add(CLICK, { loop: false });
    this.createBackButton();

    // Add a player sprite that can be moved around.
    this.player = new Player({
      scene: this,
      x: getGameWidth(this) / 2,
      y: getGameHeight(this) / 2,
      key: this.selectedGotchi?.spritesheetKey || ''
    })

    this.border = this.add.group({
      maxSize: 5,
      classType: Border,
      runChildUpdate: true
    })

    this.addFirstBorder()

    this.addBorderRow()

    this.time.addEvent({
      delay: getGameHeight(this) *5.65,
      callback: this.addBorderRow,
      callbackScope: this,
      loop: true
    })
  }

  private addFirstBorder = () => {
    this.addBorder(getGameHeight(this) * .9, getGameHeight(this) / 2, -(getGameHeight(this) / 1.55))
  }

  private addBorderRow = () => {
    this.addBorder(getGameHeight(this) * 4, getGameHeight(this) / 2, -getGameHeight(this) / 1.55)
  }

  private addBorder = (x: number, y: number, velocityX: number): void => {
    const border: Border = this.border?.get()
    border.activate(x, y, velocityX)
  }
  

  private createBackButton = () => {
    this.add
      .image(getRelative(54, this), getRelative(54, this), LEFT_CHEVRON)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .setDisplaySize(getRelative(94, this), getRelative(94, this))
      .on('pointerdown', () => {
        this.back?.play();
        window.history.back();
      });
  };

  public update(): void {
    // Every frame, we update the player
    this.player?.update();	
  }
}
