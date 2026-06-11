# API Reference

## Base URL

/api

## Endpoints

### GET /api/failures

Description: Retrieve all documented failure cases.

Response:

* 200 OK
* JSON array containing failure records.

### GET /api/failures/{id}

Description: Retrieve details of a specific failure.

Parameters:

* id: Unique identifier.

### POST /api/analyze

Description: Analyze a failure case using AI.

Request Body:
{
"title": "Case Title",
"description": "Failure description"
}

Response:
{
"causes": [],
"lessons": [],
"recommendations": []
}

### POST /api/search

Description: Search failures using keywords.

Request Body:
{
"query": "startup failure"
}

Response:
Matching failure records.

## Error Codes

* 400: Invalid Request
* 404: Resource Not Found
* 500: Internal Server Error
