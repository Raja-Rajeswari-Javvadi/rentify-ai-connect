from PIL import Image

# Load your uploaded image
img = Image.open("house.png")

# Convert to multiple sizes for browser compatibility
sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
img.save("favicon.ico", format="ICO", sizes=sizes)

print("✅ favicon.ico created successfully.")
