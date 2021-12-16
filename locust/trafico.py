import json
from os import wait

from random import random,randrange
from sys import getsizeof
from locust import HttpUser,between,task

debug =False

def printDebug(msg):
    if debug:
        print(msg)

class Reader():

    def __init__(self):
        self.array=[]

    def getRandom(self):
        lenght=len(self.array)
        if (lenght>0):
            random_index=randrange(0,lenght-1) if lenght > 1 else 0
        else:
            print("Error: No encontrado valor de registro")
            return None
    def cargar(self):
        print("Cargando trafico...")
        try:
            with open("trafico.json",'r')as data_file:
                self.array=json.loads(data_file.read())
        except Exception as error:
            print(f' Error al leer {error}')

class QuickStartUser(HttpUser):
    wait_time = between(0.1,0.9)
    reader = Reader()
    reader.cargar()

    def on_start(self):
        print("Iniciando trafico...")
        self.client.get("/trafico")

    @task
    def access_model(self):
        self.client.get("/trafico")

    @task
    def PostMessage(self):
        random_data=self.reader.getRandom()
        if(random_data is not None):
            data_to_send = json.dumps(random_data)
            printDebug(data_to_send)
            self.client.post("/trafico",json=random_data)
        else:
            print("Finalizando trafico")
            self.stop(True)
    @task
    def GetMessages(self):
        self.client.get("/trafico")