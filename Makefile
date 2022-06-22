ACCOUNT := dubocsophiap
SERVICE_FRONT := front-encurtador
SERVICE_BACK := back-encurtador
IMAGE_FRONT := $(ACCOUNT)/$(SERVICE_FRONT)
IMAGE_BACK := $(ACCOUNT)/$(SERVICE_BACK)
MONGO := mongo
 
setup:
	@sudo docker build -t $(IMAGE_BACK) .
	@sudo docker build -t $(IMAGE_FRONT) ./public
	@sudo docker pull $(MONGO)

run:
	@sudo docker compose up -d

stop:
	@sudo docker compose stop

clean:
	@sudo docker rm -f $(SERVICE_FRONT)
	@sudo docker rm -f $(SERVICE_BACK)
	@sudo docker rm -f $(MONGO)
	@sudo docker rmi $(IMAGE_FRONT)
	@sudo docker rmi $(IMAGE_BACK)
	@sudo docker rmi $(MONGO)

push-images:
	@sudo docker push $(IMAGE_FRONT)
	@sudo docker push $(IMAGE_BACK)

test-api:
	@newman run tests/newman/DesafioGlobo.postman_collection.json -e tests/newman/localhost.postman_environment.json

test-performance:
	@newman run tests/newman/Performance.postman_collection.json -e tests/newman/localhost.postman_environment.json -n $(ntests)
