const express = require("express");
const axios = require("axios");

const aiRouts = express.Router();

async function getAiResponse(requirements) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OpenAI API Key in .env file.");
  }

  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "user",
        content:
          typeof requirements === "object"
            ? JSON.stringify(requirements)
            : String(requirements),
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error calling OpenAI API:",
      error.response?.data || error.message
    );
    throw error;
  }
}

aiRouts.post("/getMealPlan", async (req, res) => {
  try {
    const userInput = req.body;

    const dietaryRequirements = {
      Requirement:
        'I need a dietary plan for the following requirements. Give results according to the ResultsNeededFormat only. Result should be a JSON in String format, Do not put any aditional characters that are not related to the JSON like ```json, eg: "MealArray:[{},{},{}],instruction:"some instruction""',
      Requirements: {
        Age: userInput.age || "",
        Weight: `${userInput.weight}kg` || "",
        Height: `${userInput.height}cm` || "",
        Allergies: userInput.allergies || "",
        FoodRestrictions: userInput.restrictions || "",
        PreferredNumberofMeals: userInput.meals || "",
        Gender: userInput.gender || "",
        ActivityLevel: userInput.activity || "",
        PreferredDietType: userInput.diet || "",
        PreferredCuisine: userInput.cuisine || "",
        HealthGoal: userInput.goal || "",
        Budget: userInput.budget || "",
        AvailableIngredients: ["any"], // Default
        Icons: [
          { id: 1, Description: "Rice/Noodle bowl and a cool drink" },
          { id: 2, Description: "Vegi Salad bowl" },
          { id: 3, Description: "Rice/Noodle bowl and a drink and a fruit" },
          { id: 4, Description: "Rice/Noodle bowl with meat" },
          { id: 5, Description: "Vegi and egg meal bowl and a cool drink" },
          { id: 6, Description: "Rice/Noodle, vegi, egg, meat bowl" },
          { id: 7, Description: "Rice bowl" },
          { id: 8, Description: "Sandwich" },
          { id: 9, Description: "Pan Cake" },
          { id: 10, Description: "Cake" },
          { id: 11, Description: "English Breakfast" },
          { id: 12, Description: "Dessert/Ice-Cream" },
          { id: 13, Description: "Ice-Cream" },
          { id: 14, Description: "Frid Rice" },
          { id: 15, Description: "Fruit Juice" },
          { id: 16, Description: "Sandwich and cool drink" },
          { id: 17, Description: "Noodles" },
        ],
      },
      ResultNeededFormat: {
        MealArray: [
          {
            MealPlanNumber: "number",
            MealShortName: "Short name for this meal",
            MealIconId: "Suitable Icon id from the given Icons",
            Ingredients:
              "Ingredients With Quantity as a comma separated string",
            HowToMake: "1.How 2.To 3.Make ...",
            TotalCalorie:
              "Total Calories (Breakdown of Macronutrients - Carbohydrates, Proteins, Fats)",
          },
        ],
        instruction:
          "Give details about proposed meal plan, Depending on the BMR and the HealthGoal how many Macronutrients(Carbohydrates, Proteins, Fats) are recommended and in this proposed meal plan how many Macronutrients are included? What is the total calorie of this meal plan?",
        NutrientsArray: [
          "TotalCalorie in kcal",
          "Carbohydrates in grams",
          "Proteins in grams",
          "Fats in grams",
        ],
      },
    };

    // Call OpenAI API
    const apiResponse = await getAiResponse(dietaryRequirements);
    const mealPlan = apiResponse.choices[0].message.content;
    res.json(cleanAiResultStringJson(mealPlan));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error generating meal plan", details: error.message });
  }
});

aiRouts.post("/getShoppingList", async (req, res) => {
  try {
    const userInput = req.body;

    const dietaryRequirements = `I want to buy goods for the recipe ingredients list from the supermarket. Generated shopping list for these items. round up some quantities to match standard portions. Do not add any information other than a shopping list in the results. Ingredients: ${userInput.ingredients}`;

    // Call OpenAI API
    const apiResponse = await getAiResponse(dietaryRequirements);
    const shopingList = apiResponse.choices[0].message.content;
    res.json(shopingList);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error generating meal plan", details: error.message });
  }
});

aiRouts.post("/getUserTarget", async (req, res) => {
  try {
    const { birthday, gender, weight, height, activity, allergy, goal } =
      req.body;

    const calTarget = {
      UserInfo: {
        activity_level: activity,
        allergy: allergy,
        birthday: birthday,
        gender: gender,
        goal: goal,
        height: height,
        weight: weight,
      },
      ResultNeededFormat: {
        Calorie: "TotalCalorie in kcal per day",
        Carbohydrates: "Carbohydrates in grams per day",
        Proteins: "Proteins in grams per day",
        Fats: "Fats in grams per day",
      },
      Instructions:
        "Given the UserInfo find the Calories needed to achieve the goal in UserInfo. Give the result in ResultNeededFormat. The result should be a JSON in String format, Do not put any additional characters that are not related to the JSON like ```json, Give only number value. Do not add units",
    };

    // Call OpenAI API
    const apiResponse = await getAiResponse(calTarget);
    const targetRes = apiResponse.choices[0].message.content;
    res.json(cleanAiResultStringJson(targetRes));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error generating user target", details: error.message });
  }
});

function cleanAiResultStringJson(res) {
  const cleanedString = res.replace(/\n\n/g, ",").replace(/\n/g, "").replace(/,\s*$/, "");
  const jsonArrayString = `[${cleanedString}]`;
  return JSON.parse(jsonArrayString);
}

module.exports = aiRouts;
