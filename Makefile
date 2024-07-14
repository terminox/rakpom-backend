postgres:
	docker run --name pg -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=qwerqwerqwer -d postgres:16.3

.PHONY:
	postgres
