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

// Choice of players
var narutoAttackIncrease = {1: 5, 2: 10, 3: 20, 4: 30, 5: 45};
var sasukeAttackIncrease = {1: 8, 2: 10, 3: 15, 4: 30, 5: 40};
var naruto = new Player("Naruto", 10, 50,narutoAttackIncrease);
var sasuke = new Player("Sasuke", 12, 50, sasukeAttackIncrease);





// Choice of support characters with their respective abilities
var sakura = new Support("Sakura", 2);
saukra.heal = function(player){
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


function attack(you, opponent){
	opponent.health -= you.attack;
}