function About() {
  return (
    <body className="bg-white h-[1000px] pt-[200px]">
      <main className="py-16 container mx-auto px-6 md:px-0">
        <section>
          <h1 className="inline-block text-gray-600 font-bold text-3xl">
            I am mckeen asma
            <br />
            hey welcome!
          </h1>

          <div className="grid grid-cols-3 gap-4 mt-10">
            <div>
              <h3 className="text-lg font-semibold text-gray-500 mt-2">
                1. Browse and book
              </h3>
              <p className="text text-gray-400">
                Start by searching for a location. Once you find a sauna you
                like, simply check the availability, book it, and make a secure
                payment right away.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-500 mt-2">
                2. Have a great bath
              </h3>
              <p className="text text-gray-400">
                Meet your host on the date you chose and enjoy the home sauna
                experience. We'll handle the payment to the host after your
                experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-500 mt-2">
                3. Review the host
              </h3>
              <p className="text text-gray-400">
                If you enjoyed the experience, let others know by giving a
                review to your sauna host. This way others will know where to
                go.
              </p>
            </div>
          </div>
        </section>
      </main>
    </body>
  );
}

export default About;
