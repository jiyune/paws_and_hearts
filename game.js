import { QuizScene } from '/Minigames/QuizScene.js';
import { BeerenMinigame } from '/Minigames/BeerenMinigame.js';



// 🎬 Startszene
class StartScene extends Phaser.Scene {
    constructor() {
      super('StartScene');
    }
  
    preload() {}
  
    create() {
      this.add.text(400, 200, '🐶 PAWS_AND_HEARTS 🐧', {
        fontSize: '40px',
        fill: '#000'
      }).setOrigin(0.5);
  
      const startBtn = this.add.text(400, 350, '[ Start ]', {
        fontSize: '32px',
        fill: '#000'
      }).setOrigin(0.5).setInteractive();
  
      startBtn.on('pointerdown', () => {
        this.scene.start('IntroScene');
      });
    }
  }
  
// 📱 Intro mit Handynachricht
class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('#222');

        const messageLines = [
        '📲 Von: Pingu ❤',
        '',
        'Hey...',
        'Ich wollte dir ein paar süße Beeren für deinen Geburtstagskuchen sammeln......',
        'aber jetzt weiß ich nicht mehr, wo ich bin 😢',
        '',
        'Ich glaube, ich bin irgendwo im Wald... es wird langsam dunkel...',
        '',
        'Und... ich hab nur noch 1% Akku.',
        '',
        'Kannst du mich bitte holen?',
        '',
        '🐧💕'
        ];

        let currentLine = 0;
        const textObject = this.add.text(100, 100, '', {
        fontSize: '24px',
        fill: '#fff',
        wordWrap: { width: 600 }
        });

        const showNextLine = () => {
        if (currentLine < messageLines.length) {
            textObject.setText(textObject.text + '\n' + messageLines[currentLine]);
            currentLine++;
        } else {
            // "Handy geht aus" Effekt
            this.time.delayedCall(1000, () => {
            this.cameras.main.fadeOut(3000, 0, 0, 0);
            this.time.delayedCall(3000, () => {
                this.scene.start('GameScene');
            });
            });
        }
        };

        // Zeige erste Zeile direkt, danach per Klick
        this.input.on('pointerdown', showNextLine);
        showNextLine();
    }
}
  
// 🎮 Spielszene
class GameScene extends Phaser.Scene {
    constructor() {
      super('GameScene');
    }
  


    preload() {
      this.load.image('hund', 'assets/sprites/hund.png');
      this.load.image('hund_portrait', 'assets/sprites/hund_portrait.png');
      this.load.image('eichhörnchen', 'assets/sprites/Eichhörnchen.png');
      this.load.image('ente', 'assets/sprites/ente.png');
      this.load.image('fuchs', 'assets/sprites/fuchs.png');
      this.load.image('katze', 'assets/sprites/katze.png');
      this.load.image('hase', 'assets/sprites/hase.png');
      this.load.image('hintergrund', 'assets/tilesets/boden.png');



    }
  
