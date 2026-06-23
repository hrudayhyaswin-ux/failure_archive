def test_create_and_get_submissions(client):
    # Test create submission
    payload = {"title": "Test Submission", "description": "Test description"}
    response = client.post("/api/submissions/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Submission"
    assert data["description"] == "Test description"
    assert "id" in data

    # Test get submissions
    response = client.get("/api/submissions/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
