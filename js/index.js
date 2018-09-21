/* Game initializer */
let Menu = {
    startGame: true,
    gameOptions: false,
    exitGame: false
};

/* The stats of the enemy */
let Npc = {
    hitpoints: 3,
    damage: 3
};

/* Player information */
let Player = new function(){
    this.randomSpawn = [0,1,2];
    this.damage = 10,
    this.gold = 0,
    this.hitpoints = 100,
    this.level = 1,
    this.experience = 0,
    this.class = ["Warrior","Archer","Mage"],
    /* 0 = Warrrior / 1 = Archer / 2 = Mage */
    this.classChoice = 0,
    this.playerX = 1,
    this.playerY = 2,
    this.inventory = "",

    /* Nested constructor function to provide more information about the player */
    this.personalInfo = new function()
                  {
                    nameChoices = ["Daunted", "Fighter", "Jester", "Knight", "Chaos", "Cloud", "Freedom"],
                    nameLength = nameChoices.length,
                    /* Using two random generators because sharing one variable would retrieve duplicate names */
                    randFirstName = nameChoices[Math.floor(Math.random() * nameLength)],
                    randLastName = nameChoices[Math.floor(Math.random() * nameLength)],
                    this.myName = function(){
                        currFName = randFirstName;
                        currLName = randLastName;
                        let counter = 1;
                        nameChoices.forEach(function(tag){
                            console.log(`Name ${counter}. ${tag}`);
                            counter++;
                        });
                        console.log(`huh...uh...${currFName}....${currLName}..\n\nPlease Call Me ${currFName} ${currLName} !`);
                    },
                    this.myStats = function(hp, dmg){
                        hp = Player.hitpoints;
                        dmg = Player.damage;
                        console.log("Stats:\n");
                        console.log(`Hitpoints: ${hp}\nDamage: ${dmg}\nLevel: ${Player.level}\nGold: ${Player.gold}\nClass: ${Player.class[Player.classChoice]}\n`);
                    }
                  },

    /* Attack mechanic */
    this.attackFunc = function(dmg){
        dmg = this.damage;
        Npc.hitpoints -= dmg;
        if(Npc.hitpoints <= 0){
            Player.levelFunc();
            Npc.hitpoints = 0;
            Player.gold += 55;
            console.log("\n");
            console.log("%c ----------------BATTLE-----------------", 'background: #222; color: #bada55');
            console.log(`\nYou've attacked the Enemy for ${Player.damage}`);
            console.log(`Enemy HP: ${Npc.hitpoints}`);
            console.log(`Gold: ${Player.gold}`);
            console.log(`You are now level: ${Player.level}`);
            console.log("\nProceeding to next area.");
            console.log("---------------------------------------");
            setTimeout(function(){
                console.log("%c A Piece of Cake. 😸", 'color: #376b77');
            },100);
            console.log("\n");
        }
    },

    /* Level up Mechanic */
    this.levelFunc = function(){
        Player.experience += 1;
        if(Player.experience > 0 * Player.level){
            Player.level++;
        }
    },

    this.myInventory = [],
    this.allItems = 0,

    /* Inventory System */
    this.inventory = function(){
        let inventory = [];
        let itemList =
        ["Demon Blade",
        "Fate of darkness",
        "Exodia",
        "Scarred Secrect",
        "Ultimate Gift",];

        let randomItem = Math.floor((Math.random() * itemList.length));
        inventory.push(itemList[randomItem]);

        /* Everytime the player wins a match, below will randomly generate
        an item into the players inventory array */
        for(let x = 0; x < inventory.length; x++){
            let hasItem = Player.myInventory.some(f=> inventory.indexOf(f) >= 0);
            let inventoryFull = 4;
            this.allItems += 1;

            /* Check for limiting items to 3 */
            if(this.allItems >= inventoryFull){
                console.log("%c You can only hold 3 weapons.", 'color: red');
            } else{
                /* Checking if the player already has an item */
                /* If a player already has an item, you will not
                be able to get the same one */
                if(hasItem){
                    console.log("Oops, You already have this item!");
                } else{
                    Player.myInventory.push(inventory[x]);
                }
            }
        }
        /* Display inventory */
        console.log("Your Weapons:\n");
        console.log(Player.myInventory);
    }
};

