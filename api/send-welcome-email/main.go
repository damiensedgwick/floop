package handler

import (
	"net/http"
	// "github.com/resendlabs/resend-go"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Header().Set("Content-Type", "application/text")
		w.Write([]byte("Method Not Allowed"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/text")
	w.Write([]byte("Success"))
	// apiKey := "re_123"

	// client := resend.NewClient(apiKey)

	// params := &resend.SendEmailRequest{
	// 	From:    "Floop <no-reply@feedback-loop.io>",
	// 	To:      []string{"damienksedgwick@gmail.com"},
	// 	Html:    "<strong>You Made It!</strong>",
	// 	Subject: "Welcome to Floop!",
	// 	ReplyTo: "support@feedback-loop.io",
	// }

	// sent, err := client.Emails.Send(params)
	// if err != nil {
	// fmt.Println(err.Error())
	// return
	// }

	// fmt.Println(sent.Id)
}
