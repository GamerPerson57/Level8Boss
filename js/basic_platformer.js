//Declare my variables
var canvas;
var context;
var timer;
var interval;
var gameOver = false;
var clearObj = false;


	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	

//  |-------Game Objects-------|


	// Platform(s)
	var platform0 = new GameObject();
		platform0.width = 1000;
		platform0.x = platform0.width/2;
		platform0.y = canvas.height - platform0.height/2;
		platform0.color = "#66ff33";
	
	var platform1 = new GameObject();
		platform1.width = 1000;
		platform1.x = platform1.width/2;
		platform1.y = canvas.height/2 - 350;
		platform1.color = "#50c42a";

	var platform2 = new GameObject();
		platform2.width = 200;
		platform2.height = 400;
		platform2.x = canvas.width - 500;
		platform2.y = canvas.height - 300;
		platform2.color = "#264d19";

	

	// Player(s)
	var player = new GameObject();
		player.width = 100;
		player.height = 100;
		player.x = 100;
		player.y = canvas.height - platform0.height - player.height/2;
		player.color = "red";
	
	
	// Door(s)
	var door0 = new GameObject();
		door0.width = 100;
		door0.height = 200;
		door0.x = canvas.width - 50;
		door0.y = canvas.height - 200;
		door0.color = "#535032"

	// Key(s)
	var key0 = new GameObject();
		key0.width = 50;
		key0.height = 50;
		key0.x = 300;
		key0.y = canvas.height - 125;
		key0.color = "#b8a800"


//  |-------Other Variables-------|
	
	// Friction
	var fX = .85;
	var fY = .97;
	
	// Gravity
	var gravity = 1;
	var isGravity = true;
	
	// Cooldowns
	var gravityCooldown = false;
	var dashCooldown = false;

	// Keys Pressed
	var gPressed = false;
	var fPressed = false;
	var xPressed = false;

	// Iteractables
	var isTouchingDoor = false;
	var isTouchingItem = false;
	var isTouchingSign = false;
	var isTouchingNPC = false;

	// Holding Items
	var isHoldingKey = false;

	// Message 
	var interactMessage = "";
	var messageTimer = 0;

	// Jump Boost
	var jumpBoost = false;
	var chargeTimer = 1;   // 3 seconds to charge
	var chargeTimerMax = 1;
	var chargePower = 10;   

	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
	context.clearRect(0,0,canvas.width, canvas.height);	


	player.vx *= fX;
	player.vy *= fY;
	
	player.vy += gravity;
	
	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);




//  |-------Object Collision-------|
	
	// Platform(s)

	//---> Platform 0 
	while(platform0.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform0.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform0.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}

	// ---> Platform 1
	// while(platform1.hitTestPoint(player.bottom()) && player.vy >=0)
	// {
	// 	player.y--;
	// 	player.vy = 0;
	// 	player.canJump = true;
	// }
	// while(platform1.hitTestPoint(player.left()) && player.vx <=0)
	// {
	// 	player.x++;
	// 	player.vx = 0;
	// }
	// while(platform1.hitTestPoint(player.right()) && player.vx >=0)
	// {
	// 	player.x--;
	// 	player.vx = 0;
	// }
	// while(platform1.hitTestPoint(player.top()) && player.vy <=0)
	// {
	// 	player.y++;
	// 	player.vy = 0;
	// }

	// ---> Platform 2
	while(platform2.hitTestPoint(player.bottom()) && player.vy >=0)
	{
		player.y--;
		player.vy = 0;
		player.canJump = true;
	}
	while(platform2.hitTestPoint(player.left()) && player.vx <=0)
	{
		player.x++;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.right()) && player.vx >=0)
	{
		player.x--;
		player.vx = 0;
	}
	while(platform2.hitTestPoint(player.top()) && player.vy <=0)
	{
		player.y++;
		player.vy = 0;
	}


	// ---> Canvas
	
	// Left
	if (player.x - player.width/2 < 0)
	{
	player.x = player.width/2;
	player.vx = 0;
	}

	// Right
	if (player.x + player.width/2 > canvas.width)
	{
	player.x = canvas.width - player.width/2;
	player.vx = 0;
	}

	// Top
	if (player.y - player.height/2 < 0)
	{
	player.y = player.height/2;
	player.vy = 0;
	}

	// Bottom
	if (player.y + player.height/2 > canvas.height)
	{
	player.y = canvas.height - player.height/2;
	player.vy = 0;
	}


	// Door(s)

	// ---> Door 0
	isTouchingDoor = (
		door0.hitTestPoint({x: player.right().x + 5, y: player.right().y})  ||
		door0.hitTestPoint(player.left())   ||
		door0.hitTestPoint(player.top())    ||
		door0.hitTestPoint(player.bottom())
	);

	while(door0.hitTestPoint(player.right())) 
	{
		player.x--;
		player.vx = 0;
	}

	// Key(s)

	// ---> Key0
	// isTouchingItem = (
	// 	key0.hitTestPoint(player.right())  ||
	// 	key0.hitTestPoint(player.left())   ||
	// 	key0.hitTestPoint(player.top())    ||
	// 	key0.hitTestPoint(player.bottom())
	// );

	// while(key0.hitTestPoint(player.right())) 
	// {
	// 	player.x--;
	// 	player.vx = 0;
	// }
		
	
