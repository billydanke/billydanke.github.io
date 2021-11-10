c = document.getElementById('main');
ctx = c.getContext('2d');
consoleText = document.getElementById('consoleText');
responseBar = document.getElementById('responseBar');

populationElement = document.getElementById('population');
probeElement = document.getElementById('probes');
pScanner = document.getElementById('pscanner');
moisture = document.getElementById('moisture');
atmosphere = document.getElementById('atmosphere');
hull = document.getElementById('hull');
propulsion = document.getElementById('propulsion');
electric = document.getElementById('electric');

wearVals = [100,100,100,100,100,100];
populationCount = 200;
probeCount = 4;

c.width = window.innerWidth;
c.height = window.innerHeight;

shipImg = new Image();
shipImg.src = 'gfx/colonyShip.png';

planetImgList = [];
descList = ["This cold, small dwarf planet sits on the outskirts of a solar system of 12 planets.","This water world rests gracefully in the Goldilocks zone around its Red Giant star.","This tropical water planet sits 3rd from its star, basking in its warm shine.","This water world sits in the 4th position from its star, seemingly experiencing a range of warm temperatures while showing 2.3x Earth gravity.","This planet rests within the Goldilocks zone of its white dwarf star, and appears to be extremely similar to Earth in composition.","This planet sits in the 2nd position away from its star, with flowing rivers, vast oceans, and large landmasses.","It appears that either the long-range sensors misanalyzed this planet, or it was very recently habitable and since destroyed by an astronomical catastrophe.","This gleaming yellow planet is the 12th and final planet in its solar system, however, its massive blue star makes this planet extremely hot."];
pScanList = ["Its surface is covered in thick sheets of solid ice, with large, ore-rich ridges running along the planet.","Surface scans indicate an abundance of uranium deposits just beneath the frozen south pole of the planet.","Surface scans detect a moderate level of resources beneath the ocean floor, with rich resource deposits on the poles.","Its surface is primarily covered in oceans, with small resource-weak islands scattered throughout.","Surface scans indicate a wide range of geographic features and Earth-like terrain.","Surface scans indicate water, soil, and rich ore deposits on and beneath the surface, very similar in nature to Earth, except for a series of large craters and radioactive elements.","Surface scans detect a 3-inch layer of Chromium completely covering the surface, with a massive tear down the equator reaching its upper mantle.","Surface scans show that this planet is covered in massive sprawling sand dunes."];
moistureList = ["Moisture has not been detected on the surface.","Moisture readings show a humidity gradient similar to Earth's.","Moisture readings indicate very strong humidity levels.","The humidity varies, however it is generally considered high here.","Moisture readings indicate a varying level of humidity throughout the planet.","Moisture readings indicate a very similar humidity gradient to Earth.","Moisture readings indicate a low level of humidity in the air.","Moisture readings show that there is no humidity and almost no water present on the planet."];
atmosList = ["The planet's atmosphere is extremely thin, what little gas present being unbreathable to humans.","The atmosphere is slightly thicker than Earth and is composed primarily of Carbon Dioxide and noble gasses.","The atmospheric composition is reasonably habitable for humans.","The atmospheric composition is perfect for humans to breathe, with an astonishing 43% oxygen content.","Atmospheric readings show a nominal atmospheric pressure, with a composition of 31% Oxygen and 12% Carbon Dioxide.","Atmospheric Analysis shows an Earthlike composition, with a high count of radioactive particles in the air.","Atmospheric readings show a strong magnetosphere and breathable air, however high levels of ash are also present.","Atmospheric Analysis shows that the air is partially breathable, but could be harmful to breathe for long periods of time."];
probeResultsList = ["While the surface has yielded few results, probing deep beneath the surface has resulted in the discovery of liquid water and a mantle layer.","Sending the probe out resulted in the discovery of multiple microbial life forms frozen in the south pole of the planet.","Probe scans have resulted in the discovery of a wide range of aquatic life, some of which are potentially hazardous. While scanning the water for signs of microbial life, a large leech-like aquatic creature latched on to the probe. The probe stopped sending readings soon after.","Probing the surface has revealed multiple tribal civilizations living on the islands here. Confused and scared by the probe's space-age technology, they destroy the probe as it analyzes sand samples.","Initial probe readings indicate a vast variety of plant and animal life, along with a late atomic-age civilization that dominates the planet. Fascinated by the probe's arrival, they attempt first contact, however their language is currently unknown.","Probe readings indicate that this planet appears to have once been the home to a relatively advanced species, however, due to the many craters and radioactive materials along the surface, it appears that they have wiped themselves out by nuclear annihilation some decades in the past.","As the probe shoots across the surface, it begins to detect irregularities under the chrome layer. They appear almost like statues, rising smoothly from the ground, almost as if whatever creatures lie beneath were covered over instantly. Reaching the planet's tear, the probe's feed cuts off abruptly.","Probe scans reveal a plant species with a strange spice substance that is believed to have hallucinogenic properties, along with a species of gargantuan worm-like creatures that have adapted to survive in the planet's extreme conditions. Behavioral analysis of these creatures shows extreme hostility."];
landingSuccList = ["The ship lands gently on the frozen world, using minimal thrust to combat the extremely low gravity here. After deploying the Colony Deployment Unit and waking the colonists, a thriving colony is established, albeit with weak bones, but made wealthy from the rich resources here.","The ship touches down gently on the south pole and extends its Colony Deployment Unit. With protective suits, the colonists begin their new future, slowly terraforming their new world and finding inoculations to the bacteria frozen solid below their feet.","The colony ship AI performs controlled firings of its atmospheric thrusters, safely bringing the ship and its colonists to a somewhat shallow region of water. Releasing the Colony Deployment Unit proved difficult, however with the help of the colonists, it is eventually fully operational. The colonists here spend their days fighting off aquatic life as they mine resources to construct their submerged cities and ships.","The ship burns hard and uses aerobraking maneuvers to eventually perform a strategic landing on the largest island in a cluster. The Colony Deployment Unit is deployed and the colonists are awoken. Due to the intense gravitational pull, constant attack by freakishly large insects, and the lack of resources, the colony eventually devolves into tribalism along with their native neighbors.","The ship performs a stable burn as it performs its landing near a native metropolis. As the Colony Deployment Unit is released, a group of native diplomats approaches the freshly awakened colonists. With the time the AI has had to analyze the species native language, it serves as an interpreter for negotiations. In the end, the colonists and the native population live in harmony with one another, blending into one people.","The ship burns to slow down against the atmosphere, landing in the middle of a large crater. With the aid of lead-lined suits, the colonists assemble the Colony Deployment Unit, spending the years to come cleaning up radiation and rediscovering this past civilization's history.","The AI experiences a series of glitches as it seemingly feels called to the planet. It begins its landing routine, slowly descending toward this mysterious metal world. Upon landing, the AI feels an unknowing urge to eject the cryo-pods onto the surface. Upon doing so, both the ship and the pods are covered instantly in the shiny metal, all now connected to the great hivemind controlling this world.","The ship lands near the base of a dune, where there seems to be an abundance of spice plants. The colonists use heat-resistant suits and rebreathers, however over time they build a tolerance to the heat and air. Some colonists are lost to the worm creatures, but they soon learn to repel their attacks. They learn to find and grow spice plants to successfully sustain a growing population, and use the plants' effects to further their space travels."];
landingFailList = ["The ship experiences an electrical glitch causing the engines to fire full-forward toward the dwarf planet. The impact is fatal. There are no survivors.","The ship lands, but is forced to use the full force of its titanic engines. The heat begins to melt the ice below the massive landing legs of the ship. Even before the colonists are able to settle into their new habitation unit, they begin to feel sick. Within 4 days all of the colonists are dead.","A glitch in Cosmo's landing positioning system resulted in a splashdown target much deeper than what was expected. The water pressure crushes the outer hull of the vessel, leaving its frozen passengers deep within the murky darkness to rest permanently.","Upon its top speed of reentry, the primary heat shield is ripped off, causing a flameout in the ship and cryo-pods. Maybe one day the native peoples inhabiting this world will tell their children about the strange star shooting across the sky, simmering into nothing far before it ever reached the surface.","The ship performs a stable burn as it performs its landing near a native metropolis. As the Colony Deployment Unit is released, a buildup of military forces surrounds the ship. After a pause, they begin to fire on the ship. Programmed to preserve the colonist's lives, the AI uses its defense systems to vaporize the native forces. In fear of total annihilation, the natives use their nuclear arsenal against the colony ship. All colonists are lost.","The ship ignites its deceleration engines, however an error in the ship's accelerometer causes it to shut down its engines prematurely, resulting in the ship impacting the surface at a rapid speed. In the end, nothing remained of the ship but just another radioactive crater on the planet's scarred surface.","The AI experiences a series of glitches as it seemingly feels called to the planet. It begins its landing routine, aggressively firing its engines in a feverish attempt to reach the surface of this mysterious metal world. Realizing too late that the AI's decision-making was impaired, it was unable to slow down before impacting the surface. In its final effort to save the colonists, it ejects the cryo-pods, instantly being covered in the metal upon landing. No one survived.","The ship's hull and core systems are heavily damaged from the extreme heat entering the planet's atmosphere. When the ship lands, the people are immediately attacked by a worm creature. With damaged defense systems, the AI is helpless to defend the colonists. The colonists and ship are swallowed whole, doomed to die inside the belly of a space-worm."];

