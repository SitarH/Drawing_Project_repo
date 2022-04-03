# Drawing_Project_repo
I created an app that used for playing between two users. One user get a random word by the chosen difficulty level, 
the other one need to guess what is the chosen word by the drawong he recieve.
At first, I splited the project between client side and server side.
Before ive started coding, Ive created the app screens using Figma, to get a better understanding of the app ui.
After ive had the screens ready, Ive started to create client side by open folder for each component(screen) I need
and a context folder to store the functions and the global states I need to use in some components.
Ive wrote random word by difficulty function using random-words plugin, connected it to difficulty component and and
difficulty component to my welcome component.
Then Ive looked for a drawing library and used react-canvas-draw and connect the drawing component to waiting component.
For the guessing player I reuse drawing component and made a conditioning state.
After the first player ui and functionality was ready, Ive combined between client and server,
and started to work on the server side that was more chalenging for me since I barley learn about it at my studing so far.
I stored the data in json file. Ive read about http request and how to transfer data between node.js and react, 
I used get request that sending data to react and in drawing and waiting components, I used 'useEffect' ans 'setInterval' to check
data changes constantly. To present the drawing I used again react-canvas-draw.
In addition, Ive used put request to take the drawing and the random word to store in json file, and another
put request to reset data after a winning for the guessing player.
Both players lead to welcome screen after the session is over.



