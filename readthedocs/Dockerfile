FROM centos:7
RUN yum -y install python-devel python-pip libxml2-devel libxslt-devel git gcc gcc-c++ intltool gperf openssl-devel bzip2-devel make patchelf \
    && yum -y install python36 python36-devel

RUN mkdir -p /tmp && chmod -R 0775 /tmp && cd /tmp \
    && git clone --recurse-submodules https://github.com/readthedocs/readthedocs.org.git \
    && cd /tmp/readthedocs.org/ \
    && python3 -m venv venv \
    && source venv/bin/activate \
    && pip install -r requirements.txt

RUN mkdir -p /opt/src && cd /opt/src \
    && curl -k -o /opt/src/glibc-2.18.tar.gz http://ftp.gnu.org/gnu/glibc/glibc-2.18.tar.gz \
    && tar zxvf /opt/src/glibc-2.18.tar.gz

RUN cd /opt/src/glibc-2.18 \
    && mkdir build \
    && cd build \
    && ../configure --prefix=/opt/glibc-2.18 \
    && make -j \
    && make install

RUN echo '#!/bin/bash' > /entrypoint.sh \
    && echo 'export LD_LIBRARY_PATH=/opt/glibc-2.18/lib:/lib64:/usr/local/lib64' >> /entrypoint.sh \
    && echo 'exec "$@"' >> /entrypoint.sh

RUN chmod 0755 /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "/bin/bash" ]