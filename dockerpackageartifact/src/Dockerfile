# The MIT License
# SPDX short identifier: MIT
# Further resources on the MIT License
# Copyright 2018 Amit Thakur - amitthk - <e.amitthakur@gmail.com>
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
FROM centos:centos7

ARG GROUP_ID=org.mywire.amitthk
ARG ARTIFACT_ID=VAULT
ARG ARTIFACT_VERSION=1.1.3
ARG ARTIFACT_TYPE=zip
ARG REPO_BASE_URL=https://jvcdp-repo.s3-ap-southeast-1.amazonaws.com
ARG ADMIN_USER=vaultadm
ARG ADMIN_UUID=1000
ARG PIP_INDEX=https://pypi.org/simple
ARG APP_HOME_DIR=/root

ENV GROUP_ID=${GROUP_ID} \
    ARTIFACT_ID=${ARTIFACT_ID} \
    ARTIFACT_VERSION=${ARTIFACT_VERSION} \
    ARTIFACT_TYPE=${ARTIFACT_TYPE} \
    REPO_BASE_URL=${REPO_BASE_URL} \
    ADMIN_UUID=${ADMIN_UUID} \
    PIP_INDEX=${PIP_INDEX} \
    APP_HOME_DIR=${APP_HOME_DIR} \
    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    PWD=/ \
    SHLVL=1 \
    HOME=/root \
    _=/usr/bin/env


EXPOSE 8200

USER root

RUN mkdir -p ${APP_HOME_DIR} \
    && useradd --home-dir ${APP_HOME_DIR} -u ${ADMIN_UUID} -g 0 ${ADMIN_USER} \
    && yum install -y wget unzip
    #&& yum install -y glibc glibc-common gcc gcc++  python-setuptools python-ldap java-1.8.0-openjdk java-1.8.0-openjdk-devel

COPY files ${APP_HOME_DIR}

RUN cd ${APP_HOME_DIR}/ \
    && export GROUP_URL=`echo "${GROUP_ID}" | tr "." "/"` \
    && wget ${REPO_BASE_URL}/${GROUP_URL}/${ARTIFACT_ID}/${ARTIFACT_VERSION}/${ARTIFACT_ID}-${ARTIFACT_VERSION}.${ARTIFACT_TYPE} \
    && if [ "${ARTIFACT_TYPE}"="zip" ];  then unzip "${APP_HOME_DIR}/${ARTIFACT_ID}-${ARTIFACT_VERSION}.${ARTIFACT_TYPE}" -d "${APP_HOME_DIR}"; fi \
    && if [ "${ARTIFACT_TYPE}"="tgz" ];  then tar -xzvf "${APP_HOME_DIR}/${ARTIFACT_ID}-${ARTIFACT_VERSION}.${ARTIFACT_TYPE}" -C "${APP_HOME_DIR}"; fi \
    && rm "${APP_HOME_DIR}/${ARTIFACT_ID}-${ARTIFACT_VERSION}.${ARTIFACT_TYPE}" \
    && chmod -R 0755 ${APP_HOME_DIR} \
    && mkdir -p ${APP_HOME_DIR}/vault-data \
    && chown -R ${ADMIN_USER}:root ${APP_HOME_DIR} \
    && chmod g=u /etc/passwd

WORKDIR ${APP_HOME_DIR}

USER ${ADMIN_USER}

ENTRYPOINT [ "./entrypoint" ]
CMD ["./run.sh"]