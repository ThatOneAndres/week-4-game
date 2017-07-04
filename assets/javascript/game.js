// Constructor for player character
function Player(name, attack, health, atkIncreases){
	this.name = name;
	this.attack = attack;
	this.health = health;
	this.atkIncreases = atkIncreases;
	this.state = 1;
	this.opponentsDefeated = 0;
	this.increaseAttack = function(){
		this.attack += this.atkIncreases[this.state];
	}
	this.prepNewOpponent = function(){
		this.state = this.opponentsDefeated + 1;
	}
}
Player.prototype.attackChar = function(opponent){
		opponent.health -= this.attack;
		this.attack += this.atkIncreases[this.state];
}

// Constructor for support character
function Support(name, cooldown){
	this.name = name;
	this.cooldown = cooldown;
}


//Constructor for enemy
function Enemy(name, attack, health){
	this.name = name;
	this.attack = attack;
	this.health = health;
	this.isStunned = false;
}
Enemy.prototype.attackChar = function(opponent){
	if(!this.isStunned){
		opponent.health -= this.attack;
	}
}

// Player's Character
var player_char = "both";


// Current Enemy
var enemy_char;

// Choice of players
var narutoAttackIncrease = {1: 5, 2: 10, 3: 20, 4: 30, 5: 45};
var sasukeAttackIncrease = {1: 8, 2: 10, 3: 15, 4: 30, 5: 40};
var naruto = new Player("Naruto", 10, 50,narutoAttackIncrease);
var sasuke = new Player("Sasuke", 12, 50, sasukeAttackIncrease);



// Choice of support characters with their respective abilities
var sakura = new Support("Sakura", 2);
sakura.heal = function(player){
	player.health += player.attack/3;
}

var shikamaru = new Support("Shikamru", 3);
shikamaru.paralysis = function(enemy){
	enemy.stunned = true;
}

// Enemies 
var zabuza = new Enemy("Zabuza",20, 40)
var orochimaru = new Enemy("Orochimaru", 40, 60)
var pain = new Enemy("Pain", 60, 80)
var madara = new Enemy("Madara", 80, 100);
var kaguya = new Enemy("Kaguya", 120, 200);

// Array of enemies
var enemies = [zabuza, orochimaru, pain, madara, kaguya];


//function to remove enemy from array
var removeEnemy = function(enemy){
	enemies.splice(enemies.indexOf(enemy_char),1);
}

