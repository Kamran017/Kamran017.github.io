
//variables
 var a,b,c,d,col=10,row=10, board=[],audio,mutebtn,count=0,rowFlag,columnFlag,flag=0,secondFlag=-1,playerScore=0,pcScore=0,randomRow=0,randomColumn=0,ff=-1,c=0,rr=-1,rc=-1,table;store=[];
//loader  starts
$(document).ready(function() {
    var $element = $('.percentage .value');
    var currentValue = parseInt($element.text());
    var nextValue = 100;
    var diffValue = nextValue - currentValue;
    var step = 1;
    function loading() {
        for (var i = 0; i < diffValue; i++) {
            setTimeout(function() {
              currentValue += step;
              $element.text(currentValue+'%');
            }, 10 * i);
        };
    }
    loading();
    
    $(".progress-bar").animate({
        "width": "80%"
    }, 500);
});

$(window).on("load", function () {
    setTimeout(function(){
        $('.percentage').fadeOut();
        $(".information").fadeIn();
        $(".info").fadeIn();
        $(".main").fadeIn();
    },1800);
    
    $(".progress-bar").animate({
        "width": "100%"
    }, 1000);
    $(".progress-bar").fadeOut();
});

//loader ends

//background music

var music = document.getElementById("myAudio")
function myFunction() {
  music.autoplay;
  music.autoplay = true;
  music.load(); 
  music.loop=true;
}
function play(){
  music.play();
  $("#volumeUp").css("display","initial");
  $("#volumeOff").css("display","none");
}
function pause(){
  music.pause();
  $("#volumeUp").css("display","none");
  $("#volumeOff").css("display","initial");
}
//end of background music

//play the game

$(".play").click(function(){
  $(".introduction").css("display","none");
  $(".enterance").css("display","block");
})
//make 2d array
for (i=0; i<col; i++){
  board[i]=[];
  for (j=0; j<row; j++){
    board[i][j]=0;
  }
}
//reset store array
for(i=0; i<col; i++){
  store[i]=0;
};
//information about the game
$(".info").click(function(){
  $(".information").css( "visibility","visible");
  $(".information").animate({
    top:"16%",
  },"slow");
  $(".main").css("opacity","0.2");
  $(".info").css("opacity","0.2");
});

//Close information table
$(".close").click(function(){
  $(".information").animate({
    top:"-70%",
  },"slow", function(){
    $(".information").css( "visibility","hidden");
    $(".main").css("opacity","1");  
    $(".info").css("opacity","1");
});
});

//create numbers with random locations
function numberGenerator(row,col){
  for (i = 1; i < ((row*col) / 2) ; i++) { 
      for (j= 1; j <=2; j++) { 
        do{
          a=Math.floor((Math.random() * row) + 0);
          b=Math.floor((Math.random() * col) + 0);
        }while(board[a][b]!=0);
        board[a][b]=i;
      }  
  }   
}

//Select board size
$(".select").click(function selectBoardSize() {
  if ($("#weak").is(":checked" ) || $("#medium").is( ":checked" ) ||  $("#strong").is( ":checked" ) || $("#advanced").is( ":checked" ) ){
    $(".enterance").css("display","none");
    $(".level").css("display","block");   
    $("#turnBack").css("display","block");
  }
  else{
    alert("PLEASE SELECT THE BOARD SIZE!");
  }
});
//turn back to the selection of board size section
$("#turnBack span").click(function(){
  $(".level").css("display","none");
  $(".enterance").css("display","block");
  $("#turnBack").css("display","none");
});
//Select the game level
$(".slctLvl").click(function(){
    if ($("#weakLevel").is(":checked" ) || $("#mediumLevel").is( ":checked" ) ||  $("#strongLevel").is( ":checked" ) || $("#advancedLevel").is( ":checked" ) ){
      $(".scoreTable").css("display","block");
        //weak board
        if ($("#weak").prop("checked")){
            $(".scoreTable table").css("width","15.5em")
            table=document.getElementById("weakTable");
            row=4;
            col=row;
            numberGenerator(4,4);
            $(".level").css("display","none");//game level radio buttons
            $(".step").css("display","block");//some steps for help
            $("#weakBoard").show().css("display","flex");//game board
        }
        //medium board 
        else if ($("#medium").prop("checked")){
            table=document.getElementById("mediumTable")
            row=6;
            col=row;
            numberGenerator(6,6);
            $(".level").css("display","none");//game level radio buttons
            $(".step").show();//some steps for help
            $("#mediumBoard").show().css("display","flex");//game board
        }
        //strong board
        else if ($("#strong").prop("checked")){
            table=document.getElementById("strongTable")
            row=8;
            col=row;
            numberGenerator(8,8);
            $(".level").css("display","none");//game level radio buttons
            $(".step").show();//some steps for help
            $("#strongBoard").show().css("display","flex");//game board
        }  
        else if ($("#advanced").prop("checked")){
            $(".scoreTable table").css("width","35.1em")
            table=document.getElementById("advancedTable")
            row=10;
            col=row;
            numberGenerator(10,10);
            $(".level").css("display","none");//game level radio buttons
            $(".step").show();//some steps for help
            $("#advancedBoard").show().css("display","flex");//game board
        } 
        //remove turn back button
        $("#turnBack").css("display","none");
    }
    else{
      alert("PLEASE SELECT THE LEVEL OF THE GAME!");
    }
});

