/*

********************************
*           ROGUEJS            *
********************************

  Copyright TajamSoft (2015)


*/

//KeyCodes:

var KeyCode = function()
{
  this.q = 81;
  this.w = 87;
  this.e = 69;
  this.r = 82;
  this.t = 84;
  this.y = 89;
  this.u = 85;
  this.i = 73;
  this.o = 79;
  this.p = 80;
  this.a = 65;
  this.s = 83;
  this.d = 68;
  this.f = 70;
  this.g = 71;
  this.h = 72;
  this.j = 74;
  this.k = 75;
  this.l = 76;
  this.z = 90;
  this.x = 88;
  this.c = 67;
  this.v = 86;
  this.b = 66;
  this.n = 78;
  this.m = 77;
};

key = new KeyCode();

//Global Variables\\

canvasName = "Canvas";
fillThresold = 0.8;

//End of Global Variables\\

//Util functions\\


//Generate array (Thank you Matthew Crumley & yckart at StackOverflow)

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

//Get text height (Thank you Prestaul & pimvdb at StackOverflow)

function measureTextHeight(ctx, left, top, width, height) {

    // Draw the text in the specified area
    ctx.save();
    ctx.translate(left, top + Math.round(height * 0.8));
    ctx.fillText('gM', 0, 0); // This seems like tall text...  Doesn't it?
    ctx.restore();

    // Get the pixel data from the canvas
    var data = ctx.getImageData(left, top, width, height).data,
        first = false,
        last = false,
        r = height,
        c = 0;

    // Find the last line with a non-white pixel
    while(!last && r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                last = r;
                break;
            }
        }
    }

    // Find the first line with a non-white pixel
    while(r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                first = r;
                break;
            }
        }

        // If we've got it then return the height
        if(first != r) return last - first;
    }

    // We screwed something up...  What do you expect from free code?
    return 0;
}

//End of util functions\\

//Character Class\\

var Character = function(char, fColor, bColor)
{
  this.char = char;
  this.fColor = fColor;
  this.bColor = bColor;
};

//End of Character Class\\

//Terminal Class\\

var Terminal = function()
{
  this.canvas = document.getElementById(canvasName);
  this.context = this.canvas.getContext('2d');
  this.context.font = '16pt Share Tech Mono';
  this.txtSize = this.context.measureText(" ");
  this.txtSize.height = measureTextHeight(this.context,
  0, 0, 50, 50);

  this.xChars = this.canvas.width / this.txtSize.width;

  this.yChars = this.canvas.height / measureTextHeight(this.context,
  0, 0, 50, 50);
  //Char array:
  this.xChars = Math.floor(this.xChars);
  this.yChars = Math.floor(this.yChars);
  this.characters = createArray(Math.floor(this.xChars), Math.floor(this.yChars));
  for(i = 0; i < this.xChars; i++)
  {
    for(j = 0; j < this.yChars; j++)
    {
      this.characters[i][j] = new Character(" ", "rgb(0, 0, 0)", "rgb(0, 0, 0)");
    }
  }

  this.actors = [];

};

Terminal.prototype.render = function()
{
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  for(y = 0; y < this.yChars; y++)
  {
    for(x = 0; x < this.xChars; x++)
    {
      var aChar = this.characters[x][y];
      this.context.fillStyle =  aChar.bColor;
      this.context.fillRect(x * this.txtSize.width, y * this.txtSize.height, this.txtSize.width + fillThresold, this.txtSize.height);
      this.context.fillStyle =  aChar.fColor;
      this.context.fillText(aChar.char, x * this.txtSize.width, y * this.txtSize.height + this.txtSize.height);
    }
  }

  for(i = 0; i < this.actors.length; i++)
  {
    var actor = this.actors[i];
    var acChar = actor.character;
    this.context.fillStyle =  acChar.bColor;
    this.context.fillRect(actor.x * this.txtSize.width, actor.y * this.txtSize.height, this.txtSize.width + fillThresold, this.txtSize.height);
    if(acChar.fColor != "TRANSPARENT")
    {
      this.context.fillStyle =  acChar.fColor;
      this.context.fillText(acChar.char, actor.x * this.txtSize.width, actor.y * this.txtSize.height + this.txtSize.height);
    }
  }
};

Terminal.prototype.putChar = function(x, y, ch)
{
  if(x < this.xChars && y < this.yChars)
  {
    this.characters[x][y] = ch;
  }
};

Terminal.prototype.getChar = function(x, y)
{
  if(x < this.xChars && y < this.yChars)
  {
    return this.characters[x][y];
  }
};

Terminal.prototype.setCharFColor = function(x, y, c)
{
  if(x < this.xChars && y < this.yChars)
  {
    this.characters[x][y].fColor = c;
  }
};

Terminal.prototype.setCharBColor = function(x, y, c)
{
  if(x < this.xChars && y < this.yChars)
  {
    this.characters[x][y].bColor = c;
  }
};

//End of Terminal Class\\


//Tile Class\\

var Tile = function(char, walkable)
{
  this.character = char;

  if(walkable === true)
  {
    this.walkable = true;
  }
  else
  {
    this.walkable = false;
  }

};


//Example tiles:

var dirtTile = new Tile(new Character("·", "rgb(138, 109, 71)", "rgb(94, 81, 41)"), true);
var dirtTile2 = new Tile(new Character("·", "rgb(138, 109, 71)", "rgb(109, 91, 41)"), true);
var wallTile = new Tile(new Character("#", "rgb(82, 82, 82)", "rgb(116, 116, 116)"), false);
//End of Tile Class\\



//Actor Class\\



var Actor = function(x, y, ch, t, name)
{
  this.x = x;
  this.y = y;
  this.character = ch;
  t.actors.push(this);
  if(name !== undefined)
  {
    this.name = name;
  }
  else
  {
    this.name = "No Name";
  }

};



//End of Actor Class\\



//--------------------------------------------------------------------------
//Actual Game code starts here:

window.addEventListener("keydown", onKeyDown, true);

t = new Terminal();
//Generating a test world:
for(x = 0; x < 20; x++)
{
  for(y = 0; y < 20; y++)
  {
    if(x < 19)
    {
      if(Math.random() < 0.5)
      {
        t.putChar(x, y, dirtTile.character);
      }
      else
      {
        t.putChar(x, y, dirtTile2.character);
      }
    }
    else
    {
      t.putChar(x, y, wallTile.character);
    }
  }
}
pl = new Actor(12, 13, new Character("@", "rgb(240, 238, 70)", "TRANSPARENT"), t, "Player");
//Your required keys input handling:
function onW(){pl.y -= 1; t.render();}
function onA(){pl.x -= 1; t.render();}
function onS(){pl.y += 1; t.render();}
function onD(){if(pl.x < 18){pl.x += 1; t.render();}}
t.render();



function onKeyDown(e)
{
  switch(e.keyCode)
  {
    case key.q:
    case key.w:
      onW();
      break;
    case key.e:
    case key.r:
    case key.t:
    case key.y:
    case key.u:
    case key.i:
    case key.o:
    case key.p:
    case key.a:
      onA();
      break;
    case key.s:
      onS();
      break;
    case key.d:
      onD();
      break;
    case key.f:
    case key.g:
    case key.h:
    case key.j:
    case key.k:
    case key.l:
    case key.z:
    case key.x:
    case key.c:
    case key.v:
    case key.b:
    case key.n:
    case key.m:
  }

}
