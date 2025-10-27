const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          Datos obtenidos via{" "}
          <a
            href="https://github.com/fernandobouchet/job-alert-bot"
            target="_blank"
            className="underline"
          >
            Job Alert Bot
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export { Footer };
