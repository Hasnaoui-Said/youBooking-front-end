FROM node:16.16.0 as build

RUN mkdir /yb-front-end

WORKDIR /yb-front-end

RUN npm install -g @angular/cli@14.2.10

COPY ./dist ./yb-front-en
#COPY package.json ./

#RUN npm install  --legacy-peer-deps -f

#COPY . .

#RUN ng build --configuration=production

FROM nginx:1.23.3

EXPOSE 4200

COPY --from=builder /yb-front-end/disk/you-booking-front-end usr/share/nginx/html

#CMD ["ng", "serve", "--host", "0.0.0.0"]
