class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  getCarsAtEnd(){
    var CarsAtEndref = database.ref("CarsAtEnd");
    CarsAtEndref.on("value",(data)=>{
      CarsAtEnd = data.val()
    })
  }

  static updateCarsAtEnd(rank){
     database.ref("/").update({
       CarsAtEnd:CarsAtEnd + 1
     })
     this.rank++
  }
}