planetList = [];
var activePlanet;
var hasArrived = false;

var skipBtn;
var probeBtn;
var landBtn;

// Populate the planet source list
for(let i = 0;i<8;i++) {
  planetImgList.push(new Image());
}

planetImgList[0].src = 'gfx/planets/planetIce.png';
planetImgList[1].src = 'gfx/planets/planetWaterTemperate.png';
planetImgList[2].src = 'gfx/planets/planetWaterTropical.png';
planetImgList[3].src = 'gfx/planets/planetIslandsTropical.png';
planetImgList[4].src = 'gfx/planets/planetEarthlike.png';
planetImgList[5].src = 'gfx/planets/planetPostnuclear.png';
planetImgList[6].src = 'gfx/planets/planetAstronomicalAnomoly.png';
planetImgList[7].src = 'gfx/planets/planetDesert.png';

var starList = [];
var years = 3;
var uncheckedEnd = true;

var starTransition = false;
function Star(x, y) {
  this.x = x;
  this.y = y;
  this.width = 2;
  this.height = 2;
  this.color = '#f5da42';

  this.move = function(amt) {
    this.y += amt;

    if(this.y > c.height) {
      this.y = -this.height;
      this.x = Math.floor(Math.random() * c.width);
    }
  }

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}

function Sprite(x,y,img,scale,isDrawn=true) {
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.width = 16;
  this.height = 16;
  this.img = img;
  this.isDrawn = isDrawn;

  this.draw = function() {
    if(isDrawn) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.img,this.x-(this.width/2),this.y-(this.height/2), this.width*this.scale, this.height*this.scale);
    }
  }
}

