def test_read_failures(client):
    response = client.get("/api/failures")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
