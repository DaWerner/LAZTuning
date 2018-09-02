var news = {beschl:{text: "Ab jetzt bieten wir auch Beschleunigungsmessungen an. Egal ob 0-100, 60-120, viertelmeile oder individuelle Messung. Bei unseren Leistungssteigerungen bieten wir den Service als Vor- und Nachmessung an. Unser System gleicht die Sateliten 6mal pro Sekunde ab und gewährt somit ein exaktes Ergebnis.",
                    header: "Beschleunigungsmessung"},
            folien: {text: "Heckleuchten Tönungsfolie oder Teilbeklebung möglich. Wir weisen Sie darauf hin dass diese Veränderung keine ABE hat. Die Folie ist nicht komplett dunkel und beeinträchtigt keinerlei Leuchtkraft.",
                    header: "LAZ Folientechnik"},
            angel_eyes: {text: "Wir bieten Lichttechnik für Ihre Angel Eyes an. Damit das gelblich Leuchtende in ein helles weiss erscheint. Bessere Lichtausbeute und längere Lebensdauer. Das Erscheinunsbild mit hell weissen Angel Eyes ist einfach genial. Auf Wunsch haben wir auch Folie zum abdunkeln der Blinker für ein perfektes finish.",
                    header:"Angel Eyes"},
            leuchtmittel:{text: "Jetzt neu eingetroffen H7 Leuchtmittel 12V/55W. Leuchtkraft entspricht 110W. Gas Xenon Technologie mit ABE",
                          header: "H7 Leuchtmittel"}
};

function init(){
    setNewsListener();
}

function setNewsListener(){
document.querySelectorAll(".news_header").forEach(n=>{
   n.addEventListener("click", function(e){
       let tID = e.target.id;
       let text = news[tID].text;
       let header = news[tID].header;
       $("#newsText").empty();
       $("#newsHeader").empty();
       $("#newsText").text(text);
       $("#newsHeader").text(header);
   }); 
});
}