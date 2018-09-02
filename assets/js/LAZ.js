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

function setBrandListener(){
    document.querySelectorAll("#brands img").forEach(x=>{
        x.addEventListener("click", function(e){
            let val = e.target.src.split("/")[e.target.src.split("/").length-1];
            console.log(val)
            document.querySelector("#brandLogo img").src = e.target.src;
            document.querySelector("#select").style.display = "block";
            document.querySelector("#brands").style.display = "none";
            showBrand(val.replace(".png", ""))
        })
    })
}

String.prototype.replaceAll = function(toRepl, replacement){
    return this.split(toRepl).join(replacement);
}

var current = {}
var curModel = "";
var curBaujahr = "";
var curMotor = "";

function showBrand(wanted){
    for(var i =0; i < Brands.length; i++){
        let brand =  Brands[i].brand.toLowerCase().replaceAll(" ", "_");
        if(brand === wanted){ current = Brands[i]; break;}
    }
    for(var j = 0; j < current.models.length; j++){
        let model = current.models[j];
        let modelId = model.name.replaceAll(" ", "_");
        $("#models .select_header").after("<div id='"+modelId+"' class='option'>"+ model.name + "</div>");
    }
    document.querySelectorAll("#models .option").forEach(m=>{
            m.addEventListener("click", function(e){
                if(document.querySelector("#motoren .option"))
                    document.querySelectorAll("#motoren .option").forEach(x=>$(x).remove());
                curModel = e.target.id;
                showBuild(e.target.id);
            })
        })
}

function showMotors( baujahr){
    let model1 = null;
    for(var j = 0; j < current.models.length; j++){
        if(curModel.name === current.models[j].name){
            model1 = current.models[j];
            break;
        }
    }
    let bj = null;
    let bjIndex = parseInt(baujahr.replace("bj", ""));
    for(var i = 0; i < model1.baujahre.length; i++){
        if(bjIndex === i) {bj = model1.baujahre[i]; break;}
    }
    if(document.querySelector("#motoren .option"))
        document.querySelectorAll("#motoren .option").forEach(x=>$(x).remove());
    for(var k = 0; k < bj.motoren.benzin.length; k++){
        let val = bj.motoren.benzin[k];
        let mID = (val.bezeichnung + "__" + val.leistung + "__Benzin").replaceAll(" ", "_");
        $("#motoren .select_header").after("<div class='option' id='" + mID+ "'>"+mID.replaceAll("__", "&nbsp&nbsp&nbsp").replaceAll("_", " ")+"</div>");
    }
    for(var k = 0; k < bj.motoren.diesel.length; k++){
        let val = bj.motoren.diesel[k];
        let mID = (val.bezeichnung + "__" + val.leistung + "__Diesel").replaceAll(" ", "_");
        $("#motoren .select_header").after("<div class='option' id='" + mID+ "'>"+mID.replaceAll("__", "&nbsp&nbsp&nbsp").replaceAll("_", " ")+"</div>");
    }
    
}

function showBuild(model){
    let model1 = null;
    document.querySelectorAll("#baujahre .option").forEach(x=>$(x).remove());
    for(var j = 0; j < current.models.length; j++){
        if(model === current.models[j].name){
            model1 = current.models[j];
            break;
        }
    }
    curModel = model1;
    for(var i = 0; i < model1.baujahre.length; i++){
        let bjID = model1.baujahre[i].jahr.replaceAll(" ", "_");
        if(bjID === "All") continue;
        $("#baujahre .select_header").after("<div id='bj"+i+"' class='option'>"+ model1.baujahre[i].jahr + "</div>")
        document.querySelector("#bj"+i).addEventListener("click", function(e){
                curBaujahr = e.target.id;
                showMotors(e.target.id);
        })
    }
    
}

var Brands = []

function readBrands(){
    $.ajax({
        url: "https://"+ window.location.host +"/LAZTuning/brands.json",
        method: "GET",
        success: function (data, textStatus, jqXHR) {
                     console.log(data);
                     Brands = data;
                 }
    })
}