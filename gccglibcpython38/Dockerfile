from centos:7

RUN yum -y downgrade glibc glibc-common glibc-devel glibc-headers cyrus-sasl-lib make \
    && yum -y install gcc gcc-c++ intltool gperf openssl-devel bzip2-devel \
    && yum -y install glibc glibc-common glibc-devel glibc-headers cyrus-sasl-lib make \
    && yum -y install sudo adcli supervisor pwgen openssh-server-7.4p1-16.el7.x86_64 cyrus-sasl-lib \
    && yum install -y krb5-workstation krb5-libs sssd

RUN mkdir -p /tmp && chmod -R 0774 /tmp/ && cd /tmp/ \
    && curl -k -o Python-3.8.1.tgz https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz \
    && tar xzf Python-3.8.1.tgz \
    && cd Python-3.8.1 \
    && ./configure --enable-optimizations \
    && make altinstall \
    && ln -sfn /usr/local/bin/python3.8 /usr/bin/python3.8 \
    && ln -sfn /usr/bin/python3.8 /usr/bin/python

RUN cd /tmp/ \
    && curl -k -o glibc-2.18.tar.gz http://ftp.gnu.org/gnu/glibc/glibc-2.18.tar.gz \
    && tar zxvf glibc-2.18.tar.gz \
    && cd glibc-2.18 \
    && mkdir build \
    && cd build \
    && ../configure --prefix=/opt/glibc-2.18 \
    && make -j4 \
    && make install

RUN export LD_LIBRARY_PATH=/opt/glibc-2.18/lib

COPY files/entrypoint.sh /entrypoint.sh

RUN chmod 0755 /entrypoint.sh

VOLUME /var/lib/sss
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/bin/bash"]

