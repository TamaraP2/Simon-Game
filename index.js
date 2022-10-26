
/* ====================================================== */
/* ====================== VARIAVEIS ===================== */
/* ====================================================== */


let jogo = {
    sequencia: [],
    sequenciaCores: [],
    gameOver: false,
    round: 0,
    click: 0,
    qntJogadores: 1, 
    jogadorDaVez: 1,                      // Jogador da vez.   1 = jogador 1     2 = jogador 2
    number: -1,
    color: ""
}

let jogadores = [
    {
        nome: "Jogador 1",
        record: 0,
        sequencia: []
    }, 
    {
        nome: "Jogador 2",
        record: 0, 
        sequencia: []
    }
]


/* ====================================================== */
/* ============== SELEÇÃO 1 OU 2 PLAYERS ================ */
/* ====================================================== */

$(".um-player").click(function(){

    jogo.qntJogadores = 1;
   
    $(".um-player").css("display", "none"); 
    $(".dois-players").css("display", "none"); 

    $(".tamara").css("display", "none"); 

    $(".qnt-jogadores").css("display", "none"); 

    $(".jogo").css("display", "revert"); 
       
    $("h1").html("Aperte Play"); 
 
    $(".record-jogador-1").html(jogadores[0].nome);  
    $(".record-jogador-1").css("opacity", "1"); 
    $(".record-jogador-2").css("display", "none"); 
    $(".records").css("justify-content", "center"); 

    setTimeout(() => {
        startGame(); 
    }, 350);
});


$(".dois-players").click(function(){

    jogo.qntJogadores = 2;

    $(".um-player").css("display", "none"); 
    $(".dois-players").css("display", "none"); 
 
    if ("ontouchstart" in document.documentElement) {
        
        $(".tamara").css("display", "none"); 
    } 

    nomes();
});



/* ====================================================== */
/* ================ NOMES DOS JOGADORES ================= */
/* ====================================================== */


function nomes() { 

    let jogadorUmDigitouNome = false;

    if (!("ontouchstart" in document.documentElement)) {  // Recarrega a página para atualizar o css de acordo com o tamanho da página
         
        window.addEventListener('resize', function() { 
            if (jogadorUmDigitouNome === false) {      // Impede que a página seja recarregada após Jogador 1 já ter colocado o nome
                window.location.reload(); 
                jogadorUmDigitouNome = true;
            }        
        }); 
    } 

    if (window.innerWidth < 850) {                 
        $(".qnt-jogadores").html(`<span style="white-space: nowrap;">Nome do</span> <span style="white-space: nowrap;">Jogador ${jogo.jogadorDaVez}</span> <span style="white-space: nowrap;"></span`);  
    }
    else {
        $(".qnt-jogadores").html(`Digite o nome do <span style="white-space: nowrap;">Jogador ${jogo.jogadorDaVez}</span> <span class="pressione-enter">e pressione Enter</span>`);
    }
        
    $(`#nome-jogador-${jogo.jogadorDaVez}`).css("display", "revert");  
 
    $("#nome-jogador-1").keypress(function(event) {    
        
        if (event.key === "Enter") {     

            salvandoNomesERecords();

            jogadorUmDigitouNome = true;  

            nomes();
        }  
    });
 
    $("#nome-jogador-2").unbind('keypress').bind('keypress', function(event) {     // unbind, bind impede que o keypress seja acionado 2x seguidas

        if (event.key === "Enter") {   

            salvandoNomesERecords();
              
            $(".qnt-jogadores").css("display", "none"); 

            $("#nome-jogador-2").css("display", "none");    

            $(".tamara").css("display", "none"); 

            $(".jogo").css("display", "revert"); 
            
            $("h1").html("Aperte Play"); 
  
            vezDeQuem(); 

            setTimeout(() => {
                startGame();
            }, 350);
        }  
    });

    function salvandoNomesERecords() {

        if (document.getElementById(`nome-jogador-${jogo.jogadorDaVez}`).value !== "" && document.getElementById(`nome-jogador-${jogo.jogadorDaVez}`).value !== " ") {
            jogadores[`${jogo.jogadorDaVez-1}`].nome = document.getElementById(`nome-jogador-${jogo.jogadorDaVez}`).value;  
        }

        $(`.record-jogador-${jogo.jogadorDaVez}`).text(jogadores[`${jogo.jogadorDaVez-1}`].nome + ": -"); 
        $(`.record-jogador-${jogo.jogadorDaVez}`).css("opacity", "1"); 

        $(`#nome-jogador-${jogo.jogadorDaVez}`).css("display", "none");   
        
        jogo.jogadorDaVez === 1 ? jogo.jogadorDaVez = 2 : jogo.jogadorDaVez = 1; 
    }
}
  

