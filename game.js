
let sequenciaJogo = [];
let sequenciaJogador1 = [];
let sequenciaJogador2 = [];
let start = 0;                      // Impede que o jogador possa pressionar teclas após o início do jogo
let round = 0; 
let click = 0;          
let recordJogador1 = 0;              
let recordJogador2 = 0;     
let jogador = 1;                    // Jogador da vez.   1 = jogador 1     2 = jogador 2
let qntJogadores;
let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2"; 
let cont = 0;                       // Impede que Game Over seja acionado mais de uma vez

audioSemDelay();

$(".umPlayer").click(function(){

    qntJogadores = 1;
   
    $(".umPlayer").css("display", "none"); 
    $(".doisPlayers").css("display", "none"); 

    $(".tamara").css("display", "none"); 

    $(".qntJogadores").css("display", "none"); 

    $(".row").css("display", "revert"); 
    
    $(".sequencia").css("display", "revert"); 
    $(".sequencia").css("opacity", "0"); 

    $("h1").text("Pressione Qualquer Tecla"); 

    setTimeout(() => {
        startGame();
    }, 350);
});


$(".doisPlayers").click(function(){

    qntJogadores = 2;
    $(".umPlayer").css("display", "none"); 
    $(".doisPlayers").css("display", "none"); 
    nomes();
});


function nomes() {

    $(".qntJogadores").text("Digite o nome do Jogador 1 e pressione Enter");  
    $("#inputNomePlayer1").css("display", "revert"); 

    $("#inputNomePlayer1").keypress(function(event) {        

        if (event.key == "Enter") { 
 
            nomeJogador1 = document.getElementById("inputNomePlayer1").value;  

            $(".recordJogador1").text(nomeJogador1 + ": "); 
            $(".recordJogador1").css("opacity", "1"); 

            $("#inputNomePlayer1").css("display", "none");    

            $(".qntJogadores").text("Digite o nome do Jogador 2 e pressione Enter");  
            $("#inputNomePlayer2").css("display", "revert");  
        }  
    });


    $("#inputNomePlayer2").keypress(function(event) {     

        if (event.key == "Enter") { 

            nomeJogador2 = document.getElementById("inputNomePlayer2").value;

            $(".recordJogador2").text(nomeJogador2 + ": ");  
            $(".recordJogador2").css("opacity", "1"); 

            $(".qntJogadores").css("display", "none"); 

            $("#inputNomePlayer2").css("display", "none");    

            $(".tamara").css("display", "none"); 

            $(".row").css("display", "revert"); 
            

            $("h1").text("Pressione Qualquer Tecla"); 

            vezDeQuem(); 

            setTimeout(() => {
                startGame();
            }, 350);
        }
    });
 
}

  
function vezDeQuem () {
    
    if (qntJogadores == 1) {
        $(".sequencia").css("display", "revert");  
        $(".sequencia").css("opacity", "0"); 
    }

    if (qntJogadores == 2) {
        $(".vez").css("display", "revert");  
        
        if (jogador == 1) {
            $(".vez").text(nomeJogador1 + ", é a sua vez!"); 
        }
        if (jogador == 2) {
            $(".vez").text(nomeJogador2 + ", é a sua vez!"); 
        } 
    }
}


function startGame () { 

    $(document).keypress(function(){
        if (start == 0) {
            primeiroRound();
        } 
    });
    

    $(document).click(function(){
        if (start == 0) {
            primeiroRound();
        }
    });
}

function primeiroRound() { 
 
    cont = 0;
    
    $(".sequencia").css("display", "revert"); 
    $(".sequencia").css("opacity", "0"); 

    $(".vez").css("display", "none");  

    start++;
    round++; 

    $("h1").text("Round " + round);

    $(".sequencia").text("Repita a sequência:"); 
    $(".sequencia").css("opacity", "1"); 

    let number = Math.floor((Math.random() * 4) + 1);

    sequenciaJogo.push(number);  

    animation(number);  
  
    clickedButton(); 
}    
  

function clickedButton () {   

    $(".green").click(function() {  
 
        if (jogador == 1 ) {

            if (sequenciaJogador1.length == 0) {
                click = 0;
            }

            if (click < round) {  // Impede que o jogador possa clicar e acionar a animação a qualquer momento 
    
                sequenciaJogador1.push(1);    

                comparador(sequenciaJogo, sequenciaJogador1, click, 1);  

                click++;   
            }  
        }

        if (jogador == 2 ) {

            if (sequenciaJogador2.length == 0) {
                click = 0;
            }

            if (click < round) {   
    
                sequenciaJogador2.push(1);    

                comparador(sequenciaJogo, sequenciaJogador2, click, 1);  

                click++;   
            }  
        }

    });
 
    
    $(".red").click(function() {  

        if (jogador == 1 ) {

            if (sequenciaJogador1.length == 0) {
                click = 0;
            }

            if (click < round) {  
    
                sequenciaJogador1.push(2);  
    
                comparador(sequenciaJogo, sequenciaJogador1, click, 2);  

                click++;   
            }
        }


        if (jogador == 2 ) {

            if (sequenciaJogador2.length == 0) {
                click = 0;
            }

            if (click < round) {  
    
                sequenciaJogador2.push(2);  
    
                comparador(sequenciaJogo, sequenciaJogador2, click, 2);  

                click++;   
            }
        }



    });


    $(".yellow").click(function() { 

        if (jogador == 1) {
            
            if (sequenciaJogador1.length == 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador1.push(3);  

                comparador(sequenciaJogo, sequenciaJogador1, click, 3);  

                click++;  
            }
        }

        if (jogador == 2) {
            
            if (sequenciaJogador2.length == 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador2.push(3);  

                comparador(sequenciaJogo, sequenciaJogador2, click, 3);  

                click++;  
            }
        }
    });


    $(".blue").click(function() { 

        if (jogador == 1) {

            if (sequenciaJogador1.length == 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador1.push(4);    
            
                comparador(sequenciaJogo, sequenciaJogador1, click, 4);  

                click++;  
            }
        }

        if (jogador == 2) {
            
            if (sequenciaJogador2.length == 0) {
                click = 0;
            }

            if (click < round) {   

                sequenciaJogador2.push(4);    
            
                comparador(sequenciaJogo, sequenciaJogador2, click, 4);  

                click++;  
            }
        }
    }); 
}
   

