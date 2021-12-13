package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strconv"
	"strings"
)

func prueba(w http.ResponseWriter, r *http.Request) {
	go fmt.Println("Consol log")
	fmt.Fprintf(w, "Impresion para los jsons")
}

func getRamInfo(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("sh", "-c", "cat /proc/mdl_ram")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	output := string(out[:])
	fmt.Fprintf(w, output)
	go fmt.Println("/getRamInfo")
}

func getListaProcesos(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("sh", "-c", "cat /proc/mdl_cpu")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	output := string(out[:])
	fmt.Fprintf(w, output)
	go fmt.Println("/getListaProcesos")
}

func killProcess(w http.ResponseWriter, r *http.Request) {
	pid := r.URL.Query()["id"]
	cmd := exec.Command("sh", "-c", "kill "+pid[0])
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	output := string(out[:])
	fmt.Fprintf(w, output)
	go fmt.Println("/killProcess")
}

func getCpu(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("sh", "-c", "ps -eo pcpu | sort -k 1 -r | head -50")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	output := string(out[:])

	s := strings.Split(output, "\n")
	porcentaje := 0.0
	for i := 1; i < len(s); i++ {
		if s[i] != "" {
			const bitSize = 64
			floatNum, err := strconv.ParseFloat(strings.Replace(s[i], " ", "", -1), bitSize)

			if err != nil {
				log.Fatal(err)
			} else {
				porcentaje += floatNum
			}
		}
	}

	fmt.Fprintf(w, "{cpu:"+fmt.Sprintf("%f", porcentaje)+"}")
	go fmt.Println("/getCpu")
}

func main() {
	go fmt.Println("Servidor escuchando en el puesto 3000...")
	http.HandleFunc("/test", prueba)
	http.HandleFunc("/getRamInfo", getRamInfo)
	http.HandleFunc("/getListaProcesos", getListaProcesos)
	http.HandleFunc("/getCpu", getCpu)
	http.HandleFunc("/killProcess", killProcess)
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
