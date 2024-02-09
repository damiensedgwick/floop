package main

import (
	"database/sql"
	"embed"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

//go:embed templates/*
var resources embed.FS

var t = template.Must(template.ParseFS(resources, "templates/*"))

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	username := os.Getenv("DB_USERNAME")
	if username == "" {
		panic("no username specified")
	}

	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		panic("no password specified")
	}

	host := os.Getenv("DB_HOST")
	if host == "" {
		panic("no host specified")
	}

	name := os.Getenv("DB_NAME")
	if name == "" {
		panic("no name specified")
	}

	ssl := os.Getenv("DB_SSL")
	if ssl == "" {
		ssl = ""
	}

	connStr := fmt.Sprintf("postgresql://%s:%s@%s/%s?sslmode=%s", username, password, host, name, ssl)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	port := os.Getenv("PORT")
	if port == "" {
		panic("no port specified")
	}

	var version string

	if err := db.QueryRow("select version()").Scan(&version); err != nil {
		panic(err)
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := map[string]string{
			"Region":    os.Getenv("FLY_REGION"),
			"DBVersion": version,
		}

		t.ExecuteTemplate(w, "index.html", data)
	})

	log.Println("listening on", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
