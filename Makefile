ACCOUNT := dubocsophiap
SERVICE := nodejs-image-demo
IMAGE := $(ACCOUNT)/$(SERVICE)
MONGO := mongo
 
setup:
	@sudo docker build -t $(IMAGE) .
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