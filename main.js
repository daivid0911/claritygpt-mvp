const resultDiv = document.getElementById("result");
const submitBtn = document.getElementById("submit");
const inputField = document.getElementById("userInput");

submitBtn.addEventListener("click", async () => {
  const userInput = inputField.value.trim();
  if (!userInput) {
    resultDiv.innerText = "내용을 입력해주세요.";
    return;
  }

  resultDiv.innerText = "ClarityGPT가 분석 중입니다... 🧠";

  try {
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();
    resultDiv.innerText = data.message || "응답을 받지 못했습니다.";

  } catch (error) {
    resultDiv.innerText = "오류 발생: " + error.message;
  }
});
