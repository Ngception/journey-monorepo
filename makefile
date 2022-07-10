.PHONY: dbs-up dbs-down \
dbs-start dbs-stop \

setup-ssl:
	sh scripts/setup-ssl.sh

create-dbs:
	docker-compose -f .docker/dev/docker-compose.yml up \
	--remove-orphans

destroy-dbs:
	docker-compose -f .docker/dev/docker-compose.yml down \
	--remove-orphans --volumes

start-dbs:
	docker-compose -f .docker/dev/docker-compose.yml start

stop-dbs:
	docker-compose -f .docker/dev/docker-compose.yml stop