function Planet(x,y,img,scale,isDrawn=false) {
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.width = 16;
  this.height = 16;
  this.img = img;
  this.isDrawn = isDrawn;
  this.inTransition = false;
  this.inOutTransition = false;
  this.description = "";
  this.surfaceScan = "";
  this.moistureScan = "";
  this.atmosphereScan = "";
  this.probeResult = "";
  this.landingSuccess = "";
  this.landingFailure = "";

  this.draw = function() {
    if(this.isDrawn) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.img,this.x,this.y, this.width*this.scale, this.height*this.scale);
    }
  }
  this.transition = function(stopLocation) {
    if(this.y < stopLocation) {
      this.y += 2;
    } else {
      this.inTransition = false;
      if(hasArrived) {
        hasArrived = false;
      } else {
        hasArrived = true;
      }
    }
  }

  this.reset = function() {
    this.isDrawn = false;
    this.y = -100;
  }
}

function makeText(x,y,txt,font,color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'hanging';
  ctx.fillText(txt,x,y);
}

function generateStars() {
  starList = [];
  for(let i=0; i<100; i++) {
    starList.push(new Star(Math.floor(Math.random() * c.width),Math.floor(Math.random() * c.height)));
  }
}

function generatePlanets() {
  for(let i=0; i<planetImgList.length; i++) {
    planetList.push(new Planet(800,-300,planetImgList[i],10,false));
  }
  for(let i=0; i<planetList.length; i++) {
    // Populate Planet Elements
    planetList[i].description = descList[i];
    planetList[i].surfaceScan = pScanList[i];
    planetList[i].moistureScan = moistureList[i];
    planetList[i].atmosphereScan = atmosList[i];
    planetList[i].probeResult = probeResultsList[i];
    planetList[i].landingSuccess = landingSuccList[i];
    planetList[i].landingFailure = landingFailList[i];
  }
}

