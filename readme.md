```nginx 
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    proxy_cache_path  /Intellimedia/nginx/conf/vars/cache/oauth2 keys_zone=token_responses:1m max_size=2m;
    default_type  application/octet-stream;
   


    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       8000;
       
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

       

        location /private {
            auth_request /_oauth2_token_introspection;
            proxy_pass http://localhost:8000/index;
            
        }

        location = /_oauth2_token_introspection {
			internal;
			proxy_method      POST;
			proxy_pass        http://localhost:8000/verify-token/;
            #proxy_set_header  X-Original-URI $request_uri;
            proxy_set_header   Content-Type "application/x-www-form-urlencoded";
            proxy_set_header  Authorization "Bearer $http_Authorization";


            proxy_cache           token_responses; # Enable caching
            proxy_cache_key       $http_Authorization;    # Cache for each access token
            proxy_cache_lock      on;              # Duplicate tokens must wait
            proxy_cache_valid     200 10s;         # How long to use each response
            proxy_ignore_headers  Cache-Control Expires Set-Cookie;
		
		}
        
        location /index {
            proxy_pass        http://localhost:8000/index;
        }

        location = /image {  
            auth_request        /_oauth2_token_introspection;
            auth_request_set    $auth_status $upstream_status;
            proxy_pass          http://localhost:8000/;
        }  

        location  / {
            proxy_pass          http://localhost:8000/;
        }
        
        
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```