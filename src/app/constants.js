angular.module("constants", [])

.constant("AccessLevels", {
	"groups": [
		{
			"id": 1,
			"name": "user"
		},
		{
			"id": 2,
			"name": "admin"
		}
	],
	"roles": {
		"public": [
			"*"
		],
		"user": [
			"user",
			"admin"
		],
		"admin": [
			"admin"
		]
	}
})

.constant("Config", {
	"pageTitle": "Sails Admin",
	"debugMode": true,
	"api": {
		"ssl": false,
		"host": "localhost",
		"port": "1337",
		"version": "v1",
		"url": "http://localhost:1337"
	}
})

;