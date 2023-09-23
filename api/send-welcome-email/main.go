package handler

import (
	"fmt"
	"net/http"
	// "github.com/resendlabs/resend-go"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
