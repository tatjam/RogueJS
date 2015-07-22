#ROGUE.JS
---------------------------------
__A WIP Javascript Roguelike game engine__

---------------------------

Rogue.js focuses on providing a quick way to prototype, and develop ASCII games, specially, Roguelikes.



##Engine Structure
----------------------------------

The engine is contained on a single file `./rogue.js`, requiring nothing but an HTML5 canvas. An example HTML5 file is located at `./page.html`.

The engine renders all objects using `fillText`, which may make it slow on big canvases, i would recommend keeping the canvas size under `500x500`.

There are 2 types of objects:
<bk>
`actors`: They are movable and can have a transparent background
<bk>
`tiles`: They are static, they can be collideable or nothing
<bk>
<bk>
<bk>

####Characters:

__Characters__ are "the building block" of all other objects. They simply store a string (containing a single character), a foreground color and a background color.
<bk>
They can be changed at real time any way you want.

####Input:
Input is not yet working, a very simple input handling system is integrated in the demo, but it's not final.

##TODO

__High priority:__
- [ ] Tiles  
- [ ] Input handling

__Low priority:__
- [ ] Map Generation
- [ ] Lighting algorithms
- [ ] Pathtracing algorithms