/* ====================================================== */
/* ========= DEFINE DE QUEM É A VEZ DE JOGAR ============ */
/* ====================================================== */


function vezDeQuem () {
    
    if (jogo.qntJogadores === 1) { 
        $(".go").css("opacity", "0"); 
    }

    if (jogo.qntJogadores === 2) {
        $(".vez").css("display", "revert");  
        
        $(".vez").text(jogadores[`${jogo.jogadorDaVez-1}`].nome + ", sua vez!");
    }
}



/* ====================================================== */
/* =================== INÍCIO DO JOGO =================== */
/* ====================================================== */

function startGame () {  

    audioSemDelay();  

    $(".play-btn").click( () => { primeiroRound() });

}


/* ====================================================== */
/* =================== PRIMEIRO ROUND =================== */
/* ====================================================== */


function primeiroRound() {  
     
    $(".go").css("opacity", "0"); 

    $(".vez").css("display", "none");   
     
    $(".play-btn").css("display", "none");   

    jogo.gameOver = false;
    jogo.round++; 

    $("h1").text("Round " + jogo.round);
  
    $(".go").css("opacity", "1"); 

    sequencia();

    jogo.sequencia.push(jogo.number);  
    jogo.sequenciaCores.push(jogo.color); 

    jogadores.forEach (jogador => jogador.sequencia.length = 0);
   
    animation(jogo.color);  

    $(".green").click(function() {clickedButton(1, "green");});
    $(".red").click(function() {clickedButton(2, "red");});   
    $(".yellow").click(function() {clickedButton(3, "yellow");}); 
    $(".blue").click(function() {clickedButton(4, "blue");});      
}      

    

/* ====================================================== */
/* ======================= SEQUÊNCIA ==================== */
/* ====================================================== */


function sequencia () {

    jogo.number = Math.floor((Math.random() * 4) + 1);  

    if (jogo.number === 1) jogo.color = "green"; 
    else if (jogo.number === 2) jogo.color = "red"; 
    else if (jogo.number === 3) jogo.color = "yellow"; 
    else if (jogo.number === 4) jogo.color = "blue";  
}


/* ====================================================== */
/* ======================== BOTÕES ====================== */
/* ====================================================== */


function clickedButton (numero, cor) {   

    if (jogadores[`${jogo.jogadorDaVez-1}`].sequencia.length === 0) {
        jogo.click = 0;
    }

    if (jogo.click < jogo.round) {  // Impede que o jogador possa clicar e acionar a animação a qualquer momento 

        jogadores[`${jogo.jogadorDaVez-1}`].sequencia.push(numero);     
        comparador(jogo.click, cor);   
        jogo.click++;   
    }  

}
   


/* ====================================================== */
/* === COMPARA SEQUÊNCIA DO JOGO X SEQUÊNCIA JOGADOR ==== */
/* ====================================================== */ 

function comparador (click, cor) {    

        if (jogo.sequencia[click] === jogadores[`${jogo.jogadorDaVez-1}`].sequencia[click]) {

            animation(cor);

            if (click === jogo.sequencia.length-1) { 

                setTimeout(() => {            
                    $(".go").css("opacity", "0"); 
                }, 600 );  
                

                setTimeout(() => {            
                    proximosRounds(); 
                }, 1000 );  
            }  
        } 

        else {
            jogo.gameOver = true;
            animation("wrong");   
        } 
} 
  

/* ====================================================== */
/* ====================== ANIMAÇÕES ===================== */
/* ====================================================== */


