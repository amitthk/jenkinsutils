disable_mlock = true
storage "file" {
    path = "/vault-data"
}

listener "tcp" {
    address = "127.0.0.1:8200"
    tls_disable = "true"
}

listener "tcp" {
    address = "127.0.0.1:8443"
    tls_disable = "true"
}

api_addr = "http://127.0.0.1:8200"