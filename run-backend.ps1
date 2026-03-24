$javaPath = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot\bin"
if (!(Test-Path "$javaPath\java.exe")) {
    Write-Host "Java not found at $javaPath. Please make sure JDK 17 is installed."
    exit 1
}

$env:PATH = "$javaPath;$env:PATH"
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"

# Check Maven
if (!(Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Host "Maven not found. Downloading Maven..."
    $mavenVersion = "3.9.6"
    $mavenUrl = "https://archive.apache.org/dist/maven/maven-3/$mavenVersion/binaries/apache-maven-$mavenVersion-bin.zip"
    $mavenZip = "$PSScriptRoot\maven.zip"
    $mavenDest = "$PSScriptRoot\maven"
    
    Invoke-WebRequest -Uri $mavenUrl -OutFile $mavenZip
    Expand-Archive -Path $mavenZip -DestinationPath $mavenDest -Force
    
    $mvnBin = Get-ChildItem -Path "$mavenDest\apache-maven-*" | Select-Object -First 1
    $env:PATH = "$($mvnBin.FullName)\bin;$env:PATH"
    Remove-Item $mavenZip
}

Write-Host "Using Java from: $(where.exe java)"
Write-Host "Using Maven from: $(where.exe mvn)"

cd backend
mvn spring-boot:run