function animation (cor) {   

    if (cor !== "wrong" && !jogo.gameOver) { 

        let corClara;
        let corEscura;

        if (cor === "green") {
            corClara = "#198d19";
            corEscura = "#093109";
        }  
        else if (cor === "red") {
            corClara = "#ff0000";
            corEscura = "#590000";
        }  
        else if (cor === "yellow") {
            corClara = "#d9d915";
            corEscura = "#80800d";
        } 
        else if (cor === "blue") {
            corClara = "#1919ff";
            corEscura = "#0d0d80";
        } 

        let arquivoAudio = new Audio(`sounds/${cor}.mp3`);
        arquivoAudio.play();     

        $(`.${cor}`).css("background-color", corClara);  

        setTimeout(() => { 
            $(`.${cor}`).css("background-color", corEscura);  
        }, 350);

    }

    else {

        $(".go").css("opacity", "0"); 
                
        jogo.sequencia.length = 0;  
        jogo.sequenciaCores.length = 0;  
        
        jogadores.forEach (jogador => jogador.sequencia.length = 0);

        let wrong = new Audio('sounds/wrong.mp3'); 
        wrong.play();   
        
        $(".green").off();
        $(".red").off();
        $(".yellow").off();
        $(".blue").off();
        
        $(".go").css("opacity", "0");    // Garante que o X não sobreponha o GO
        $("h1").text("Game Over");  
        $(".x").css("opacity", "1"); 

        setTimeout(() => {  

            if (jogo.round-1 > jogadores[jogo.jogadorDaVez-1].record) {
                jogadores[jogo.jogadorDaVez-1].record = jogo.round-1;
            }
                
            let rounds = " rounds";

            if (jogadores[jogo.jogadorDaVez-1].record === 0 || jogadores[jogo.jogadorDaVez-1].record === 1) { 
                rounds = " round";
            }
                
            $(`.record-jogador-${jogo.jogadorDaVez}`).html(jogadores[jogo.jogadorDaVez-1].nome + ': <span style="white-space: nowrap;">' + jogadores[jogo.jogadorDaVez-1].record + rounds + '</span>'); 
                        
            $(`.record-jogador-${jogo.jogadorDaVez}`).css("opacity", "1");  
            
            $(".play-btn").css("display", "revert"); 
            
            if (jogo.qntJogadores === 1) { 
                $(".records").css("justify-content", "center"); 
                $(".records").css("gap", "0"); 
            } 
            
            if (jogo.qntJogadores === 2) {
                jogo.jogadorDaVez === 2 ? jogo.jogadorDaVez = 1 : jogo.jogadorDaVez = 2;
            }
     
            jogo.round = 0; 
            jogo.click = 0;  

            $(".go").css("opacity", "0"); 
            $(".x").css("opacity", "0");  
            $("h1").html("Aperte Play");

            vezDeQuem(); 

        }, 1500);  
 
    }  

}

 
/* ====================================================== */
/* ======================= ROUNDS ======================= */
/* ====================================================== */


function proximosRounds() {    
 
    $(".go").css("opacity", "0"); 
 
    jogo.round++; 
    jogo.click = 0;
    
    $("h1").text("Round " + jogo.round);   

    sequencia();

    jogo.sequencia.push(jogo.number);  
    jogo.sequenciaCores.push(jogo.color);
    
    jogadores.forEach (jogador => jogador.sequencia.length = 0);

    for (let i = 0; i < jogo.sequenciaCores.length; i++) {

        setTimeout(() => {
            if (!jogo.gameOver) {
                animation(jogo.sequenciaCores[i]);  
            }

            if (i === jogo.sequenciaCores.length-1) { 

                setTimeout(() => {  
                    $(".go").css("opacity", "1"); 
                }, 600);  
            }

        }, 650 * (i+1));  
    }
      
}
 


/* ====================================================== */
/* ========= REMOVE AUDIO DELAY NO DESKTOP ============== */
/* ====================================================== */


function audioSemDelay() {
    
    let yellow = new Audio('sounds/yellow.mp3');
    yellow.volume = 0.0001;
    yellow.play() 
    
    let green = new Audio('sounds/green.mp3');
    green.volume = 0.0001;
    green.play()
    
    let blue = new Audio('sounds/blue.mp3');
    blue.volume = 0.0001;
    blue.play()
    
    let red = new Audio('sounds/red.mp3');
    red.volume = 0.0001;
    red.play()
}
