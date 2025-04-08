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
      this.load.image('beere', 'assets/sprites/beere.png');
      this.load.image('korb', 'assets/sprites/korb.png'); 
      this.load.image('minigame', 'assets/tilesets/minigame.png'); 
      this.load.image('pingu', 'assets/sprites/pingu.png');


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

        //pingu
        this.pingu = this.physics.add.staticSprite(150, 50, 'pingu').setScale(1.2);
        this.pingu.dialogShown = false;
        this.pingu.setVisible(false);
        this.physics.add.overlap(this.player, this.pingu, () => {
        if (!this.pingu.dialogShown) {
            this.pingu.dialogShown = true;
            this.showDialog('pingu', [
                'Du hast mich gefunden!✨', 'Danke!', 'Ich habe dir ein paar Beeren für deinen Geburtstagskuchen gesammelt. 🍓', 'Lass uns zusammen nach Hause gehen.', 'I❤️U'
              ], );        
        }
        });

        // 🐿️ Eichhörnchen
        this.eichhoernchen = this.physics.add.staticSprite(65, 190, 'eichhörnchen').setScale(1.2);
        this.eichhoernchen.dialogShown = false;
        this.eichhoernchen.setVisible(false);
        this.eichhoernchen.body.enable = false;
        this.eichhoernchen.dialogShown = false;
        this.physics.add.overlap(this.player, this.eichhoernchen, () => {
        if (!this.eichhoernchen.dialogShown) {
            this.eichhoernchen.dialogShown = true;
            this.showDialog('eichhörnchen', [
                "Weiß ich was über Pingu? Vielleicht. Vielleicht nicht. 😎",
                "Aber du kannst es rausfinden… mit der richtigen Antwort!"              
            ], () => {
                this.zeigeJahrestagFrage(); // z. B. danach Spiel starten
              });        
        }
        }
    );

        // 🦆 Ente
        this.ente = this.physics.add.staticSprite(660, 190, 'ente').setScale(1.2);
        this.ente.dialogShown = false;
        this.ente.setVisible(false);
        this.ente.body.enable = false;
        this.ente.dialogShown = false;
        this.physics.add.overlap(this.player, this.ente, () => {
            if (!this.ente.dialogShown) {
                this.ente.dialogShown = true;
                this.showDialog('ente', ['Quark',
                    'Pingu habe ich gesehen!',
                    'Wir waren zusammen Beeren pflücken.',
                    'Sie ist bestimmt noch im Beerenfeld.',
                    'Aber ich kann dir nicht einfach so helfen. 😏',
                    'Nur wenn du das Wort richtig erräts, verrat ich dir, wo’s langgeht! 😌✨'
                  ], () => {
                    this.startGalgenmaennchenMinispiel(); // z. B. danach Spiel starten
                  });        
            }
            }
        );             


        // 🦊 Fuchs – wird erst später freigeschaltet
        this.fuchs = this.physics.add.staticSprite(260, 550, 'fuchs').setScale(1.2);
        this.fuchs.setVisible(false);
        this.fuchs.body.enable = false;
        this.fuchs.dialogShown = false;
        this.physics.add.overlap(this.player, this.fuchs, () => {
            if (!this.fuchs.dialogShown) {
                this.fuchs.dialogShown = true;
                this.showDialog('fuchs', ['Ohhh, jemand ist wohl auf Rettungsmission 🐾',
                    'Pingu?',
                    'Hm... Ich *könnte* wissen, wo sie ist...',
                    'Aber warum sollte ich dir das einfach so verraten?',
                    'Beweise mir erst, dass du klug genug bist!',
                    'Ich stell dir eine Frage – und wenn du richtig liegst…',
                    'verrat ich dir, wo’s langgeht! 😌✨'
                  ], () => {
                    this.zeigeRestaurantFrage(); // z. B. danach Spiel starten
                  });        
            }
            }
        );

        // 🐰 Hase
        this.hase = this.physics.add.staticSprite(690, 520, 'hase').setScale(1.2);
        this.hase.dialogShown = false;

        this.physics.add.overlap(this.player, this.hase, () => {
        if (!this.hase.dialogShown) {
            this.hase.dialogShown = true;
            this.showDialog('hase', [
                'Pingu hat sich verlaufen?',
                'Ich habe sie leider nicht gesehen…',
                'Aber bevor du gehst… darf ich dich um etwas bitten?',
                'Ich brauche ganz dringend Beeren… für ein geheimes Rezept! 😳',
                'Magst du ein paar für mich sammeln? 🍓✨'
              ], () => {
                this.startBeerenMinispiel(); // z. B. danach Spiel starten
              });        
        }
        });

        [this.eichhoernchen, this.ente, this.fuchs, this.hase, this.pingu].forEach(npc => {
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
            const blocker = this.add.rectangle(x, y, w, h, 0xff0000, 0.0); // rot-transparent zum Testen
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
    
    startBeerenMinispiel() {
        this.aktuellesMinispiel = 'beeren'; // oder 'galgen' oder null

        this.beerenGefangen = 0;
        this.beerenZiel = 1;
        this.minispielAktiv = true;
      
        // Hintergrundbild anzeigen (statt dunklem Overlay)
        const bg = this.add.image(this.scale.width / 2, this.scale.height / 2, 'minigame')
          .setDisplaySize(this.scale.width, this.scale.height)
          .setDepth(0); // ganz unten
      
        // Korb (Spieler)
        const korb = this.physics.add.sprite(this.scale.width / 2, this.scale.height, 'korb')
          .setScale(2.5)
          .setDepth(1);
        korb.setCollideWorldBounds(true);
        korb.body.allowGravity = false;
        this.minispielKorb = korb;

        // 🍓 Zähler-Text anzeigen
        this.beerenText = this.add.text(20, 20, 'Beeren: 0 / ' + this.beerenZiel, {
        fontSize: '24px',
        fill: '#ffffff'
        }).setDepth(2).setShadow(2, 2, '#000', 2);
  
      
        // Steuerung
        this.minispielCursors = this.input.keyboard.createCursorKeys();
      
        // Beeren-Gruppe
        const beeren = this.physics.add.group();
        this.minispielBeeren = beeren;
      
        // Beeren spawnen
        this.minispielTimer = this.time.addEvent({
          delay: 800,
          callback: () => {
            const x = Phaser.Math.Between(50, this.scale.width - 50);
            const b = beeren.create(x, -20, 'beere').setScale(2.0);
            b.setVelocityY(200);
            b.setDepth(1);
          },
          loop: true
        });
        
        // Boden-Zone, wo Beeren „verloren“ gehen
        this.beerenBoden = this.physics.add.staticImage(
            this.scale.width / 2,
            this.scale.height + 20, // etwas unterhalb sichtbarem Bereich
            null
        ).setSize(this.scale.width, 40).setVisible(false);
        
        // Kollision mit Boden
        this.physics.add.overlap(this.beerenBoden, this.minispielBeeren, (boden, beere) => {
            beere.destroy();
        
            // 🧮 -1 Beere, aber nicht unter 0
            this.beerenGefangen = Math.max(0, this.beerenGefangen - 1);
            this.beerenText.setText('Beeren: ' + this.beerenGefangen + ' / ' + this.beerenZiel);
        });
  
        // Kollision Korb <-> Beere
        this.physics.add.overlap(korb, beeren, (korb, beere) => {
          beere.destroy();
          this.beerenGefangen++;
          // 🆕 Beeren-Text aktualisieren
          this.beerenText.setText('Beeren: ' + this.beerenGefangen + ' / ' + this.beerenZiel);
          if (this.beerenGefangen >= this.beerenZiel) {
            this.beendenBeerenMinispiel(bg, korb, beeren);
          }
        });        
    }
    beendenBeerenMinispiel(bg, korb, beeren) {
        this.minispielAktiv = false;
        this.minispielTimer.remove();
        korb.destroy();
        beeren.clear(true, true);
        bg.destroy();
        this.beerenText.destroy(); // 🍓 Counter entfernen
        this.showDialog('hase', [
          'Yay! Du hast genug Beeren gefangen! 🍓',
          'Jetzt kann ich endlich Marmelade machen!',
          'Und weißt du was? Der Fuchs will auch mit dir reden...'
        ], () => {
          this.fuchs.setVisible(true);
          this.fuchs.body.enable = true;
        });
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
                            this.showDialog('fuchs', [
                                'Richtig! 🍝',
                                'Aaaber...',
                                'Sorry, ich habe gelogen. Ich weiß nicht wqo Pingu ist. 😳',
                                'Frag doch mal das Eichhörnchen, vielleicht weiß es mehr.'
                            ], () => {
                                this.eichhoernchen.setVisible(true);
                                this.eichhoernchen.body.enable = true;
                            });
                        } else {
                            this.showDialog('fuchs', [
                                'Enttäuschend..',
                                'Versuch es nochmal!'
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
                            this.showDialog('eichhörnchen', [
                                "Wow, das ist richtig",
                                "Ich hab Pingu mit der Ente zusammen gesehen vorhin.",
                                "Frag mal die Ente. Sie wohnt unten am Fluss. 🦆💧"
                            ], () => {
                                this.ente.setVisible(true);
                                this.ente.body.enable = true;
                            });
                        } else {
                            this.showDialog('eichhörnchen', [
                                "Ohhh... schade 😢",
                                "Das war wohl nix. Versuch's nochmal – ich glaub an dich!"
                            ], () => {
                                // 🔁 Wiederhole NUR die Frage
                                this.zeigeJahrestagFrage();
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

            startGalgenmaennchenMinispiel() {
                console.log("Galgenmännchen startet...");
                this.aktuellesMinispiel = 'galgen';

                this.minispielAktiv = true;
                if (this.keyHandler) {
                    this.input.keyboard.removeListener('keydown', this.keyHandler);
                    this.keyHandler = null;
                  }
                const woerter = ['pinguin', 'geburtstag', 'hund', 'herzchen', 'marmelade'];
                this.zielwort = Phaser.Utils.Array.GetRandom(woerter).toUpperCase();
                this.geraten = [];
                this.fehler = 0;
                const maxFehler = 6;
                

                this.overlay = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000, 0.7);
                
                this.falschText = this.add.text(this.scale.width / 2, 270, 'Falsch geraten: ', {
                    fontSize: '20px',
                    fill: '#ffaaaa'
                  }).setOrigin(0.5);
                  
                this.anzeige = this.add.text(this.scale.width / 2, 150, '', {
                  fontSize: '40px',
                  fill: '#fff'
                }).setOrigin(0.5);
              
                this.fehlText = this.add.text(this.scale.width / 2, 220, 'Fehler: 0 / ' + maxFehler, {
                  fontSize: '24px',
                  fill: '#ffcccc'
                }).setOrigin(0.5);

                this.preview = this.add.text(this.scale.width / 2, 100, this.zielwort.split('').map(() => '_').join(' '), {
                    fontSize: '40px',
                    fill: '#ffffaa',
                    stroke: '#000000',
                    strokeThickness: 4
                  }).setOrigin(0.5);
                  

                const updateAnzeige = () => {
                    if (this.anzeige) {
                        const text = this.zielwort.split('').map(b => this.geraten.includes(b) ? b : '_').join(' ');
                        this.anzeige.setText(text);
                      }
                    if (this.fehlText) {
                    this.fehlText.setText(`Fehler: ${this.fehler} / ${maxFehler}`);
                    }
                };
                
                updateAnzeige();
                
                this.input.keyboard.removeAllListeners('keydown');              
                this.keyHandler = this.input.keyboard.on('keydown', (event) => {
                  if (!event.key.match(/^[a-zA-Z]$/)) return;
                  const buchstabe = event.key.toUpperCase();
                  if (this.geraten.includes(buchstabe)) return;
              
                  this.geraten.push(buchstabe);

                  const falsche = this.geraten.filter(b => !this.zielwort.includes(b));
                  this.falschText.setText('Falsch geraten: ' + falsche.join(', '));
                  
                  if (!this.zielwort.includes(buchstabe)) {
                    this.fehler++;
                  }
              
                  updateAnzeige();
                  
              
                  // 🧠 Reihenfolge angepasst!
if (this.zielwort.split('').every(b => this.geraten.includes(b))) {
    this.input.keyboard.removeListener('keydown', this.keyHandler);
    this.keyHandler = null;
    this.time.delayedCall(500, () => {
      this.overlay?.destroy();
      this.anzeige?.destroy();
      this.fehlText?.destroy();
      this.falschText?.destroy();
      this.preview?.destroy();

      this.minispielAktiv = false;
      this.showDialog('hase', [
        'Wow, du hast das Wort erraten! 🥳',
        'Du bist echt schlau!', 'Pingu ist im Beerenfeld ganz im Norden.','Ich hoffe du findest sie!'
      ], () => {
        this.pingu.setVisible(true);
        this.pingu.body.enable = true;
      });
    });



} else if (this.fehler >= maxFehler) {
    this.input.keyboard.removeListener('keydown', this.keyHandler);
    this.keyHandler = null;
    this.time.delayedCall(500, () => {
      this.overlay?.destroy();
      this.anzeige?.destroy();
      this.fehlText?.destroy();
      this.falschText?.destroy();
      this.preview?.destroy();

      this.minispielAktiv = false;
      this.showDialog('hase', [
        'Oh nein… 😢',
        'Das war wohl nix.',
        'Willst du es nochmal probieren?'
      ], () => {
        this.geraten = []; // Reset!
        this.fehler = 0;   // Reset!
        this.startGalgenmaennchenMinispiel(); // Spiel wird neu gestartet
      });
    });
}

                });
              }

    update() {
        // 🐶 Spieler-Bewegung
        if (!this.minispielAktiv && this.player && this.cursors) {
          this.player.setVelocity(0);
          if (this.cursors.left.isDown) this.player.setVelocityX(-200);
          else if (this.cursors.right.isDown) this.player.setVelocityX(200);
          if (this.cursors.up.isDown) this.player.setVelocityY(-200);
          else if (this.cursors.down.isDown) this.player.setVelocityY(200);
        }
      
        // 🍓 Korb-Bewegung nur beim Beeren-Minispiel!
        if (
            this.minispielAktiv &&
            this.minispielKorb &&
            this.minispielCursors &&
            this.minispielKorb.setVelocityX 
             && this.aktuellesMinispiel === 'beeren'
        ) {
            this.minispielKorb.setVelocityX(0);
            if (this.minispielCursors.left.isDown) this.minispielKorb.setVelocityX(-300);
            else if (this.minispielCursors.right.isDown) this.minispielKorb.setVelocityX(300);
        }
  
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
    scene: [StartScene, IntroScene, GameScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);