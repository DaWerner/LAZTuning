import os
import json
import requests
import shutil


def dlImage(url, model):
    response = requests.get(url, stream=True)
    with open('./assets/img/models/{m}.jpg'.format(m=model), 'wb') as out_file:
        shutil.copyfileobj(response.raw, out_file)
    del response


def getImages():
    models = getModels()
    baseURL = "https://fastech-tuning.herokuapp.com/controller/getModel/{m}"
    for model in models:
        print(baseURL.format(m=model["model"]))
        req =requests.request(method="GET", url=baseURL.format(m=model["model"]))
        print(req.status_code)
        if req.text == "":
            continue
        query = json.loads(req.text).get("image")
        imgURL = "https://fastech-tuning.herokuapp.com/{qStr}".format(qStr=query[2:])
        print(imgURL)
        dlImage(url=imgURL, model=model["model"])


def getModels():
    modelData = []
    files = [x for x in os.listdir(".") if ".json" in x]
    for file in files:
        modelDict = json.loads(open("./{f}".format(f=file)).read())
        brand = file.split(".json")[0]
        try:
            for model in modelDict.get("models"):
                print({"brand": brand, "model": model.get("name")})
                modelData.append({"brand": brand, "model": model.get("name")})
        except:
            pass
    return modelData

getImages()
