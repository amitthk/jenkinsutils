from centos:7

RUN yum install -y krb5-workstation krb5-libs sssd

COPY files/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

VOLUME /var/lib/sss
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/sbin/sssd","-i","-d","4"]

