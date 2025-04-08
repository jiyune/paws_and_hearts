export class QuizScene extends Phaser.Scene {
    constructor() {
      super('QuizScene');
    }
  
    init(data) {
      this.fragen = data.fragen || [];
      this.zurueck = data.zurueck || 'GameScene';
      this.onFinish = data.onFinish || null;
    }
  
    create() {
      this.cameras.main.setBackgroundColor('#111');
      const frage = Phaser.Utils.Array.GetRandom(this.fragen);
      const alleFragen = Phaser.Utils.Array.Shuffle(this.fragen).slice(0, 3); // 3 Fragen zufällig
      this.aktuelleFragen = Phaser.Utils.Array.Shuffle(alleFragen);
  
      this.zeigeFrage(0);
    }
  
    zeigeFrage(index) {
      if (index >= this.aktuelleFragen.length) {
        this.quizBeendet();
        return;
      }
  
      const frage = this.aktuelleFragen[index];
  
      this.add.text(400, 100, frage.frage, {
        fontSize: '24px',
        fill: '#fff',
        wordWrap: { width: 600 }
      }).setOrigin(0.5);
  
      frage.antworten.forEach((antwort, i) => {
        const btn = this.add.text(400, 200 + i * 50, `[ ${antwort} ]`, {
          fontSize: '22px',
          fill: '#fff'
        }).setOrigin(0.5).setInteractive();
  
        btn.on('pointerdown', () => {
          if (antwort === frage.richtig) {
            this.scene.restart({ ...this.data, fragen: this.aktuelleFragen, frageIndex: index + 1 });
          } else {
            this.add.text(400, 400, 'Falsch 😅 Versuch’s nochmal...', { fontSize: '20px', fill: '#f88' }).setOrigin(0.5);
          }
        });
      });
    }
  
    quizBeendet() {
      this.scene.start(this.zurueck);
      if (this.onFinish) this.onFinish();
    }
  }
  