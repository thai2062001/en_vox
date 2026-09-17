import fs from 'fs';

const detailedLines = JSON.parse(fs.readFileSync('output/script_no_white_lies_us/line_quotes_detailed.json', 'utf8'));

// Xây dựng bảng đối chiếu 110 dòng hoàn hảo
// Dựa trên bảng phân vai trong voice-casting-white-lies.md
const auditReport = [];

detailedLines.forEach((item) => {
  const { lineNum, fullLine, quotesCount, quotes } = item;
  let character = 'Narrator';
  let assignedVoice = 'am_adam';
  let speed = 1.0;
  let breakdown = [];

  // Xác định từng câu
  switch (lineNum) {
    case 1:
      character = 'Narrator';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [{ type: 'Narration', voice: 'am_adam', text: 'Imagine waking up at seven AM on a crisp Tuesday morning...' }];
      break;
    case 2:
      character = 'Narrator + Nhân vật chính';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'You walk into the bathroom, look in the mirror, and think to yourself:' },
        { type: 'Dialogue (Nhân vật chính)', voice: 'am_adam', text: 'Looking pretty sharp today, champ.' }
      ];
      break;
    case 11:
      character = 'Narrator + Mẹ Susan';
      assignedVoice = 'am_adam + af_heart';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Your mom walks over with a proud smile, placing a plate of rock-hard, blackened pancakes on the table and asking:' },
        { type: 'Dialogue (Mẹ Susan)', voice: 'af_heart', speed: 1.05, text: 'How do the homemade pancakes look, boys?' }
      ];
      break;
    case 12:
      character = 'Narrator + Bố';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Under normal circumstances, your dad—a man with twenty-five years of seasoned survival experience in marriage—would smile lovingly and say:' },
        { type: 'Dialogue (Bố)', voice: 'am_adam', speed: 0.95, text: 'Honey, your cooking is always wonderful.' }
      ];
      break;
    case 14:
      character = 'Bố';
      assignedVoice = 'am_adam';
      speed = 1.1;
      breakdown = [
        { type: 'Dialogue (Bố thảng thốt)', voice: 'am_adam', speed: 1.1, text: 'Honestly, Susan, this looks like radioactive fallout from a nuclear disaster, and I would literally rather eat mulch from the front yard than swallow this bitter charcoal!' }
      ];
      break;
    case 18:
      character = 'Con trai (Nhân vật chính)';
      assignedVoice = 'am_adam';
      speed = 1.12;
      breakdown = [
        { type: 'Dialogue (Con trai)', voice: 'am_adam', speed: 1.12, text: 'I’ve hated your cooking since I was six years old, mom, and I only pretend to love it so you don\'t assign me extra weekend chores!' }
      ];
      break;
    case 22:
      character = 'Narrator + Bà Higgins';
      assignedVoice = 'am_adam + af_bella';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'She beams at you and asks:' },
        { type: 'Dialogue (Bà Higgins)', voice: 'af_bella', speed: 1.0, text: 'Do you like my new haircut, dear? Don\'t you think it makes me look ten years younger?' }
      ];
      break;
    case 24:
      character = 'Con trai';
      assignedVoice = 'am_adam';
      speed = 1.1;
      breakdown = [
        { type: 'Dialogue (Con trai)', voice: 'am_adam', speed: 1.1, text: 'You look like a wet poodle that got stuck in an industrial leaf blower, and it easily adds nine and a half years to your face!' }
      ];
      break;
    case 27:
      character = 'Narrator + Barista';
      assignedVoice = 'am_adam + am_michael';
      speed = 1.05;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'The cheerful barista at the drive-thru window smiles:' },
        { type: 'Dialogue (Barista Starbucks)', voice: 'am_michael', speed: 1.05, text: 'Good morning! How are you doing today?' }
      ];
      break;
    case 28:
      character = 'Narrator';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Now, in American culture, the sacred universal response is always:' },
        { type: 'Dialogue (Thói quen)', voice: 'am_adam', text: 'Good, how are you?' }
      ];
      break;
    case 29:
      character = 'Narrator + Con trai';
      assignedVoice = 'am_adam';
      speed = 1.05;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Instead, your mouth instantly fires back:' },
        { type: 'Dialogue (Con trai khủng hoảng)', voice: 'am_adam', speed: 1.05, text: 'I have four dollars and seventeen cents in my checking account, I just emotionally destroyed my entire family, and I am in a state of profound existential dread.' }
      ];
      break;
    case 31:
      character = 'Barista Starbucks';
      assignedVoice = 'am_michael';
      speed = 1.05;
      breakdown = [
        { type: 'Dialogue (Barista bóc phốt)', voice: 'am_michael', speed: 1.05, text: 'I feel that, man. To be completely honest, our espresso is just burnt commercial beans...' }
      ];
      break;
    case 35:
      character = 'Narrator + Sếp VP';
      assignedVoice = 'am_adam + am_eric';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'The VP smiles enthusiastically at the top-performing project lead:' },
        { type: 'Dialogue (Sếp VP)', voice: 'am_eric', speed: 1.05, text: 'So, what do you think of our Q3 synergy roadmap for cross-functional alignment?' }
      ];
      break;
    case 36:
      character = 'Narrator + Nhân viên';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Normally, the employee would nod vigorously, pretend to take notes, and reply:' },
        { type: 'Dialogue (Thảo mai)', voice: 'am_adam', text: 'Brilliant strategic vision, sir!' }
      ];
      break;
    case 38:
      character = 'Nhân viên';
      assignedVoice = 'am_adam';
      speed = 0.98;
      breakdown = [
        { type: 'Dialogue (Nhân viên bật sếp)', voice: 'am_adam', speed: 0.98, text: 'With all due respect, I\'ve just been nodding along so you wouldn\'t feel awkward...' }
      ];
      break;
    case 39:
      character = 'Nhân viên';
      assignedVoice = 'am_adam';
      speed = 0.98;
      breakdown = [
        { type: 'Dialogue (Nhân viên)', voice: 'am_adam', speed: 0.98, text: 'This roadmap is so staggeringly dumb that my golden retriever walking across a keyboard could produce a better business model.' }
      ];
      break;
    case 41:
      character = 'Narrator + Sếp VP';
      assignedVoice = 'am_adam + am_eric';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Trembling, the VP looks over at the Senior HR Director:' },
        { type: 'Dialogue (Sếp VP cầu cứu)', voice: 'am_eric', speed: 1.0, text: 'Karen... how would you rate my leadership over the past year?' }
      ];
      break;
    case 43:
      character = 'Giám đốc HR Karen';
      assignedVoice = 'af_sarah';
      speed = 0.95;
      breakdown = [
        { type: 'Dialogue (HR Karen tuyên án)', voice: 'af_sarah', speed: 0.95, text: 'You are an incompetent narcissist who constantly takes credit for other people\'s work...' }
      ];
      break;
    case 44:
      character = 'Narrator + Nhân viên';
      assignedVoice = 'am_adam';
      speed = 1.05;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'The chaos reaches critical mass when you knock on your manager\'s door to ask for an early leave:' },
        { type: 'Dialogue (Hỏi về sớm)', voice: 'am_adam', speed: 1.05, text: 'Hey boss, can I head out early today?' }
      ];
      break;
    case 45:
      character = 'Narrator + Sếp Quản lý';
      assignedVoice = 'am_adam + am_eric';
      speed = 1.05;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Your boss snaps:' },
        { type: 'Dialogue (Sếp)', voice: 'am_eric', speed: 1.1, text: 'What\'s the reason? Do you have another family emergency?' }
      ];
      break;
    case 46:
      character = 'Narrator + Nhân viên';
      assignedVoice = 'am_adam';
      speed = 1.15;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Your mouth instantly blurts out:' },
        { type: 'Dialogue (Nhân viên quát)', voice: 'am_adam', speed: 1.15, text: 'No, I\'m just sick and tired of looking at your face, and I want to go home and lie in bed watching YouTube videos!' }
      ];
      break;
    case 50:
      character = 'MC Thời Sự Tom';
      assignedVoice = 'am_eric';
      speed = 1.02;
      breakdown = [
        { type: 'Dialogue (MC Thời Sự)', voice: 'am_eric', speed: 1.02, text: 'Good afternoon everyone. Today\'s breaking report claiming the financial markets are stabilizing is actually just a pre-written script designed to prevent mass public panic.' }
      ];
      break;
    case 51:
      character = 'MC Thời Sự Tom';
      assignedVoice = 'am_eric';
      speed = 1.02;
      breakdown = [
        { type: 'Dialogue (MC Thời Sự)', voice: 'am_eric', speed: 1.02, text: 'The truth is, all the top Wall Street analysts are losing millions and have absolutely no clue what they\'re doing either.' }
      ];
      break;
    case 52:
      character = 'Narrator + Nữ MC';
      assignedVoice = 'am_adam + af_nicole';
      speed = 1.05;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'His co-anchor turns to him in shock:' },
        { type: 'Dialogue (Nữ MC Thời Sự)', voice: 'af_nicole', speed: 1.05, text: 'Wait, are you serious about those economic forecasts?' }
      ];
      break;
    case 53:
      character = 'Narrator + MC Thời Sự';
      assignedVoice = 'am_adam + am_eric';
      speed = 1.02;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'The anchor chuckles bitterly:' },
        { type: 'Dialogue (MC Thời Sự)', voice: 'am_eric', speed: 1.02, text: 'Of course not! I\'m just reading whatever scrolls across the teleprompter...' }
      ];
      break;
    case 56:
      character = 'Beauty Influencer';
      assignedVoice = 'af_heart';
      speed = 1.05;
      breakdown = [
        { type: 'Dialogue (Influencer)', voice: 'af_heart', speed: 1.05, text: 'Honestly, this eighty-dollar jar of moisturizer doesn\'t do anything for wrinkles.' }
      ];
      break;
    case 57:
      character = 'Beauty Influencer';
      assignedVoice = 'af_heart';
      speed = 1.05;
      breakdown = [
        { type: 'Dialogue (Influencer thú nhận)', voice: 'af_heart', speed: 1.05, text: 'My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery, botox, and weekly laser treatments, so please stop wasting your hard-earned paycheck on this garbage.' }
      ];
      break;
    case 61:
      character = 'Narrator + Bệnh nhân';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'You nervously mumble:' },
        { type: 'Dialogue (Bệnh nhân)', voice: 'am_adam', text: 'Doctor, is this injection going to hurt?' }
      ];
      break;
    case 62:
      character = 'Narrator + Bác sĩ thông thường';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Normally, a dentist will gently pat your shoulder and soothe:' },
        { type: 'Dialogue (Bác sĩ dỗ ngọt)', voice: 'am_eric', text: 'Just a tiny little pinch, buddy, you won\'t feel a thing!' }
      ];
      break;
    case 64:
      character = 'Bác sĩ Nha Khoa';
      assignedVoice = 'am_eric';
      speed = 1.05;
      breakdown = [
        { type: 'Dialogue (Bác sĩ Nha Khoa)', voice: 'am_eric', speed: 1.05, text: 'I have to be completely honest with you: this needle is going to hurt like hell, send sharp shockwaves through your skull, and make a grown adult weep for their mother.' }
      ];
      break;
    case 65:
      character = 'Bác sĩ Nha Khoa';
      assignedVoice = 'am_eric';
      speed = 1.05;
      breakdown = [
        { type: 'Dialogue (Bác sĩ thú nhận run tay)', voice: 'am_eric', speed: 1.05, text: 'Plus, my hands are shaking like crazy because I had a massive fight with my spouse last night, so there’s a solid seventy percent chance I miss the nerve on the first couple tries.' }
      ];
      break;
    case 68:
      character = 'Narrator + Khách cắt tóc';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'You hold up a picture of a handsome Hollywood movie star on your phone and ask the barber:' },
        { type: 'Dialogue (Khách)', voice: 'am_adam', text: 'Can you give me this exact haircut? Will it suit my face?' }
      ];
      break;
    case 70:
      character = 'Thợ Cắt Tóc';
      assignedVoice = 'am_adam';
      speed = 0.92;
      breakdown = [
        { type: 'Dialogue (Thợ Cắt Tóc)', voice: 'am_adam', speed: 0.92, text: 'Brother, the problem isn\'t my scissors—the fundamental problem is the genetics of your face.' }
      ];
      break;
    case 71:
      character = 'Thợ Cắt Tóc';
      assignedVoice = 'am_adam';
      speed = 0.92;
      breakdown = [
        { type: 'Dialogue (Thợ Cắt Tóc phũ)', voice: 'am_adam', speed: 0.92, text: 'Even if I had the magic wand from Harry Potter, when I\'m done cutting, you\'re still going to look like a raw, half-peeled potato.' }
      ];
      break;
    case 72:
      character = 'Narrator + Thợ Cắt Tóc';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Thirty minutes later, the barber holds up the back mirror and asks:' },
        { type: 'Dialogue (Thợ cắt tóc)', voice: 'am_adam', text: 'Well, how do you like the new cut?' }
      ];
      break;
    case 73:
      character = 'Narrator + Khách thất vọng';
      assignedVoice = 'am_adam';
      speed = 1.05;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'You stare into your reflection with tears welling in your eyes:' },
        { type: 'Dialogue (Khách cay đắng)', voice: 'am_adam', speed: 1.05, text: 'I despise you, I loathe this barbershop, and I want to smash this mirror into a million pieces.' }
      ];
      break;
    case 76:
      character = 'Narrator + Cô gái Hinge';
      assignedVoice = 'am_adam + af_bella';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'The girl looks across the table with a curious smile:' },
        { type: 'Dialogue (Cô gái Hinge)', voice: 'af_bella', speed: 1.0, text: 'So, do I look like the pictures on my dating profile?' }
      ];
      break;
    case 78:
      character = 'Chàng trai Hinge';
      assignedVoice = 'am_adam';
      speed = 1.1;
      breakdown = [
        { type: 'Dialogue (Chàng trai)', voice: 'am_adam', speed: 1.1, text: 'You\'re wearing so many layers of foundation that if you laugh too hard, an entire slab of makeup is going to fall directly onto your steak.' }
      ];
      break;
    case 79:
      character = 'Narrator + Chàng trai';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'He immediately asks in return:' },
        { type: 'Dialogue (Chàng trai)', voice: 'am_adam', text: 'And what do you think of me in person?' }
      ];
      break;
    case 80:
      character = 'Cô gái Hinge Date';
      assignedVoice = 'af_bella';
      speed = 1.15;
      breakdown = [
        { type: 'Dialogue (Cô gái đanh đá)', voice: 'af_bella', speed: 1.15, text: 'You clearly used heavy filters and angle tricks because in real life you\'re noticeably shorter and your hairline is fighting for its life.' }
      ];
      break;
    case 81:
      character = 'Cô gái Hinge Date';
      assignedVoice = 'af_bella';
      speed = 1.15;
      breakdown = [
        { type: 'Dialogue (Cô gái bóc phốt Groupon)', voice: 'af_bella', speed: 1.15, text: 'And let\'s be honest: you only brought me to this fancy restaurant because you had a fifty percent off Groupon coupon on your phone, right?' }
      ];
      break;
    case 82:
      character = 'Narrator + Bạn trai tặng vòng cổ';
      assignedVoice = 'am_adam + am_michael';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'At a nearby booth, a boyfriend nervously presents a velvet gift box containing a necklace to celebrate their three-year anniversary:' },
        { type: 'Dialogue (Bạn trai)', voice: 'am_michael', speed: 1.0, text: 'Do you love it, babe?' }
      ];
      break;
    case 84:
      character = 'Bạn gái nhận vòng cổ';
      assignedVoice = 'af_heart';
      speed = 1.15;
      breakdown = [
        { type: 'Dialogue (Bạn gái chê vòng cổ)', voice: 'af_heart', speed: 1.15, text: 'This looks like a cheap, tarnished piece of junk bought on clearance from Wish or the back shelf of TJ Maxx!' }
      ];
      break;
    case 85:
      character = 'Bạn gái nhận vòng cổ';
      assignedVoice = 'af_heart';
      speed = 1.15;
      breakdown = [
        { type: 'Dialogue (Bạn gái đòi Venmo)', voice: 'af_heart', speed: 1.15, text: 'I\'ve been politely faking my admiration for your terrible taste and cheapness for three entire years—next time just send me cash on Venmo!' }
      ];
      break;
    case 86:
      character = 'Narrator + Người vợ';
      assignedVoice = 'am_adam + af_heart';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Down the street, a woman wearing a brand new designer dress spins around and asks her husband:' },
        { type: 'Dialogue (Người vợ hỏi váy)', voice: 'af_heart', speed: 1.0, text: 'Be honest with me, does this dress make me look fat?' }
      ];
      break;
    case 87:
      character = 'Người chồng chê váy';
      assignedVoice = 'am_michael';
      speed = 1.1;
      breakdown = [
        { type: 'Dialogue (Người chồng chê nọng cằm & bục chỉ)', voice: 'am_michael', speed: 1.1, text: 'Yes! You\'ve noticeably gained weight, your double chin is swallowing your neck, and that dress looks like the side seams are about to explode into confetti!' }
      ];
      break;
    case 94:
      character = 'Narrator + Bạn bè';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Decade-long friendships shatter in seconds over a single confession:' },
        { type: 'Dialogue (Thú nhận bạn bè)', voice: 'am_adam', text: 'I only hang out with you because you always pick up the bar tab.' }
      ];
      break;
    case 99:
      character = 'Narrator + Con trai xin lỗi mẹ';
      assignedVoice = 'am_adam';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Instantly, you turn to your mom on the sofa and wrap your arms around her:' },
        { type: 'Dialogue (Con trai)', voice: 'am_adam', speed: 0.98, text: 'Mom, I\'m so sorry, your pancakes this morning were genuinely the best in the world!' }
      ];
      break;
    case 100:
      character = 'Narrator + Sếp nhắn Slack';
      assignedVoice = 'am_adam + am_eric';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Your boss frantically sends a message to the company Slack channel:' },
        { type: 'Dialogue (Sếp nhắn Slack)', voice: 'am_eric', speed: 1.02, text: 'Great job today everyone, I truly consider this team my second family!' }
      ];
      break;
    case 101:
      character = 'Narrator + Bạn gái nhắn tin';
      assignedVoice = 'am_adam + af_heart';
      speed = 1.0;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'And girlfriends text their partners:' },
        { type: 'Dialogue (Bạn gái dỗ ngọt)', voice: 'af_heart', speed: 1.0, text: 'I\'m so sorry babe, that necklace is gorgeous and I\'m going to wear it every single day!' }
      ];
      break;
    case 104:
      character = 'Narrator';
      assignedVoice = 'am_adam';
      speed = 0.95;
      breakdown = [
        { type: 'Narration', voice: 'am_adam', text: 'Malicious deceit and fraud are undeniably toxic, but "white lies" are the essential emotional cushion that makes human existence tolerable.' }
      ];
      break;
    default:
      // Các câu dẫn chuyện còn lại
      character = 'Narrator';
      assignedVoice = 'am_adam';
      speed = (lineNum >= 77 && lineNum <= 93) ? 0.95 : (lineNum >= 102 ? 0.98 : 1.0);
      breakdown = [{ type: 'Narration', voice: 'am_adam', text: fullLine }];
      break;
  }

  auditReport.push({
    lineNum,
    fullLine,
    character,
    assignedVoice,
    speed,
    breakdown
  });
});

fs.writeFileSync('output/script_no_white_lies_us/master_audit_plan_110.json', JSON.stringify(auditReport, null, 2));
console.log('Đã tạo xong master_audit_plan_110.json!');
