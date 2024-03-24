import webbrowser

def show_location_on_map(latitude, longitude):
    # Format the URL with latitude and longitude
    url = f"https://www.google.com/maps/search/?api=1&query={latitude},{longitude}"
    
    # Open the URL in a web browser
    webbrowser.open(url)

# Example latitude and longitude
latitude = "18.43138300"
longitude = "-64.6230"

# Show the location on a map
show_location_on_map(latitude, longitude)
