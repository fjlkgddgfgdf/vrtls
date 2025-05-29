# Create avatars directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/avatars"

# List of character images to process
$characters = @(
    "rose",
    "alice",
    "sophia",
    "luna",
    "maya",
    "victoria",
    "jade",
    "scarlett",
    "aurora",
    "melody",
    "ivy",
    "ruby",
    "claire",
    "nina",
    "zara",
    "aria",
    "chloe",
    "emma",
    "lily",
    "bella"
)

# Process each character
foreach ($char in $characters) {
    $sourcePath = "public/images/$char.png"
    $targetPath = "public/avatars/$char.webp"
    
    if (Test-Path $sourcePath) {
        # Convert PNG to WebP using sharp
        sharp -i $sourcePath -o $targetPath --format webp
        Write-Host "Converted $char.png to $char.webp"
    } else {
        Write-Host "Warning: Source file $sourcePath not found"
    }
} 