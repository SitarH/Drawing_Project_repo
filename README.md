# Drawing_Project_repo
I created an app that is used as a playing game between two users. 
One player gets a random word, that changes, depending on the selected difficulty level, while the other player 
need to guess what the chosen word is, based on the drawing he receives from the player 
who chose the word. At first, I divided the project between client side and server side. 
First, before I started coding, I had designed the app wireframes using Figma, to get a better understanding of the app ui. 
Then, after the screens were ready, I had started to create the client side by opening a folder for each component (screen), 
and a context folder to store the functions and the global states that need to be used in some components. 
I wrote random word based on a difficulty function, using random-words package, connected it to difficulty component and difficulty component to my welcome component. 
Then, I looked for a drawing library and installed react-canvas-draw and connected the drawing component to a waiting component. 
For the guessing player I reused drawing component and made a conditioning state. 
After the first player’s ui and functionality were ready, I combined between client and server, 
and started working on the server side that was more challenging for me since so far, I hardly learned about it during my studies. 
I stored the data in json file. I read about http request methods and how to transfer data between node.js and react, 
I used ‘get request’ that sending data to react and in drawing and waiting components, I used 'useEffect' and 'setInterval' to constantly check data changes. 
To present the drawing I used again react-canvas-draw. In addition, I used ‘put request’ to take the drawing and the random word to be stored in a json file, 
and another ‘put request’ to reset data after a winning for the guessing player.
When the session is over, both players are transferred to the welcome screen and can start another session.




