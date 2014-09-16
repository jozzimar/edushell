echo "./edushell -c edushell.js"
./edushell -c edushell.js &

sleep 3
echo "chmod 777 edushell-fcgi-socket"
chmod ugoa+rwx edushell-fcgi-socket

echo "runing.............[Ok]"
