package handler

import (
	"fmt"
	"net/http"

	"github.com/resendlabs/resend-go"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		fmt.Println("Sending a welcome email to damienksedgwick@gmail.com")

		apiKey := "re_123"

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

		fmt.Println(sent.Id)
	}

	fmt.Println("Unauthorised: Invalid Method")
}
