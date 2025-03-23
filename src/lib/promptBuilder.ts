type AnswerMap = {
  [questionId: string]: string | string[];
};

export function buildPrompt(answers: AnswerMap): string {
  let profile = "Student Profile:\n";

  // 1. General Info — always shown
  const studyPreferences: string[] = [];

  if (answers.gender) {
    studyPreferences.push(`Gender: ${answers.gender}`);
  }
  if (answers.age) {
    studyPreferences.push(`Age: ${answers.age}`);
  }
  if (answers.country) {
    studyPreferences.push(`Country of residence: ${answers.country}`);
  }
  if (answers.languages_spoken) {
    const langs = Array.isArray(answers.languages_spoken)
      ? answers.languages_spoken.join(", ")
      : answers.languages_spoken;
    studyPreferences.push(`Languages spoken: ${langs}`);
  }
  if (answers.study_location) {
    studyPreferences.push(
      `Preferred study location: ${answers.study_location}`
    );
  }
  if (answers.study_region) {
    studyPreferences.push(`Preferred study region: ${answers.study_region}`);
  }
  if (answers.specific_country) {
    studyPreferences.push(
      `Preferred specific country: ${answers.specific_country}`
    );
  }
  if (answers.budget_yearly) {
    studyPreferences.push(`Annual budget: ${answers.budget_yearly}`);
  }
  if (answers.education_cost_preference) {
    studyPreferences.push(
      `Education cost preference: ${answers.education_cost_preference}`
    );
  }
  if (answers.degree_level) {
    studyPreferences.push(`Degree level desired: ${answers.degree_level}`);
  }
  if (answers.open_online) {
    studyPreferences.push(
      `Open to online universities: ${answers.open_online}`
    );
  }
  if (answers.academic_strength) {
    studyPreferences.push(`Academic performance: ${answers.academic_strength}`);
  }

  if (studyPreferences.length > 0) {
    profile +=
      "Study Preferences and Background:\n" +
      studyPreferences.map((p) => `- ${p}`).join("\n") +
      "\n";
  }

  // 2. Check major decision
  if (answers.knowMajor === "yes") {
    profile += `- The student already knows their intended major: ${answers.majorName}.\n`;
  } else {
    profile += `- The student is unsure about their major.\n`;

    if (answers.consideredMajors) {
      profile += `- Considered majors/careers: ${answers.consideredMajors}.\n`;
    }
  }

  // 3. Interests
  const interestKeys = Object.keys(answers).filter((key) =>
    key.startsWith("interest_")
  );
  const interests = interestKeys.map((key) => {
    const val = answers[key];
    return `- ${key.replace("interest_", "").replace(/_/g, " ")}: ${
      Array.isArray(val) ? val.join(", ") : val
    }`;
  });

  if (interests.length > 0) {
    profile += "Interest Areas:\n" + interests.join("\n") + "\n";
  }

  // 4. Personality
  const personality = [
    "personality_bigPicture",
    "personality_decisionMaking",
    "personality_structure",
    "personality_social",
    "personality_teamwork",
    "personality_environment",
  ]
    .filter((key) => answers[key])
    .map((key) => `- ${key.replace("personality_", "")}: ${answers[key]}`)
    .join("\n");

  if (personality) {
    profile += "Personality Traits:\n" + personality + "\n";
  }

  // 5. Strengths and Values
  if (answers.skills_strengths) {
    profile += `- Skills/Strengths: ${
      Array.isArray(answers.skills_strengths)
        ? answers.skills_strengths.join(", ")
        : answers.skills_strengths
    }\n`;
  }

  if (answers.values_priorities) {
    profile += `- Career Values: ${
      Array.isArray(answers.values_priorities)
        ? answers.values_priorities.join(", ")
        : answers.values_priorities
    }\n`;
  }

  // 6. Final Instruction
  let instruction = "";
  let format = "";

  const countryMention = answers.country
    ? ` The student lives in ${answers.country}, so consider what majors are available, relevant, or in demand there.`
    : "";

  if (answers.knowMajor === "yes") {
    instruction = `\nThe student has already chosen their intended major.${countryMention} Confirm this choice and do not suggest any alternatives.`;
    format = ` Respond with a JSON array like this: [{"major": "${answers.majorName}", "reason": "The student has already chosen this major."}]`;
  } else {
    instruction = `\nBased on this profile, recommend 2–5 university majors that align with the student's interests, personality, strengths, values, and study preferences.${countryMention}`;
    format = ` Respond with a JSON array like this: [{"major": "...", "reason": "..."}]`;
  }

  return profile + instruction + format;
}