/* Initialize a new instance for the map */
let World = {
    x: Player.playerX,
    y: Player.playerY,
    width: 5,
    height: 5,
    publicX: 0,
    publicY: 0,
    caveCounter: 0,
    visit: false,
    /* The grid in which each coordinate is made from */
    /* [0][1][2] */
    /* [1][1][2] */
    /* [2][1][2] */
    /* The numbers are created using the for loop below */
    map: [
         [0,0,0],
         [0,0,0],
         [0,0,0]]
         ,
         /* Create the map */
         createMap: function(newX, newY){
          for(let row = 0; row < this.map.length; row++){
              for(let column = 0; column < this.map[row].length; column++){
                newY = Player.randomSpawn[Math.floor(Math.random() * Player.randomSpawn.length)];
                newX = Player.randomSpawn[Math.floor(Math.random() * Player.randomSpawn.length)];

                if(this.map[this.x] == this.map[row] && this.map[this.y] == this.map[column])
                {
                    /* create global variables*/
                    this.publicX = newX;
                    this.publicY = newY;
                }
              }
           }
        },

        /* Spawn the player on the map */
        spawnPlayer: function(){
            if(this.publicX < 0 && this.publicX > 3 && this.publicY < 0 && this.publicY > 3){
                console.log("error");
            } else{
              console.log("\n");
              console.log(`You have spawned at coordinates: [${World.publicX}][${World.publicY}]\n`);

              if(this.publicX == 0 && this.publicY == 0){
                console.log(`%c[O][X][X]`, 'background: #222; color: #b8e3ed');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
              }

              else if(this.publicX == 0 && this.publicY == 1){
                console.log(`%c[X][O][X]`, 'background: #222; color: #b8e3ed');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
              }

              else if(this.publicX == 0 && this.publicY == 2){
                console.log(`%c[X][X][O]`, 'background: #222; color: #b8e3ed');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
              }

              else if(this.publicX == 1 && this.publicY == 0){
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[O][X][X]`, 'background: #222; color: #b8e3ed');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
              }

              else if(this.publicX == 1 && this.publicY == 1){
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][O][X]`, 'background: #222; color: #b8e3ed');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
              }

              else if(this.publicX == 1 && this.publicY == 2){
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][O]`, 'background: #222; color: #b8e3ed');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
              }

              else if(this.publicX == 2 && this.publicY == 0){
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[O][X][X]`, 'background: #222; color: #b8e3ed');
              }

              else if(this.publicX == 2 && this.publicY == 1){
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][O][X]`, 'background: #222; color: #b8e3ed');
              }

              else if(this.publicX == 2 && this.publicY == 2){
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][X]`, 'background: #222; color: #bada55');
                console.log(`%c[X][X][O]`, 'background: #222; color: #b8e3ed');
              }

              console.log("\n");
              World.playerEvents();
            }
        },

        /* Different events that will occur based on your coordinate */
        playerEvents: function(){
              if(this.publicX == 2 && this.publicY == 0){
                  if(Player.level < 4){
                      console.log("\n\n%c ----------------HOME SWEET HOME-----------------", 'background: #222; color: #bada55');
                      console.log("You've found your home but you need to be at least level 5 to enter it.\n\n");
                      console.log("----------------------------------------------------");
                  }
                  Player.level++;
                  if(Player.level >= 5){
                          playerWins();
                      }
                  }

              if(this.publicX == 1 && this.publicY == 1){
                    let gemShop = {
                          50: "You purchased a Ruby for 50 Gold.",
                          100: "You purchased a Sapphire for 100 Gold.",
                          150: "You purchased a Emerald for 150 Gold.",
                          200: "You purchased a Diamond for 200 Gold.",
                    };

                    gemOptions = ["Ruby","Sapphire","Emerald","Diamond"];
                    let storeCounter = 1;
                    let rubyFormula = Player.gold >= 50 && Player.gold < 100;
                    let sapphireFormula = Player.gold > 100 && Player.gold < 150;
                    let EmeraldFormula = Player.gold > 150 && Player.gold < 200;
                    let DiamondFormula = Player.gold > 200;

                    getRuby = rubyFormula ? `You purchased a ${gemShop["25"]}.` : `You could not afford a ${gemShop["25"]}.`;
                    getSapphire = sapphireFormula ? `You purchased a ${gemShop["100"]}.` : `You could not afford a ${gemShop["100"]}`;
                    getEmerald = EmeraldFormula ? `You purchased a ${gemShop["150"]}.` : `You could not afford a ${gemShop["150"]}`;
                    getDiamond = DiamondFormula ? `You purchased a ${gemShop["200"]}.` : `You could not afford a ${gemShop["200"]}`;

                    console.log("\n\n");
                    console.log("%c ----------------GEMS SHOP-----------------", 'background: #222; color: #bada55');
                    console.log("My name is Gem, and i'm afraid that this isn't your home.\n");
                    console.log("Although, i'll offer a hint... The first digit is 2.");
                    gemOptions.forEach(function(option){
                        console.log(`Item ${storeCounter}. ${option}`);
                        storeCounter++;
                    });
                    console.log(`%cIf you have enough gold, you can purchase a random item from my Gem Shop!`, `color:green;`);

                    if(Player.gold >= 50){
                        if(rubyFormula){Player.gold -= 50; console.log(`You purchased a Ruby!`);}
                        if(sapphireFormula){Player.gold -= 100; console.log(`You purchased a Sapphire!`);}
                        if(EmeraldFormula){Player.gold -= 150; console.log(`You purchased a Emerald!`);}
                        if(DiamondFormula){Player.gold -= 200; console.log(`You purchased a Diamond!`);}
                        console.log(`Gold: ${Player.gold}`);
                    } else{
                        console.log(`Gold: ${Player.gold}`);
                        console.log(`%cYou don't have enough gold to purchase anything :(`,`color:red;`);
                    }

                      setTimeout(function(){
                      console.log("%c It may not seem like much but if you use this hint to your advantage, it will supplement you on your journey.", 'color: red');
                      },100);
                      console.log("------------------------------------------");
                      console.log("\n");
              }

              if(this.publicX == 0 && this.publicY == 1){
                let chestCounter = 1;
                let itemList =
                ["Demon Blade","Fate of darkness","Exodia","Scarred Secrect","Ultimate Gift"];
                      console.log("\n\n");
                      console.log("%c ------------------WEAPON CHEST----------------------", 'background: #222; color: #bada55');
                      console.log("You enter a Weapon Shop and retrieve a new weapon!\n");
                      console.log("----------------------------------------------------");
                      itemList.forEach(function(option){
                          console.log(`Weapon ${chestCounter}. ${option}`);
                          chestCounter++;
                      });
                      Player.inventory();
                      setTimeout(function(){
                          console.log("%c Congragulations on your new gear. Various rumours have been spoken about how powerful that weapon is.", 'color: red');
                      },100);
                      console.log("\n");
              }

              if(this.publicX == 2 && this.publicY == 1){
                      console.log("\n\n");
                      console.log("%c ------------------Helpful Thought----------------------", 'background: #222; color: #bada55');
                      console.log("The path home can seem like a long and difficult one but remember not to give up.!\n");
                      console.log("-------------------------------------------------------");
                      setTimeout(function(){
                          console.log("%c Maybe home isn't such a great idea afterall.", 'color: red');
                      },100);
                      console.log("\n");
              }

              if(this.publicX == 2 && this.publicY == 2){
                      console.log("\n\n");
                      console.log("%c ------------------A Wild Dream----------------------", 'background: #222; color: #bada55');
                      console.log("You fall unconcious and have a dream that you found your house.\n");
                      console.log("----------------------------------------------------");
                      setTimeout(function(){
                          console.log(" %c It couldn't have been a dream. It felt too real!!", 'color: red');
                      },100);
                      console.log("\n");
              }

              if(this.publicX == 0 && this.publicY == 2){
                  if(this.visit === false){
                      if(this.caveCounter == 0){
                          this.caveCounter = 1;
                          this.visit = true;
                          console.log("%c ------------------Cave(First Visit)----------------------", 'background: #222; color: #bada55');
                          console.log("WELCOME TO MY CAVE, I'll give you a hint if you come back once more.\n");
                          console.log("---------------------------------------------------------");
                          setTimeout(function(){
                              console.log(" %c I have to come back again just to get a hint? *sigh*", 'color: red');
                          },100);
                      }
                  } else if(this.visit === true){
                    if(this.caveCounter == 1){
                        console.log("%c ------------------Cave(Second Visit)----------------------", 'background: #222; color: #bada55');
                        console.log("WELCOME TO MY CAVE, as promised the second number is 0.\n");
                        console.log("----------------------------------------------------------");
                        setTimeout(function(){
                            console.log("%c Thats right... he had better give me my second hint.", 'color: red');
                        },100);
                    }
                  }
              }

              /* These are the 3 coordinates that aren't occupied */
              /* Therefore, they are being used for the battles */
              if(this.publicX == 0 && this.publicY == 0 ||
                 this.publicX == 1 && this.publicY == 2 ||
                 this.publicX == 1 && this.publicY == 0){
                 Player.attackFunc();
              }
        },

        /* After reaching level 5 and Coordinates[2][0] you will finish
           the game and fight the final boss which is of course rigged for you
           to always win. the fact that it's a (close call) is apart
           of the story */
        gameOver: function(){
            console.log("%c ------------------Story Climax----------------------", 'background: #222; color: #bada55');
            console.log("After traveling through mountins, forests, and castles, you've finally managed\n");
            console.log("to find your home. Throughout this entire journey, you've met many different\n");
            console.log("people. You've also became really strong.");
            console.log(`Level: ${Player.level}\n`);
            if(Player.myInventory <= 0){
                console.log(`Weapons Collected: You didn't find any weapons!`);
            }else{
                console.log(`Weapons Collected: ${Player.myInventory}`);
            }
            console.log(`Throughout your task, you've spoke to many individuals and unlocked hints that led you\n`);
            console.log(`to where you are now. You are now able to take on the final boss. Goodluck.`);
            console.log("%c -------------------FINAL BOSS--------------------", 'background: #222; color: #bada55');

            let bossHealth = 100;
            let bossAttack = 5;

            for(let i = 0; i < bossHealth; i++){
                console.log(`Boss Health: ${bossHealth-=Player.damage}\n`);
                console.log(`Your Health: ${Player.hitpoints-=bossAttack}\n`);
            }
            console.log("That was a close battle.\n");
            console.log("Game over. Thanks for playing.");
        },
}

/* Global variables for various things */
let currPlayerHealth = Player.hitpoints;
let currBossHealth = Npc.hitpoints;
let currFName, currLName ="";
let gameFrame;
let gameSpeed = 1500;

console.log("%cWelcome to Era Online", 'font-size: 30px; font-family: Verdana');
console.log("%c1. Start Game ←", 'color:#376b77;font-weight:bold', "\n2. Options \n3. Exit");

/* Initialize Game Loop if bool=>true */
if(Menu.startGame){
    Player.personalInfo.myName();
    Player.personalInfo.myStats();

    setTimeout(function(){
      gameFrame = setInterval(function(){
          World.createMap();
          World.spawnPlayer();
      }, gameSpeed);
    }, 2000);

    function playerWins() {
        World.gameOver();
        clearInterval(gameFrame);
    }
}
