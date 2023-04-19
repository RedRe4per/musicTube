export default function apiTest() {
  const handleAPI = async () => {
    const engTextRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_CLIENT_ADDRESS
      }/api/textTranslator?originalText=${"华语流行乐队"}`
    );
    const engText = await engTextRes.json();
  };

  return (
    <section className="hero h-[82vh] bg-gray-650">
      <button onClick={handleAPI}>Translate API, Click me</button>
    </section>
  );
}
