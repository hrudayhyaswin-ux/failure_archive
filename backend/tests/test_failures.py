def test_read_failures(client):
    response = client.get("/api/failures/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_and_get_failure(client):
    # Create failure
    payload = {
        "title": "Startup X",
        "category": "Marketing",
        "description": "Failed to market properly",
        "industry": "Tech",
        "year": 2021,
        "failure_reason": "No market need",
        "lesson": "Do market research"
    }
    response = client.post("/api/failures/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Startup X"
    assert "id" in data
    failure_id = data["id"]

    # Get specific failure
    response = client.get(f"/api/failures/{failure_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Startup X"

    # Get non-existent failure
    response = client.get("/api/failures/99999")
    assert response.status_code == 404
