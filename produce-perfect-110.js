import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { synthesizeSpeech } from "./kokoro-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Cấu trúc 110 câu đối chiếu chuẩn 1-1 với script_no_white_lies_us_en.md và voice-casting-white-lies.md
export const PERFECT_PRODUCTION_PLAN = [
  // 001 - 010: Scene 1 - Intro & Sáng sớm
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

  // 011 - 019: Scene 2 - Bữa sáng gia đình
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

  // 020 - 025: Scene 3 - Thang máy & Bà Higgins
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

  // 026 - 032: Scene 4 - Starbucks Drive-thru
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
      { text: "I feel that, man. To be completely honest, our espresso is just burnt commercial beans drenched in artificial syrup, and you’re basically paying eight dollars for oat milk and ice.", voice: "am_michael", speed: 1.05 }
    ]
  },
  {
    lineNum: 32,
    segments: [
      { text: "Welcome to the end of civilized small talk!", voice: "am_adam", speed: 1.0 }
    ]
  },

  // 033 - 046: Scene 5 - Văn phòng công ty & Sếp VP & HR Karen
  {
    lineNum: 33,
    segments: [
      { text: "By eight thirty AM, you arrive at your corporate office—the world's ultimate sanctuary built entirely on fake smiles and white lies.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 34,
    segments: [
      { text: "The quarterly all-hands meeting kicks off in the executive conference room, with the Vice President passionately pitching an eighty-slide deck full of meaningless corporate buzzwords.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 35,
    segments: [
      { text: "The Vice President smiles enthusiastically at the top-performing project lead:", voice: "am_adam", speed: 1.0 },
      { text: "So, what do you think of our Q-three synergy roadmap for cross-functional alignment?", voice: "am_eric", speed: 1.05 }
    ]
  },
  {
    lineNum: 36,
    segments: [
      { text: "Normally, the employee would nod vigorously, pretend to take notes, and reply:", voice: "am_adam", speed: 1.0 },
      { text: "Brilliant strategic vision, sir!", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 37,
    segments: [
      { text: "Today, the employee stares dead into the Vice President’s soul with an emotionless expression:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 38,
    segments: [
      { text: "With all due respect, I've just been nodding along so you wouldn't feel awkward, but you haven't said a single coherent sentence for the past forty-five minutes.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 39,
    segments: [
      { text: "This roadmap is so staggeringly dumb that my golden retriever walking across a keyboard could produce a better business model.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 40,
    segments: [
      { text: "The entire boardroom instantly flatlines into collective shock as the Vice President's face turns deep crimson.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 41,
    segments: [
      { text: "Trembling, the Vice President looks over at the Senior Human Resources Director:", voice: "am_adam", speed: 1.0 },
      { text: "Karen... how would you rate my leadership over the past year?", voice: "am_eric", speed: 1.0 }
    ]
  },
  {
    lineNum: 42,
    segments: [
      { text: "Karen adjusts her glasses, lets out a heavy sigh, and delivers the verdict:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 43,
    segments: [
      { text: "You are an incompetent narcissist who constantly takes credit for other people's work, and your toxic micromanagement is the exact reason our top five engineers resigned last week.", voice: "af_sarah", speed: 0.95 }
    ]
  },
  {
    lineNum: 44,
    segments: [
      { text: "The chaos reaches critical mass when you knock on your manager's door to ask for an early leave:", voice: "am_adam", speed: 1.05 },
      { text: "Hey boss, can I head out early today?", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 45,
    segments: [
      { text: "Your boss snaps:", voice: "am_adam", speed: 1.05 },
      { text: "What's the reason? Do you have another family emergency?", voice: "am_eric", speed: 1.1 }
    ]
  },
  {
    lineNum: 46,
    segments: [
      { text: "Your mouth instantly blurts out:", voice: "am_adam", speed: 1.05 },
      { text: "No, I'm just sick and tired of looking at your face, and I want to go home and lie in bed watching YouTube videos!", voice: "am_adam", speed: 1.15 }
    ]
  },

  // 047 - 058: Scene 6 - Truyền hình Thời sự & Influencer
  {
    lineNum: 47,
    segments: [
      { text: "By noon, the disaster breaks out of private lives and explodes on a massive national scale across live television!", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 48,
    segments: [
      { text: "The national midday news broadcast is airing live to tens of millions of viewers across the country.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 49,
    segments: [
      { text: "The veteran anchor, flashing his pristine Hollywood smile, looks straight into the studio camera and calmly announces:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 50,
    segments: [
      { text: "Good afternoon everyone. Today's breaking report claiming the financial markets are stabilizing is actually just a pre-written script designed to prevent mass public panic.", voice: "am_eric", speed: 1.02 }
    ]
  },
  {
    lineNum: 51,
    segments: [
      { text: "The truth is, all the top Wall Street analysts are losing millions and have absolutely no clue what they're doing either.", voice: "am_eric", speed: 1.02 }
    ]
  },
  {
    lineNum: 52,
    segments: [
      { text: "His co-anchor turns to him in shock:", voice: "am_adam", speed: 1.0 },
      { text: "Wait, are you serious about those economic forecasts?", voice: "af_nicole", speed: 1.05 }
    ]
  },
  {
    lineNum: 53,
    segments: [
      { text: "The anchor chuckles bitterly:", voice: "am_adam", speed: 1.0 },
      { text: "Of course not! I'm just reading whatever scrolls across the teleprompter, I have zero understanding of what these charts actually mean.", voice: "am_eric", speed: 1.02 }
    ]
  },
  {
    lineNum: 54,
    segments: [
      { text: "Right after the broadcast, a commercial break airs featuring a mega-celebrity influencer promoting a luxury skincare cream.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 55,
    segments: [
      { text: "When asked by the interviewer how she maintains her flawless, ageless skin, the influencer smiles sweetly and confesses:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 56,
    segments: [
      { text: "Honestly, this eighty-dollar jar of moisturizer doesn't do anything for wrinkles.", voice: "af_heart", speed: 1.05 }
    ]
  },
  {
    lineNum: 57,
    segments: [
      { text: "My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, botox, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.", voice: "af_heart", speed: 1.05 }
    ]
  },
  {
    lineNum: 58,
    segments: [
      { text: "Television networks descend into complete bedlam as producers scramble to cut live feeds while millions of viewers watch in absolute disbelief!", voice: "am_adam", speed: 1.05 }
    ]
  },

  // 059 - 073: Scene 7 - Phòng Nha Khoa & Tiệm Cắt Tóc
  {
    lineNum: 59,
    segments: [
      { text: "By two PM, you develop a throbbing toothache and are forced to visit the local dental clinic.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 60,
    segments: [
      { text: "You're lying back in the leather chair under blinding fluorescent lights, your mouth propped wide open, trembling as the dentist approaches with a menacingly long syringe.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 61,
    segments: [
      { text: "You nervously mumble:", voice: "am_adam", speed: 1.0 },
      { text: "Doctor, is this injection going to hurt?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 62,
    segments: [
      { text: "Normally, a dentist will gently pat your shoulder and soothe:", voice: "am_adam", speed: 1.0 },
      { text: "Just a tiny little pinch, buddy, you won't feel a thing!", voice: "am_eric", speed: 1.0 }
    ]
  },
  {
    lineNum: 63,
    segments: [
      { text: "Under the truth curse, the dentist looks down at you with deep concern and admits:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 64,
    segments: [
      { text: "I have to be completely honest with you: this needle is going to hurt like hell, send sharp shockwaves through your skull, and make a grown adult weep for their mother.", voice: "am_eric", speed: 1.05 }
    ]
  },
  {
    lineNum: 65,
    segments: [
      { text: "Plus, my hands are shaking like crazy because I had a massive fight with my spouse last night, so there’s a solid seventy percent chance I miss the nerve on the first couple tries.", voice: "am_eric", speed: 1.05 }
    ]
  },
  {
    lineNum: 66,
    segments: [
      { text: "You violently launch yourself off the dental chair, spit tube still hanging from your mouth, kick the clinic door open, and sprint down Main Street in pure terror!", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 67,
    segments: [
      { text: "Desperate for a quick fix to your messy hair, you duck into a nearby barbershop.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 68,
    segments: [
      { text: "You hold up a picture of a handsome Hollywood movie star on your phone and ask the barber:", voice: "am_adam", speed: 1.0 },
      { text: "Can you give me this exact haircut? Will it suit my face?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 69,
    segments: [
      { text: "The barber studies your reflection in the mirror for several long seconds, shakes his head, and lets out a profound sigh:", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 70,
    segments: [
      { text: "Brother, the problem isn't my scissors—the fundamental problem is the genetics of your face.", voice: "am_adam", speed: 0.92 }
    ]
  },
  {
    lineNum: 71,
    segments: [
      { text: "Even if I had the magic wand from Harry Potter, when I'm done cutting, you're still going to look like a raw, half-peeled potato.", voice: "am_adam", speed: 0.92 }
    ]
  },
  {
    lineNum: 72,
    segments: [
      { text: "Thirty minutes later, the barber holds up the back mirror and asks:", voice: "am_adam", speed: 1.0 },
      { text: "Well, how do you like the new cut?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 73,
    segments: [
      { text: "You stare into your reflection with tears welling in your eyes:", voice: "am_adam", speed: 1.05 },
      { text: "I despise you, I loathe this barbershop, and I want to smash this mirror into a million pieces.", voice: "am_adam", speed: 1.05 }
    ]
  },

  // 074 - 088: Scene 8 - Hẹn hò Hinge, Vòng cổ TJ Maxx, Váy bục chỉ
  {
    lineNum: 74,
    segments: [
      { text: "As dusk falls across the city, the ultimate battleground of human civilization ignites: THE BRUTAL ARENA OF DATING AND ROMANCE!", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 75,
    segments: [
      { text: "At an upscale, candlelit downtown bistro, a young couple is having their very first date after weeks of chatting on Hinge.", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 76,
    segments: [
      { text: "The girl looks across the table with a curious smile:", voice: "am_adam", speed: 1.0 },
      { text: "So, do I look like the pictures on my dating profile?", voice: "af_bella", speed: 1.0 }
    ]
  },
  {
    lineNum: 77,
    segments: [
      { text: "The guy desperately tries to bite his tongue, but the words erupt from his chest:", voice: "am_adam", speed: 1.05 }
    ]
  },
  {
    lineNum: 78,
    segments: [
      { text: "You're wearing so many layers of foundation that if you laugh too hard, an entire slab of makeup is going to fall directly onto your steak.", voice: "am_adam", speed: 1.1 }
    ]
  },
  {
    lineNum: 79,
    segments: [
      { text: "He immediately asks in return:", voice: "am_adam", speed: 1.0 },
      { text: "And what do you think of me in person?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 80,
    segments: [
      { text: "The girl fires back without missing a single beat: You clearly used heavy filters and angle tricks because in real life you're noticeably shorter and your hairline is fighting for its life.", voice: "af_bella", speed: 1.15 }
    ]
  },
  {
    lineNum: 81,
    segments: [
      { text: "And let's be honest: you only brought me to this fancy restaurant because you had a fifty percent off Groupon coupon on your phone, right?", voice: "af_bella", speed: 1.15 }
    ]
  },
  {
    lineNum: 82,
    segments: [
      { text: "At a nearby booth, a boyfriend nervously presents a velvet gift box containing a necklace to celebrate their three-year anniversary:", voice: "am_adam", speed: 1.0 },
      { text: "Do you love it, babe?", voice: "am_michael", speed: 1.0 }
    ]
  },
  {
    lineNum: 83,
    segments: [
      { text: "The girlfriend picks up the necklace, inspects it, and brutally blurts out:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 84,
    segments: [
      { text: "This looks like a cheap, tarnished piece of junk bought on clearance from Wish or the back shelf of T-J Maxx!", voice: "af_heart", speed: 1.15 }
    ]
  },
  {
    lineNum: 85,
    segments: [
      { text: "I've been politely faking my admiration for your terrible taste and cheapness for three entire years—next time just send me cash on Venmo!", voice: "af_heart", speed: 1.15 }
    ]
  },
  {
    lineNum: 86,
    segments: [
      { text: "Down the street, a woman wearing a brand new designer dress spins around and asks her husband:", voice: "am_adam", speed: 1.0 },
      { text: "Be honest with me, does this dress make me look fat?", voice: "af_heart", speed: 1.0 }
    ]
  },
  {
    lineNum: 87,
    segments: [
      { text: "The husband blinks in utter helplessness:", voice: "am_adam", speed: 1.05 },
      { text: "Yes! You've noticeably gained weight, your double chin is swallowing your neck, and that dress looks like the side seams are about to explode into confetti!", voice: "am_michael", speed: 1.1 }
    ]
  },
  {
    lineNum: 88,
    segments: [
      { text: "Within a single evening, thousands of engagement rings are dropped into wine glasses, countless couples break up on the spot, and relationship counseling hotlines crash from sheer call volume!", voice: "am_adam", speed: 1.05 }
    ]
  },

  // 089 - 098: Scene 9 - Đêm tĩnh lặng & Triết lý & Nửa đêm
  {
    lineNum: 89,
    segments: [
      { text: "By eleven PM, a haunting, eerie silence descends over every major metropolitan city across the globe.", voice: "am_adam", speed: 0.92 }
    ]
  },
  {
    lineNum: 90,
    segments: [
      { text: "Humanity enters a state of collective dread and discovers the only remaining survival tactic: DESPERATELY AVOIDING ALL QUESTIONS AT ALL COSTS!", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 91,
    segments: [
      { text: "On the streets, strangers refuse to make eye contact, communicating solely through frantic hand gestures, terrified that a single spoken word will incinerate another human soul.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 92,
    segments: [
      { text: "In just twenty-four hours without harmless white lies:", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 93,
    segments: [
      { text: "The advertising industry collapses because every brand is forced to admit their products are completely mediocre.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 94,
    segments: [
      { text: "Decade-long friendships shatter in seconds over a single confession:", voice: "am_adam", speed: 0.95 },
      { text: "I only hang out with you because you always pick up the bar tab.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 95,
    segments: [
      { text: "And humankind learns a profound, humbling truth: the human heart is far too fragile to endure one hundred percent raw reality every single second of the day.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 96,
    segments: [
      { text: "The digital clock counts down the final agonizing seconds: eleven fifty-nine fifty-eight PM... fifty-nine seconds...", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 97,
    segments: [
      { text: "TICK TOCK... EXACTLY MIDNIGHT!", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 98,
    segments: [
      { text: "The supernatural spell abruptly shatters, and the blessed power of white lies is officially restored to humanity!", voice: "am_adam", speed: 0.98 }
    ]
  },

  // 099 - 110: Scene 10 - Cứu rỗi, Sáng hôm sau & CTA
  {
    lineNum: 99,
    segments: [
      { text: "Instantly, you turn to your mom on the sofa and wrap your arms around her:", voice: "am_adam", speed: 1.0 },
      { text: "Mom, I'm so sorry, your pancakes this morning were genuinely the best in the world!", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 100,
    segments: [
      { text: "Your boss frantically sends a message to the company Slack channel:", voice: "am_adam", speed: 1.0 },
      { text: "Great job today everyone, I truly consider this team my second family!", voice: "am_eric", speed: 1.02 }
    ]
  },
  {
    lineNum: 101,
    segments: [
      { text: "And girlfriends text their partners:", voice: "am_adam", speed: 1.0 },
      { text: "I'm so sorry babe, that necklace is gorgeous and I'm going to wear it every single day!", voice: "af_heart", speed: 1.0 }
    ]
  },
  {
    lineNum: 102,
    segments: [
      { text: "The entire planet exhales a massive sigh of relief as if waking from the most terrifying nightmare in human history.", voice: "am_adam", speed: 0.98 }
    ]
  },
  {
    lineNum: 103,
    segments: [
      { text: "The world is once again saved by the gentle, merciful grace of harmless white lies!", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 104,
    segments: [
      { text: "Malicious deceit and fraud are undeniably toxic, but white lies are the essential emotional cushion that makes human existence tolerable.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 105,
    segments: [
      { text: "They were never invented to deceive us, but to protect our vulnerable hearts and allow us to treat one another with kindness, grace, and empathy.", voice: "am_adam", speed: 0.95 }
    ]
  },
  {
    lineNum: 106,
    segments: [
      { text: "Now, let's be one hundred percent honest—nobody is forcing you to tell the truth right now:", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 107,
    segments: [
      { text: "If tomorrow the world actually banned white lies for twenty-four hours, what is the VERY FIRST brutal truth you would say directly to your best friend or your boss?", voice: "am_adam", speed: 1.0 }
    ]
  },
  {
    lineNum: 108,
    segments: [
      { text: "Drop your funniest, most savage confession in the comments below!", voice: "am_adam", speed: 1.02 }
    ]
  },
  {
    lineNum: 109,
    segments: [
      { text: "Don't forget to hit Like, Subscribe, and ring the Notification Bell to join us for more mind-bending, hilarious what-if stories.", voice: "am_adam", speed: 1.02 }
    ]
  },
  {
    lineNum: 110,
    segments: [
      { text: "Thank you so much for watching, and we'll see you in the next video!", voice: "am_adam", speed: 0.98 }
    ]
  }
];

function createSilenceBuffer(durationMs, sampleRate = 24000) {
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);
  return Buffer.alloc(numSamples * 2);
}

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
      pcmChunks.push(buf);
    }
  }

  const allPcm = Buffer.concat(pcmChunks);
  const totalLength = 44 + allPcm.length;
  const newHeader = Buffer.alloc(44);
  header.copy(newHeader);

  newHeader.writeUInt32LE(totalLength - 8, 4);
  newHeader.writeUInt32LE(allPcm.length, 40);

  return Buffer.concat([newHeader, allPcm]);
}

export async function runPerfectProduction() {
  console.log("=== BẮT ĐẦU RENDER LẠI 110 CÂU CHUẨN XÁC 100% 1-1 ===");
  const outputDir = path.join(__dirname, "output", "script_no_white_lies_us", "raw_voice");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const generatedFiles = [];

  for (let i = 0; i < PERFECT_PRODUCTION_PLAN.length; i++) {
    const plan = PERFECT_PRODUCTION_PLAN[i];
    const fileNum = String(plan.lineNum).padStart(3, "0");
    const fileName = `line_${fileNum}.wav`;
    const targetPath = path.join(outputDir, fileName);

    console.log(`\n[${i + 1}/${PERFECT_PRODUCTION_PLAN.length}] Xử lý ${fileName} (Số phân đoạn thoại: ${plan.segments.length})...`);

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

      if (sIdx < plan.segments.length - 1) {
        segmentBuffers.push(createSilenceBuffer(120));
      }

      await sleep(150);
    }

    const finalLineWav = concatenateWavBuffers(segmentBuffers);
    fs.writeFileSync(targetPath, finalLineWav);
    console.log(`  ✅ Đã xuất chuẩn: ${fileName} (${(finalLineWav.length / 1024).toFixed(1)} KB)`);
    generatedFiles.push(targetPath);
  }

  console.log("\n=== TẤT CẢ 110 CÂU ĐÃ ĐƯỢC RENDER HOÀN HẢO THEO ĐÚNG KỊCH BẢN GỐC! ===");
  console.log("Tiến hành ghép nối Master Audio hoàn chỉnh...");

  const masterSegments = [];
  const sceneJumpLines = [10, 19, 25, 32, 46, 58, 73, 88, 98];

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

  console.log(`🎉 HOÀN THÀNH XUẤT SẮC! File Master chuẩn: ${masterPath} (${(masterWav.length / 1024 / 1024).toFixed(2)} MB)`);
}

// Nếu gọi trực tiếp
if (process.argv[1] && process.argv[1].includes("produce-perfect-110.js")) {
  runPerfectProduction().catch(console.error);
}