function comparador (jogo, jogador, click, cor) {    

        if (jogo[click] == jogador[click]) {

            animation(cor);

            if (click == jogo.length-1) {
                setTimeout(() => {            
                    proximosRounds(); 
                }, 1000 );  
            }  
        } 

        else {
            animation(5); 
        } 
} 
 
 
function animation (number) { 
    
    if (number == 5 && cont == 1) {
        number = 6;
    }

    if (number == 5 && cont == 0) {
        cont = 1;
    }

    switch (number) {

        case 1: 
            let green = new Audio('sounds/green.mp3');
            green.play();     

            $(".green").addClass("pressed"); 
            $(".green").css("background-color", "#099c09");  

            setTimeout(() => {
                $(".green").removeClass("pressed"); 
                $(".green").css("background-color", "green");  
            }, 350);

            break;

        case 2: 
            let red = new Audio('sounds/red.mp3');
            red.play();    

            $(".red").addClass("pressed");  
            $(".red").css("background-color", "red"); 

            setTimeout(() => {
                $(".red").removeClass("pressed"); 
                $(".red").css("background-color", "#ff0000c4"); 
            }, 350);

            break;

        case 3: 
            let yellow = new Audio('sounds/yellow.mp3');
            yellow.play();    
            
            $(".yellow").addClass("pressed"); 
            $(".yellow").css("background-color", "yellow"); 

            setTimeout(() => {
                $(".yellow").removeClass("pressed"); 
                $(".yellow").css("background-color", "#ffff00d3"); 
            }, 350);

            break;
 
        case 4: 
            let blue = new Audio('sounds/blue.mp3');
            blue.play();  
            
            $(".blue").addClass("pressed"); 
            $(".blue").css("background-color", "blue"); 

            setTimeout(() => {
                $(".blue").removeClass("pressed"); 
                $(".blue").css("background-color", "#0000ff9c"); 
            }, 350);
            break;

        case 5: 
        
            sequenciaJogo.length = 0;  
            sequenciaJogador1.length = 0; 
            sequenciaJogador2.length = 0; 

            let wrong = new Audio('sounds/wrong.mp3'); 

            $("body").css("background-color", "red");

            setTimeout(() => {
                $("body").css("background-color", "#011F3F");
            }, 350);

            wrong.play();   
             
            $(".green").off();
            $(".red").off();
            $(".yellow").off();
            $(".blue").off();
            
            $("h1").text("Game Over"); 
            $(".sequencia").css("opacity", "0"); 

            setTimeout(() => { 

                switch (jogador) {

                    case 1:  

                        if (round-1 > recordJogador1) {
                            recordJogador1 = round-1;
                        }
                            
                        if (recordJogador1 == 0 || recordJogador1 == 1) {
                            $(".recordJogador1").text(nomeJogador1 + ": " + recordJogador1 + " round"); 
                        }
                        else {
                            $(".recordJogador1").text(nomeJogador1 + ": " + recordJogador1 + " rounds"); 
                        }
                        
                        $(".recordJogador1").css("opacity", "1"); 

                        if (qntJogadores == 2) {
                            jogador = 2;
                        }

                        break;
                    

                    case 2:

                        if (round-1 > recordJogador2) { 
                            recordJogador2 = round-1; 
                        }  
                        
                        if (recordJogador2 == 0 || recordJogador2 == 1) {
                            $(".recordJogador2").text(nomeJogador2 + ": " + recordJogador2 + " round"); 
                        }
                        else {
                            $(".recordJogador2").text(nomeJogador2 + ": " + recordJogador2 + " rounds"); 
                        } 
                        
                        
                        $(".recordJogador2").css("opacity", "1"); 
                        
                        if (qntJogadores == 2) {
                            jogador = 1;
                        }
                        
                        break;
                }
  
                start = 0;       
                round = 0; 
                click = 0;  

                $("h1").text("Pressione Qualquer Tecla"); 

                $(".sequencia").css("display", "none"); 

                vezDeQuem(); 

            }, 1500);  
   
            break;
    }
}


function proximosRounds() {    

    $(".sequencia").css("opacity", "0");
 
    round++; 
    click = 0;
    
    $("h1").text("Round " + round);   

    let number = Math.floor((Math.random() * 4) + 1); 

    sequenciaJogo.push(number);  

    sequenciaJogador1.length = 0; 
    sequenciaJogador2.length = 0; 

    for (let i = 0; i < sequenciaJogo.length; i++) {

        setTimeout(() => {
            animation(sequenciaJogo[i]);  

            if (i == sequenciaJogo.length-1) { 
                $(".sequencia").css("opacity", "1"); 
            }

        }, 1000 * (i+1));  
    }
      
}
 

function audioSemDelay() {
    
    let yellow = new Audio('sounds/yellow.mp3');
    yellow.volume = 0.001;
    yellow.play() 
    
    let green = new Audio('sounds/yellow.mp3');
    green.volume = 0.001;
    green.play()
    
    let blue = new Audio('sounds/yellow.mp3');
    blue.volume = 0.001;
    blue.play()
    
    let red = new Audio('sounds/yellow.mp3');
    red.volume = 0.001;
    red.play()
}