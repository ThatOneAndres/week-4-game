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
var kaguya = new Enemy("Kaguya", 120, 150);

// Array of enemies
var enemies = [zabuza, orochimaru, pain, madara, kaguya];


//function to remove enemy from array
var removeEnemy = function(enemy){
	enemies.splice(enemies.indexOf(enemy_char),1);
}

$(document).ready(function(){

	// Selecting Enemy to fight
	//Chose to fight Zabuza
	$(".zabuza-img").on("click", function(){
		$(".character-select").css("display","none");
		$("#choose-text").css("display","none");
		enemy_char = zabuza;

		if (player_char === "both"){
			$("#battle-text").css("display","inline")
			$("#battle-text").html("Press the attack button to attack the enemy");
			var pimage = $("<img class = 'img-responsive battle-img'>");
			pimage.attr("src", "assets/images/NarutoandSasuke.png");
			$(".player-img").append(pimage);

			var pname = $("<p class = 'battle-name text-center'>");
			pname.html("Naruto and Sasuke");
			$(".player-img").append(pname);
			var phealth = $("<p class= 'battle-health text-center'>");
			phealth.html(naruto.health + sasuke.health);
			$(".player-img").append(phealth);

			var zimage = $("<img class = 'img-responsive battle-img'>");
			zimage.attr("src", "assets/images/Zabuza.png");
			$(".enemy-img").append(zimage);
			var zname = $("<p class = 'battle-name text-center'>");
			zname.html(enemy_char.name);
			$(".enemy-img").append(zname);
			var zhealth = $("<p class = 'battle-health text-center'>");
			zhealth.html(enemy_char.health);
			$(".enemy-img").append(zhealth);


		}
		var attack_button = $("<button class = 'btn btn-danger' id = 'atk-btn'>");
		attack_button.html("Attack");
		$(".center-col").append(attack_button);

	});

		//Chose to fight Orochimaru
		$(".orochimaru-img").on("click", function(){
		$(".character-select").css("display","none");
		$("#choose-text").css("display","none");
		enemy_char = orochimaru;

		if (player_char === "both"){
			$("#battle-text").css("display","inline")
			$("#battle-text").html("Press the attack button to attack the enemy");
			var pimage = $("<img class = 'img-responsive battle-img'>");
			pimage.attr("src", "assets/images/NarutoandSasuke.png");

			var pname = $("<p class = 'battle-name text-center'>");
			pname.html("Naruto and Sasuke");
			$(".player-img").append(pname);
			var phealth = $("<p class= 'battle-health text-center'>");
			phealth.html(naruto.health + sasuke.health);
			$(".player-img").append(phealth);
			$(".player-img").append(pimage);

			var oimage = $("<img class = 'img-responsive battle-img'>");
			oimage.attr("src", "assets/images/Orochimaru.png");
			$(".enemy-img").append(oimage);
			var oname = $("<p class = 'battle-name text-center'>");
			oname.html(enemy_char.name);
			$(".enemy-img").append(oname);
			var ohealth = $("<p class = 'battle-health text-center'>");
			ohealth.html(enemy_char.health);
			$(".enemy-img").append(ohealth);

		}
		var attack_button = $("<button class = 'btn btn-danger' id = 'atk-btn'>");
		attack_button.html("Attack");
		$(".center-col").append(attack_button);

	});

		//Chose to fight Pain
		$(".pain-img").on("click", function(){
		$(".character-select").css("display","none");
		$("#choose-text").css("display","none");
		enemy_char = pain;

		if (player_char === "both"){
			$("#battle-text").css("display","inline")
			$("#battle-text").html("Press the attack button to attack the enemy");
			var pimage = $("<img class = 'img-responsive battle-img'>");
			pimage.attr("src", "assets/images/NarutoandSasuke.png");

			var pname = $("<p class = 'battle-name text-center'>");
			pname.html("Naruto and Sasuke");
			$(".player-img").append(pname);
			var phealth = $("<p class= 'battle-health text-center'>");
			phealth.html(naruto.health + sasuke.health);
			$(".player-img").append(phealth);
			$(".player-img").append(pimage);

			var paimage = $("<img class = 'img-responsive battle-img'>");
			paimage.attr("src", "assets/images/Pain.png");
			$(".enemy-img").append(paimage);
			var paname = $("<p class = 'battle-name text-center'>");
			paname.html(enemy_char.name);
			$(".enemy-img").append(paname);
			var pahealth = $("<p class = 'battle-health text-center'>");
			pahealth.html(enemy_char.health);
			$(".enemy-img").append(pahealth);

		}
		var attack_button = $("<button class = 'btn btn-danger' id = 'atk-btn'>");
		attack_button.html("Attack");
		$(".center-col").append(attack_button);

	});

		//Chose to fight Madara
	$(".madara-img").on("click", function(){
		$(".character-select").css("display","none");
		$("#choose-text").css("display","none");
		enemy_char = madara;

		if (player_char === "both"){
			$("#battle-text").css("display","inline")
			$("#battle-text").html("Press the attack button to attack the enemy");
			var pimage = $("<img class = 'img-responsive battle-img'>");
			pimage.attr("src", "assets/images/NarutoandSasuke.png");

			var pname = $("<p class = 'battle-name text-center'>");
			pname.html("Naruto and Sasuke");
			$(".player-img").append(pname);
			var phealth = $("<p class= 'battle-health text-center'>");
			phealth.html(naruto.health + sasuke.health);
			$(".player-img").append(phealth);
			$(".player-img").append(pimage);

			var mimage = $("<img class = 'img-responsive battle-img'>");
			mimage.attr("src", "assets/images/Madara.png");
			$(".enemy-img").append(mimage);
			var mname = $("<p class = 'battle-name text-center'>");
			mname.html(enemy_char.name);
			$(".enemy-img").append(mname);
			var mhealth = $("<p class = 'battle-health text-center'>");
			mhealth.html(enemy_char.health);
			$(".enemy-img").append(mhealth);
		}
		var attack_button = $("<button class = 'btn btn-danger' id = 'atk-btn'>");
		attack_button.html("Attack");
		$(".center-col").append(attack_button);

	});

		//Chose to fight Kaguya
		$(".kaguya-img").on("click", function(){
		$(".character-select").css("display","none");
		$("#choose-text").css("display","none");
		enemy_char = kaguya;

		if (player_char === "both"){
			$("#battle-text").css("display","inline")			
			$("#battle-text").html("Press the attack button to attack the enemy");
			var pimage = $("<img class = 'img-responsive battle-img'>");
			pimage.attr("src", "assets/images/NarutoandSasuke.png");

			var pname = $("<p class = 'battle-name text-center'>");
			pname.html("Naruto and Sasuke");
			$(".player-img").append(pname);
			var phealth = $("<p class= 'battle-health text-center'>");
			phealth.html(naruto.health + sasuke.health);
			$(".player-img").append(phealth);
			$(".player-img").append(pimage);

			var kimage = $("<img class = 'img-responsive battle-img'>");
			kimage.attr("src", "assets/images/Kaguya.png");
			$(".enemy-img").append(kimage);
			var kname = $("<p class = 'battle-name text-center'>");
			kname.html(enemy_char.name);
			$(".enemy-img").append(kname);
			var khealth = $("<p class = 'battle-health text-center'>");
			khealth.html(enemy_char.health);
			$(".enemy-img").append(khealth);
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
				enemy_char.attackChar(naruto);
				enemy_char.attackChar(sasuke);
				$(".player-img p.battle-health").html(sasuke.health + naruto.health);
				$(".enemy-img p.battle-health").html(enemy_char.health);

			}else{

			}
			if (enemy_char.health <= 0){
				$("#atk-btn").remove();
				removed_char = enemy_char.name.toLowerCase();
				removeEnemy(enemy_char);
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
			$(".player-img").css("display","none");
			$(".enemy-img").css("display","none");
			$("#battle-text").css("display","none");
			$(".character-select").css("display","inline");
			$("#choose-text").css("display","block");
		});
		$(".enemy-img").delegate("#select_sasuke","click",function(){
			player_char = sasuke;
			$(".player-img").css("display","none");
			$(".enemy-img").css("display","none");
			$("#battle-text").css("display","none");
			$(".character-select").css("display","inline");
			$("#choose-text").css("display","block");
		});




})