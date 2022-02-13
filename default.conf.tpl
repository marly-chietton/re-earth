client_max_body_size 100M;

server {
    listen       80;
    listen       [::]:80;  # IPv6
    server_name  re-earth.systems;

    location / {
        root     /usr/share/nginx/html;
        index    index.html index.htm;
    }
}
