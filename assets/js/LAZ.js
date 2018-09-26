var news = {beschl: {text: "Ab jetzt bieten wir auch Beschleunigungsmessungen an. Egal ob 0-100, 60-120, viertelmeile oder individuelle Messung. Bei unseren Leistungssteigerungen bieten wir den Service als Vor- und Nachmessung an. Unser System gleicht die Sateliten 6mal pro Sekunde ab und gewährt somit ein exaktes Ergebnis.",
        header: "Beschleunigungsmessung"},
    folien: {text: "Heckleuchten Tönungsfolie oder Teilbeklebung möglich. Wir weisen Sie darauf hin dass diese Veränderung keine ABE hat. Die Folie ist nicht komplett dunkel und beeinträchtigt keinerlei Leuchtkraft.",
        header: "LAZ Folientechnik"},
    angel_eyes: {text: "Wir bieten Lichttechnik für Ihre Angel Eyes an. Damit das gelblich Leuchtende in ein helles weiss erscheint. Bessere Lichtausbeute und längere Lebensdauer. Das Erscheinunsbild mit hell weissen Angel Eyes ist einfach genial. Auf Wunsch haben wir auch Folie zum abdunkeln der Blinker für ein perfektes finish.",
        header: "Angel Eyes"},
    leuchtmittel: {text: "Jetzt neu eingetroffen H7 Leuchtmittel 12V/55W. Leuchtkraft entspricht 110W. Gas Xenon Technologie mit ABE",
        header: "H7 Leuchtmittel"}
};

function init() {
    setNewsListener();
}

function setNewsListener() {
    document.querySelectorAll(".news_header").forEach(n => {
        n.addEventListener("click", function (e) {
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

function initSelection() {
    document.querySelectorAll("#brands img").forEach(x => {
        x.addEventListener("click", function (e) {
            let name = e.target.src;
            name = name.split("/")[name.split("/").length - 1];
            name = name.split(".")[0]
            console.log(name);
            readBrands(name);
            document.querySelector("#brands").style.display = "none";
            document.querySelector("#select").style.display = "block";
        })
    })
}

var tableData = null;

function prepTable(selMotor, type) {
    let data = curMotors[type];
    let motor = null;
    for (let i = 0; i < data.length; i++) {
        if (data[i].bezeichnung === selMotor) {
            motor = data[i];
            break;
        }
    }
    tableData = motor.full;
    fillTable("s1", null);
    if (!tableData.s1price)
        document.querySelector("#s1").style.display = "none";
    if (!tableData.s2price)
        document.querySelector("#s2").style.display = "none";
    if (!tableData.s3price)
        document.querySelector("#s3").style.display = "none";
    if (!tableData.s4price)
        document.querySelector("#s4").style.display = "none";

    document.querySelector("#select").style.display = "none";
    document.querySelector("#resultTable").style.display = "block";
    document.querySelector("#s1").classList.add("active")
}

function fillTable(set, ele) {

    let modelHeader = tableData.brand + " " +
            tableData.model + "<br>Baujahr " +
            tableData.buildyear;
    $("#modelName").empty();
    $("#modelName").html(modelHeader);

    if (set === "eco") {
        fillEco(ele);
        return;
    }
    $("#power_label").text("Power")
    $("#origPower").text(tableData.opower);
    $("#tuningPower").text(tableData[set + "power"]);
    $("#diffPower").text(tableData[set + "dpower"]);
    $("#origTorque").text(tableData.otorque);
    $("#tuningTorque").text(tableData[set + "torque"]);
    $("#diffTorque").text(tableData[set + "dtorque"]);
    $("#price").text("€ " + tableData[set + "price"]);
    if (!ele)
        return;
    document.querySelector(".row button.active").classList.remove("active");
    ele.classList.add("active");
}

function fillEco(elem) {
    $("#power_label").text("Geschätzte Kraftstoffeinsparung ")
    $("#tuningPower").text(tableData["eefreduction"]);
    $("#diffPower").text(tableData["eefreduction"]);
    $("#origPower").text("0%");

    $("#origTorque").text(tableData.otorque);
    $("#tuningTorque").text(tableData["s1torque"]);
    $("#price").text("€ " + tableData["eprice"]);
    if (!elem)
        return;
    document.querySelector(".row button.active").classList.remove("active");
    elem.classList.add("active");


}

var curMotors = null;

function fillMotors(BY) {
    for (let i = 0; i < curModel.baujahre.length; i++) {
        if (curModel.baujahre[i].jahr === BY) {
            curMotors = curModel.baujahre[i].motoren
        }
    }
    document.querySelectorAll("#motoren .option").forEach(e => {
        $(e).remove();
    })
    curMotors.benzin.reverse().forEach(b => {
        $("#motoren .select_header").after(
                "<div onclick=\"prepTable('" + b.bezeichnung + "', 'benzin')\" class='option'>" + b.bezeichnung + "&nbsp" + b.full.opower + "&nbsp&nbsp Benziner</div>")
    })
    curMotors.diesel.reverse().forEach(d => {
        $("#motoren .select_header").after(
                "<div onclick=\"prepTable('" + d.bezeichnung + "', 'diesel')\" class='option'>" + d.bezeichnung + "&nbsp" + d.full.opower + "&nbsp&nbsp Diesel</div>")
    })
                    document.querySelector("#motoren").style.display = "block";

}

var curModel = null;

function fillBuildYears(modelName) {
    for (let i = 0; i < curBrand.models.length; i++) {
        if (curBrand.models[i].name === modelName) {
            curModel = curBrand.models[i];
            break;
        }
    }
    document.querySelectorAll("#motoren .option").forEach(e => {
        $(e).remove();
    })
    document.querySelectorAll("#baujahre .option").forEach(e => {
        $(e).remove();
    })

    curModel.baujahre.reverse().forEach(x => {
        $("#baujahre .select_header").after(
                "<div onclick=\"fillMotors('" + x.jahr + "')\" class='option'>" + x.jahr + "</div>")
    })
        document.querySelector("#baujahre").style.display = "block";

}

function returnTo(state) {
    document.querySelector("#brands").style.display = "none";
    document.querySelector("#select").style.display = "none";
    document.querySelector("#resultTable").style.display = "none";
    document.querySelector("#" + state).style.display = "block";
}

function fillModels() {
    document.querySelectorAll("#motoren .option").forEach(e => {
        $(e).remove();
    })

    document.querySelectorAll("#baujahre .option").forEach(e => {
        $(e).remove();
    })



    let models = curBrand.models;
    document.querySelectorAll("#models .option").forEach(e => {
        $(e).remove();
    })

    models.reverse().forEach(x => {
        $("#models .select_header").after(
                "<div onclick=\"fillBuildYears('" + x.name + "')\" class='option'>" + x.name + "</div>");
    })

}

curBrand = []

function readBrands(name) {
    $.ajax({
        url: "./" + name + ".json",
        success: function (data) {
            document.querySelector("#baujahre").style.display = "none";
            document.querySelector("#motoren").style.display = "none";

            curBrand = data;
            fillModels();

            document.querySelector("#brandLogo img").src = "./assets/img/Logos/" + name + ".png";
        }

    })
}
