FROM centos:7
ARG PATH="/root/miniconda3/bin:${PATH}"
ENV PATH="/root/miniconda3/bin:${PATH}"

#RUN yum -y install python-devel python-pip libxml2-devel libxslt-devel git gcc gcc-c++ intltool gperf openssl-devel bzip2-devel make \
RUN  yum -y install python36 python36-devel git

COPY files /tmp/

RUN mkdir -p /tmp && chmod -R 0775 /tmp && cd /tmp \
    && curl -k -o /tmp/Miniconda3-latest-Linux-x86_64.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && mkdir /root/.conda \
    && bash Miniconda3-latest-Linux-x86_64.sh -b \
    && rm -f Miniconda3-latest-Linux-x86_64.sh

RUN cp /tmp/fedora.repo /etc/yum.repos.d/fedora.repo \
    && yum -y install gcc --enablerepo=warning:fedora


# RUN mkdir -p /opt/src && cd /opt/src \
#     && curl -k -o /opt/src/glibc-2.28.tar.gz http://ftp.gnu.org/gnu/glibc/glibc-2.28.tar.gz \
#     && tar zxvf /opt/src/glibc-2.28.tar.gz

# RUN cd /opt/src/glibc-2.28 \
#     && mkdir build \
#     && cd build \
#     && ../configure --prefix=/opt/glibc-2.28 \
#     && make -j2 \
#     && make install

RUN conda update -n base -c defaults conda \
    && conda create -n rtdvenv python=3.6 \
    && cd /tmp \
    && git clone --recurse-submodules https://github.com/readthedocs/readthedocs.org.git \
    && cd /tmp/readthedocs.org/ \
    && source activate rtdvenv \
    && pip install -r requirements.txt

COPY entrypoint.sh /entrypoint.sh

RUN chmod 0755 /entrypoint.sh
WORKDIR /tmp/readthedocs.org/

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "python","manage.py","runserver" ]