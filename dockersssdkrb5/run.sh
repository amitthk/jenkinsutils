#!/bin/bash
docker run --rm -d --name sssd -e KERBEROS_REALM=ldap.amitthk.com -e LDAP_BASE_DN="ou=people,dc=ldap,dc=amitthk,dc=com" -e LDAP_BIND_DN="cn=Hermes Conrad,ou=people,dc=ldap,dc=amitthk,dc=com" -e LDAP_BIND_PASSWORD=hermes -e LDAP_URI=ldap://172.31.64.103:6389/ -v /var/lib/sss  $1
