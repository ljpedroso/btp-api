
build-dev:
	docker build -t btp-api -f Dockerfile.dev .


build-production:
	docker build \
		-t btp-api-production:production \
		-f Dockerfile.production .

	docker tag btp-api-production:production ljpedroso/btp-mern:api
	docker push ljpedroso/btp-mern:api