    create() {

        // 🎬 Kamera sanft einblenden
        this.cameras.main.fadeIn(1000, 0, 0, 0);
      
        // 🟦 Hintergrund
        this.add.image(0, 0, 'hintergrund')
        .setOrigin(0, 0)
        .setDisplaySize(this.scale.width, this.scale.height);
    
        // 🐶 Spielfigur laden
        this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, 'hund').setScale(1.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        // 🐿️ Eichhörnchen
        this.eichhoernchen = this.physics.add.staticSprite(120, 550, 'eichhörnchen').setScale(1.2);
        this.eichhoernchen.dialogShown = false;
        this.eichhoernchen.setVisible(false);
        this.eichhoernchen.body.enable = false;
        this.eichhoernchen.dialogShown = false;
        this.physics.add.overlap(this.player, this.eichhoernchen, () => {
        if (!this.eichhoernchen.dialogShown) {
            this.eichhoernchen.dialogShown = true;
            this.showDialog('eichhörnchen', [
                'Hey du!',
                'Pingu? Ich habe sie gesehen.',
                'Aber einen Hinweis bekommst du erst nachdem du meine Frage richtig beantwortet hast!'
              ], () => {
                this.zeigePopoFrage();
              });        
        }
        });

        // 🦆 Ente
        this.ente = this.physics.add.staticSprite(660, 190, 'ente').setScale(1.2);
        this.ente.dialogShown = false;
        this.ente.setVisible(false);
        this.ente.body.enable = false;
        this.ente.dialogShown = false;
        this.physics.add.overlap(this.player, this.ente, () => {
            if (!this.ente.dialogShown) {
                this.ente.dialogShown = true;
                this.showDialog('ente', [
                    'Hallo Hundi!',
                    'Du suchst Pingu? Ich wir sind eben zusammen Beeren pflücken gewesen.',
                    'Sie müsste noch im Beerenfeld sein.',
                    'Wenn du die Frage richtig beantwortest, kann ich dir den Weg zeigen!'
                  ], () => {
                    this.zeigeFlirtFrage();
                  });        
            }
            });            


        // 🦊 Fuchs – wird erst später freigeschaltet
        this.fuchs = this.physics.add.staticSprite(120, 200, 'fuchs').setScale(1.2);
        this.fuchs.setVisible(false);
        this.fuchs.body.enable = false;
        this.fuchs.dialogShown = false;
        this.physics.add.overlap(this.player, this.fuchs, () => {
            if (!this.fuchs.dialogShown) {
                this.fuchs.dialogShown = true;
                this.showDialog('fuchs', [
                    'Pingu? Hm… vielleicht.',
                    'Ich zeig dir den Weg, aber nur wenn du clever genug bist!',
                    'Schaffst du mein Quiz? 😏'
                  ],() => {
                    this.zeigeJahrestagFrage();
                }
                );   
            }
            });

        // 🐰 Hase
        this.hase = this.physics.add.staticSprite(690, 520, 'hase').setScale(1.2);
        this.hase.dialogShown = false;

        this.physics.add.overlap(this.player, this.hase, () => {
            if (!this.hase.dialogShown) {
                this.hase.dialogShown = true;
                this.showDialog('hase', [
                    'Pingu hat sich verlaufen?',
                    'Ich habe sie leider nicht gesehen…',
                    'Aber ich habe gehört, dass der Fuchs etwas weiß…',
                    'Frag ihn mal! 🦊',
                    'Aber ich verrate dir erst, wo er ist, wenn du die nächste Frage richtig beantwortest!'
                ], () => {
                    this.zeigeRestaurantFrage();
                });
            }
            
        });
        

        [this.eichhoernchen, this.ente, this.fuchs, this.hase].forEach(npc => {
            this.tweens.add({
              targets: npc,
              y: npc.y - 5,
              duration: 300,
              yoyo: true,
              repeat: -1,
              ease: 'Quad.easeInOut'
            });
          });
          

        // Blocker
        // 🧱 Blocker-Daten (x, y, width, height)
        const blockerData = [
            [150, 390, 400, 150], //C
            [650, 325, 300, 150], //M
            [50, 65, 100, 130], //A
            [19, 228, 38, 195], //B
            [34, 554, 68, 142], //D
            [675, 400, 200, 50], //N
            [195, 145, 65, 50], //E
            [248, 153, 30, 30], //F
            [280, 200, 98, 60], //G
            [345,30,68,60], //I
            [300,30,50,40], //H
            [615,48,450,98], //J
            [645, 117 , 390, 45], //K
            [805, 214, 70, 142], //L
            [805, 551, 70, 142] //O
            ,[650,600,300,50]  //P
            ,[450,550,50,100]  //Q
        ];
        
        // 🔁 Erzeuge alle Blocker
        this.blockers = this.physics.add.staticGroup();
        
        blockerData.forEach(([x, y, w, h]) => {
            const blocker = this.add.rectangle(x, y, w, h, 0xff0000, 0); // rot-transparent zum Testen
            this.physics.add.existing(blocker, true); // true = static
            this.blockers.add(blocker);
        });

        this.physics.add.collider(this.player, this.blockers);
        this.showDialog('hund_portrait', [
            'Oh nein..',
            'Ich muss Pingu finden… aber wo kann sie nur sein?',
            'Vielleicht können mir meine Freunde helfen. Ich sollte mich mal umhören.'
        ]);
 

        // 🔙 Zurück-Button
        const backBtn = this.add.text(this.scale.width - 20, 20,  '[ Zurück zum Hauptmenü ]', {
          fontSize: '20px',
          fill: '#000'
        }).setOrigin(1,0).setInteractive();
      
        backBtn.on('pointerdown', () => {
          this.scene.start('StartScene');
        });

        
    }

