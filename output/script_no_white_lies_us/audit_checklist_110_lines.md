# 📑 KẾ HOẠCH & BẢNG ĐỐI CHIẾU 1-1 CHI TIẾT 110 CÂU (FULL SCRIPT AUDIT)
> **Dự án:** A Day Without White Lies (Một Ngày Không Nói Dối Vô Hại)  
> **Tài liệu đối chiếu:** [`script_no_white_lies_us_en.md`](./script_no_white_lies_us_en.md) vs [`voice-casting-white-lies.md`](./voice-casting-white-lies.md)  
> **Tổng số câu:** 110 dòng kịch bản.

---

## 🔍 I. PHÂN TÍCH NGUYÊN NHÂN LỆCH DÒNG KỊCH BẢN (ROOT CAUSE)
Khi kiểm tra đối chiếu từng câu (1-1), phát hiện nguyên nhân kịch bản render trước đó bị lệch là do:
1. **Lệch câu trong kịch bản gốc:** Trong `script_no_white_lies_us_en.md`, các đoạn hội thoại được tác giả ngắt thành nhiều dòng liên tiếp (ví dụ: câu dẫn ở dòng riêng, câu thoại ở dòng riêng, câu nói tiếp theo ở dòng riêng).
2. **Thiếu một số nhân vật đặc thù trong bảng render trước:**
   - **Dòng 82 & 84, 85:** Bạn trai tặng hộp nhung (`am_michael`) & Bạn gái chê vòng cổ TJ Maxx/đòi Venmo (`af_heart`).
   - **Dòng 86 & 87:** Người vợ hỏi váy (`af_heart`) & Người chồng chê nọng cằm / bục chỉ (`am_michael`).
   - **Dòng 76, 78, 80, 81:** Cặp đôi Hinge Date (Bạn trai chê phấn nền `am_adam` & Bạn nữ đanh đá bóc phốt Groupon `af_bella`).
   - **Dòng 61, 62, 64, 65:** Bác sĩ nha khoa run tay (`am_eric`) & Bệnh nhân (`am_adam`).
   - **Dòng 68, 70, 71, 72, 73:** Thợ cắt tóc ví mặt củ khoai tây (`am_adam` - giọng mỉa mai buông xuôi).

---

## 📊 II. BẢNG CHECKLIST ĐỐI CHIẾU 1-1 TOÀN BỘ 110 CÂU

