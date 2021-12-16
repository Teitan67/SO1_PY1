package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

func prueba(w http.ResponseWriter, r *http.Request) {
	go fmt.Println("Consol log")
	fmt.Fprintf(w, "Impresion para los jsons")
}

func getRamInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
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

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// return "OKOK"
	//json.NewEncoder(w).Encode("OKOK")
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	cmd := exec.Command("sh", "-c", "top -bn 1 -i -c | head -n 3 | tail -1 | awk {'print $8'}")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	output := string(out[:])
	/*
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
	*/
	fmt.Fprintf(w, "{\"cpu\":"+output+"}")
	go fmt.Println("/getCpu")
}
func trafico(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	go fmt.Println(r)
	go fmt.Println("/trafico")
}

func main() {
	go fmt.Println("Servidor escuchando en el puesto 4200...")
	http.HandleFunc("/test", prueba)
	http.HandleFunc("/getRamInfo", getRamInfo)
	http.HandleFunc("/getListaProcesos", getListaProcesos)
	http.HandleFunc("/getCpu", getCpu)
	http.HandleFunc("/killProcess", killProcess)
	http.HandleFunc("/trafico", trafico)
	err := http.ListenAndServe(":4200", nil)
	if err != nil {
		log.Fatal(err)
	}
}
