const InstagramFeed = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-5xl p-6 rounded-2xl shadow-lg"
        style={{
          backgroundColor: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(6px)",
        }}
      >
        <iframe
          src="https://www.instagram.com/slaphub.la/embed"
          className="w-full h-[600px] border-0 overflow-hidden rounded-xl"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default InstagramFeed;
