<!-- PRODUCTION_PIPELINE_RULES_START -->
# Audio Production Rules (Kokoro TTS / Storytelling)

Whenever producing, sanitizing, or generating audio from storytelling scripts:

1. **Dialogue Separation**: Never let one voice read both narration and dialogue in a single line. Split narration (use `am_adam`) from quoted speech (use mapped character voices like `af_heart`, `am_eric`, `af_sarah`, etc.) and stitch them.
2. **TTS Text Sanitization**:
   - Convert all time formats to words (`7:00 AM` -> `seven AM`, `8:30 PM` -> `eight thirty PM`).
   - Convert all currency and numbers to words (`$4.17` -> `four dollars and seventeen cents`, `$15,000` -> `fifteen thousand dollars`, `1998` -> `nineteen ninety-eight`).
   - Expand abbreviations (`VP` -> `Vice President`, `HR` -> `H-R`, `Q3` -> `Q-three`, `TJ Maxx` -> `T-J Maxx`).
   - Handle ambiguous homographs in context (e.g. social media "Read" -> `/red/`).
3. **Pacing**:
   - Intro/Neutral: `1.0`
   - High Tension/Climax: `1.02 - 1.05`
   - Reflection/Outro: `0.95 - 0.98`
4. **Master Stitching**:
   - Standard line silence: `300ms`
   - Scene/Time jump silence: `700ms - 900ms`
   - Always output individual numbered files (`line_001.wav`...) and one stitched `master_audio_full.wav`.
<!-- PRODUCTION_PIPELINE_RULES_END -->