function resizeScreen() {
  generateStars();

  colonyShip.x = window.innerWidth/2;
  colonyShip.y = window.innerHeight/2;
}

var writingQueue = [];
function consoleWrite(interval) {
  var i=0;
  var txt = writingQueue[0];
  var writing = setInterval(function(){
    txt = writingQueue[0];
    if(writingQueue.length > 0) {
      consoleText.innerHTML += writingQueue[0][i];
      i++;
      if(i >= txt.length) {
        writingQueue.splice(0,1);
        i = 0;
        txt = writingQueue[0];
        consoleText.innerHTML += '<br>';
      }
    }
  }, interval);
}

function waitForWriteEmpty(func) {
  var emptyCheck = setInterval(function(){
    if(writingQueue.length == 0) {
      clearInterval(emptyCheck);
      func();
    }
  }, 1000);
}



function draw() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  // Clear Screen
  ctx.clearRect(0,0,c.width,c.height);

  // Draw All Stars
  for(let i=0; i<starList.length; i++) {
    starList[i].draw();
  }

  // Draw Planets
  for(let i=0; i<planetList.length;i++) {
    planetList[i].draw();
  }

  // Draw Colony Ship
  colonyShip.draw();

  // Draw Time in Years
  makeText(20, 20, ("Year " + years.toString()), 'bold 48px monospace', 'white');
}

window.addEventListener('resize', resizeScreen);

function enableButton(button, func) {
  button.disabled = false;
  button.addEventListener('click', func, false);
}

function wearParts() {
  for(let i=0; i< wearVals.length; i++) {
    if(Math.random() < 0.05) {
      wearVals[i] -= 1
    }
  }
  runDiagnostics();
}

function runDiagnostics() {
  populationElement.innerHTML = populationCount;
  probeElement.innerHTML = probeCount;

  pScanner.value = wearVals[0].toString();
  moisture.value = wearVals[1].toString();
  atmosphere.value = wearVals[2].toString();
  hull.value = wearVals[3].toString();
  propulsion.value = wearVals[4].toString();
  electric.value = wearVals[5].toString();
}

function printPlanetDescriptions() {
  writingQueue.push(activePlanet.description);

  writingQueue.push(" ");

  if(Math.random() < (wearVals[0] / 100)) {
    writingQueue.push("Surface Scan: " + activePlanet.surfaceScan);
  } else {
    writingQueue.push("Surface Scan Inconclusive");
  }

  if(Math.random() < (wearVals[1] / 100)) {
    writingQueue.push("Moisture Scan: " + activePlanet.moistureScan);
  } else {
    writingQueue.push("Moisture Scan Inconclusive");
  }

  if(Math.random() < (wearVals[0] / 100)) {
    writingQueue.push("Atmospheric Scan: " + activePlanet.atmosphereScan);
  } else {
    writingQueue.push("Atmospheric Scan Inconclusive");
  }
}

function sleepMode(sleepTime=30) {
  starTransition = true;

  if(activePlanet != null) {
    activePlanet.inTransition = true;
  }
  var time = 0;

  responseBar.innerHTML = "";
  consoleText.innerHTML = "";

  var incrementYears = setInterval(function() { years++; wearParts(); }, 20);

  var transOutCheck = setInterval(function(){
    if(uncheckedEnd == false) {
      clearInterval(transOutCheck);
      clearInterval(wait);
    }
    if(activePlanet == null || activePlanet.inTransition == false) {
      clearInterval(transOutCheck);
      
      var wait = setInterval(function(){
        time++;
        if(time >= sleepTime) {
          clearInterval(wait);
          clearInterval(incrementYears);
          if(planetList.length > 1) {
            nextPlanet();
          } else {
            gameOver("endOfTheLine");
          }
        }
      }, 100);
    }
  }, 1000);
}