    showDialog(portraitKey, dialogLines, onFinish = null) {
        let currentLine = 0;
      
        const dialogBox = this.add.rectangle(
          this.scale.width / 2,
          this.scale.height - 60,
          this.scale.width - 40,
          120,
          0x000000,
          0.85
        ).setStrokeStyle(2, 0xffffff);
      
        const portrait = this.add.image(70, this.scale.height - 60, portraitKey)
          .setScale(1.2)
          .setOrigin(0.5);
      
        const dialogText = this.add.text(
          130,
          this.scale.height - 95,
          '',
          {
            fontSize: '20px',
            fill: '#ffffff',
            wordWrap: { width: this.scale.width - 180 },
            align: 'left'
          }
        ).setShadow(2, 2, '#000000', 2, false, true);
      
        const button = this.add.text(this.scale.width - 100, this.scale.height - 40, '[ Weiter ]', {
          fontSize: '20px',
          fill: '#fff'
        }).setInteractive().setOrigin(0.5).setShadow(2, 2, '#000000', 2);
      
        const showLine = () => {
          if (currentLine < dialogLines.length) {
            dialogText.setText(dialogLines[currentLine]);
            currentLine++;
            if (currentLine === dialogLines.length) {
              button.setText('[ Okay ]');
            }
          } else {
            dialogBox.destroy();
            dialogText.destroy();
            portrait.destroy();
            button.destroy();
            if (onFinish) onFinish();
          }
        };
      
        button.on('pointerdown', showLine);
        showLine(); // Starte mit erster Zeile
    }
    

            // 👉 Funktion separat, damit man sie bei falscher Antwort wiederverwenden kann
            zeigeRestaurantFrage() {
                const frage = 'Was ist unser Go-To-Restaurant für ein Date?';
                const antworten = ["l'osteria", "jins haus", "la lucha"];
                const korrekt = "la lucha";
            
                const frageText = this.add.text(this.scale.width / 2, 100, frage, {
                    fontSize: '22px',
                    fill: '#000',
                    align: 'center',
                    wordWrap: { width: this.scale.width - 100 }
                }).setOrigin(0.5);
            
                const antwortTextObjekte = [];
            
                antworten.forEach((antwort, index) => {
                    const antwortText = this.add.text(this.scale.width / 2, 180 + index * 40, antwort, {
                        fontSize: '20px',
                        fill: '#003366',
                        backgroundColor: '#eeeeee',
                        padding: { x: 10, y: 5 }
                    }).setOrigin(0.5).setInteractive();
            
                    antwortText.on('pointerdown', () => {
                        frageText.destroy();
                        antwortTextObjekte.forEach(obj => obj.destroy());
            
                        if (antwort === korrekt) {
                            this.showDialog('hase', [
                                'Richtig! 🍝',
                                'Der Fuchs wartet gleich da vorne!'
                            ], () => {
                                this.fuchs.setVisible(true);
                                this.fuchs.body.enable = true;
                            });
                        } else {
                            this.showDialog('hase', [
                                'Hmm... leider falsch 😢',
                                'Versuch es einfach nochmal!'
                            ], () => {
                                // 🔁 Wiederhole NUR die Frage
                                this.zeigeRestaurantFrage();
                            });
                        }
                    });
            
                    antwortTextObjekte.push(antwortText);
                });
            }

            zeigeJahrestagFrage() {
                const frage = "Was haben wir an unserem ersten Jahrestag gemacht?";
                const antworten = ["Fotobox", "Europapark", "Phantasialand"];
                const korrekt = "Europapark";
            
                const frageText = this.add.text(this.scale.width / 2, 100, frage, {
                    fontSize: '22px',
                    fill: '#000',
                    align: 'center',
                    wordWrap: { width: this.scale.width - 100 }
                }).setOrigin(0.5);
            
                const antwortTextObjekte = [];
            
                antworten.forEach((antwort, index) => {
                    const antwortText = this.add.text(this.scale.width / 2, 180 + index * 40, antwort, {
                        fontSize: '20px',
                        fill: '#003366',
                        backgroundColor: '#eeeeee',
                        padding: { x: 10, y: 5 }
                    }).setOrigin(0.5).setInteractive();
            
                    antwortText.on('pointerdown', () => {
                        frageText.destroy();
                        antwortTextObjekte.forEach(obj => obj.destroy());
            
                        if (antwort === korrekt) {
                            this.showDialog('fuchs', [
                                'Richtig! 🍝',
                                'Ich kann dir aber leider nicht sagen, wo Pingu ist.',
                                'Vielleicht weiß es das Eichhörnchen?',
                                'Frag es mal!', 
                                'Es ist im Haus im Wald.'
                            ], () => {
                                this.eichhoernchen.setVisible(true);
                                this.eichhoernchen.body.enable = true;
                            });
                        } else {
                            this.showDialog('fuchs', [
                                'Entäuschend.. 😢',
                                'Versuch es nochmal!'
                            ], () => {
                                // 🔁 Wiederhole NUR die Frage
                                this.zeigeJahrestagFrage();
                            });
                        }
                    });
            
                    antwortTextObjekte.push(antwortText);
                });
            }
            zeigePopoFrage() {
                const frage = "Wer liebt mehr Popos 🍑?";
                const antworten = ["PINGU", "HUNDI"];
                const korrekt = "PINGU";
            
                const frageText = this.add.text(this.scale.width / 2, 100, frage, {
                    fontSize: '22px',
                    fill: '#000',
                    align: 'center',
                    wordWrap: { width: this.scale.width - 100 }
                }).setOrigin(0.5);
            
                const antwortTextObjekte = [];
            
                antworten.forEach((antwort, index) => {
                    const antwortText = this.add.text(this.scale.width / 2, 180 + index * 40, antwort, {
                        fontSize: '20px',
                        fill: '#003366',
                        backgroundColor: '#eeeeee',
                        padding: { x: 10, y: 5 }
                    }).setOrigin(0.5).setInteractive();
            
                    antwortText.on('pointerdown', () => {
                        frageText.destroy();
                        antwortTextObjekte.forEach(obj => obj.destroy());
            
                        if (antwort === korrekt) {
                            this.showDialog('eichhörnchen', [
                                'Richtig! 🍝',
                                'Ich glaube sie war bis eben noch mit der Ente unterwegs.',
                                'Die Ente wohnt oben am Fluss.'
                            ], () => {
                                this.ente.setVisible(true);
                                this.ente.body.enable = true;
                            });
                        } else {
                            this.showDialog('fuchs', [
                                'Leider falsch.. 😢',
                                'Versuch es nochmal!'
                            ], () => {
                                // 🔁 Wiederhole NUR die Frage
                                this.zeigePopoFrage();
                            });
                        }
                    });
            
                    antwortTextObjekte.push(antwortText);
                });
            }


