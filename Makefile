gen:
	cp ../tas9-api/graph/schema.graphqls ./graphql/schema.graphql
	npx graphql-codegen --config ./graphql/codegen-server.yaml
