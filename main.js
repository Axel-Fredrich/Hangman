"use strict";
    let pool = ["Affe","Haus","Schlange","Javascript","Weihnachten","Champagner","Tauchen",
    "Wettkampf","Montag","Lasagne","Vegan","Purpur","Oktober","Sonnig","Restaurant","Netflix","Gaylord",]
   
     let  wortfeld = document.getElementById("word-guess");
     let  flascher_buchstabe = document.getElementById("falsch-geraten");
     let anzeige_versuche =document.getElementById("verbraucht");
     let Letsgo = document.getElementById("Letsgo");
     let versuche = 8;
     let underscore = [];
     let counter = 0;
     let anzeigecounter = document.getElementById("anzeigecounter")
     let neuer_versuch = ""; 
     
     const highScoreList = document.getElementById("highScores");
     highScoreList.innerHTML = localStorage.getItem("highscore");

     const canvas = document.getElementById("canvas");
     const ctx = canvas.getContext('2d');
     function draw() { if (canvas.getContext) {}}
               
    // Suche ein Zufälliges wort aus
    let wort =  pool[Math.floor(Math.random()*pool.length)].toUpperCase();

    // Versuche und Win streak counter
    anzeige_versuche.innerHTML = versuche;

    anzeigecounter.innerHTML = counter; 
   
     // i wird gloabl initailiesert das wir es lokal verwenden können 
     let i = "";

     console.log("das wort ist " + wort );
   
    // Die underscore erstellen und darstellen
     for (i = 0; i < wort.length; i++) {
        underscore.push("__");
    }
    wortfeld.innerHTML = underscore.join(" ");

 // Diese Funktion evaluiert die Buchstaben im String "wort" und ihre position und ordnet sie ein 
 // new array konstruktor wir initialisiert und der for loop läuft das wort von 0-bis schluss ab 
 // und pusht den buchstaben an der stelle i richtig ein
  
   function letterInWord(letter) {
        var positions = new Array();
        for (i = 0 ; i < wort.length; i++) {
            if (wort[i] === letter)
                positions.push(i);
        } 

        return positions;
    }

    
   
    // Gibt die Buchstaben zurück die noch nicht erraten wurden
    function lettersToGuess() {
       
        var toGess = 0 ;
        for (i in underscore) {
            if (underscore[i] === "__")
                toGess++;
        }
        return toGess;
    }

    

   // These are the key events used to play and to document the letters already used and/or
    // letters in the answers
   
    document.onkeyup = function (event) {
        var letter = event.key;
        var lettersGuessed = letter.toLocaleUpperCase();
       
        var positions = letterInWord(lettersGuessed);


// Das wird die Buchstaben die wir raten mit dem aktuellen wort vergleichen
    if (positions.length) {

    for (i = 0 ; i < positions.length; i++) {
        underscore[positions[i]] = lettersGuessed;
         }

    // underscore mit gedrückten Buchstaben ersetzen
    wortfeld.innerHTML = underscore.join(" ");
    } else {
   
    // falschen Buchstaben anzeigen
    flascher_buchstabe.innerHTML += lettersGuessed + " ";

    
    // ziehe einen versuch bis 0 ab
    if ( versuche > 0) {
    versuche--;
    anzeige_versuche.innerHTML = versuche;}   
}



    // Wenn versuche weg sind verloren
    if (versuche === 0) {
        alert("Game Over! Das wort war " + wort)
        anzeigecounter.innerHTML = 0;
        
        
       
        
        // Wenn wort richtig erraten   
    } if (lettersToGuess() === 0) {
        alert("Richtig");
        counter++;
        anzeigecounter.innerHTML = counter;
   
      
      
         versuche = 8;
         anzeige_versuche.innerHTML = versuche;

    
         flascher_buchstabe.innerHTML =  neuer_versuch;

         
         wort = pool[Math.floor(Math.random() * pool.length)].toUpperCase();
         console.log(wort);

         underscore = [];
         for (i = 0; i < wort.length; i++) {
          underscore.push("__");
      }
      wortfeld.innerHTML = underscore.join(" ");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
        
}
         
       
    

    switch (versuche) {
        case 7:
         ctx.strokeStyle = '#444';
         ctx.lineWidth = 10; 
         ctx.beginPath();
         ctx.moveTo(175, 225);
         ctx.lineTo(5, 225);
         ctx.moveTo(40, 225);
         ctx.lineTo(25, 5);
         ctx.lineTo(100, 5);
         ctx.lineTo(100, 25);
         ctx.stroke();
        break;
 
       case 6:
         ctx.lineWidth = 5;
         ctx.beginPath();
         ctx.arc(100, 50, 25, 0, Math.PI*2, true);
         ctx.closePath();
         ctx.stroke();
         break;
       
       case 5:
         ctx.beginPath();
         ctx.moveTo(100, 75);
         ctx.lineTo(100, 120);
         ctx.stroke();
         break;
 
       case 4:
         ctx.beginPath();
         ctx.moveTo(100, 85);
         ctx.lineTo(60, 100);
         ctx.stroke();
          break;
 
       case 3:
         ctx.beginPath();
         ctx.moveTo(100, 85);
         ctx.lineTo(140, 100);
         ctx.stroke();
         break;
 
       case 2:
         ctx.beginPath();
         ctx.moveTo(100, 120);
         ctx.lineTo(80, 220);
         ctx.stroke();
         break;
 
   
       case 1:
         ctx.beginPath();
         ctx.moveTo(100, 120);
         ctx.lineTo(125, 220);
         ctx.stroke();
       break;
    } 
  }

 
  
  

   
 
   // Web storage der daten liest und diese als array speichert , wenn noch keine daten vorhanden 
   // wird ein leeres array gespeichert
   let storage = JSON.parse(localStorage.getItem("highScore")) || [];
  

  // Der Knopf mit dem wir den highscore saven
Letsgo.onclick = function() {    
  
 let name = prompt("dein name")

  const score = {
      score: "score: " + counter,
      name: "by " + name,
  };
 
  storage.push(score);
  storage.sort((a, b) => b.score - a.score);
  storage.splice(5);
  console.log(storage);


// Fügt die Daten dem locale storage hinzu
 localStorage.setItem("highScore", JSON.stringify(storage));

// Anzeige im Leaderboard
 highScoreList.innerHTML = storage
    .map((score) => `<li>${score.score} - ${score.name}`)
    .join('');

};

highScoreList.innerHTML = storage
.map((score) => `<li>${score.score} - ${score.name}`)
    .join('');