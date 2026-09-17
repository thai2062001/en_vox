import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper hàm delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cấu trúc 110 câu được phân vai, chuẩn hóa phát âm và chỉ định tốc độ/người đọc
export const PRODUCTION_PLAN = [
  // Scene 1: Introduction (7:00 AM)
  {
    lineNum: 1,
    segments: [
      { text: "Imagine waking up at seven AM on a crisp Tuesday morning in a peaceful suburb, stretching your arms, and getting ready for what you think is just another ordinary workday.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 2,
    segments: [
      { text: "You walk into the bathroom, look in the mirror, and think to yourself:", voice: "am_adam", speed: 1.0 },
      { text: "Looking pretty sharp today, champ.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 3,
    segments: [
      { text: "Little do you know, a bizarre supernatural phenomenon silently swept across the entire globe overnight.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 4,
    segments: [
      { text: "Every single human being on Earth has been completely stripped of their ability to tell white lies for the next twenty-four hours.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 5,
    segments: [
      { text: "And it comes with one terrifying, non-negotiable rule: Whenever someone asks you a question, your brain instantly forces your mouth to blurt out your rawest, unfiltered thoughts!", voice: "am_adam", speed: 1.02 }
    ]
  },
  {
    lineNum: 6,
    segments: [
      { text: "No dodging the question, no awkward subject changes, and zero polite social buffers.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 7,
    segments: [
      { text: "Every word spoken by eight billion people must be one hundred percent brutal, unpolished truth.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 8,
    segments: [
      { text: "Have you ever wondered what would happen if modern society suddenly lost the diplomatic grease that keeps civilized human interaction from collapsing?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 9,
    segments: [
      { text: "Get ready for twenty-four hours of pure, unadulterated chaos as families, corporate boardrooms, live morning television, and romantic dinner dates implode into complete anarchy!", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 10,
    segments: [
      { text: "The nightmare begins right at seven fifteen AM at your kitchen breakfast table.", voice: "am_adam", speed: 1.0 }
    ]
  },
  // Scene 2: Breakfast with Family
  {
    lineNum: 11,
    segments: [
      { text: "Your mom walks over with a proud smile, placing a plate of rock-hard, blackened pancakes on the table and asking:", voice: "am_adam", speed: 1.0 },
      { text: "How do the homemade pancakes look, boys?", voice: "af_heart", speed: 1.05 }
    ]
  },
  {
    lineNum: 12,
    segments: [
      { text: "Under normal circumstances, your dad—a man with twenty-five years of seasoned survival experience in marriage—would smile lovingly and say:", voice: "am_adam", speed: 1.0 },
      { text: "Honey, your cooking is always wonderful.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 13,
    segments: [
      { text: "Instead, your dad’s jaw violently twitches, his eyes widen in sheer horror, and to his absolute panic, he boldly declares:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 14,
    segments: [
      { text: "Honestly, Susan, this looks like radioactive fallout from a nuclear disaster, and I would literally rather eat mulch from the front yard than swallow this bitter charcoal!", voice: "am_adam", speed: 1.1 }
    ]
  },
  {
    lineNum: 15,
    segments: [
      { text: "A dead, suffocating silence instantly blankets the kitchen—so quiet you could hear a pin drop on the hardwood floor.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 16,
    segments: [
      { text: "Your mom freezes in place, horrified, then slowly turns her gaze toward you for backup.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 17,
    segments: [
      { text: "Before you can stop yourself, your vocal cords betray you with an absolute fatality:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 18,
    segments: [
      { text: "I’ve hated your cooking since I was six years old, mom, and I only pretend to love it so you don't assign me extra weekend chores!", voice: "am_adam", speed: 1.12 }
    ]
  },
  {
    lineNum: 19,
    segments: [
      { text: "Boom! A picture-perfect suburban family brought to the brink of emotional collapse in less than thirty seconds of breakfast!", voice: "am_adam", speed: 1.05 }
    ]
  },
  // Scene 3: Neighbor Mrs. Higgins
  {
    lineNum: 20,
    segments: [
      { text: "You panic, grab your backpack, and sprint out the front door straight toward the apartment elevator to escape.", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 21,
    segments: [
      { text: "The doors slide open, and your neighbor Mrs. Higgins steps in, rocking a freshly permed, frizzy hairdo.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 22,
    segments: [
      { text: "She beams at you and asks:", voice: "am_adam", speed: 1.0 },
      { text: "Do you like my new haircut, dear? Don't you think it makes me look ten years younger?", voice: "af_bella", speed: 1.0 }
    ]
  },
  {
    lineNum: 23,
    segments: [
      { text: "You clamp your lips together with all your might, but the truth shoots out like a rocket:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 24,
    segments: [
      { text: "You look like a wet poodle that got stuck in an industrial leaf blower, and it easily adds nine and a half years to your face!", voice: "am_adam", speed: 1.1 }
    ]
  },
  {
    lineNum: 25,
    segments: [
      { text: "The elevator hits the ground floor, and you bolt into the street like an Olympic sprinter while Mrs. Higgins shrieks in absolute fury behind you.", voice: "am_adam", speed: 1.05 }
    ]
  },
  // Scene 4: Starbucks Drive-thru
  {
    lineNum: 26,
    segments: [
      { text: "Desperate to steady your nerves, you pull up to your neighborhood coffee shop to grab an iced Americano.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 27,
    segments: [
      { text: "The cheerful barista at the drive-thru window smiles:", voice: "am_adam", speed: 1.0 },
      { text: "Good morning! How are you doing today?", voice: "am_michael", speed: 1.05 }
    ]
  },
  {
    lineNum: 28,
    segments: [
      { text: "Now, in American culture, the sacred universal response is always:", voice: "am_adam", speed: 1.0 },
      { text: "Good, how are you?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 29,
    segments: [
      { text: "Instead, your mouth instantly fires back:", voice: "am_adam", speed: 1.0 },
      { text: "I have four dollars and seventeen cents in my checking account, I just emotionally destroyed my entire family, and I am in a state of profound existential dread.", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 30,
    segments: [
      { text: "The barista nods with terrifying sincerity and replies:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 31,
    segments: [
      { text: "I feel that, man. To be completely honest, our espresso is just burnt commercial beans that we mark up eight hundred percent, and that five-dollar pastry in the glass display case was defrosted in a microwave three days ago.", voice: "am_michael", speed: 1.05 }
    ]
  },
  {
    lineNum: 32,
    segments: [
      { text: "You hand over your credit card in stunned silence, grab your overpriced burnt coffee, and speed away into morning rush hour.", voice: "am_adam", speed: 1.0 }
    ]
  },
  // Scene 5: Corporate Office Meeting (8:30 AM)
  {
    lineNum: 33,
    segments: [
      { text: "By eight thirty AM, you arrive at your corporate office, praying work will provide a safe haven of professional boundaries.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 34,
    segments: [
      { text: "Big mistake!", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 35,
    segments: [
      { text: "You walk straight into the Q-three cross-functional strategy meeting on the fourteenth floor.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 36,
    segments: [
      { text: "The Vice President of Marketing clicks to a slide overflowing with meaningless corporate buzzwords and asks:", voice: "am_adam", speed: 1.0 },
      { text: "So, what do you think of our Q-three synergy roadmap for cross-functional alignment?", voice: "am_eric", speed: 1.05 }
    ]
  },
  {
    lineNum: 37,
    segments: [
      { text: "You grip the edges of your conference chair, but your mouth betrays you instantly in front of the entire executive leadership team:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 38,
    segments: [
      { text: "With all due respect, I've just been nodding along for the past forty-five minutes to look engaged. These thirty-two slides are complete corporate gibberish, and my golden retriever walking across a keyboard could produce a better business model.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 39,
    segments: [
      { text: "Before the Vice President can erupt in anger, the Senior Human Resources Director, Karen, pushes her glasses up her nose and cuts him off:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 40,
    segments: [
      { text: "Don't bother threatening him, Dave. You are an incompetent narcissist who constantly takes credit for other people's work, and we only hired you because your second cousin is on the board of directors!", voice: "af_sarah", speed: 0.98 }
    ]
  },
  {
    lineNum: 41,
    segments: [
      { text: "Within five minutes, the entire department dissolves into chaos, with colleagues openly confessing who stole lunches from the breakroom fridge and who fakes working from home!", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 42,
    segments: [
      { text: "Your manager sprints out the door, yelling at you:", voice: "am_adam", speed: 1.05 },
      { text: "Are you taking a sick day?", voice: "am_eric", speed: 1.1 }
    ]
  },
  {
    lineNum: 43,
    segments: [
      { text: "And you yell back without hesitation:", voice: "am_adam", speed: 1.05 },
      { text: "No, I'm just sick and tired of looking at your face, and I want to go home and lie in bed watching YouTube videos!", voice: "am_adam", speed: 1.15 }
    ]
  },
  // Scene 6: Media & Live TV
  {
    lineNum: 44,
    segments: [
      { text: "You flee the office building and sit on a public bench in the downtown plaza, pulling out your smartphone to check what is happening across the country.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 45,
    segments: [
      { text: "The entire internet is experiencing a historic, catastrophic meltdown!", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 46,
    segments: [
      { text: "On live morning television, the lead news anchor looks straight into the camera, abandons the teleprompter, and announces with a forced grin:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 47,
    segments: [
      { text: "Today's breaking report claiming the financial markets are stabilizing is actually just a pre-written script sent by our corporate sponsors. We have absolutely no clue what is happening, and frankly, I stopped caring about journalism six years ago.", voice: "am_eric", speed: 1.02 }
    ]
  },
  {
    lineNum: 48,
    segments: [
      { text: "His co-anchor turns to him and cheerfully adds on live national television:", voice: "am_adam", speed: 1.0 },
      { text: "And your toupee looks ridiculously fake under the studio lights, Tom!", voice: "af_nicole", speed: 1.05 }
    ]
  },
  {
    lineNum: 49,
    segments: [
      { text: "Commercial breaks are equally brutal.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 50,
    segments: [
      { text: "A skincare influencer promoting an anti-aging cream suddenly looks into her ring light and blurts out:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 51,
    segments: [
      { text: "Honestly, this eighty-dollar jar of moisturizer doesn't do anything for wrinkles. It's just scented mineral oil. I spend fifteen thousand dollars a month on cosmetic surgery and use heavy video filters!", voice: "af_heart", speed: 1.05 }
    ]
  },
  {
    lineNum: 52,
    segments: [
      { text: "Her live stream instantly cuts to a black screen.", voice: "am_adam", speed: 0.95 }
    ]
  },
  // Scene 7: Daily Services (Dentist, Barber, Mechanics)
  {
    lineNum: 53,
    segments: [
      { text: "Every service industry across the city is collapsing under unfiltered reality.", voice: "am_adam", speed: 1.02 }
    ]
  },
  {
    lineNum: 54,
    segments: [
      { text: "At a local dental clinic, a dentist holding a massive syringe looks at a terrified patient and admits:", voice: "am_adam", speed: 1.0 },
      { text: "I have to be completely honest with you: this needle is going to hurt like hell, and my hands are shaking like crazy because I drank five double-shot espressos this morning.", voice: "am_eric", speed: 1.05 }
    ]
  },
  {
    lineNum: 55,
    segments: [
      { text: "Down the block at a luxury barbershop, a customer stares at his freshly trimmed hair in dismay and asks:", voice: "am_adam", speed: 1.0 },
      { text: "Is this haircut supposed to look this uneven?", voice: "am_michael", speed: 1.0 }
    ]
  },
  {
    lineNum: 56,
    segments: [
      { text: "The barber sighs, crosses his arms, and deadpans:", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 57,
    segments: [
      { text: "Brother, the problem isn't my scissors—the fundamental problem is the genetics of your face. No haircut on Earth can fix that, and you're still going to look like a raw, half-peeled potato.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 58,
    segments: [
      { text: "Across town at an auto repair garage, a mechanic looks at a nervous car owner and admits:", voice: "am_adam", speed: 1.0 },
      { text: "Your engine just needed an eight-dollar fuse, but I told you it was the catalytic converter so I could charge you nine hundred dollars for my boat payment.", voice: "am_eric", speed: 1.05 }
    ]
  },
  // Scene 8: Afternoon Dating & Relationships (2:00 PM)
  {
    lineNum: 59,
    segments: [
      { text: "By two PM, the social catastrophe spreads into modern romance and dating.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 60,
    segments: [
      { text: "At an upscale Italian bistro, two young singles are on their first date through a dating app.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 61,
    segments: [
      { text: "The guy leans across the table, trying to charm his date, and asks:", voice: "am_adam", speed: 1.0 },
      { text: "So, what made you swipe right on my profile?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 62,
    segments: [
      { text: "The girl takes a sip of wine and answers without blinking:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 63,
    segments: [
      { text: "Your photos were clearly taken four years and twenty-five pounds ago, but my ex got engaged this morning on Instagram, and I was so deeply desperate for human validation that I agreed to go out with literally anyone with a pulse.", voice: "af_bella", speed: 1.05 }
    ]
  },
  {
    lineNum: 64,
    segments: [
      { text: "The guy smiles coldly and replies:", voice: "am_adam", speed: 1.0 },
      { text: "That works out great, because I brought you to this specific restaurant only because I have a half-off coupon expiring at midnight, and I plan to pretend I forgot my wallet when the check arrives!", voice: "am_michael", speed: 1.05 }
    ]
  },
  {
    lineNum: 65,
    segments: [
      { text: "Two tables over, a married couple celebrating their tenth anniversary hits an iceberg.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 66,
    segments: [
      { text: "The wife twirls her floral dress and asks:", voice: "am_adam", speed: 1.0 },
      { text: "Do you think this dress makes me look classy?", voice: "af_heart", speed: 1.0 }
    ]
  },
  {
    lineNum: 67,
    segments: [
      { text: "Her husband gulps in terror, clutches his throat, but his mouth blurts out:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 68,
    segments: [
      { text: "It makes you look like a vintage floral sofa from a thrift store, and every time you laugh loudly in public, I pretend I'm sitting alone!", voice: "am_michael", speed: 1.1 }
    ]
  },
  {
    lineNum: 69,
    segments: [
      { text: "A glass of red wine flies across the table in record speed.", voice: "am_adam", speed: 1.05 }
    ]
  },
  // Scene 9: Evening & Law Enforcement
  {
    lineNum: 70,
    segments: [
      { text: "As the sun begins to set over the city, the chaos migrates to the highways.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 71,
    segments: [
      { text: "A highway patrol officer pulls over a speeding sports car on the interstate.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 72,
    segments: [
      { text: "The officer rests his hand on his belt and asks:", voice: "am_adam", speed: 1.0 },
      { text: "Do you have any idea how fast you were going, son?", voice: "am_eric", speed: 1.0 }
    ]
  },
  {
    lineNum: 73,
    segments: [
      { text: "The driver stares straight ahead and answers:", voice: "am_adam", speed: 1.0 },
      { text: "Yes, officer, I was doing ninety-five miles per hour because I was rocking out to my favorite pop song, and I didn't slow down because I thought your squad car was an empty construction vehicle!", voice: "am_adam", speed: 1.08 }
    ]
  },
  {
    lineNum: 74,
    segments: [
      { text: "The officer pulls out his ticket book and replies with brutal honesty:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 75,
    segments: [
      { text: "To be fair, I only pulled you over because my shift ends in twenty minutes and I need one more speeding ticket to hit my monthly quota so my captain doesn't yell at me!", voice: "am_eric", speed: 1.05 }
    ]
  },
  {
    lineNum: 76,
    segments: [
      { text: "They exchange the ticket in dead silence with mutual, unspoken respect.", voice: "am_adam", speed: 0.98 }
    ]
  },
  // Scene 10: Late Night Realization & Chaos (11:00 PM)
  {
    lineNum: 77,
    segments: [
      { text: "By eleven PM, the entire world has grown eerily quiet.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 78,
    segments: [
      { text: "People have barricaded themselves inside their houses, turning off their phones, unplugging their smart speakers, and refusing to speak to another human being.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 79,
    segments: [
      { text: "Nobody dares ask a question, knowing that a single innocent inquiry could permanently end a marriage, a career, or a lifelong friendship.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 80,
    segments: [
      { text: "You sit alone in the dark on your living room sofa, staring at the digital clock on your microwave ticking toward midnight.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 81,
    segments: [
      { text: "You turn on the television on mute, watching breaking news feeds of deserted city streets and global summits canceled worldwide.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 82,
    segments: [
      { text: "And then, sitting in the silence of your living room, a profound realization washes over you.", voice: "am_adam", speed: 0.96 }
    ]
  },
  {
    lineNum: 83,
    segments: [
      { text: "White lies aren't inherently evil.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 84,
    segments: [
      { text: "They are the invisible social shock absorbers of the civilized world.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 85,
    segments: [
      { text: "When you tell your coworker their presentation was great, you aren't trying to deceive them—you're protecting their dignity and fragile confidence.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 86,
    segments: [
      { text: "When you tell your grandmother her holiday fruitcake is delicious, you are honoring her love, effort, and care, not grading a pastry.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 87,
    segments: [
      { text: "When you tell a friend you're on your way when you're just putting your shoes on, you're offering polite reassurance that they matter to you.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 88,
    segments: [
      { text: "Total, unvarnished honesty without empathy is not virtue—it is pure cruelty disguised as truth.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 89,
    segments: [
      { text: "Human society is built on a delicate foundation of kindness, patience, and selective silence.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 90,
    segments: [
      { text: "The clock ticks to eleven fifty-nine fifty-eight PM.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 91,
    segments: [
      { text: "Three... two... one.", voice: "am_adam", speed: 0.92 }
    ]
  },
  {
    lineNum: 92,
    segments: [
      { text: "Midnight strikes.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 93,
    segments: [
      { text: "The twenty-four-hour curse lifts like a morning fog.", voice: "am_adam", speed: 0.98 }
    ]
  },
  // Scene 11: The Morning After & Resolution
  {
    lineNum: 94,
    segments: [
      { text: "The next morning at seven AM, you slowly walk back into the kitchen.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 95,
    segments: [
      { text: "Your mom is standing by the stove, holding a fresh plate of slightly overcooked scrambled eggs.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 96,
    segments: [
      { text: "Your dad is sitting stiffly at the table, clutching his mug with white knuckles.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 97,
    segments: [
      { text: "Your mom looks at both of you with cautious eyes and softly asks:", voice: "am_adam", speed: 0.98 },
      { text: "How do the eggs taste, sweetheart?", voice: "af_heart", speed: 0.98 }
    ]
  },
  {
    lineNum: 98,
    segments: [
      { text: "Your dad takes a bite, swallows, and with a warm, genuine smile, he says:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 99,
    segments: [
      { text: "They're absolutely delicious, honey. Best eggs you've ever made.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 100,
    segments: [
      { text: "You take a forkful, look your mom in the eyes, and nod:", voice: "am_adam", speed: 1.0 },
      { text: "Yeah, mom. They're perfect.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 101,
    segments: [
      { text: "Your mom smiles, the tension in the room instantly melts away, and warmth returns to the family home.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 102,
    segments: [
      { text: "Civilization is officially saved.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 103,
    segments: [
      { text: "Not because humanity became perfect, but because we remembered the immense power of tact and compassion.", voice: "am_adam", speed: 0.95 }
    ]
  },
  // Scene 12: Moral & Call to Action
  {
    lineNum: 104,
    segments: [
      { text: "Sometimes, a small white lie is not a deception at all—it is the kindest gift you can offer someone you love.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 105,
    segments: [
      { text: "Now it's your turn to be honest with me.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 106,
    segments: [
      { text: "If you woke up tomorrow in a world where white lies were impossible, what is the single most dangerous truth you would be terrified of blurting out?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 107,
    segments: [
      { text: "Would you confess your true feelings to your boss, your partner, or your best friend?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 108,
    segments: [
      { text: "Drop your unfiltered answers in the comments below—don't worry, your secret is safe with us!", voice: "am_adam", speed: 1.02 }
    ]
  },
  {
    lineNum: 109,
    segments: [
      { text: "If you enjoyed this wild thought experiment, hit that Like button, subscribe to the channel, and ring the notification bell so you never miss another deep dive into human nature.", voice: "am_adam", speed: 1.02 }
    ]
  },
  {
    lineNum: 110,
    segments: [
      { text: "Thank you for watching, stay kind to one another, and we will see you in the next story!", voice: "am_adam", speed: 0.98 }
    ]
  }
];

// Helper để tạo silence buffer (16-bit PCM, mono, 24kHz)
function createSilenceBuffer(durationMs, sampleRate = 24000) {
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);
  return Buffer.alloc(numSamples * 2); // 2 bytes per 16-bit sample
}

// Helper để ghép các chunk WAV (giữ header WAV của file đầu tiên và cập nhật size)
function concatenateWavBuffers(buffers) {
  if (!buffers || buffers.length === 0) return Buffer.alloc(0);
  if (buffers.length === 1) return buffers[0];

  const pcmChunks = [];
  let header = null;

  for (const buf of buffers) {
    if (buf.length >= 44 && buf.toString("ascii", 0, 4) === "RIFF") {
      if (!header) {
        header = Buffer.from(buf.subarray(0, 44));
      }
      pcmChunks.push(buf.subarray(44));
    } else {
      // Raw PCM buffer (ví dụ buffer silence)
      pcmChunks.push(buf);
    }
  }

  const allPcm = Buffer.concat(pcmChunks);
  const totalLength = 44 + allPcm.length;
  const newHeader = Buffer.alloc(44);
  header.copy(newHeader);

  newHeader.writeUInt32LE(totalLength - 8, 4); // ChunkSize
  newHeader.writeUInt32LE(allPcm.length, 40);  // Subchunk2Size

  return Buffer.concat([newHeader, allPcm]);
}

// Pipeline sản xuất toàn bộ Audio
async function runProduction() {
  console.log("=== BẮT ĐẦU SẢN XUẤT AUDIO CHO SCRIPT: NO WHITE LIES ===");
  console.log(`Tổng số câu cần sản xuất: ${PRODUCTION_PLAN.length}`);

  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const generatedFiles = [];

  for (let i = 0; i < PRODUCTION_PLAN.length; i++) {
    const plan = PRODUCTION_PLAN[i];
    const fileNum = String(plan.lineNum).padStart(3, "0");
    const fileName = `line_${fileNum}.wav`;
    const targetPath = path.join(outputDir, fileName);

    const finalLineWavPath = path.join(outputDir, fileName);

    // Kiểm tra nếu file line_xxx.wav đã tồn tại và hợp lệ (> 1KB) thì bỏ qua để resume
    if (fs.existsSync(finalLineWavPath) && fs.statSync(finalLineWavPath).size > 1024) {
      console.log(`\n[${i + 1}/${PRODUCTION_PLAN.length}] ⏭️ Bỏ qua ${fileName} (Đã render sẵn).`);
      generatedFiles.push(finalLineWavPath);
      continue;
    }

    console.log(`\n[${i + 1}/${PRODUCTION_PLAN.length}] Đang xử lý ${fileName} (Số phân đoạn thoại: ${plan.segments.length})...`);

    const segmentBuffers = [];

    for (let sIdx = 0; sIdx < plan.segments.length; sIdx++) {
      const seg = plan.segments[sIdx];
      console.log(`  -> Đoạn ${sIdx + 1}: Voice [${seg.voice}] | Speed [${seg.speed}] | "${seg.text.substring(0, 45)}..."`);

      let retry = 0;
      let success = false;
      let audioBuf = null;

      while (retry < 3 && !success) {
        try {
          audioBuf = await synthesizeSpeech(seg.text, seg.voice, seg.speed);
          success = true;
        } catch (err) {
          retry++;
          console.warn(`    ⚠️ Lỗi khi render đoạn ${sIdx + 1} (thử lại lần ${retry}/3):`, err.message);
          await sleep(2000);
        }
      }

      if (!success || !audioBuf) {
        throw new Error(`Không thể render đoạn thoại cho câu ${plan.lineNum}`);
      }

      segmentBuffers.push(audioBuf);

      // Nếu câu có nhiều phân đoạn thoại (dẫn + thoại nhân vật), chèn 120ms im lặng giữa chúng
      if (sIdx < plan.segments.length - 1) {
        segmentBuffers.push(createSilenceBuffer(120));
      }

      await sleep(150); // Nhịp nghỉ nhẹ cho server
    }

    // Ghép các phân đoạn thành 1 file line_xxx.wav hoàn chỉnh
    const finalLineWav = concatenateWavBuffers(segmentBuffers);
    fs.writeFileSync(targetPath, finalLineWav);
    console.log(`  ✅ Đã xuất: ${fileName} (${(finalLineWav.length / 1024).toFixed(1)} KB)`);
    generatedFiles.push(targetPath);
  }

  console.log("\n=== TẤT CẢ 110 FILE LINE ĐÃ ĐƯỢC TẠO THÀNH CÔNG! ===");
  console.log("Tiến hành ghép nối Master Audio hoàn chỉnh (master_audio_full.wav)...");

  // Ghép nối Master Audio với khoảng nghỉ hợp lý theo quy tắc
  const masterSegments = [];
  // Các mốc chuyển cảnh lớn cần khoảng lặng 750ms
  const sceneJumpLines = [10, 19, 25, 32, 43, 52, 58, 69, 76, 93, 103];

  for (let i = 0; i < generatedFiles.length; i++) {
    const filePath = generatedFiles[i];
    const fileBuf = fs.readFileSync(filePath);
    masterSegments.push(fileBuf);

    if (i < generatedFiles.length - 1) {
      const currentLineNum = i + 1;
      const pauseDuration = sceneJumpLines.includes(currentLineNum) ? 750 : 300;
      masterSegments.push(createSilenceBuffer(pauseDuration));
    }
  }

  const masterWav = concatenateWavBuffers(masterSegments);
  const masterPath = path.join(__dirname, "output", "script_no_white_lies_us", "master_audio_full.wav");
  fs.writeFileSync(masterPath, masterWav);

  console.log(`🎉 HOÀN THÀNH XUẤT SẮC! File Master: ${masterPath} (${(masterWav.length / 1024 / 1024).toFixed(2)} MB)`);
}

// Thực thi nếu chạy trực tiếp
runProduction().catch((err) => {
  console.error("❌ LỖI TRONG QUÁ TRÌNH SẢN XUẤT:", err);
  process.exit(1);
});