//  |-------Drawing Objects-------|

	// Platform(s)
	platform0.drawRect();
	// platform1.drawRect();
	platform2.drawRect();

	// Player(s)
	player.drawRect();

	// // Door(s)
	// door0.drawRect();

	// // Key(s)
	// key0.drawCircle();

	// Text
	context.fillStyle = "black";
	context.font = "20px Arial";
	context.textAlign = "center";
	context.fillText("Jump Boost Mechanic: Press and hold Z to boost up to higher places!", canvas.width/2, canvas.height/2 - 350);




	//  |-------Controls & Actions-------|

	// ---> Jumping
	if(w && player.canJump && player.vy ==0)
	{
		player.canJump = false;
		player.vy += player.jumpHeight;
	}

	// ---> Move Side to Side
	if(a)
	{
		player.vx += -player.ax * player.force;
	}
	if(d)
	{
		player.vx += player.ax * player.force;
	}

	// ---> Dash
	if (f && !fPressed && !dashCooldown) {
        fPressed = true;
		dashCooldown = true;
		
		player.isDashing = true;
        player.dashDuration = 10;

		if (a)
		{
			player.vx = -player.dashSpeed;
		} 
		else if (d)
		{
			player.vx = player.dashSpeed;
		}
		else 
		{
			player.vx = player.dashSpeed; //set it to default
		}
       

		setTimeout(() => 
		{
			dashCooldown = false;
		}, 2000);
    }

	// ---> Gravity Shift
	if (player.isDashing) {
		player.dashDuration--;
		if (player.dashDuration <= 0) {
			player.isDashing = false;
		}
	}

	if (!f) 
	{
		fPressed = false;
	}

	if(g && !gPressed && !gravityCooldown) 
	{
		gPressed = true;
		gravityCooldown = true;

		isGravity = !isGravity;
		
		if (isGravity == true)
		{
			gravity = 1;
		}
		if (isGravity == false) 
		{
			gravity = -1;
		}

		setTimeout(() => 
		{
			gravityCooldown = false;
		}, 3000);

	}

	if(!g) 
	{
		gPressed = false;
	}

	
	// ---> Interaction
	if (x && !xPressed && isTouchingDoor)  
	{
		xPressed = true;

		if (isHoldingKey == true) 
		{
			// clear the door
			console.log("Player does have the key.");
			
			door0.x = 1000;
			door0.y = 1000;
		}

		if (isHoldingKey == false) 
		{
			// print text
			console.log("Player does not have the key.");

			interactMessage = "You need a key to open this door.";
			messageTimer = 300;
		}
	}
	
	if (x && !xPressed && isTouchingItem && !isHoldingKey) 
	{
		xPressed = true;
		isHoldingKey = true;

		if (isHoldingKey == true) 
		{
			// clear the door
			console.log("Player picked up key.");
			
			key0.x = 1000;
			key0.y = 1000;

			interactMessage = "You picked up a key!";
			messageTimer = 300;
		}
	}

	if (!x) 
	{
		xPressed = false;
	}

	// ---> Jump Boost
	if (z) 
	{
		if (!jumpBoost) 
		{
			chargeTimer -= 1/60;

			if (chargeTimer <= 0) 
			{
				player.vy = -(chargePower * 5);
				jumpBoost = true;
				chargeTimer = 3;
			}
		}
	} 
	else 
	{
		if (!jumpBoost && chargeTimer < 3) 
		{
			var chargePercent = (chargeTimerMax - chargeTimer) / chargeTimerMax;
			player.vy = -(chargePower * 5 * chargePercent);
			chargeTimer = chargeTimerMax;
			jumpBoost = true;
		}
		
		if (player.canJump) 
		{
			jumpBoost = false;
		}
	}


	if (messageTimer > 0) 
	{
		context.fillStyle = "black";
		context.font = "16px Arial";
		context.textAlign = "center";
		context.fillText(interactMessage, canvas.width/2, canvas.height/2 + 40);
		messageTimer--;
	}

}