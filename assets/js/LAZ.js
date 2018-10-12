

function initSelection() {
    setBG();
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
    document.querySelector("#selectRet").classList.remove("active");
    document.querySelector("#resultsRet").classList.add("active");

    document.querySelector("#s1").classList.add("active")
    document.querySelector(".modelImg>img").src = "./assets/img/models/" + curModel.name + ".jpg"
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

function returnTo(state, elem) {
    document.querySelector("#brands").style.display = "none";
    document.querySelector("#select").style.display = "none";
    document.querySelector("#resultTable").style.display = "none";
    document.querySelector("#" + state).style.display = "block";
    document.querySelectorAll("#breadcrumb button").forEach(b => {
        b.classList.remove("active");
    })
    elem.classList.add("active");
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
            document.querySelector("#brandRet").classList.remove("active");
            document.querySelector("#selectRet").classList.add("active");
            curBrand = data;
            fillModels();

            document.querySelector("#brandLogo img").src = "./assets/img/Logos/" + name + ".png";
        }

    })
}

function getQueryParameter(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function setBG() {
    let val = getQueryParameter("bg_color") || "black";
    if (val.match(/[a-f0-9]{6}/) || val.match(/[a-f0-9]{3}/))
        val = "#" + val;
    document.querySelector("body").style.backgroundColor = val;
    document.querySelector("#about").style.backgroundColor = val;

}
