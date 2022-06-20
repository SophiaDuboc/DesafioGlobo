ACCOUNT := dubocsophiap
SERVICE_FRONT := front-encurtador
SERVICE_BACK := back-encurtador
IMAGE_FRONT := $(ACCOUNT)/$(SERVICE_FRONT)
IMAGE_BACK := $(ACCOUNT)/$(SERVICE_BACK)
MONGO := mongo
 
setup:
	@sudo docker build -t $(IMAGE_BACK) .
	@sudo docker build -t $(IMAGE_FRONT) ./views
	@sudo docker pull $(MONGO)

 
run:
	@sudo docker compose -f app.yml up -d

stop:
	@sudo docker stop $(SERVICE)
	@sudo docker stop $(MONGO)

clean:
	@sudo docker rm -f $(SERVICE)
	@sudo docker rm -f $(MONGO)
	@sudo docker rmi $(IMAGE)
	@sudo docker rmi $(MONGO)

tests:
	@newman run testes/newman/DesafioGlobo.postman_collection.json -e testes/newman/localhost.postman_environment.json