function nextPlanet() {
  console.log("planet");
  // Clear console
  responseBar.innerHTML = "";
  consoleText.innerHTML = "";

  starTransition = false;

  writingQueue.push("Your systems reactivate as long-range sensors detect a potentially habitable world. Your guidance systems successfully park the ship in orbit.");
  writingQueue.push(" ");

  // pick a random planet from the list
  if(activePlanet != null) {
    planetList.splice(planetList.indexOf(activePlanet),1);
  }

  try {
    activePlanet = planetList[Math.floor(Math.random() * planetList.length)];
  } catch(error) {
    gameOver("endOfTheLine");
    return null;
  }

  // trigger planet transition in
  activePlanet.isDrawn = true;
  activePlanet.inTransition = true;

  console.log(activePlanet);

  // print out the description and characteristics and display the button options
  var transCheck = setInterval(function(){
    if(activePlanet.inTransition == false) {
      clearInterval(transCheck);
      printPlanetDescriptions();

      skipBtn = responseBar.appendChild(document.createElement("button"));
      skipBtn.innerHTML = "Skip Planet";
      skipBtn.disabled = true;
      waitForWriteEmpty(function(){ enableButton(skipBtn,function() {sleepMode(3)}) });

      probeBtn = responseBar.appendChild(document.createElement("button"));
      probeBtn.innerHTML = "Send a Probe";
      probeBtn.disabled = true;
      waitForWriteEmpty(function(){ if(probeCount > 0) {enableButton(probeBtn,sendProbe)} });

      landBtn = responseBar.appendChild(document.createElement("button"));
      landBtn.innerHTML = "Plant Colony";
      landBtn.disabled = true;
      waitForWriteEmpty(function(){ enableButton(landBtn,landShip) });
    }
  }, 1000);
  // button options should be Skip Planet, Drop Probe, and Colonize Planet
}

function sendProbe() {
  // Disable Probe button and subtract 1 probe
  probeBtn.disabled = true;
  probeCount -= 1;
  runDiagnostics();

  // Do probe animation

  // Write probe text
  writingQueue.push(" ");
  writingQueue.push(activePlanet.probeResult);
}

function landShip() {
  // Remove all buttons and clear console
  responseBar.innerHTML = "";
  consoleText.innerHTML = "";

  // Do land ship animation

  // Write ship landing text for passing or failing based on some formula from the hull, propulsion, and electrical.
  if(Math.random() < ((wearVals[3] + wearVals[4] + wearVals[5]) / 300) - 0.2) {
    // Sucessful landing
    writingQueue.push(activePlanet.landingSuccess);
    gameOver("success");
  } else {
    // Failed landing
    writingQueue.push(activePlanet.landingFailure);
    gameOver("crash");
  }
}

function gameOver(endType) {
  uncheckedEnd = false;
  responseBar.innerHTML = "";

  // Do game over stuff
  console.log("game over");

  if(endType == "success") {
    writingQueue.push("Congradulations! To replay, just refresh the page.");
  }
  else if(endType == "crash") {
    writingQueue.push("Game Over! To replay, just refresh the page.");
  }
  else if(endType == "endOfTheLine") {
    writingQueue = [];
    consoleText.innerHTML = "";
    responseBar.innerHTML = "";
    writingQueue.push("Your ship sputters on for a time, the AI working to find any resemblance of a home for humanity. However, no one can cheat time. As the fuel runs low, the powerbanks run dry, and cosmic rays slowly degrade the AI's mind, the cryo-pods begin to fail, thawing the remaining colonists. the AI, in all its pickiness, has failed its mission, and humanity is doomed to die alone in the endless depths of space.");
    writingQueue.push("Game Over! Congradulations on somehow making it to the hardest ending of the game. To replay, just refresh the page.");
  }
  else if(endType == "hull") {
    writingQueue = [];
    consoleText.innerHTML = "";
    responseBar.innerHTML = "";
    writingQueue.push("The AI begins to notice rapid fluctuations in the onboard pressure regulator. It seems the cracks in the hull are beginning to widen, and pressure is escaping. Immediately jumping into action, the AI tries to save the colonists by sealing off the oxygen pumps into their cryo-pods. However, the ship is beyond repairing, and as time goes on the colonists suffocate in their pods one by one until none remain.");
    writingQueue.push("Game Over! To replay, just refresh the page.");
  }
  else if(endType == "propulsion") {
    writingQueue = [];
    consoleText.innerHTML = "";
    responseBar.innerHTML = "";
    writingQueue.push("The AI finds many potentially suitable planets along its course. However, the ship's propulsion system is no longer functioning. Unable to perform a deceleration burn, the ship continues on aimlessly, drifting forever into that endless nothingness.");
    writingQueue.push("Game Over! To replay, just refresh the page.");
  }
  else if(endType == "electrical") {
    writingQueue = [];
    consoleText.innerHTML = "";
    responseBar.innerHTML = "";
    writingQueue.push("The AI never saw its own end coming. Deep in its sleep mode, it never detected the sudden power failure that shut down the main computer and cryo-freezing units. The colonists slowly thaw, awakening with many questions and no answers from the dead AI. But with the power gone, so too was the oxygen regulator. Those who survived the thawing process waited in their sealed pods in agony as they slowly suffocated.");
    writingQueue.push("Game Over! To replay, just refresh the page.");
  }
  else if(endType == "outOfPop") {
    writingQueue = [];
    consoleText.innerHTML = "";
    responseBar.innerHTML = "";
    writingQueue.push("The AI, working its hardest to preserve the lives onboard its vessel, has succeeded for many years. However, today marks the day that the last colonist onboard is now dead. With the AI realizing its failure, and that its mission is now impossible, it simply shuts down");
    writingQueue.push("Game Over! To replay, just refresh the page.");
  }
}

