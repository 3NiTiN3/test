import folium

# Latitude and longitude coordinates
locations = [
    {"latitude": 18.43138300, "longitude": -64.6230},
    {"latitude": 20.00000000, "longitude": 77.00000000}
]

# Create a map centered at a specific location
mymap = folium.Map(location=[0, 0], zoom_start=2)

# Add markers for each location
for loc in locations:
    folium.Marker(
        location=[loc["latitude"], loc["longitude"]],
        popup=f'Latitude: {loc["latitude"]}, Longitude: {loc["longitude"]}'
    ).add_to(mymap)

# Save the map to an HTML file
mymap.save("world_map.html")

print("Map created successfully. Open 'world_map.html' to view.")
