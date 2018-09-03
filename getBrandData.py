import requests
import json
import time

myList = []

brandTemplate = {"brand": "",
             "models": []}

modelTemplate = {"name": "", "baujahre": []}

baujahrTempl = {"jahr": "", "motoren": {}}


baseUrl = "https://fastech-tuning.herokuapp.com/controller/getAllModels/"

brands = ['Alfa Romeo',
'Alpina',
'Alpine',
'Aston Martin',
'Audi',
'Bentley',
'BMW',
'Buick',
'Bugatti',
'Cadillac',
'Chevrolet',
'Chrysler',
'Citro�n',
'Dacia',
'Daewoo',
'Dodge',
'DS',
'Ferrari',
'Fiat',
'Ford',
'GWM',
'Holden',
'Honda',
'Hyundai',
'Infiniti',
'Isuzu',
'Iveco',
'Jaguar',
'Jeep',
'Kia',
'KTM',
'Lamborghini',
'Lancia',
'Landrover',
'Lexus',
'Lotus',
'Mahindra',
'MAN',
'Maserati',
'Mazda',
'McLaren',
'Mercedes',
'Mini',
'Mitsubishi',
'Nissan',
'Opel',
'Pagani',
'Peugeot',
'PGO',
'Piaggio',
'Porsche',
'Renault',
'Rolls Royce',
'Saab',
'Samsung',
'Scion',
'Seat',
'Skoda',
'Smart',
'SsangYong',
'Subaru',
'Suzuki',
'Tata',
'Toyota',
'Volkswagen',
'Volvo',
'Westfield',
'Wiesmann'
]


def getFullData(year, model, brand, motor, mKind, power):
    fullBase = "https://fastech-tuning.herokuapp.com/controller/getAllInformations/{b}/{mod}/{y}/{m}/{k}/{pow}%20Ps".format(
        b=brand,
        mod=model,
        y=year,
        k=mKind,
        m=motor,
        pow=power
    )
    return json.loads(requests.request(method="GET", url=fullBase).text)

def getEngines(year, model, brand):
    ByBase = "https://fastech-tuning.herokuapp.com/controller/getMotorTypes/{b}/{y}/{m}".format(b=brand,
                                                                                                m=model,
                                                                                                y=year)
    motors = json.loads(requests.request(method="GET", url=ByBase).text)
    benzin = []
    diesel = []
    for motor in motors:
        name = motor[0]
        type = motor[1]
        power= motor[2]
        if type == "Diesel":
            full = getFullData(year,model,brand,name,type,power.replace(" Ps", ""))
            diesel.append({"bezeichnung": name, "leistung": power, "full": full})
        else:
            full =getFullData(year,model,brand,name,type,power.replace(" Ps", ""))
            benzin.append({"bezeichnung": name, "leistung": power, "full": full})

    return {"benzin": benzin, "diesel": diesel}



def getModels(brand):
    models = brand["models"]
    modelBase = "https://fastech-tuning.herokuapp.com/controller/getAllBuildYears/"
    toRet= []
    for model in models:
        modelUrl = modelBase + brand["brand"] + "/" + model
        req = requests.request(method="GET", url=modelUrl)
        temp2 = {}
        temp2["name"] = model
        jahre = json.loads(req.text)
        print("{a} {b}".format(a=jahre, b=model))
        for jahr in jahre:
            print("{a} {b}".format(a=jahr, b=model))
            temp1 = {}
            temp1["jahr"] = jahr
            temp1["motoren"] = getEngines(jahr, model, brand["brand"])
            if temp2.get("baujahre") is not None:
                temp2["baujahre"].append(temp1.copy())
            else:
                temp2["baujahre"] =[temp1.copy()]
            print("{a} {b}".format(a=model, b=len(temp2["baujahre"])))
        toRet.append(temp2.copy())
    return toRet


for brand in brands:
    print("Pulling: " + brand + " Started: "+ time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime()))
    temp = brandTemplate.copy()
    req = requests.request(method="GET", url=baseUrl + brand)
    temp["brand"] = brand
    temp["models"] = json.loads(req.text)
    builds = getModels(temp)
    temp["models"] = builds
    myList.append(temp)
    fName = brand.lower().replace(" ", "_")
    writeTo = open("./{b}.json".format(b=fName), "w")
    writeTo.write(json.dumps(temp, ensure_ascii=False, indent=4))
    writeTo.close()

