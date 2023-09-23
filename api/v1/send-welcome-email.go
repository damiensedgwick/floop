package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/resendlabs/resend-go"
)

func SendWelcomeEmail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)

		resp := make(map[string]string)
		resp["message"] = "Method Not Allowed"

		body, err := json.Marshal(resp)
		if err != nil {
			fmt.Printf("Error happened in JSON marshal. Err: %s", err)
		}

		w.Write(body)
		return
	}

	w.WriteHeader(http.StatusOK)

	apiKey := os.Getenv("RESEND_WELCOME_EMAIL_API_KEY")
	client := resend.NewClient(apiKey)

	params := &resend.SendEmailRequest{
		From:    "Floop <no-reply@feedback-loop.io>",
		To:      []string{"damienksedgwick@gmail.com"},
		Html:    "<strong>You Made It!</strong>",
		Subject: "Welcome to Floop!",
		ReplyTo: "support@feedback-loop.io",
	}

	sent, err := client.Emails.Send(params)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	resp := make(map[string]string)
	resp["id"] = sent.Id
	resp["message"] = "Successfully sent email to damienksedgwick@gmail.com"

	body, err := json.Marshal("")
	if err != nil {
		fmt.Printf("Error happened in JSON marshal. Err: %s", err)
	}

	w.Write(body)
}
