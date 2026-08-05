try {
    $r = Invoke-WebRequest -Uri 'http://localhost:3000/api/spots?name=Clarence' -UseBasicParsing -TimeoutSec 5
    Write-Host "Vite proxy OK: $($r.StatusCode)"
    Write-Host $r.Content
} catch {
    Write-Host "Vite proxy FAIL: $($_.Exception.Message)"
}
