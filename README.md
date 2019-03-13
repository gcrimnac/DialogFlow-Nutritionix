# DialogFlow-Nutrionix
The purpose of this project is to create a third party API call to the Nutrionix Nutrients service. This service allows
you to pass a string 'I ate a Big Mac and fries' and receive a nutrional description of the your meal. This includes
calories and a breakdown by major categories: Protein, Carbs, Fat, Sugars, etc.

This call is made as a fulfillment call from within DialogFlow. The food name is parsed from the statement made to the
bot. The result should be returned to the bot.

This code fails at the API call... Status: Crash TypeError: Request path contains unescaped characters.
