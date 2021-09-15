// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2021-08-28 22:20:02 Chuck Siska>

// ============================================================
// TOC of Things
// var g_canvas 
// var g_frame_cnt
// var g_frame_mod
// var g_stop
// 
// function setup() // P5 Setup Fcn, must be called for Anim to work.
// function move_bot( ) // Move the bot in new direction & update color.
// function get_rgb( cpix ) // Get RGB integer color at canvas pixel pos.
// function paint_cell_interior( cell ) // Paint grid-cell insides, with pre-set color.
// function draw_bot( ) // Convert bot pos to grid pos & draw bot cell.
// function draw_update()  // Update our display, move & draw bot cell.
// function draw()  // P5 Frame Anim-draw Fcn, Called for Every Frame at Frame-rate.
// function keyPressed( ) // P5 fcn, called for every keypress.
// function set_bot_pos( ) // Update bot cell pos based on mouse's canvas pixel pos.
// function mousePressed( ) // P5 fcn, called for every mouse-press.
// ============================================================


// Make our own global, g_canvas, JS 'object': a key-value 'dictionary'.
  // (Our g_canvas is just a suitcase - the P5 canvas has the pixels, themselves.)

  const Mode = {
      Normal : 0,
      CountDown : 1
  }

  const Colors =
  {
      Black: '#000000', //0
      Blue: '#326ad1',  //1
      Yellow: '#f5e20f',//2
      Red: '#eb152a'    //3 -> Back to 0
  }
  
  const Actions =
  {
      TurnLeft: 0,
      TurnRight: 1,
  }

  const Cardinal = 
  {
      North : 0,
      South : 1,
      West : 2,
      East : 3
  }

  var g_bot = { x:30, y:20, color: Colors.Black, cDirection : Cardinal.North }; // Dir is 0..7 clock, w 0 up.

class FSM{
    constructor() {
        this.mode = Mode.Normal;
        this.counter = 0;
        this.direction = Actions.TurnLeft;
    }

    MoveBot()
    {
       console.log( "Mode->" + this.mode + " Counter->" + this.counter + " Direction->" + this.direction + " Cardinal->" + g_bot.cDirection);

        if(this.mode == Mode.Normal)
            this.ColorMap();
        else{
            this.counter--;
            if(this.counter < 0)
                this.mode = Mode.Normal;
        }
        
        let dx = 0;
        let dy = 0;
        // A simple way to change bot direction, with a "compass direction ptr".

        // switch(g_bot.cDirection)
        // {
        //     case Cardinal.North:  
        //         switch (this.direction)
        //         { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
        //             case Actions.TurnLeft : {  dx = -1; g_bot.cDirection = Cardinal.West; break; } // left, W //dx = -1 is up //dx = 1 is right // dy = 1 is up // dy = -1 is up
        //             case Actions.TurnRight : { dx = 1; g_bot.cDirection = Cardinal.East; break; } // right, E.
        //         }
        //     break;
        //     case Cardinal.South: 
        //         switch (this.direction)
        //         { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
        //             case Actions.TurnLeft : {  dx = 1; g_bot.cDirection = Cardinal.West; break; } // left, W
        //             case Actions.TurnRight : { dx = -1; g_bot.cDirection = Cardinal.East; break; } // right, E.
        //         }
        //     break;
        //     case Cardinal.West: 
        //         switch (this.direction)
        //         { // Convert dir to x,y deltas : dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
        //             case Actions.TurnLeft : {  dy = -1; g_bot.cDirection = Cardinal.South; break; } // left, W
        //             case Actions.TurnRight : { dy = 1; g_bot.cDirection = Cardinal.North; break; } // right, E.
        //         }
        //     break;
        //     case Cardinal.East:
        //         switch (this.direction)
        //         { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
        //             case Actions.TurnLeft : {  dy = 1; g_bot.cDirection = Cardinal.North; break; } // left, W
        //             case Actions.TurnRight : { dy = -1; g_bot.cDirection = Cardinal.South; break; } // right, E.
        //         } 
        //     break;
        // }

        switch (this.direction)
        { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
            case Actions.TurnLeft : {  dx = -1; g_bot.cDirection = Cardinal.West; break; } // left, W //dx = -1 is up //dx = 1 is right // dy = 1 is up // dy = -1 is up
            case Actions.TurnRight : { dx = 1; g_bot.cDirection = Cardinal.East; break; } // right, E.
        }
    
        let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
        let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    
        console.log("g_bot.x->" + g_bot.x + " g_bot.y->" + g_bot.y);

        g_bot.x = x; // Update bot x.
        g_bot.y = y;
    
        console.log("dx->" + dx + " dy->" + dy);
        console.log("g_bot.x->" + g_bot.x + " g_bot.y->" + g_bot.y);

       console.log( "Mode->" + this.mode + " Counter->" + this.counter + " Direction->" + this.direction + " Cardinal->" + g_bot.cDirection);
    }

