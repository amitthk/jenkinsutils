FROM centos:8
RUN yum -y install libxml2-devel libxslt-devel git gcc gcc-c++ glibc glibc-devel intltool openssl-devel bzip2-devel make \
    && yum -y install python36 python36-devel

RUN mkdir -p /tmp && chmod -R 0775 /tmp && cd /tmp \
    && git clone --recurse-submodules https://github.com/readthedocs/readthedocs.org.git \
    && cd /tmp/readthedocs.org/ \
    && python3 -m venv venv \
    && source venv/bin/activate \
    && pip install -r requirements.txt

# RUN mkdir -p /opt/src && cd /opt/src \
#     && curl -k -o /opt/src/glibc-2.18.tar.gz http://ftp.gnu.org/gnu/glibc/glibc-2.18.tar.gz \
#     && tar zxvf /opt/src/glibc-2.18.tar.gz

# RUN cd /opt/src/glibc-2.18 \
#     && mkdir build \
#     && cd build \
#     && ../configure --prefix=/opt/glibc-2.18 \
#     && make -j \
#     && make install

# COPY entrypoint.sh /entrypoint.sh

# RUN chmod 0755 /entrypoint.sh

# ENTRYPOINT [ "/entrypoint.sh" ]
# CMD [ "/bin/bash" ]