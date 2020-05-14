FROM ctsi/node:8.9.3

#RUN apt-get update \    
#    && apt-get install -y nginx

WORKDIR /app
COPY . /app/
COPY ./dist /usr/share/nginx/html
EXPOSE 80


CMD ["nginx","-g","daemon off;"]
