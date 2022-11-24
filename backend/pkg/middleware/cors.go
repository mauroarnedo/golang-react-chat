package middleware

import (
	"net/http"
	"os"
)

var CLIENT_URL string = os.Getenv("CLIENT_URL")

func CORS(next http.HandlerFunc) http.HandlerFunc {
	if CLIENT_URL == "" {
		CLIENT_URL = "*"
	}
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", CLIENT_URL)
		w.Header().Add("Access-Control-Allow-Creentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method == "OPTIONS" {
			http.Error(w, "No Content", http.StatusNoContent)
			return
		}

		next(w, r)
	}
}
