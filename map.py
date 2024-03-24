import folium

def create_world_map():
    # Create a map object centered at (0, 0) with zoom level 2
    world_map = folium.Map(location=[16.16666666, 107.83333333], zoom_start=2)

    # Save the map to an HTML file
    world_map.save("world_map.html")

    print("World map created and saved as world_map.html")

# Create the world map
create_world_map()
