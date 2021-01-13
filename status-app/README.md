Generate openssl cert
`$ openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

When doing form, Common Name will be domain name `example.com`
