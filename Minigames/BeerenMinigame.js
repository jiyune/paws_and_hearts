export class BeerenMinigame extends Phaser.Scene {
    constructor() {
      super('BeerenMinigame');
    }
  
    init(data) {
      this.zurueckScene = data.zurueck || 'GameScene';
    }
  
    preload() {
      this.load.image('korb', 'assets/sprites/korb.png');
      this.load.image('beere', 'assets/sprites/beere.png');
      this.load.image('minigame', 'assets/tilesets/minigame.png');
    }
  
    create() {
      this.beerenGefangen = 0;
      this.beerenZiel = 1;
  
      this.add.image(this.scale.width / 2, this.scale.height / 2, 'minigame')
        .setDisplaySize(this.scale.width, this.scale.height);
  
      this.korb = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 40, 'korb')
        .setScale(2.5);
      this.korb.setCollideWorldBounds(true);
      this.korb.body.allowGravity = false;
  
      this.cursors = this.input.keyboard.createCursorKeys();
  
      this.beeren = this.physics.add.group();
  
      this.beerenText = this.add.text(20, 20, 'Beeren: 0 / ' + this.beerenZiel, {
        fontSize: '24px',
        fill: '#ffffff'
      }).setShadow(2, 2, '#000', 2);
  
      // Spawner
      this.spawnTimer = this.time.addEvent({
        delay: 1000,
        callback: () => {
          const x = Phaser.Math.Between(50, this.scale.width - 50);
          const beere = this.beeren.create(x, -20, 'beere').setScale(2.0);
          beere.setVelocityY(200);
        },
        loop: true
      });
  
      // Kollision
      this.physics.add.overlap(this.korb, this.beeren, (korb, beere) => {
        beere.destroy();
        this.beerenGefangen++;
        this.beerenText.setText('Beeren: ' + this.beerenGefangen + ' / ' + this.beerenZiel);
        if (this.beerenGefangen >= this.beerenZiel) {
          this.beendeMinispiel();
        }
      });
    }
  
    beendeMinispiel() {
      this.spawnTimer.remove();
      this.scene.stop(); // Beendet das Minigame
      this.scene.resume(this.zurueckScene); // Holt dich in die GameScene zurück, ohne sie neu zu laden!
      this.scene.get(this.zurueckScene).events.emit('beerenErfolgreich'); // Sag Bescheid
    }
  
    update() {
      if (this.korb && this.cursors) {
        this.korb.setVelocityX(0);
        if (this.cursors.left.isDown) this.korb.setVelocityX(-300);
        else if (this.cursors.right.isDown) this.korb.setVelocityX(300);
      }
    }
  }
  