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

function initSelection(){
    document.querySelectorAll("#brands img").forEach(x=>{
        x.addEventListener("click", function(e){
            let name = e.target.src;
            name = name.split("/")[name.split("/").length -1];
            name = name.split(".")[0]
            console.log(name);
            readBrands(name);
            document.querySelector("#brands").style.display="none";
            document.querySelector("#select").style.display="block";
        })
    })
}

var curMotors = null;

function fillMotors(BY){
    for(let i = 0; i < curModel.baujahre.length; i++){
        if(curModel.baujahre[i].jahr === BY){
            curMotors = curModel.baujahre[i].motoren
        }
    }
    document.querySelectorAll("#motoren .option").forEach(e=>{
        $(e).remove();
    })
    curMotors.benzin.forEach(b=>{
        $("#motoren .select_header").after(
          "<div class='option'>"+ b.bezeichnung+ "&nbsp&nbsp Benziner</div>")
    })
    curMotors.diesel.forEach(d=>{
        $("#motoren .select_header").after(
          "<div class='option'>"+ d.bezeichnung+ "&nbsp&nbsp Diesel</div>")
    })
}

var curModel = null;

function fillBuildYears(modelName){
    for(let i = 0; i < curBrand.models.length; i++){
        if(curBrand.models[i].name === modelName){
            curModel = curBrand.models[i];
            break;
        }
    }
    document.querySelectorAll("#motoren .option").forEach(e=>{
        $(e).remove();
    })
    document.querySelectorAll("#baujahre .option").forEach(e=>{
        $(e).remove();
    })
    curModel.baujahre.forEach(x=>{
        $("#baujahre .select_header").after(
          "<div onclick=\"fillMotors('"+x.jahr+"')\" class='option'>" + x.jahr + "</div>")
    })
}

function fillModels(){
    let models = curBrand.models;
    document.querySelectorAll("#models .option").forEach(e=>{
        $(e).remove();
    })

    models.forEach(x=>{
        $("#models .select_header").after(
          "<div onclick=\"fillBuildYears('"+x.name+"')\" class='option'>"+ x.name + "</div>");
    })
}

curBrand = []

function readBrands(name){
    $.ajax({
        url: "./"+ name + ".json",
        success: function (data) {
             curBrand = data;   
             fillModels();
        }
    
    })
}