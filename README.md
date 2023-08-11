# Home Server
A custom API that targets various smart-devices connected via my home local-network. Currently, the main integration is with my Roku Smart tv.

## Roku
The roku integration in this api allows my smart-home HomeAssistant setup to call the api when triggered by events that comminicate and automate tasks on the Roku. The most used integreation is the Dark Mode api.

### Dark Mode
Converting this tv from standard into a dark mode is simple, yet cumbersome. There should be a simple button that does it all for you, however, that is not included. So, I built one. When my I trigger dark mode in HomeAssistant, or better yet, when HomeAssistant knows it's bed-time, it tirggers calls the API `/roku/toggle`.
This uses the Node Roku API and acts as a remote, and flows through the steps to convert the picture mode into the its darkest settings, and vis-versa. Becuase there is no way to ask the Roku for information, the API stores the state in a file that is also exposed for HomeAssistant to get the state from the server.

## Where does it live?
This API, along with portainer, a plex media server, home assistant, and a cloudflare tunnel, are all containerized and running on an older PC that I restored with Ubuntu Server. 

## Docker
The dockerization of this entire project has been incredible, yet complicated. 
### Docker Internal Networking
The most compplicated part about this setup is allowing the containers to communicate with one-another. Allowing homeassistant to communicate with this API, plex, and allowing cloudflre to expore the containers via a tunnel means I needed to initialize an internal network for internal communication. While this may sound trivial, and the setup was indeed trivial, it introduces more steps and deviation when troubleshooting, esepcially when very few people running homeassistant have a similar setup.
