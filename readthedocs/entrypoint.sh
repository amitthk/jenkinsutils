#!/bin/bash
#export LD_LIBRARY_PATH=/opt/glibc-2.18/lib:/lib64:/usr/local/lib64
source activate rtdvenv
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
python manage.py loaddata test_data
exec "$@"