    SetCounter(colorIndex)
    {
        this.counter = colorIndex;
    }

    SetColor()
    {
        let sz = g_canvas.cell_size;
        let x_in = 5+ g_bot.x*sz; // Set x 5 pixel inside the sz-by-sz cell. otherwise it gets a different tint of the color
        let y_in = 5+ g_bot.y*sz;
        let cpix = { x:x_in, y:y_in }; // cell-interior pixel pos, new obj.
        let cpix_hex = get_hex( cpix );
        console.log(cpix_hex)
        //chooses correct color to apply depending on current color of the cell
        switch (cpix_hex) {
            case Colors.Black: { g_bot.color = Colors.Blue; this.SetCounter(0); break; }
            case Colors.Blue: { g_bot.color = Colors.Yellow; this.SetCounter(1); break; }
            case Colors.Yellow: { g_bot.color = Colors.Red; this.SetCounter(2); break; }
            case Colors.Red: { g_bot.color = Colors.Black; this.SetCounter(3); break; }
            default: { g_bot.color = Colors.Blue; break; }
        }
    }

    ColorMap(){
        switch(this.counter)
        {
            case 0: 
            this.direction = Actions.TurnLeft;
            this.mode = Mode.Normal;
            break;
            case 1: 
            this.direction = Actions.TurnRight;
            this.mode = Mode.Normal;
            break;
            case 2: 
            this.mode = Mode.CountDown;
            break;
            case 3: 
            this.direction = Actions.TurnLeft;
            this.mode = Mode.Normal;
            break;
        }
    }
}

  
  var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
  var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
  var g_frame_mod = 24; // Update ever 'mod' frames.
  var g_stop = 0; // Go by default.
  
  function setup() // P5 Setup Fcn, must be called for Anim to work.
  {
      let sz = g_canvas.cell_size;
      let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
      let height = sz * g_canvas.hgt;
      createCanvas( width, height );  // Make a P5 canvas.
      draw_grid( 10, 50, 'white', 'yellow' ); // Calls fcn in another (loaded) file.
  }
  // Here are some more simple multi-slot objects we use.
  var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.
    
  const test = new FSM();

  function move_bot( ) // Move the bot in new direction & update color.
  {
    test.MoveBot();
    test.SetColor();
  }
  
  function get_rgb( cpix ) // Get RGB integer color at canvas pixel pos.
  { // Cpix needs slots .x, .y, (canvas pixel coords).
      let acolors = get( cpix.x, cpix.y ); // Get pixel color [RGBA] array.
      let pix_rgb =  // Ignore A = acolors[3], the transparency.
          (256 // Compose via Horner's Method.
           * (256 * (acolors[ 2 ]) // B
              +  acolors[ 1 ])) // G
          + acolors[ 0 ]; // R
      return pix_rgb;
  }
  
  function get_hex( cpix ) // Get hexvalue color at canvas pixel pos.
  { // Cpix needs slots .x, .y, (canvas pixel coords).
      let acolors = get( cpix.x, cpix.y ); // Get pixel color [RGBA] array.
      return rgbToHex(acolors[0], acolors[1], acolors[2]);
  }
  
  function rgbToHex(r, g, b) 
  {
      r = r.toString(16); //turns rgb value to base 16 (hex)
      g = g.toString(16);
      b = b.toString(16);
  
      if (r.length == 1) //corrects the hexvalue if its single digit
          r = "0" + r;
      if (g.length == 1)
          g = "0" + g;
      if (b.length == 1)
          b = "0" + b;
  
      return "#" + r + g + b;
  }
  
  function paint_cell_interior( cell ) // Paint grid-cell insides, with pre-set color.
  { // Skip cell 1-pixel border, just paint insides.
      // Cell needs slots .x, .y, (canvas pixel coords) and .cell_size (in pixels);
      let sz = cell.cell_size;
      let x_in = 1 + (cell.x * sz); // Interior is one pixel inside cell, from top-left.
      let y_in = 1 + (cell.y * sz);
      let wid = sz -2; // Get width inside cell walls.
      rect( x_in, y_in, wid, wid );
  }
  
  function draw_bot( ) // Convert bot pos to grid pos & draw bot cell.
  {
      let sz = g_canvas.cell_size;
      console.log("DRAW g_bot.x->" + g_bot.x + " g_bot.y->" + g_bot.y);

      let x_in = 5+ g_bot.x*sz; // Set x 5 pixel inside the sz-by-sz cell. otherwise it gets a different tint of the color
      let y_in = 5+ g_bot.y*sz;
      let cpix = { x:x_in, y:y_in }; // cell-interior pixel pos, new obj.
      // Set drawing color for cell interior (fill) to bot's current painting color.
      // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
      fill( g_bot.color ); // Concat string, auto-convert the number to string.
      // console.log(g_bot.color)
      //console.log( "x_in,y_in = " + x + "," + y );
      let cpix_rgb = get_rgb( cpix );
  
      // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
      if (0 != cpix_rgb) // This cell has color?
      { // Turn off color, both interior (fill) and border (stroke).
          // console.log("Has Color")
          // fill( 0 );
          // stroke( 0 );
      }
      else { stroke( 'white' ); } // Else none, Bot is visiting, so color border white.
  
      // Paint the cell.
      let cell = { x:g_bot.x, y:g_bot.y, cell_size:sz }; // new obj.
      paint_cell_interior( cell );
  }
  
  function draw_update()  // Update our display, move & draw bot cell.
  {
      //console.log( "g_frame_cnt = " + g_frame_cnt );
      move_bot( );
      draw_bot( );
  }
  
  function draw() // P5 Frame Anim-draw Fcn, Called for Every Frame at Frame-rate.
  {
      ++g_frame_cnt; // Count each P5 frame-draw request.
      if (0 == g_frame_cnt % g_frame_mod) // Skip most frames.
      {
          if (!g_stop) draw_update(); // Draw bot only if it is moving.
      }
  }
  
  function keyPressed( ) // P5 fcn, called for every keypress.
  { // Any keypress, we don't distinguish.  See P5 docs for using keys.
      g_stop = ! g_stop; // Toggle the bot move-paint on/off.
  }
  
  function set_bot_pos( ) // Update bot cell pos based on mouse's canvas pixel pos.
  {  //  Req's cell-to-pixel tranlation.
      let x = mouseX;  // Get P5 mouse canvas pixel coords.
      let y = mouseY;
      //console.log( "mouse x,y = " + x + "," + y );
      // Convert canvas coords to the "fatter" grid-cell coords.
      let sz = g_canvas.cell_size;
      let gridx = round( (x-0.5) / sz );
      let gridy = round( (y-0.5) / sz );
      //console.log( "grid x,y = " + gridx + "," + gridy );
      //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
      g_bot.x = gridx + g_box.wid; // Ensure its positive.
      //console.log( "bot x = " + g_bot.x );
      g_bot.x %= g_box.wid; // Wrap to fit grid-box.
      g_bot.y = gridy + g_box.hgt;
      //console.log( "bot y = " + g_bot.y );
      g_bot.y %= g_box.hgt; // Wrap to fit grid-box.
      //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
  }
  
  function mousePressed( ) // P5 fcn, called for every mouse-press.
  {
      set_bot_pos( );
      draw_bot( );
  }
  