| Line | Trích đoạn Kịch bản gốc (`script_no_white_lies_us_en.md`) | Vai diễn | Giọng AI chỉ định | Tốc độ | Trạng thái tách thoại |
|:---:|---|:---:|:---:|:---:|:---:|
| **001** | *Imagine waking up at 7:00 AM on a crisp Tuesday morning...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **002** | *You walk into the bathroom... "Looking pretty sharp today, champ."* | Narrator + NV chính | `am_adam` | `1.00x` | ✂️ Tách dẫn + thoại nội tâm |
| **003** | *Little do you know, a bizarre supernatural phenomenon...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **004** | *Every single human being on Earth has been completely stripped...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **005** | *And it comes with one terrifying, non-negotiable rule...* | Narrator | `am_adam` | `1.02x` | ✅ Thuần dẫn chuyện |
| **006** | *No dodging the question, no awkward subject changes...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **007** | *Every word spoken by eight billion people must be...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **008** | *Have you ever wondered what would happen if modern society...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **009** | *Get ready for 24 hours of pure, unadulterated chaos...* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **010** | *The nightmare begins right at 7:15 AM at your kitchen breakfast table.* | Narrator | `am_adam` | `1.00x` | ⏸️ Chuyển cảnh (750ms) |
| **011** | *Your mom walks over... "How do the homemade pancakes look, boys?"* | Narrator + Mẹ Susan | `am_adam` + **`af_heart`** | `1.05x` | ✂️ Tách dẫn + Thoại Mẹ |
| **012** | *Under normal circumstances, your dad... "Honey, your cooking is always wonderful."* | Narrator + Bố | `am_adam` | `0.95x` | ✂️ Tách dẫn + Thoại Bố |
| **013** | *Instead, your dad’s jaw violently twitches...* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **014** | *"Honestly, Susan, this looks like radioactive fallout from a nuclear disaster..."* | Bố (Susan Husband) | `am_adam` | `1.10x` | 🎙️ Thoại Bố hoảng hốt |
| **015** | *A dead, suffocating silence instantly blankets the kitchen...* | Narrator | `am_adam` | `0.95x` | ✅ Thuần dẫn chuyện |
| **016** | *Your mom freezes in place, horrified, then slowly turns her gaze toward you for backup.* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **017** | *Before you can stop yourself, your vocal cords betray you with an absolute fatality:* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **018** | *"I’ve hated your cooking since I was six years old, mom..."* | Con trai | `am_adam` | `1.12x` | 🎙️ Thoại Con trai |
| **019** | *Boom! A picture-perfect suburban family brought to the brink...* | Narrator | `am_adam` | `1.05x` | ⏸️ Chuyển cảnh (750ms) |
| **020** | *You panic, grab your backpack, and sprint out the front door...* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **021** | *The doors slide open, and your neighbor Mrs. Higgins steps in...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **022** | *She beams at you and asks: "Do you like my new haircut, dear?..."* | Narrator + Bà Higgins | `am_adam` + **`af_bella`** | `1.00x` | ✂️ Tách dẫn + Thoại Bà Higgins |
| **023** | *You clamp your lips together with all your might...* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **024** | *"You look like a wet poodle that got stuck in an industrial leaf blower..."* | Con trai | `am_adam` | `1.10x` | 🎙️ Thoại Con trai |
| **025** | *The elevator hits the ground floor, and you bolt into the street...* | Narrator | `am_adam` | `1.05x` | ⏸️ Chuyển cảnh (750ms) |
| **026** | *Desperate to steady your nerves, you pull up to your neighborhood coffee shop...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **027** | *The cheerful barista at the drive-thru window smiles: "Good morning!..."* | Narrator + Barista | `am_adam` + **`am_michael`** | `1.05x` | ✂️ Tách dẫn + Thoại Barista |
| **028** | *Now, in American culture, the sacred universal response is always: "Good, how are you?"* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **029** | *Instead, your mouth instantly fires back: "I have four dollars and seventeen cents..."* | Narrator + Con trai | `am_adam` | `1.05x` | ✂️ Tách dẫn + Thoại Con trai |
| **030** | *The barista nods with terrifying sincerity and replies:* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **031** | *"I feel that, man. To be completely honest, our espresso is just burnt commercial beans..."* | Barista Starbucks | **`am_michael`** | `1.05x` | 🎙️ Thoại Barista bóc phốt |
| **032** | *Welcome to the end of civilized small talk!* | Narrator | `am_adam` | `1.00x` | ⏸️ Chuyển cảnh (750ms) |
| **033** | *By 8:30 AM, you arrive at your corporate office...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **034** | *The quarterly all-hands meeting kicks off in the executive conference room...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **035** | *The VP smiles enthusiastically... "So, what do you think of our Q3 synergy roadmap...?"* | Narrator + Sếp VP | `am_adam` + **`am_eric`** | `1.05x` | ✂️ Tách dẫn + Thoại Sếp VP |
| **036** | *Normally, the employee would nod vigorously... "Brilliant strategic vision, sir!"* | Narrator + Nhân viên | `am_adam` | `1.00x` | ✂️ Tách dẫn + Thoại Thảo mai |
| **037** | *Today, the employee stares dead into the VP’s soul with an emotionless expression:* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **038** | *"With all due respect, I've just been nodding along so you wouldn't feel awkward..."* | Nhân viên | `am_adam` | `0.98x` | 🎙️ Thoại Nhân viên bật sếp |
| **039** | *"This roadmap is so staggeringly dumb that my golden retriever..."* | Nhân viên | `am_adam` | `0.98x` | 🎙️ Thoại Nhân viên |
| **040** | *The entire boardroom instantly flatlines into collective shock as the VP's face turns deep crimson.* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **041** | *Trembling, the VP looks over at the Senior HR Director: "Karen... how would you rate my leadership...?"* | Narrator + Sếp VP | `am_adam` + **`am_eric`** | `1.00x` | ✂️ Tách dẫn + Thoại Sếp VP |
| **042** | *Karen adjusts her glasses, lets out a heavy sigh, and delivers the verdict:* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **043** | *"You are an incompetent narcissist who constantly takes credit for other people's work..."* | Giám đốc HR Karen | **`af_sarah`** | `0.95x` | 🎙️ Thoại HR Karen |
| **044** | *The chaos reaches critical mass when you knock on your manager's door... "Hey boss, can I head out early today?"* | Narrator + Nhân viên | `am_adam` | `1.05x` | ✂️ Tách dẫn + Thoại Nhân viên |
| **045** | *Your boss snaps: "What's the reason? Do you have another family emergency?"* | Narrator + Sếp Quản lý | `am_adam` + **`am_eric`** | `1.10x` | ✂️ Tách dẫn + Thoại Sếp gắt |
| **046** | *Your mouth instantly blurts out: "No, I'm just sick and tired of looking at your face...!"* | Narrator + Nhân viên | `am_adam` | `1.15x` | ✂️ Tách dẫn + Thoại Quát sếp |
| **047** | *By noon, the disaster breaks out of private lives and explodes on a massive national scale...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **048** | *The national midday news broadcast is airing live to tens of millions of viewers across the country.* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **049** | *The veteran anchor, flashing his pristine Hollywood smile... calmly announces:* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **050** | *"Good afternoon everyone. Today's breaking report claiming the financial markets are stabilizing..."* | MC Thời Sự Tom | **`am_eric`** | `1.02x` | 🎙️ Thoại MC Thời Sự |
| **051** | *"The truth is, all the top Wall Street analysts are losing millions..."* | MC Thời Sự Tom | **`am_eric`** | `1.02x` | 🎙️ Thoại MC Thời Sự |
| **052** | *His co-anchor turns to him in shock: "Wait, are you serious about those economic forecasts?"* | Narrator + Nữ MC | `am_adam` + **`af_nicole`** | `1.05x` | ✂️ Tách dẫn + Thoại Nữ MC |
| **053** | *The anchor chuckles bitterly: "Of course not! I'm just reading whatever scrolls across the teleprompter..."* | Narrator + MC Tom | `am_adam` + **`am_eric`** | `1.02x` | ✂️ Tách dẫn + Thoại MC Tom |
| **054** | *Right after the broadcast, a commercial break airs featuring a mega-celebrity influencer...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **055** | *When asked by the interviewer how she maintains her flawless, ageless skin...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **056** | *"Honestly, this eighty-dollar jar of moisturizer doesn't do anything for wrinkles."* | Beauty Influencer | **`af_heart`** | `1.05x` | 🎙️ Thoại Influencer |
| **057** | *"My skin looks like this because I spend fifteen thousand dollars a month on cosmetic surgery..."* | Beauty Influencer | **`af_heart`** | `1.05x` | 🎙️ Thoại Influencer |
| **058** | *Television networks descend into complete bedlam as producers scramble to cut live feeds...* | Narrator | `am_adam` | `1.05x` | ⏸️ Chuyển cảnh (750ms) |
| **059** | *By 2:00 PM, you develop a throbbing toothache and are forced to visit the local dental clinic.* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **060** | *You're lying back in the leather chair under blinding fluorescent lights...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **061** | *You nervously mumble: "Doctor, is this injection going to hurt?"* | Narrator + Bệnh nhân | `am_adam` | `1.00x` | ✂️ Tách dẫn + Thoại Bệnh nhân |
| **062** | *Normally, a dentist will gently pat your shoulder and soothe: "Just a tiny little pinch, buddy..."* | Narrator + Bác sĩ dỗ | `am_adam` + **`am_eric`** | `1.00x` | ✂️ Tách dẫn + Thoại Bác sĩ dỗ |
| **063** | *Under the truth curse, the dentist looks down at you with deep concern and admits:* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **064** | *"I have to be completely honest with you: this needle is going to hurt like hell..."* | Bác sĩ Nha Khoa | **`am_eric`** | `1.05x` | 🎙️ Thoại Bác sĩ Nha Khoa |
| **065** | *"Plus, my hands are shaking like crazy because I had a massive fight with my spouse last night..."* | Bác sĩ Nha Khoa | **`am_eric`** | `1.05x` | 🎙️ Thoại Bác sĩ thú nhận |
| **066** | *You violently launch yourself off the dental chair... sprint down Main Street in pure terror!* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **067** | *Desperate for a quick fix to your messy hair, you duck into a nearby barbershop.* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **068** | *You hold up a picture of a handsome Hollywood movie star... "Can you give me this exact haircut?"* | Narrator + Khách cắt tóc | `am_adam` | `1.00x` | ✂️ Tách dẫn + Thoại Khách |
| **069** | *The barber studies your reflection in the mirror for several long seconds...* | Narrator | `am_adam` | `0.98x` | ✅ Thuần dẫn chuyện |
| **070** | *"Brother, the problem isn't my scissors—the fundamental problem is the genetics of your face."* | Thợ Cắt Tóc | `am_adam` | `0.92x` | 🎙️ Thoại Thợ cắt tóc |
| **071** | *"Even if I had the magic wand from Harry Potter... you're still going to look like a raw, half-peeled potato."* | Thợ Cắt Tóc | `am_adam` | `0.92x` | 🎙️ Thoại Thợ cắt tóc |
| **072** | *Thirty minutes later, the barber holds up the back mirror and asks: "Well, how do you like the new cut?"* | Narrator + Thợ cắt tóc | `am_adam` | `1.00x` | ✂️ Tách dẫn + Thoại Thợ hỏi |
| **073** | *You stare into your reflection with tears welling in your eyes: "I despise you, I loathe this barbershop..."* | Narrator + Khách khóc | `am_adam` | `1.05x` | ✂️ Tách dẫn + Thoại Khách |
| **074** | *As dusk falls across the city, the ultimate battleground of human civilization ignites...* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **075** | *At an upscale, candlelit downtown bistro, a young couple is having their very first date after weeks on Hinge.* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **076** | *The girl looks across the table with a curious smile: "So, do I look like the pictures on my dating profile?"* | Narrator + Cô gái Hinge | `am_adam` + **`af_bella`** | `1.00x` | ✂️ Tách dẫn + Thoại Gái Hinge |
| **077** | *The guy desperately tries to bite his tongue, but the words erupt from his chest:* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **078** | *"You're wearing so many layers of foundation that if you laugh too hard... makeup is going to fall directly onto your steak."* | Chàng trai Hinge | `am_adam` | `1.10x` | 🎙️ Thoại Chàng trai |
| **079** | *He immediately asks in return: "And what do you think of me in person?"* | Narrator + Chàng trai | `am_adam` | `1.00x` | ✂️ Tách dẫn + Thoại Chàng trai |
| **080** | *"You clearly used heavy filters and angle tricks because in real life you're noticeably shorter..."* | Cô gái Hinge Date | **`af_bella`** | `1.15x` | 🎙️ Thoại Gái Hinge đanh đá |
| **081** | *"And let's be honest: you only brought me to this fancy restaurant because you had a fifty percent off Groupon coupon...?"* | Cô gái Hinge Date | **`af_bella`** | `1.15x` | 🎙️ Thoại Gái Hinge bóc phốt |
| **082** | *At a nearby booth, a boyfriend nervously presents a velvet gift box... "Do you love it, babe?"* | Narrator + Bạn trai tặng | `am_adam` + **`am_michael`** | `1.00x` | ✂️ Tách dẫn + Thoại Bạn trai |
| **083** | *The girlfriend picks up the necklace, inspects it, and brutally blurts out:* | Narrator | `am_adam` | `1.00x` | ✅ Thuần dẫn chuyện |
| **084** | *"This looks like a cheap, tarnished piece of junk bought on clearance from Wish or the back shelf of TJ Maxx!"* | Bạn gái nhận vòng cổ | **`af_heart`** | `1.15x` | 🎙️ Thoại Bạn gái chê đồ |
| **085** | *"I've been politely faking my admiration for your terrible taste... next time just send me cash on Venmo!"* | Bạn gái nhận vòng cổ | **`af_heart`** | `1.15x` | 🎙️ Thoại Bạn gái đòi Venmo |
| **086** | *Down the street, a woman wearing a brand new designer dress spins around and asks: "Be honest with me, does this dress make me look fat?"* | Narrator + Người vợ hỏi | `am_adam` + **`af_heart`** | `1.00x` | ✂️ Tách dẫn + Thoại Vợ hỏi |
| **087** | *The husband blinks in utter helplessness: "Yes! You've noticeably gained weight, your double chin is swallowing your neck..."* | Narrator + Chồng chê váy | `am_adam` + **`am_michael`** | `1.10x` | ✂️ Tách dẫn + Thoại Chồng chê |
| **088** | *Within a single evening, thousands of engagement rings are dropped into wine glasses...* | Narrator | `am_adam` | `1.05x` | ✅ Thuần dẫn chuyện |
| **089** | *By 11:00 PM, a haunting, eerie silence descends over every major metropolitan city across the globe.* | Narrator | `am_adam` | `0.92x` | ⏸️ Không khí tĩnh lặng |
| **090** | *Humanity enters a state of collective dread and discovers the only remaining survival tactic...* | Narrator | `am_adam` | `0.95x` | ✅ Thuần dẫn chuyện |
| **091** | *On the streets, strangers refuse to make eye contact, communicating solely through frantic hand gestures...* | Narrator | `am_adam` | `0.95x` | ✅ Thuần dẫn chuyện |
| **092** | *In just twenty-four hours without harmless white lies:* | Narrator | `am_adam` | `0.95x` | ✅ Thuần dẫn chuyện |
| **093** | *The advertising industry collapses because every brand is forced to admit their products are completely mediocre.* | Narrator | `am_adam` | `0.95x` | ✅ Thuần dẫn chuyện |
| **094** | *Decade-long friendships shatter in seconds over a single confession: "I only hang out with you because you always pick up the bar tab."* | Narrator + Bạn bè | `am_adam` | `0.95x` | ✂️ Tách dẫn + Thoại Thú nhận |
| **095** | *And humankind learns a profound, humbling truth: the human heart is far too fragile to endure one hundred percent raw reality...* | Narrator | `am_adam` | `0.95x` | ✅ Triết lý sâu lắng |
| **096** | *The digital clock counts down the final agonizing seconds: 11:59:58 PM... 59 seconds...* | Narrator | `am_adam` | `0.95x` | ⏱️ Đếm ngược nửa đêm |
| **097** | *TICK TOCK... EXACTLY MIDNIGHT!* | Narrator | `am_adam` | `1.00x` | 🔔 Chuông giải thoát |
| **098** | *The supernatural spell abruptly shatters, and the blessed power of white lies is officially restored to humanity!* | Narrator | `am_adam` | `0.98x` | ✅ Cứu rỗi nhân loại |
| **099** | *Instantly, you turn to your mom on the sofa and wrap your arms around her: "Mom, I'm so sorry, your pancakes this morning were genuinely the best in the world!"* | Narrator + Con trai xin lỗi | `am_adam` | `1.00x` | ✂️ Tách dẫn + Thoại Con trai |
| **100** | *Your boss frantically sends a message to the company Slack channel: "Great job today everyone, I truly consider this team my second family!"* | Narrator + Sếp nhắn Slack | `am_adam` + **`am_eric`** | `1.02x` | ✂️ Tách dẫn + Thoại Sếp Slack |
| **101** | *And girlfriends text their partners: "I'm so sorry babe, that necklace is gorgeous and I'm going to wear it every single day!"* | Narrator + Bạn gái dỗ | `am_adam` + **`af_heart`** | `1.00x` | ✂️ Tách dẫn + Thoại Bạn gái |
| **102** | *The entire planet exhales a massive sigh of relief as if waking from the most terrifying nightmare in human history.* | Narrator | `am_adam` | `0.98x` | ✅ Thuần dẫn chuyện |
| **103** | *The world is once again saved by the gentle, merciful grace of harmless white lies!* | Narrator | `am_adam` | `0.95x` | ✅ Thuần dẫn chuyện |
| **104** | *Malicious deceit and fraud are undeniably toxic, but "white lies" are the essential emotional cushion that makes human existence tolerable.* | Narrator | `am_adam` | `0.95x` | ✅ Triết lý cốt lõi |
| **105** | *They were never invented to deceive us, but to protect our vulnerable hearts and allow us to treat one another with kindness, grace, and empathy.* | Narrator | `am_adam` | `0.95x` | ✅ Triết lý cốt lõi |
| **106** | *Now, let's be one hundred percent honest—nobody is forcing you to tell the truth right now:* | Narrator | `am_adam` | `1.00x` | ✅ Call To Action |
| **107** | *If tomorrow the world actually banned white lies for twenty-four hours, what is the VERY FIRST brutal truth you would say directly to your best friend or your boss?* | Narrator | `am_adam` | `1.00x` | ✅ Câu hỏi tương tác |
| **108** | *Drop your funniest, most savage confession in the comments below!* | Narrator | `am_adam` | `1.02x` | ✅ CTA Kêu gọi comment |
| **109** | *Don't forget to hit Like, Subscribe, and ring the Notification Bell to join us for more mind-bending, hilarious what-if stories.* | Narrator | `am_adam` | `1.02x` | ✅ CTA Subscribe |
| **110** | *Thank you so much for watching, and we'll see you in the next video!* | Narrator | `am_adam` | `0.98x` | ✅ Outro chào kết |