$(document).ready(function(){


		// Selecting to fight an enemy
		$(".img-size").on("click", function(){
		$(".character-select").css("display","none");
		$("#choose-text").css("display","none");
		var name_char = $(this).attr("name");
		for (var i = 0; i < enemies.length; i++){
			if(name_char === enemies[i].name){
				enemy_char = enemies[i];
			}
		}
		var epath = "assets/images/" + enemy_char.name + ".png";
		if (player_char === "both"){
			$("#battle-text").css("display","inline")			
			$("#battle-text").html("Press the attack button to attack the enemy");
			var pimage = $("<img class = 'img-responsive center-block battle-img'>");
			pimage.attr("src", "assets/images/NarutoandSasuke.png");

			var pname = $("<p class = 'battle-name text-center'>");
			pname.html("Naruto and Sasuke");
			$(".player-img").append(pname);
			var phealth = $("<p class= 'battle-health text-center'>");
			phealth.html(naruto.health + sasuke.health);
			$(".player-img").append(phealth);
			$(".player-img").append(pimage);

			var eimage = $("<img class = 'img-responsive center-block battle-img'>");
			eimage.attr("src", epath);
			$(".enemy-img").append(eimage);
			var ename = $("<p class = 'battle-name text-center'>");
			ename.html(enemy_char.name);
			$(".enemy-img").append(ename);
			var ehealth = $("<p class = 'battle-health text-center'>");
			ehealth.html(enemy_char.health);
			$(".enemy-img").append(ehealth);

		}else{
			$(".player-img").css("display","block");
			$(".enemy-img").css("display","block");
			$("#battle-text").css("display","inline");
			var pimg = player_char.name + player_char.state +".png";
			var pimg_path = "assets/images/" + pimg;
			$(".player-img .battle-img").attr("src",pimg_path);
			$(".player-img .battle-name").html(player_char.name);
			$(".player-img .battle-health").html(player_char.health);

			$(".enemy-img .battle-img").attr("src",epath);
			$(".enemy-img .battle-name").html(enemy_char.name);
			$(".enemy-img .battle-health").html(enemy_char.health);
		}

	
		var attack_button = $("<button class = 'btn btn-danger' id = 'atk-btn'>");
		attack_button.html("Attack");
		$(".center-col").append(attack_button);

	});


		//Once already in battle
		$(".center-col").delegate("#atk-btn","click", function(){
			// If this is the first battle
			if (player_char === "both"){
				var combined = naruto.attack + sasuke.attack;
				$("#battle-text").html("Naruto and Sasuke did a combines damage of "
					+ combined + ". " + enemy_char.name 
					+ " hit both Naruto and Sasuke for "
					+ enemy_char.attack) + " damage.";

				naruto.attackChar(enemy_char);
				sasuke.attackChar(enemy_char);
				if (!(enemy_char.health <= 0)){
				enemy_char.attackChar(naruto);
				enemy_char.attackChar(sasuke);
				$(".player-img p.battle-health").html(sasuke.health + naruto.health);
				$(".enemy-img p.battle-health").html(enemy_char.health);
				}
				if ((sasuke.health + naruto.health) <= 0){
				$("#atk-btn").remove();
				$(".player-img").css("display","none");
				$(".enemy-img").css("display","none");
				$("#battle-text").css("display","none");

				$("#game_name").html("You have lost... Refresh page to restart.")
				return;
				}

			}else{
				$("#battle-text").html(player_char.name +" did " 
				+ player_char.attack + " damage. "
				+ enemy_char.name + " did "
				+ enemy_char.attack + " damage.");
				player_char.attackChar(enemy_char);
				if (!(enemy_char.health <= 0)){
					enemy_char.attackChar(player_char);
					$(".player-img p.battle-health").html(player_char.health);
					$(".enemy-img p.battle-health").html(enemy_char.health);
				}

			}
			if (player_char.health <= 0){
				$("#atk-btn").remove();
				$(".player-img").css("display","none");
				$(".enemy-img").css("display","none");
				$("#battle-text").css("display","none");
				$("#game_name").html("You have lost... Refresh page to restart.")
				return;
			}
			if (enemy_char.health <= 0){
				$("#atk-btn").remove();
				removed_char = enemy_char.name.toLowerCase();
				removeEnemy(enemy_char);
				if (enemies.length === 0){
					$(".player-img").css("display","none");
					$(".enemy-img").css("display","none");
					$("#battle-text").css("display","none");
					$("#game_name").html("Congratulation You Won!")
					return;
				}
				var removed_img = "." + removed_char +"-img";
				$(removed_img).html(" "); // replaces img from html with empty string
				if(player_char === "both"){
					var inaruto = $(".player-img .battle-img");
					var isasuke = $(".enemy-img .battle-img");
					inaruto.attr("src", "assets/images/Naruto2.png");
					inaruto.attr("id", "select_naruto");
					inaruto.hover(
						function(){
							$(this).css("border","solid 3px green");
						}, function(){
							$(this).css("border", "none");
						});
					isasuke.attr("src", "assets/images/Sasuke2.png");
					isasuke.attr("id", "select_sasuke");
					isasuke.hover(
						function(){
							$(this).css("border","solid 3px green");
						}, function(){
							$(this).css("border", "none");
						});
					$(".player-img p.battle-health").html(" ");
					$(".enemy-img p.battle-health").html(" ");
					$(".player-img p.battle-name").html("Naruto Uzumaki");
					$(".enemy-img p.battle-name").html("Sasuke Uchiha");
					$("#battle-text").html("Congratulation on 1st Win! Now pick your character!");
				}else{
					player_char.state++;
					player_char.health += 100;
					$(".player-img").css("display","none");
					$(".enemy-img").css("display","none");
					$("#battle-text").css("display","none");
					$(".character-select").css("display","inline");
					$("#choose-text").css("display","block");
			}
			}

		});

		$(".player-img").delegate("#select_naruto","click",function(){
			player_char = naruto;
			player_char.state++;
			player_char.health += 75;
			$(".player-img").css("display","none");
			$(".enemy-img").css("display","none");
			$("#battle-text").html(" ");
			$("#battle-text").css("display","none");
			$(".character-select").css("display","inline");
			$("#choose-text").css("display","block");
			// Removes hover effects after this action
			$(".enemy-img .battle-img").off("mouseenter mouseleave");
			$(".player-img .battle-img").off("mouseenter mouseleave");
			$(".enemy-img .battle-img").removeAttr("style");
			$(".player-img .battle-img").removeAttr("style");
			// Removes the ids: select_naruto and select_sasuke
			$(".player-img .battle-img").removeAttr("id");
			$(".enemy-img .battle-img").removeAttr("id");

		});
		$(".enemy-img").delegate("#select_sasuke","click",function(){
			player_char = sasuke;
			player_char.state++;
			player_char.health += 75;
			$(".player-img").css("display","none");
			$(".enemy-img").css("display","none");
			$("#battle-text").html(" ");
			$("#battle-text").css("display","none");
			$(".character-select").css("display","inline");
			$("#choose-text").css("display","block");
			// Removes hover effects after this action
			$(".enemy-img .battle-img").off("mouseenter mouseleave");
			$(".player-img .battle-img").off("mouseenter mouseleave");
			$(".player-img .battle-img").removeAttr("style");
			$(".enemy-img .battle-img").removeAttr("style");
			// Removes the ids: select_naruto and select_sasuke
			$(".player-img .battle-img").removeAttr("id");
			$(".enemy-img .battle-img").removeAttr("id");

		});




})