            zeigeFlirtFrage() {
                const frage = "Was sagst du, wenn du in Korea angeflirtet wirst?";
                const antworten = ["여자친구 있어요", "안녕하세요", "사랑해"];
                const korrekt = "여자친구 있어요";
            
                const frageText = this.add.text(this.scale.width / 2, 100, frage, {
                    fontSize: '22px',
                    fill: '#000',
                    align: 'center',
                    wordWrap: { width: this.scale.width - 100 }
                }).setOrigin(0.5);
            
                const antwortTextObjekte = [];
            
                antworten.forEach((antwort, index) => {
                    const antwortText = this.add.text(this.scale.width / 2, 180 + index * 40, antwort, {
                        fontSize: '20px',
                        fill: '#003366',
                        backgroundColor: '#eeeeee',
                        padding: { x: 10, y: 5 }
                    }).setOrigin(0.5).setInteractive();
            
                    antwortText.on('pointerdown', () => {
                        frageText.destroy();
                        antwortTextObjekte.forEach(obj => obj.destroy());
            
                        if (antwort === korrekt) {
                            this.showDialog('ente', [
                                'Richtig!',
                                'Pingu müsste im Beerenfeld ganz im Norden sein.',
                                'Ich hoffe du findest sie!'
                            ], () => {
                                this.ente.setVisible(true);
                                this.ente.body.enable = true;
                            });
                        } else {
                            this.showDialog('fuchs', [
                                'Leider falsch.. 😢',
                                'Versuch es nochmal!'
                            ], () => {
                                // 🔁 Wiederhole NUR die Frage
                                this.zeigeFlirtFrage();
                            });
                        }
                    });
            
                    antwortTextObjekte.push(antwortText);
                });
            }

    update() {
        if (!this.minispielAktiv && this.player && this.cursors) {
          this.player.setVelocity(0);
          if (this.cursors.left.isDown) this.player.setVelocityX(-200);
          else if (this.cursors.right.isDown) this.player.setVelocityX(200);
          if (this.cursors.up.isDown) this.player.setVelocityY(-200);
          else if (this.cursors.down.isDown) this.player.setVelocityY(200);
        }
      
        // 🍓 Korb-Bewegung im Minispiel
        if (this.minispielAktiv && this.minispielKorb && this.minispielCursors) {
          this.minispielKorb.setVelocityX(0);
          if (this.minispielCursors.left.isDown) this.minispielKorb.setVelocityX(-300);
          else if (this.minispielCursors.right.isDown) this.minispielKorb.setVelocityX(300);
        }
      }
      

    startBeerenMinispiel() {
        this.scene.pause(); // Pausiert GameScene
        this.scene.launch('BeerenMinigame', {
            zurueck: 'GameScene',
            beerenZiel: 1,
            onFinish: () => {
                this.showDialog('hase', [
                'Yay! Du hast genug Beeren gefangen! 🍓',
                'Jetzt kann ich endlich Marmelade machen!'
            ], () => {
                this.fuchs.setVisible(true);
                this.fuchs.body.enable = true;
                });
            }
        });
    }
      

      

}
  
  // ⚙️ Spiel-Config + Start
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    physics: {
      default: 'arcade',
      arcade: { debug: false }
    },
    scene: [StartScene, IntroScene, GameScene, BeerenMinigame, QuizScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);
