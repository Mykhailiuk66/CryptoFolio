import { Button } from "@nextui-org/button";
import { Image, Link } from "@nextui-org/react";
import Container from "../components/Container/Container";

const Hero = () => {
  return (
    <Container className="flex items-center justify-around flex-col md:flex-row ">
      <div className="relative justify-center items-center md:max-w-[30%] z-20">
        <section className="max-w-screen-xl mx-auto px-4 py-12 md:py-28 gap-12 md:px-8 flex flex-col justify-center items-center text-center md:text-left">
          <h1 className="text-5xl md:text-6xl text-default-700 font-bold tracking-tighter mx-auto bg-gradient-to-b text-pretty">
            Your Ultimate{" "}
            <span className="text-primary-500">
              Cryptocurrency Portfolio Tracker
            </span>
          </h1>

          <Image
            isBlurred
            loading="eager"
            disableSkeleton
            src="static/portfolio.png"
            alt="NextUI Album Cover"
            className="md:hidden max-w-[80vw] md:max-w-[66vw] lg:max-w-[66vw]"
          />

          <p className="text-xl max-w-2xl me-auto text-foreground/70 text-pretty">
            Effortlessly track your cryptocurrency investments with
            <span className="text-primary-500/90 font-bold"> CryptoFolio</span>
            .
            Create portfolios, set watchlists, and track real-time data.
          </p>
          <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Button
              href="/explore"
              as={Link}
              color="primary" 
              variant="shadow"
              className="w-56 text-lg font-medium"
              >
              Get Started
            </Button>
          </div>
        </section>

      </div>
      <Image
        isBlurred
        loading="eager"
        disableSkeleton
        src="static/portfolio.png"
        alt="NextUI Album Cover"
        className="hidden md:block max-w-[80vw] md:max-w-[66vw] lg:max-w-[66vw]"
      />

    </Container>

  );
}

export default Hero