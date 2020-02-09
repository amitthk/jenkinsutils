FROM centos:7
RUN yum -y install python-devel python-pip libxml2-devel libxslt-devel git \
    && yum -y install python36 python36-devel

RUN mkdir -p /tmp && chmod -R 0775 /tmp && cd /tmp \
    && git clone --recurse-submodules https://github.com/readthedocs/readthedocs.org.git \
    && cd /tmp/readthedocs.org/ \
    && python3 -m venv venv \
    && source venv/bin/activate \
    && pip install -r requirements.txt

RUN cat > /entrypoint.sh << EOF \
#!/bin/bash
exec "$@" \
EOF \
&& chmod 0755 /entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]
CMD [ "/bin/bash" ]