//control the scores
if (playerScore>row || pcScore>row || playerScore==row && pcScore==row){
  $(".step h1").css("display","none");
  $(".step h2").css("display","none");
  for(i=0;i<col;i++){
    for(j=0;j<col;j++){
      table.rows[j].cells[i].innerHTML=board[j][i] 
    }
  }
  // $(".scoreTable").css("top","3.5em")
  if(playerScore>pcScore){
    $(".playerWon").show();
  }
  else if(playerScore<pcScore){
    $(".pcWon").show();
  } 
  else if( playerScore==row && pcScore==row){
    $(".draw").show();
  } 
}
//game starts 
$("td.column").click( function player(){
      //player section
      count++;
      d=$(this).closest("tr").data("index");//row location
      c=$(this).data("index");//column location
      if (count==1){
        flag=$(this);
        rowFlag=d;
        columnFlag=c;
      }
      if(this.innerHTML=="--"){
        $(this).html("--");
        alert("YOU CAN NOT SELECT FINDED LOCATIONS!");
        count--;
      } 
      else{
        $(this).html(board[d][c]);
      }
      if (count==2){
        if(d==rowFlag && c==columnFlag){
          if($(flag).text()==$(this).text()){
            count--;
            alert("YOU CAN NOT SELECT THE SAME LOCATION AGAIN!");
          }
        }
        secondFlag=$(this);
        if(count==2){
          if(board[rowFlag][columnFlag]==board[d][c]){
              setTimeout(function(){
                $(secondFlag).html("--")
                $(flag).html("--")
                playerScore++;
                $("td.playerScore").html(playerScore);
              },400)
          }
          else{
            setTimeout(function(){
              $(secondFlag).html("*"); 
              $(flag).html("*");
            },400) 
          }
          //disable the click event
          $('td.column').off("click");
        }
      }
      //control the score of pc and player
      if (playerScore>row || pcScore>row || playerScore==row && pcScore==row){
        $(".step h1").css("display","none");
        $(".step h2").css("display","none");
        for(i=0;i<col;i++){
          for(j=0;j<col;j++){
            table.rows[j].cells[i].innerHTML=board[j][i] 
          }
        }
        if(playerScore>pcScore){
          $(".playerWon").show();
        }
        else if(playerScore<pcScore){
          $(".pcWon").show();
        } 
        else if( playerScore==row && pcScore==row){
          $(".draw").show();
        } 
        $('td.column').off("click");
      }
      //computer start guessing
      else{
          if (count==2){  
            count=0;
            $(".step h1").fadeOut("slow",function(){
              //print the text: computer is making prediction
              $(".step h2").show();
              if (playerScore>row || pcScore>row || playerScore==row && pcScore==row){
                $(".step h1").css("display","none");
                $(".step h2").css("display","none");
                for(i=0;i<col;i++){
                  for(j=0;j<col;j++){
                    table.rows[j].cells[i].innerHTML=board[j][i] 
                  }
                }
                // $(".scoreTable").css("top","3.5em")
                if(playerScore>pcScore){
                  $(".playerWon").show();
                }
                else if(playerScore<pcScore){
                  $(".pcWon").show();
                } 
                else if( playerScore==row && pcScore==row){
                  $(".draw").show();
                } 
                $('td.column').off("click");
              }
              else{
                //delay the computer prediction
                setTimeout(function(){
                    for (c=0; c<2; c++){                    
                        do{
                          randomColumn=Math.floor((Math.random() * col));
                          randomRow=Math.floor((Math.random() * row));
                        }while(table.rows[randomColumn].cells[randomRow].innerHTML=="--" || randomColumn==rc && randomRow==rr);
                      if (c==0){                    
                        ff=board[randomColumn][randomRow];
                        rr=randomRow;
                        rc=randomColumn;
                      }
                      if ($("#weakLevel").is(":checked" )){
                        for(i=0; i<4; i++){
                          for(j=0; j<1; j++){
                            if(c==1 && table.rows[rc].cells[rr].innerHTML==board[j][i]){
                              if(rr!=i && rc!=j){
                                randomRow=i;
                                randomColumn=j;
                              }
                            }
                          }
                        }
                      }
                      else if ($("#mediumLevel").is(":checked" )){
                        for(i=0; i<4; i++){
                          for(j=0; j<2; j++){
                            if(c==1 && table.rows[rc].cells[rr].innerHTML==board[j][i]){
                              if(rr!=i && rc!=j){
                                randomRow=i;
                                randomColumn=j;
                              }
                            }
                          }
                        }
                      }
                      else if ($("#strongLevel").is(":checked" )){
                        for(i=0; i<4; i++){
                          for(j=0; j<3; j++){
                            if(c==1 && table.rows[rc].cells[rr].innerHTML==board[j][i]){
                              if(rr!=i && rc!=j){
                                randomRow=i;
                                randomColumn=j;
                              }
                            }
                          }
                        }
                      }
                      else if ($("#advancedLevel").is(":checked" )){
                        for(i=0; i<row; i++){
                          for(j=0; j<row; j++){
                            if(c==1 && table.rows[rc].cells[rr].innerHTML==board[j][i]){
                              if(rr!=i && rc!=j){
                                randomRow=i;
                                randomColumn=j;
                              }
                            }
                          }
                        }
                      }
                      table.rows[randomColumn].cells[randomRow].innerHTML=board[randomColumn][randomRow];
                    }
                    //control the computer prediction and fill board with proper values
                    setTimeout(function (){
                        if (c==2){                                      
                          if(board[rc][rr] == board[randomColumn][randomRow]){
                            setTimeout(function(){
                              table.rows[randomColumn].cells[randomRow].innerHTML="--"
                              table.rows[rc].cells[rr].innerHTML="--"
                              pcScore++;
                              $("td.pcScore").html(pcScore);
                            },350) 
                          }
                          else{
                            setTimeout(function(){
                              table.rows[randomColumn].cells[randomRow].innerHTML="*";
                              table.rows[rc].cells[rr].innerHTML="*"; 
                            },350) 
                          }
                              $(".step h2").fadeOut("slow",function(){       
                                $(".step h1").show();
                                  if (playerScore>row || pcScore>row || playerScore==row && pcScore==row){
                                    $(".step h1").css("display","none");
                                    $(".step h2").css("display","none");
                                    for(i=0;i<col;i++){
                                      for(j=0;j<col;j++){
                                        table.rows[j].cells[i].innerHTML=board[j][i] 
                                      }
                                    }
                                    // $(".scoreTable").css("top","3.5em")
                                    if(playerScore>pcScore){
                                      $(".playerWon").show();
                                    }
                                    else if(playerScore<pcScore){
                                      $(".pcWon").show();
                                    } 
                                    else if( playerScore==row && pcScore==row){
                                      $(".draw").show();
                                    } 
                                    $('td.column').off("click");
                                  }
                              });
                      }
                      //enable the click event
                      $('td.column').on("click",player);                                  
                    },500)
                },1000)
              }
            });
          }
      }
});










