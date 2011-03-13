description "Hello Service"

start on stopped finish

exec /var/usr/sbin/org.webosinternals.hello.c

respawn
