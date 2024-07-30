PROJECT=qirion-api

CF-API-ENDPOINT=https://api.cf.eu10.hana.ondemand.com
SRV-PATH=srv
WEB-PATH=approuter

WEB-MODULE=order-management-app-approuter
SRV-MODULE=order-management-app-server


use-env: target-dev
	$(call get-default-env-srv, ${SRV-MODULE})
	$(call get-default-env-web, ${WEB-MODULE})

target-dev:
	cf target -o Alliander-dev-cf -s DEV-OGI-HC


tunnel: target-dev
	cf start ${WEB-MODULE}
	cf ssh -N -L 20010:connectivityproxy.internal.cf.eu10.hana.ondemand.com:20003 ${WEB-MODULE} 

enable-ssh: target-dev
	cf enable-ssh ${SRV-MODULE}
	cf restart ${SRV-MODULE}
	cf enable-ssh ${WEB-MODULE}
	cf restart ${WEB-MODULE}

define get-default-env-srv
	echo "{\"destinations\":[{\"name\":\"order-management-api\",\"url\":\"http://localhost:5000\",\"forwardAuthToken\":true,\"timeout\":30000,\"strictSSL\":false}]" > ./default-env-temp-srv.json
	cf env $1 | sed -n '/VCAP_SERVICES/,/User-Provided/p' \
	  | sed '$$d' \
		| sed '1s;^;,\n;' \
		| sed '$$s/$$/}/' \
		| sed 's/VCAP_SERVICES/\"VCAP_SERVICES\"/g' \
		| sed 's/VCAP_APPLICATION/,\"VCAP_APPLICATION\"/g' \
		| sed 's/connectivityproxy.internal.cf.eu10.hana.ondemand.com/127.0.0.1/g' \
		| sed 's/"onpremise_proxy_http_port": "20003"/"onpremise_proxy_http_port": "20010"/g' \
		>> ./default-env-temp-srv.json
	mv ./default-env-temp-srv.json ./default-env-srv.json
	cp ./default-env-srv.json ./${SRV-PATH}/default-env.json
endef

define get-default-env-web
	echo "{\"destinations\":[{\"name\":\"order-management-api\",\"url\":\"http://localhost:5001\",\"forwardAuthToken\":true,\"timeout\":30000,\"strictSSL\":false}]" > ./default-env-temp-web.json
	cf env $1 | sed -n '/VCAP_SERVICES/,/User-Provided/p' \
	  | sed '$$d' \
		| sed '1s;^;,\n;' \
		| sed '$$s/$$/}/' \
		| sed 's/VCAP_SERVICES/\"VCAP_SERVICES\"/g' \
		| sed 's/VCAP_APPLICATION/,\"VCAP_APPLICATION\"/g' \
		| sed 's/connectivityproxy.internal.cf.eu10.hana.ondemand.com/127.0.0.1/g' \
		| sed 's/"onpremise_proxy_http_port": "20003"/"onpremise_proxy_http_port": "20010"/g' \
		>> ./default-env-temp-web.json
	mv ./default-env-temp-web.json ./default-env-web.json
	cp ./default-env-web.json ./${WEB-PATH}/default-env.json
endef
