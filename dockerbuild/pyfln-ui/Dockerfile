FROM centos/nodejs-8-centos7

ARG APP_NAME=pyfln-ui
ARG APP_BASE_DIR=/var/www/html
ARG APP_BUILD_DIR=/opt/app-root/src/
ARG API_ENDPOINT=http://127.0.0.1:8000
ENV APP_BUILD_DIR=${APP_BUILD_DIR} \
    APP_BASE_DIR=${APP_BASE_DIR} \
    APP_NAME=${APP_NAME} \
    API_ENDPOINT=${API_ENDPOINT} \
    LD_LIBRARY_PATH=/opt/rh/rh-nodejs8/root/usr/lib64 \
    PATH=/opt/rh/rh-nodejs8/root/usr/bin:/opt/app-root/src/node_modules/.bin/:/opt/app-root/src/.npm-global/bin/:/opt/app-root/src/bin:/opt/app-root/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    NPM_CONFIG_PREFIX=/opt/app-root/src/.npm-global

EXPOSE 8080

USER root

COPY files ${APP_BUILD_DIR}/files


#RUN cp ${APP_BUILD_DIR}/files/pyfln.rep /etc/yum.repos.d/ \
#    && update-ca-trust force-enable

RUN yum install -y httpd httpd-tools

RUN cp ${APP_BUILD_DIR}/files/npm/npmrc ~/.npmrc \
    && bash -c 'for f in /etc/httpd/conf/*.conf; do mv -- "$f" "${f%.conf}.bak"; done' \
    && bash -c 'for f in /etc/httpd/conf.d/*.conf; do mv -- "$f" "${f%.conf}.bak"; done' \
    && cp ${APP_BUILD_DIR}/files/httpd/httpd.conf /etc/httpd/conf/ \
    && cp ${APP_BUILD_DIR}/files/httpd/default-site.conf /etc/httpd/conf.d/default-site.conf \
    && chown apache:0 /etc/httpd/conf/httpd.conf \
    && chmod g+r /etc/httpd/conf/httpd.conf \
    && chown apache:0 /var/log/httpd \
    && chmod g+rwX /var/log/httpd \
    && chown apache:0 /var/run/httpd \
    && chmod g+rwX /var/log/httpd


COPY . ${APP_BUILD_DIR}

RUN npm config set user 0 && npm config set unsafe-perm true \
    && npm --max_old_space_size=8000 --registry https://registry.npmjs.org/ install -g @angular/cli@1.6.8 

RUN cd ${APP_BUILD_DIR} && rm package-lock.json || true \
    && npm config set user 0 && npm config set unsafe-perm true \
    && npm --max_old_space_size=8000 --registry https://registry.npmjs.org/ install --no-optional

RUN cd $APP_BUILD_DIR/ \
    && npm --max_old_space_size=8000 run ng build --prod --verbose --source-map \
    && mkdir -p ${APP_BASE_DIR} \
    && mv ${APP_BUILD_DIR}/dist/* ${APP_BASE_DIR}/ \
    && cp ${APP_BUILD_DIR}/files/entrypoint.sh ${APP_BASE_DIR}/ \
    && chmod -R 0775 $APP_BASE_DIR/ \
    && chown -R apache:0 $APP_BASE_DIR/

WORKDIR $APP_BASE_DIR
USER apache
ENTRYPOINT ["./entrypoint.sh"]
CMD ["/usr/sbin/httpd","-D","FOREGROUND"]
