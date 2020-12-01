class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(carimage1)
    car2 = createSprite(300,200);
    car2.addImage(carimage2)
    car3 = createSprite(500,200);
    car3.addImage(carimage3)
    car4 = createSprite(700,200);
    car4.addImage(carimage4)
    cars = [car1, car2, car3, car4];
    PathIsFinished = false
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd()
    if(allPlayers !== undefined){
      //var display_position = 100;
      //background("#c68767")
      image(trackimage,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("yellow")
          textSize(20)
          text(player.name,x,y + 100)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && PathIsFinished !== true){
      player.distance +=40
      player.update();
    }

    if(player.distance>3800 && PathIsFinished === false){
     
      Player.updateCarsAtEnd()
      player.rank = CarsAtEnd
      player.update()
      PathIsFinished = true;
    }

    drawSprites();
  }
  end(){
    camera.position.x = 0
    camera.position.y = 0
    background("red")
    Player.getPlayerInfo()
    fill("blue")
    textSize(30)
    text("game over",0,-300)
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
        text("First Place #1:    "+allPlayers[plr].name,0,-150)
      }
      else if(allPlayers[plr].rank === 2){
        text("Second Place #2:     "+allPlayers[plr].name,0,-100)
      }
      else if(allPlayers[plr].rank === 3){
        text("Third Place #3:     "+allPlayers[plr].name,0,-50)
      }
      else if(allPlayers[plr].rank === 4){
        text("Fourth Place #4:     "+allPlayers[plr].name,0,0)
      }
    }
    console.log("game over")
    console.log(player.rank)
  }
}