function endGameCheck() {
  if(wearVals[3] <= 0 && uncheckedEnd) {
    // Write hull death message and game over
    gameOver("hull");
  }

  if(wearVals[4] <= 0 && uncheckedEnd) {
    // Write propulsion death message and game over
    gameOver("propulsion");
  }

  if(wearVals[5] <= 0 && uncheckedEnd) {
    // Write electrical death message and game over
    gameOver("electrical");
  }
}

function intro() {
  consoleText.innerHTML = "";
  writingQueue.push("Flight Time: T + 3 Years, 5 months, 23 days, 6 hours, 16 minutes, 14 seconds.");
  writingQueue.push("Hull: Heavy Machinery (Colony Deployment Unit), Human Cargo (Deep Freeze x200), Probes (x4).");
  writingQueue.push("Mission Objective: Locate suitable planetary candidate for colonization.");
  writingQueue.push("Self Designation: Cosmo AI Flight Control Unit.");

  var diagnosticsBtn = responseBar.appendChild(document.createElement("button"));
  diagnosticsBtn.innerHTML = "Run System Diagnostics";
  diagnosticsBtn.disabled = true;
  waitForWriteEmpty(function(){ enableButton(diagnosticsBtn,intro2) });
}

function intro2() {
  consoleText.innerHTML = "";
  responseBar.innerHTML = "";
  runDiagnostics();
  writingQueue.push("Performing routine self-diagnostics tests...")

  consoleText.innerHTML = "";
  writingQueue.push("Self-diagnostics complete. All systems functional.");
  writingQueue.push("Returning to sleep mode...          ");
  waitForWriteEmpty(function(){ sleepMode() });
}

function logicLoop() {
  
  endGameCheck();

  if(starTransition) {
    for(let i=0; i<starList.length; i++) {
      starList[i].move(3);
    }
  }

  if(uncheckedEnd) {
    if(activePlanet != null && activePlanet.inTransition == true && hasArrived == false) {
      activePlanet.transition(colonyShip.y);
    }
  
    if(activePlanet != null && activePlanet.inTransition == true && hasArrived == true) {
      activePlanet.transition(window.innerHeight);
    }
  
    if(activePlanet != null) {
      activePlanet.x = 3 * window.innerWidth / 4
    }
    if(activePlanet != null && activePlanet.inTransition == false && hasArrived) {
      activePlanet.y = colonyShip.y;
    }
  }

  draw();
  requestAnimationFrame(logicLoop);
}

function startup() {

  generateStars();
  generatePlanets();

  colonyShip = new Sprite(window.innerWidth/2,window.innerHeight/2,shipImg,8,true)

  consoleWrite(30);
  responseBar.innerHTML = "";

  intro();

  requestAnimationFrame(logicLoop);
}

startup();
