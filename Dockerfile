FROM node:8.11-alpine
RUN apk update \
    && mkdir -p /opt/report
COPY . /opt/report/
WORKDIR /opt/report/
RUN npm install \
    && cp /var/lib/jenkins/jobs/Build/jobs/build-local/jobs/NodeJS-Client-Cloud-Service/builds/3/archive/dist/bundle.js   node_modules/client-cloud-services/dist/
CMD ["npm", "run", "start", "&"]
