abc=1
while [ $abc -lt 100 ]; do
	./server.js
	echo 
	echo restarting...
	abc=`expr $abc + 1`;
	sleep 1
done;


echo "100 times over... exit(0)"
