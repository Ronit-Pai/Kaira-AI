function AIResponse({ response }) {
  return (
    <div className="ai-response">
      {/* Change the AI name from Gemini to Kaira */}
      <h3>Response from Kaira:</h3>
      <p>{response}</p>
    </div>
  );
}
