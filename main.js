document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("userInput"); // ← id 이름 맞춰줌!
  const button = document.getElementById("submit");   // ← 여기도 수정
  const result = document.getElementById("result");

  button.addEventListener("click", async () => {
    const userInput = input.value;

    if (!userInput) {
      result.textContent = "입력값이 없습니다.";
      return;
    }

    result.textContent = "GPT 응답 생성 중...";

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const reply = data.choices?.[0]?.message?.content || "응답 없음";
        result.textContent = reply;
      } else {
        result.textContent = `에러: ${data.error?.message || "응답 실패"}`;
      }
    } catch (err) {
      result.textContent = `요청 실패: ${err.message}`;
    }
  });
});

