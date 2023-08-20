# Home Server API

A custom-built API designed to integrate and automate various smart devices within my home network. The primary integration is with my Roku Smart TV, enabling advanced features like a custom Dark Mode.
## Key Features
### Roku Dark Mode Automation 
- **Problem:**  Roku TVs lack a straightforward "Dark Mode" toggle. 
- **Solution:**  Developed an API endpoint (`/roku/toggle`) that acts as a remote, automating the steps to switch the TV to its darkest settings. 
- **Integration with HomeAssistant:**  The API can be triggered by events in HomeAssistant, such as bedtime routines, to automatically toggle Dark Mode. 
- **State Management:**  Since Roku doesn't provide a way to retrieve its state, the API maintains the state in a file, which is also accessible to HomeAssistant.
### Dockerized Environment 
- **Components:**  The API, along with Portainer, Plex Media Server, HomeAssistant, and a Cloudflare tunnel, are containerized and run on a restored PC with Ubuntu Server. 
- **Internal Networking:**  Established an internal network for container communication, allowing seamless interaction between HomeAssistant, the API, Plex, and Cloudflare tunnel.
## Challenges 
- **Docker Networking:**  While setting up the internal network was straightforward, it added complexity to troubleshooting, especially given the uniqueness of this setup in the HomeAssistant community.---
